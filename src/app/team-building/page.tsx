import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CtaBanner from "@/components/CtaBanner";
import TeamBuildingForm from "@/components/TeamBuildingForm";
import { brochureIsPlaceholder, teamBuildingEnabled } from "@/lib/brochureGate";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team Building Brochure",
  description: `Answer a few questions and ${site.company} will email you our Motivational Team Building brochure.`,
};

const sections = [
  "Pre workshop and team building assessment",
  "Team building structure: introductions, buy in, issues from the brief",
  "Workshop content: vision, mission and values, Tuckman's team development model, diversity, dealing with conflict",
  "Team motivation: the SHARP Teamplementation presentation and personal motivation",
  "Methodology: a holistic and practical approach, with adventure based learning",
  "Tools, adventure based activities, outcomes and a team tool kit",
];

const photos = [
  { src: "/images/team-building/cover-circle.webp", alt: "A team standing in a large circle during an outdoor team building session" },
  { src: "/images/team-building/pipe-relay-close.webp", alt: "Team members working together on a pipe relay problem-solving activity" },
  { src: "/images/team-building/indoor-workshop.webp", alt: "Delegates seated at a team building workshop in a conference room" },
];

export default function TeamBuildingPage() {
  if (!teamBuildingEnabled()) notFound();
  const draft = brochureIsPlaceholder();

  return (
    <>
      {draft ? (
        <div className="bg-gold px-4 py-2 text-center text-xs font-semibold text-navy">
          Development preview: the brochure still has placeholder photos and is not live.
        </div>
      ) : null}
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Team Building
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Our team building approach
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            We offer a high impact and dynamic Team Building programme that is
            results driven. Our way of Team Building focuses on Motivation,
            Increased Trust, Effective Communication, Accountability and meeting
            of responsibilities.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad !pb-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-navy/10 bg-slate-50 p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                What you will receive
              </span>
              <h2 className="mt-3 text-xl font-semibold text-navy">
                The Motivational Team Building brochure
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                Answer the short questionnaire below and we will email you our
                brochure as a PDF, with a summary of your answers. Our team
                will then reply to your enquiry.
              </p>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-slate-50 p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Inside the brochure
              </span>
              <ul className="mt-3 space-y-1.5 text-sm text-navy/70">
                {sections.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {photos.map((p) => (
              <div key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-navy/10">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 360px, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white" id="questionnaire">
        <div className="container-narrow px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <TeamBuildingForm />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
