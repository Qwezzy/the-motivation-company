import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { bookSpeakerHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Energy, Synergy, and Strategy with ${site.company} — motivational speaking, facilitation, MC, and training.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Services
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Energy · Synergy · Strategy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Motivational talks, teambuilding, strategy facilitation, MC,
            presentation coaching, customer service, and youth life skills —
            delivered through our speaker roster.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="grid gap-6 lg:grid-cols-3">
            {site.serviceModel.map((pillar) => (
              <article
                key={pillar.label}
                className="flex flex-col rounded-2xl border border-navy/10 bg-slate-50 p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {pillar.label}
                </span>
                <h2 className="mt-3 text-xl font-semibold text-navy">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">
                  {pillar.blurb}
                </p>
                <ul className="mt-4 space-y-1 text-sm text-navy/70">
                  {pillar.topics.map((topic) => (
                    <li key={topic}>· {topic}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <h3 className="mt-12 text-center text-lg font-semibold text-navy">
            Also available
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.otherServices.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-navy/10 bg-white p-5"
              >
                <h4 className="text-sm font-semibold text-navy">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {item.blurb}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-navy/60">
            Prefer the short path?{" "}
            <Link
              href={bookSpeakerHref}
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              Book a Speaker
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
