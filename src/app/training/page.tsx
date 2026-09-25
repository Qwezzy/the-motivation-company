import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { bookSpeakerHref, images, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Training",
  description: `Effective Public Speaking Course modules with ${site.company} — confidence, voice, body language, slides, structure, and presentation secrets.`,
};

const stripAlts = [
  "The Motivation Company Training Class",
  "The Motivation Company Presentation",
  "The Motivation Company Effective Public Speaking Course",
] as const;

export default function TrainingPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Training
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Effective Public Speaking Course
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Seven practical modules that build confidence and clarity — from how
            you show up to how you structure and deliver a message that lands.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              Course modules
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-navy sm:text-3xl">
              What delegates work through
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy/70">
              Soft-landing overview of the Effective Public Speaking Course.
              Programme detail is confirmed per brief — enquire to book a cohort
              or tailor modules for your team.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.trainingModules.map((mod, i) => (
              <article
                key={mod.title}
                className="flex flex-col rounded-2xl border border-navy/10 bg-slate-50 p-6 shadow-sm transition hover:border-gold hover:shadow-md"
              >
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-navy">
                  {mod.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">
                  {mod.blurb}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href={bookSpeakerHref} className="btn-primary">
              Book a Speaker
            </Link>
            <a href={site.emailHref} className="btn-navy">
              Email {site.email}
            </a>
          </div>
        </div>
      </section>

      {/* Bottom strip — same old-site assets as motivation_company-training.php */}
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
              Moments from {site.company} training rooms and presentation
              sessions.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {images.trainingStrip.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[314/130] overflow-hidden rounded-xl border border-navy/10 bg-navy/5 shadow-sm"
              >
                <Image
                  src={src}
                  alt={stripAlts[i] ?? `${site.company} training ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to train your team?"
        blurb="Enquire about the Effective Public Speaking Course or related modules — we tailor cohorts to your brief."
      />
    </>
  );
}
