import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.company} — the company that presents Hector Mathabe.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            About
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.company}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            A focused company face for legal, operations, and trust — presenting{" "}
            {site.principal}.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad max-w-3xl">
          <div className="prose prose-navy mx-auto space-y-6 text-base leading-relaxed text-navy/80">
            <p>
              <strong className="font-semibold text-navy">{site.company}</strong>{" "}
              is the registered home for Hector Mathabe&apos;s professional
              work. We handle bookings coordination, client trust, and the
              operational side of delivering outstanding events.
            </p>
            <p>
              {site.relationshipLine} His personal brand site is where you book
              talks, MC / programme directing, and facilitation — and where you
              learn more about his journey and approach.
            </p>
            <p>
              This site stays intentionally thin: company identity, clear
              contact paths, and a single doorway to book Hector. No speaker
              roster sprawl, no competing brochure.
            </p>
            <dl className="mt-8 grid gap-4 rounded-2xl border border-navy/10 bg-slate-50 p-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-navy">Company registration</dt>
                <dd className="mt-1 text-navy/70">{site.companyReg}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Bookings</dt>
                <dd className="mt-1">
                  <a
                    href={site.emailHref}
                    className="break-all text-navy/70 hover:text-navy"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Phone</dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className="text-navy/70 hover:text-navy">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy">Principal</dt>
                <dd className="mt-1 text-navy/70">
                  {site.principal} ({site.principalAlsoKnownAs})
                </dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href={site.mathabe.about} className="btn-navy">
                Hector&apos;s About page
              </a>
              <Link href="/contact" className="btn-primary">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
