import Link from "next/link";
import { bookSpeakerHref, nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-narrow section-pad !py-8 sm:!py-10">
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          <div>
            <p className="text-lg font-semibold text-gold">{site.company}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-white/80">
              {site.relationshipLine}
            </p>
            <p className="mt-2 text-xs italic text-gold/90">{site.tagline}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
              Explore
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
              {nav.map((item) => (
                <li key={item.href + item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs leading-snug text-white/80 hover:text-gold"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-xs leading-snug text-white/80 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href={bookSpeakerHref}
                  className="text-xs leading-snug text-white/80 hover:text-gold"
                >
                  Book a Speaker
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
              Contact
            </p>
            <ul className="mt-2 space-y-1 text-xs text-white/80">
              <li>
                <a href={site.phoneHref} className="hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="break-all hover:text-gold"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-4 text-center text-[11px] text-white/50">
          <p>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <p className="mt-1.5">
            Company reg {site.companyReg} · {site.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
