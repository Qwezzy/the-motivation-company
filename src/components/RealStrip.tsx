import { site } from "@/lib/site";

export default function RealStrip() {
  return (
    <section className="bg-gold">
      <div className="container-narrow section-pad !py-12">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-navy/70">
            The R.E.A.L. difference
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-navy sm:text-3xl">
            Results · Entertainment · Authenticity · Listening
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.real.map((item) => (
            <div
              key={item.letter}
              className="rounded-2xl bg-navy p-6 text-white shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-xl font-bold text-navy">
                {item.letter}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gold">
                {item.word}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {item.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
