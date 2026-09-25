import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import SpeakersGrid from "@/components/SpeakersGrid";
import { bookSpeakerHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Speakers",
  description: `Our Speakers — SCAMP graduate speakers and roster preview from ${site.company}.`,
};

export default function OurSpeakersPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Our Speakers
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            SCAMP Graduates
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            A preview of voices from our motivation training hub. Hector
            Mathabe is Principal — book a speaker from the roster for your
            brief.
          </p>
          <Link href={bookSpeakerHref} className="btn-primary mt-8 inline-flex">
            Book a Speaker
          </Link>
        </div>
      </section>

      <SpeakersGrid hideIntro />
      <CtaBanner />
    </>
  );
}
