import fs from "node:fs/promises";
import { issueToken } from "@/lib/downloadToken";
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

/* CORS: only the Xneelo-hosted static copy of the site may call this cross-origin. */
const ALLOWED_ORIGINS = new Set([
  "https://themotivationcompany.co.za",
  "https://www.themotivationcompany.co.za",
  "http://themotivationcompany.co.za",
  "http://www.themotivationcompany.co.za",
]);

function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  if (!ALLOWED_ORIGINS.has(origin)) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: Request) {
  const res = await handlePost(req);
  for (const [k, v] of Object.entries(corsHeaders(req))) res.headers.set(k, v);
  return res;
}

async function handlePost(req: Request): Promise<Response> {
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

  const from = process.env.MAIL_FROM || site.email;
  const inbox = process.env.BOOKINGS_INBOX || site.email;

  // Make sure we can release the brochure before recording the lead.
  const token = issueToken();
  if (!token) return fail(503, "not_configured");
  try {
    await fs.access(path.join(brochureDir, readManifest().file));
  } catch {
    return fail(503, "brochure_missing");
  }

  const rows = summaryLines(answers);
  const textSummary = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  // Lead is recorded in TMC's own mailbox. Brochure is only released if this succeeds.
  const notify = await sendMail({
    from,
    to: inbox,
    replyTo: answers.email,
    subject: `Team building enquiry: ${answers.organisation} (${answers.teamSize})`,
    text: `New team-building questionnaire from the website. The visitor was given the brochure download after this email was accepted.\n\n${textSummary}\n\nConsent to use details for the brochure and enquiry: Yes\n\nReply to this email to respond directly to ${answers.email}.`,
    html: `<div style="font-family:Inter,Arial,sans-serif;color:#232A60;max-width:600px"><p>New team-building questionnaire from the website. The visitor was given the brochure download after this email was accepted.</p>${tableHtml(rows)}<p>Consent to use details for the brochure and enquiry: Yes</p><p>Reply to this email to respond directly to ${esc(answers.email)}.</p></div>`,
  });

  if (!notify.ok) {
    console.error("[team-building] bookings email failed:", notify.error);
    return fail(502, "send_failed");
  }

  return NextResponse.json({
    ok: true,
    sent: true,
    downloadUrl: `/api/team-building/brochure?token=${encodeURIComponent(token)}`,
  });
}
