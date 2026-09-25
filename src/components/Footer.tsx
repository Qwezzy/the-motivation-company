import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-narrow section-pad !py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold text-gold">{site.company}</p>
            <p className="mt-2 text-sm text-white/80">{site.relationshipLine}</p>
            <p className="mt-3 text-sm italic text-gold/90">{site.tagline}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Explore
            </p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href + item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/80 hover:text-gold"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-white/80 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={site.mathabe.book}
                  className="text-sm text-white/80 hover:text-gold"
                >
                  Book Hector
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
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
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <p className="mt-2">
            Company reg {site.companyReg} · {site.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
