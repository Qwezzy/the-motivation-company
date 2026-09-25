import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import { bookSpeakerHref, images, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.company} — the Ultimate Motivation Hub in South Africa and Beyond.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            About
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.company}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Vision: {site.vision}. A company face for legal, operations, and
            trust — presenting a roster of speakers with {site.principal} as
            Principal.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="mx-auto grid max-w-4xl items-start gap-10 md:grid-cols-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl border-2 border-gold/40 bg-navy/5 shadow-xl md:col-span-2 md:mx-0">
              <Image
                src={images.principal}
                alt={`${site.principal} — Principal of ${site.company}`}
                fill
                sizes="320px"
                className="object-cover object-top"
              />
            </div>
            <div className="prose prose-navy space-y-6 text-base leading-relaxed text-navy/80 md:col-span-3">
              <p>
                <strong className="font-semibold text-navy">{site.company}</strong>{" "}
                is the registered home for motivation training and speaker
                delivery. We handle bookings coordination, client trust, and the
                operational side of delivering outstanding events across Energy,
                Synergy, and Strategy.
              </p>
              <p>
                {site.relationshipLine} Hector remains Principal and featured —
                his personal brand site is a secondary doorway to meet him; hub
                bookings and roster matching happen here.
              </p>
              <p>
                This soft landing keeps company identity, clear contact paths,
                and a doorway to book a speaker from our roster — including
                SCAMP graduates and specialist facilitators.
              </p>
              <dl className="mt-8 grid gap-4 rounded-2xl border border-navy/10 bg-slate-50 p-6 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-navy">Company registration</dt>
                  <dd className="mt-1 text-navy/70">{site.companyReg}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy">Bookings</dt>
                  <dd className="mt-1">
                    <a
                      href={site.emailHref}
                      className="break-all text-navy/70 hover:text-navy"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy">Phone</dt>
                  <dd className="mt-1">
                    <a href={site.phoneHref} className="text-navy/70 hover:text-navy">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy">Principal</dt>
                  <dd className="mt-1 text-navy/70">
                    {site.principal} ({site.principalAlsoKnownAs})
                  </dd>
                </div>
              </dl>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={bookSpeakerHref} className="btn-primary">
                  Book a Speaker
                </Link>
                <a href={site.mathabe.home} className="btn-navy">
                  Meet Hector Mathabe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
