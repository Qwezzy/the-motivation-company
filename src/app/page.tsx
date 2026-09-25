import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { bookSpeakerHref, images, profilePdf, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — hub positioning */}
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
            Vision: to be the {site.vision}.
          </p>
          <p className="mt-3 max-w-2xl text-base text-white/70">
            {site.relationshipLine} We answer who we are, what we do, and how we
            serve — then match the right speaker to your brief.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={bookSpeakerHref} className="btn-primary">
              Book a Speaker
            </Link>
            <a
              href={profilePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download our Profile
            </a>
          </div>
        </div>
      </section>

      {/* 2. Who we are — Vision, Mission, values */}
      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              Who we are
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-navy">
              Vision &amp; Mission
            </h2>
            <p className="mt-4 text-lg font-medium text-navy">
              To be the {site.vision}.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy/75">
              {site.mission}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy/65">
              We believe a conscious journey of personal growth is the foundation
              for great leadership — and that motivation keeps people on track.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.values.map((value) => (
              <div
                key={value.name}
                className="rounded-2xl border border-navy/10 bg-slate-50 p-6"
              >
                <h3 className="text-base font-semibold text-navy">
                  {value.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  {value.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Principal — featured, not the only story */}
      <section className="bg-slate-50">
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
                {site.company}. Hector anchors the hub alongside a roster of
                speakers and facilitators for organisations that need a trusted
                partner for elevated events.
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

      {/* 4. What we do / Services — profile Service Model */}
      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              What we do
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-navy">
              Energy · Synergy · Strategy
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-navy/65">
              Pre-presentation analysis of your dynamics and needs — so we do not
              only impress, we impact. Services from the company profile:
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {site.serviceModel.map((pillar) => (
              <article
                key={pillar.label}
                className="flex flex-col rounded-2xl border border-navy/10 bg-slate-50 p-6 shadow-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {pillar.label}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-navy">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">
                  {pillar.blurb}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pillar.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy/80 ring-1 ring-navy/10"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-center text-lg font-semibold text-navy">
              Also available
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {site.otherServices.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-navy/10 bg-white p-5"
                >
                  <h4 className="text-sm font-semibold text-navy">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {item.blurb}
                  </p>
                </div>
              ))}
            </div>
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

      {/* 5. Proof strip — curated only; NOT Gallery */}
      <section className="bg-slate-50">
        <div className="container-narrow section-pad !py-14">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              In the room
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-navy sm:text-3xl">
              Training · stage · audience
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-navy/65">
              A few moments from engagements — speakers on stage, rooms in
              session, audiences leaning in.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.proof.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-xl border border-navy/10 bg-navy/5 shadow-sm ${
                  i === 0 || i === 3
                    ? "aspect-[16/10] sm:col-span-1"
                    : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${site.company} in the room ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Book a Speaker CTA */}
      <CtaBanner />
    </>
  );
}
