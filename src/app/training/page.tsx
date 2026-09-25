import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { profilePdf, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Training",
  description: `Training with ${site.company} — soft-landing overview. Full detail via company profile and bookings.`,
};

export default function TrainingPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Training
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Capability that travels with the stage
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {site.company} supports organisations that want more than a single
            keynote — structured development alongside speak, host, and
            facilitate work.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="mx-auto max-w-2xl space-y-6 text-base leading-relaxed text-navy/80">
            <p>
              This page is a soft landing for the legacy Training path. Programme
              detail evolves with client briefs — we keep this surface thin so
              nothing here over-promises on programmes still being confirmed with
              Hector and the team.
            </p>
            <p>
              For the company overview and historical context, download our
              profile. To discuss a training or workshop need, book Hector or
              email bookings directly.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={profilePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download our Profile
              </a>
              <a href={site.mathabe.book} className="btn-navy">
                Book Hector
              </a>
              <Link href="/contact" className="btn-secondary !text-navy !border-navy">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
