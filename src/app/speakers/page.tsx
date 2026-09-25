import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";
import SpeakersGrid from "@/components/SpeakersGrid";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Speakers",
  description: `SCAMP graduate speakers preview — ${site.company} soft landing mock.`,
};

export default function SpeakersPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Speakers
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            SCAMP Graduates
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            A four-card mock of SCAMP graduate speakers for soft-landing review.
            Not a full roster — preview only.
          </p>
        </div>
      </section>

      <SpeakersGrid hideIntro />
      <CtaBanner />
    </>
  );
}
