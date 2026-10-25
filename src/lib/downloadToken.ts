import crypto from "node:crypto";

/** Signed, short-lived brochure download token: base64url(expiryMs).base64url(HMAC-SHA256). */
const TTL_MS = 24 * 60 * 60 * 1000;

function secret(): string | null {
  const s = process.env.DOWNLOAD_SECRET;
  if (s && s.length >= 16) return s;
  // Dev/test convenience only; production must set DOWNLOAD_SECRET.
  if (process.env.VERCEL_ENV !== "production" && process.env.NODE_ENV !== "production") return "dev-only-download-secret";
  if (process.env.VERCEL_ENV !== "production" && process.env.MAIL_DRIVER === "file") return "dev-only-download-secret";
  return null;
}

const sign = (payload: string, key: string) =>
  crypto.createHmac("sha256", key).update(`tmc-brochure:${payload}`).digest("base64url");

export function issueToken(now = Date.now()): string | null {
  const key = secret();
  if (!key) return null;
  const payload = Buffer.from(String(now + TTL_MS)).toString("base64url");
  return `${payload}.${sign(payload, key)}`;
}

export function verifyToken(token: string | null | undefined, now = Date.now()): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload, key);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  const exp = Number(Buffer.from(payload, "base64url").toString());
  return Number.isFinite(exp) && exp > now;
}
