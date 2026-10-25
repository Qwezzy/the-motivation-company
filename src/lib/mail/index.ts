import fs from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";

export type MailMessage = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};
export type SendResult = { ok: true; id: string } | { ok: false; error: string };

/**
 * Drivers:
 * - smtp: used when SMTP_PASS (or SMTP_HOST with SMTP_NO_AUTH=true) is set. Sends via
 *         TMC's own mailbox (Xneelo). Success only when the server accepted the recipient.
 * - file: dev/test only (never on Vercel production). Writes the message to MAIL_OUTBOX_DIR;
 *         success only when the write succeeds.
 * - none: not configured. Always fails (honest).
 * MAIL_FORCE_FAIL=true forces failure (non-production only) to test the error UI.
 */
export function mailDriver(): "smtp" | "file" | "none" {
  if (process.env.SMTP_PASS || process.env.SMTP_NO_AUTH === "true") return "smtp";
  const fileAllowed =
    process.env.VERCEL_ENV !== "production" &&
    (process.env.MAIL_DRIVER === "file" || process.env.NODE_ENV !== "production");
  return fileAllowed ? "file" : "none";
}

async function sendSmtp(m: MailMessage): Promise<SendResult> {
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const noAuth = process.env.SMTP_NO_AUTH === "true" && process.env.VERCEL_ENV !== "production";
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.themotivationcompany.co.za",
      port,
      secure, // 465 = implicit TLS; 587 = STARTTLS (required below)
      requireTLS: !secure && !noAuth,
      auth: noAuth
        ? undefined
        : { user: process.env.SMTP_USER || "bookings@themotivationcompany.co.za", pass: process.env.SMTP_PASS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    const info = await transport.sendMail({
      from: m.from,
      to: m.to,
      replyTo: m.replyTo,
      subject: m.subject,
      text: m.text,
      html: m.html,
    });
    if (info.accepted?.length && !info.rejected?.length) return { ok: true, id: info.messageId };
    return { ok: false, error: `smtp rejected: ${JSON.stringify(info.rejected)}` };
  } catch (err) {
    return { ok: false, error: `smtp: ${(err as Error).message}` };
  }
}

async function sendFile(m: MailMessage): Promise<SendResult> {
  try {
    const dir = process.env.MAIL_OUTBOX_DIR || path.join(process.cwd(), ".mail-outbox");
    const id = `${new Date().toISOString().replace(/[:.]/g, "-")}-${Math.random().toString(36).slice(2, 8)}`;
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(m, null, 2));
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
  if (d === "smtp") return sendSmtp(m);
  if (d === "file") return sendFile(m);
  return { ok: false, error: "email not configured (no SMTP_PASS)" };
}
