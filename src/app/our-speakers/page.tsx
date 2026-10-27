import type { Metadata } from "next";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import SpeakersGrid from "@/components/SpeakersGrid";
import { bookSpeakerHref } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Motivational Speakers | SCAMP Graduates | The Motivation Company",
  description:
    "Meet SCAMP-trained motivational speakers from The Motivation Company. Book a speaker for your conference, school or corporate event in South Africa.",
  path: "/our-speakers",
});

export default function OurSpeakersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Our Speakers", "/our-speakers")} />
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
