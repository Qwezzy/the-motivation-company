import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { brochureDir, readManifest, teamBuildingEnabled } from "@/lib/brochureGate";
import { sendMail } from "@/lib/mail";
import { normalise, summaryLines, validate } from "@/lib/teamBuilding";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Simple in-memory rate limit: 5 submissions per IP per 10 minutes (per instance). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function tableHtml(rows: [string, string][]): string {
  return `<table cellpadding="6" style="border-collapse:collapse;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#232A60;font-weight:600;vertical-align:top;border-bottom:1px solid #eee">${esc(k)}</td><td style="border-bottom:1px solid #eee">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;
}

const fail = (status: number, error: string, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, error, ...extra }, { status });

export async function POST(req: Request) {
  if (!teamBuildingEnabled()) return fail(404, "not_found");

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) return fail(429, "rate_limited");

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail(400, "bad_request");
  }

  // Honeypot: real visitors never fill "website". Pretend success, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, sent: false });
  }

  const answers = normalise(body);
  const errors = validate(answers);
  if (Object.keys(errors).length) return fail(422, "validation", { errors });

  const from = process.env.MAIL_FROM;
  const inbox = process.env.BOOKINGS_INBOX || site.email;
  if (!from) return fail(503, "not_configured");

  const manifest = readManifest();
  let pdf: Buffer;
  try {
    pdf = await fs.readFile(path.join(brochureDir, manifest.file));
  } catch {
    return fail(503, "brochure_missing");
  }

  const rows = summaryLines(answers);
  const textSummary = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const visitor = await sendMail({
    from,
    to: answers.email,
    replyTo: inbox,
    subject: "Your Motivational Team Building brochure from The Motivation Company",
    text: `Hi ${answers.name},\n\nThank you for your interest in team building with The Motivation Company (TMC). Our Motivational Team Building brochure is attached.\n\nHere is a summary of what you told us:\n\n${textSummary}\n\nWe will reply to your enquiry. You can also reach us on ${site.phone} or ${site.email}.\n\nThe Motivation Company\n${site.website}`,
    html: `<div style="font-family:Inter,Arial,sans-serif;color:#232A60;max-width:600px"><p>Hi ${esc(answers.name)},</p><p>Thank you for your interest in team building with The Motivation Company (TMC). Our Motivational Team Building brochure is attached.</p><p><strong>Here is a summary of what you told us:</strong></p>${tableHtml(rows)}<p>We will reply to your enquiry. You can also reach us on ${esc(site.phone)} or <a href="${site.emailHref}">${esc(site.email)}</a>.</p><p>The Motivation Company<br>${esc(site.website)}</p></div>`,
    attachments: [{ filename: "TMC-Team-Building-Brochure.pdf", content: pdf }],
  });

  if (!visitor.ok) {
    console.error("[team-building] visitor email failed:", visitor.error);
    return fail(502, "send_failed");
  }

  const notify = await sendMail({
    from,
    to: inbox,
    replyTo: answers.email,
    subject: `Team building enquiry: ${answers.organisation} (${answers.teamSize})`,
    text: `New team-building questionnaire. The brochure was emailed to ${answers.email}.\n\n${textSummary}\n\nConsent: ${answers.consent ? "Yes" : "No"}`,
    html: `<div style="font-family:Inter,Arial,sans-serif;color:#232A60;max-width:600px"><p>New team-building questionnaire. The brochure was emailed to ${esc(answers.email)}.</p>${tableHtml(rows)}<p>Consent to use details for the brochure and enquiry: Yes</p><p>Reply to this email to respond directly.</p></div>`,
  });
  if (!notify.ok) console.error("[team-building] bookings notification failed:", notify.error);

  return NextResponse.json({ ok: true, sent: true, notified: notify.ok });
}
