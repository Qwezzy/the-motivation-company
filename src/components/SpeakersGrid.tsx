import Image from "next/image";
import { speakers } from "@/lib/site";

type SpeakersGridProps = {
  /** Compact home teaser vs full page section */
  compact?: boolean;
  /** When parent page already has a hero title */
  hideIntro?: boolean;
};

export default function SpeakersGrid({
  compact = false,
  hideIntro = false,
}: SpeakersGridProps) {
  return (
    <section className={compact ? "bg-white" : "bg-slate-50"}>
      <div
        className={`container-narrow section-pad ${compact ? "!py-14" : ""}`}
      >
        {!hideIntro && (
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              Speakers
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-navy">
              SCAMP Graduates
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-navy/65">
              A preview of voices shaped through SCAMP — mock layout for soft
              landing review only.
            </p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <article
              key={speaker.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition hover:border-gold hover:shadow-md"
            >
              <div className="relative aspect-[3/4] w-full bg-navy/5">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/50 to-transparent"
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col border-t-4 border-gold p-5">
                <h3 className="text-lg font-semibold leading-snug text-navy">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold-dark">
                  {speaker.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
