import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import GalleryStrip from "@/components/GalleryStrip";
import SpeakersGrid from "@/components/SpeakersGrid";
import RealStrip from "@/components/RealStrip";
import { bookSpeakerHref, images, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        </div>
        <div className="container-narrow relative section-pad">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Motivation training hub
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.company}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85 sm:text-xl">
            Vision: {site.vision}.
          </p>
          <p className="mt-3 max-w-2xl text-base text-white/70">
            {site.relationshipLine} Book a speaker for keynotes, MC,
            facilitation, or training — we match the right voice to your brief.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={bookSpeakerHref} className="btn-primary">
              Book a Speaker
            </Link>
            <Link href="/our-speakers" className="btn-secondary">
              Our Speakers
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl border-2 border-gold/40 bg-navy/5 shadow-xl">
              <Image
                src={images.principal}
                alt={`${site.principal} — Principal for ${site.company}`}
                fill
                sizes="320px"
                className="object-cover object-top"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
                Principal
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-navy">
                {site.principal}
              </h2>
              <p className="mt-1 text-sm font-medium text-gold-dark">
                Also known as {site.principalAlsoKnownAs}
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy/75">
                Motivational speaker, MC, and facilitator — featured Principal of{" "}
                {site.company}. The hub presents Hector alongside a growing
                roster of SCAMP graduates and specialist facilitators for
                organisations that need a trusted partner for elevated events.
              </p>
              <a
                href={site.mathabe.home}
                className="mt-6 inline-flex text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-navy-light"
              >
                Meet Hector Mathabe →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container-narrow section-pad">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              What we offer
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-navy">
              Energy · Synergy · Strategy
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-navy/65">
              Motivational talks, teambuilding, strategy facilitation, MC,
              presentation coaching, customer service, and youth life skills —
              delivered through our speaker roster.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {site.offers.map((offer) => (
              <Link
                key={offer.label}
                href={offer.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:border-gold hover:shadow-md"
              >
                <div className="relative aspect-[4/5] w-full bg-navy/5">
                  <Image
                    src={images[offer.imageKey]}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {offer.label}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-navy group-hover:text-navy-light">
                    {offer.title}
                  </h3>
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
        </div>
      </section>

      <SpeakersGrid compact />
      <GalleryStrip />
      <RealStrip />
      <CtaBanner />
    </>
  );
}
