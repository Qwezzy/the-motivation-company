import type { Metadata } from "next";
import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import { images, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Event gallery from ${site.company} — stage and audience moments.`,
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Gallery
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            In the room
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Stage and audience moments from {site.company} engagements —
            images carried forward from the legacy site.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-xl border border-navy/10 bg-navy/5 shadow-sm ${
                  i === 0 || i === 2 || i === 5
                    ? "aspect-[16/9] sm:col-span-1"
                    : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${site.company} event gallery ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
