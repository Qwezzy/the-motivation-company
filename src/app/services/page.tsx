import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { bookSpeakerHref, images, site } from "@/lib/site";

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
          <div className="grid gap-6 md:grid-cols-3">
            {site.offers.map((offer) => (
              <Link
                key={offer.label}
                href={offer.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-slate-50 transition hover:border-gold hover:bg-white hover:shadow-md"
              >
                <div className="relative aspect-[4/5] w-full bg-navy/5">
                  <Image
                    src={images[offer.imageKey]}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {offer.label}
                  </span>
                  <h2 className="mt-3 text-xl font-semibold text-navy">
                    {offer.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">
                    {offer.blurb}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-navy">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <ul className="mx-auto mt-12 max-w-2xl space-y-2 text-sm text-navy/70">
            <li>
              <strong className="text-navy">Also available:</strong> Motivational
              programme director / MC · Presentation skills coaching · Customer
              service consulting · Youth life skills programme
            </li>
          </ul>
          <p className="mt-10 text-center text-sm text-navy/60">
            Prefer the short path?{" "}
            <Link
              href={bookSpeakerHref}
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              Book a Speaker
            </Link>{" "}
            or{" "}
            <Link
              href="/our-speakers"
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              browse Our Speakers
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
