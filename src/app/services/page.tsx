import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { images, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Speak, Host, and Facilitate with ${site.company} — deep links to Hector Mathabe offers.`,
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
            Speak · Host · Facilitate
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Full offer detail lives on the Hector Mathabe site. Use the links
            below to continue there.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="grid gap-6 md:grid-cols-3">
            {site.offers.map((offer) => (
              <a
                key={offer.label}
                href={site.mathabe[offer.hrefKey]}
                className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-slate-50 transition hover:border-gold hover:bg-white hover:shadow-md"
              >
                <div className="relative aspect-[4/5] w-full bg-navy/5">
                  <Image
                    src={images[offer.imageKey]}
                    alt={`${offer.title} — ${site.principal}`}
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
                    Open on Mathabe site →
                  </span>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-navy/60">
            Prefer the short path?{" "}
            <Link
              href="/contact"
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              Contact
            </Link>{" "}
            or{" "}
            <a
              href={site.mathabe.book}
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              Book Hector
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
