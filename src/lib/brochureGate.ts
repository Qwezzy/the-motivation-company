import fs from "node:fs";
import path from "node:path";

/**
 * Brochure is private: it lives in private/brochure/ (NOT public/) and is only
 * ever sent as an email attachment by /api/team-building.
 */
export const brochureDir = path.join(process.cwd(), "private", "brochure");

type Manifest = { file: string; placeholder: boolean };

export function readManifest(): Manifest {
  try {
    const raw = fs.readFileSync(path.join(brochureDir, "manifest.json"), "utf8");
    const m = JSON.parse(raw) as Partial<Manifest>;
    return {
      file: m.file || "TMC-Team-Building-Brochure.pdf",
      placeholder: m.placeholder !== false,
    };
  } catch {
    return { file: "TMC-Team-Building-Brochure.pdf", placeholder: true };
  }
}

/** True on the live Vercel production deployment. */
export function isLiveProduction(): boolean {
  return process.env.VERCEL_ENV === "production";
}

/**
 * Production guard. On production the page and the send route only work when
 * BROCHURE_READY=true AND the manifest says the brochure is not the
 * placeholder. Preview and local builds always show the page (with a draft
 * banner) so the journey can be tested.
 */
export function teamBuildingEnabled(): boolean {
  if (!isLiveProduction()) return true;
  return process.env.BROCHURE_READY === "true" && !readManifest().placeholder;
}

export function brochureIsPlaceholder(): boolean {
  return readManifest().placeholder;
}
