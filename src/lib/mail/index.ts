import fs from "node:fs/promises";
import path from "node:path";

export type Attachment = { filename: string; content: Buffer };
export type MailMessage = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Attachment[];
};
export type SendResult = { ok: true; id: string } | { ok: false; error: string };

/**
 * Drivers:
 * - resend: used when RESEND_API_KEY is set. Success only on a 2xx with an id.
 * - file:   dev/test only (never on Vercel production). Writes JSON + attachments
 *           to MAIL_OUTBOX_DIR; success only when every write succeeds.
 * - none:   no key and not allowed to use file driver. Always fails (honest).
 * MAIL_FORCE_FAIL=true forces failure (non-production only) to test the error UI.
 */
export function mailDriver(): "resend" | "file" | "none" {
  if (process.env.RESEND_API_KEY) return "resend";
  const fileAllowed =
    process.env.VERCEL_ENV !== "production" &&
    (process.env.MAIL_DRIVER === "file" || process.env.NODE_ENV !== "production");
  return fileAllowed ? "file" : "none";
}

async function sendResend(m: MailMessage): Promise<SendResult> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: m.from,
        to: [m.to],
        reply_to: m.replyTo,
        subject: m.subject,
        text: m.text,
        html: m.html,
        attachments: m.attachments?.map((a) => ({
          filename: a.filename,
          content: a.content.toString("base64"),
        })),
      }),
      cache: "no-store",
    });
    const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    if (res.ok && body.id) return { ok: true, id: body.id };
    return { ok: false, error: `resend ${res.status}: ${body.message || "no id"}` };
  } catch (err) {
    return { ok: false, error: `resend network: ${(err as Error).message}` };
  }
}

async function sendFile(m: MailMessage): Promise<SendResult> {
  try {
    const dir = process.env.MAIL_OUTBOX_DIR || path.join(process.cwd(), ".mail-outbox");
    const id = `${new Date().toISOString().replace(/[:.]/g, "-")}-${Math.random().toString(36).slice(2, 8)}`;
    const msgDir = path.join(dir, id);
    await fs.mkdir(msgDir, { recursive: true });
    const files: string[] = [];
    for (const a of m.attachments || []) {
      await fs.writeFile(path.join(msgDir, a.filename), a.content);
      files.push(a.filename);
    }
    await fs.writeFile(
      path.join(msgDir, "message.json"),
      JSON.stringify({ ...m, attachments: files }, null, 2),
    );
    await fs.writeFile(path.join(msgDir, "body.html"), m.html);
    return { ok: true, id: `file:${id}` };
  } catch (err) {
    return { ok: false, error: `file driver: ${(err as Error).message}` };
  }
}

export async function sendMail(m: MailMessage): Promise<SendResult> {
  if (process.env.MAIL_FORCE_FAIL === "true" && process.env.VERCEL_ENV !== "production") {
    return { ok: false, error: "forced failure (MAIL_FORCE_FAIL)" };
  }
  const d = mailDriver();
  if (d === "resend") return sendResend(m);
  if (d === "file") return sendFile(m);
  return { ok: false, error: "email not configured (no RESEND_API_KEY)" };
}
