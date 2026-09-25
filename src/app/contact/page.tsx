import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Speaker",
  description: `Book a speaker with ${site.company} — enquiry for keynotes, MC, facilitation, and training.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-narrow section-pad !py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Book a Speaker
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Tell us about your event or training brief — we match the right
            speaker from our roster. Hector Mathabe remains Principal and
            featured; enquiries go through the company.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-narrow section-pad">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gold/40 bg-navy p-8 text-white shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Primary
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Book a Speaker</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Email bookings with your date, audience, and preferred format
                (keynote, MC, facilitation, or training). We will respond with
                availability and the best-fit speaker.
              </p>
              <a href={site.emailHref} className="btn-primary mt-6">
                Email {site.email}
              </a>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-slate-50 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
                Direct
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-navy">
                Company contact
              </h2>
              <ul className="mt-6 space-y-4 text-sm text-navy/80">
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-navy/50">
                    Email
                  </span>
                  <a
                    href={site.emailHref}
                    className="mt-1 break-all font-medium text-navy hover:underline"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-navy/50">
                    Phone
                  </span>
                  <a
                    href={site.phoneHref}
                    className="mt-1 font-medium text-navy hover:underline"
                  >
                    {site.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-navy/50">
                    Company reg
                  </span>
                  <span className="mt-1 block font-medium text-navy">
                    {site.companyReg}
                  </span>
                </li>
              </ul>
              <Link href="/our-speakers" className="btn-navy mt-8">
                Browse Our Speakers
              </Link>
              <p className="mt-6 text-sm text-navy/60">
                Looking for Hector specifically?{" "}
                <a
                  href={site.mathabe.home}
                  className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                >
                  Meet Hector Mathabe
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
