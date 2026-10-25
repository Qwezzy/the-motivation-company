import fs from "node:fs/promises";
import path from "node:path";
import { brochureDir, readManifest, teamBuildingEnabled } from "@/lib/brochureGate";
import { verifyToken } from "@/lib/downloadToken";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function denied(): Response {
  const html = `<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Download link expired | ${site.company}</title></head>
<body style="margin:0;font-family:Inter,Arial,sans-serif;background:#232A60;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px">
<div style="max-width:520px;border:1px solid rgba(255,203,5,.3);border-radius:24px;padding:32px;background:#1a1f4a">
<p style="color:#FFCB05;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;margin:0">Team Building</p>
<h1 style="font-size:26px;margin:12px 0 0">This download link has expired or is not valid</h1>
<p style="color:rgba(255,255,255,.8);line-height:1.6">Brochure links work for 24 hours after you complete the questionnaire. Please fill it in again to get a new link, or contact us on <a href="${site.phoneHref}" style="color:#FFCB05">${site.phone}</a> or <a href="${site.emailHref}" style="color:#FFCB05">${site.email}</a>.</p>
<a href="/team-building#questionnaire" style="display:inline-block;margin-top:12px;background:#FFCB05;color:#232A60;font-weight:600;font-size:14px;padding:12px 24px;border-radius:999px;text-decoration:none">Back to the questionnaire</a>
</div></body></html>`;
  return new Response(html, { status: 403, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

export async function GET(req: Request) {
  if (!teamBuildingEnabled()) return new Response("Not found", { status: 404 });
  const token = new URL(req.url).searchParams.get("token");
  if (!verifyToken(token)) return denied();
  try {
    const pdf = await fs.readFile(path.join(brochureDir, readManifest().file));
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="TMC-Team-Building-Brochure.pdf"',
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return new Response("Brochure unavailable", { status: 503 });
  }
}
