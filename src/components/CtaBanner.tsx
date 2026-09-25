import Link from "next/link";
import { bookSpeakerHref, site } from "@/lib/site";

type Props = {
  title?: string;
  blurb?: string;
};

export default function CtaBanner({
  title = "Ready to book a speaker?",
  blurb = "Enquiry for keynotes, MC, facilitation, or training — we match the right voice from our roster to your brief.",
}: Props) {
  return (
    <section className="bg-navy text-white">
      <div className="container-narrow section-pad !py-14">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-gold/30 bg-navy-dark/60 p-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Bookings
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
            <p className="mt-3 max-w-xl text-sm text-white/75">{blurb}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
              <a href={site.phoneHref} className="hover:text-gold">
                {site.phone}
              </a>
              <a href={site.emailHref} className="break-all hover:text-gold">
                {site.email}
              </a>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <Link href={bookSpeakerHref} className="btn-primary">
              Book a Speaker
            </Link>
            <a href={site.emailHref} className="btn-secondary">
              Email bookings
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
