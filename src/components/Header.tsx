"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { bookSpeakerHref, images, nav, site, type NavItem } from "@/lib/site";

function NavLink({
  item,
  onNavigate,
  className,
}: {
  item: NavItem;
  onNavigate?: () => void;
  className: string;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} onClick={onNavigate} className={className}>
      {item.label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/15 bg-white text-navy shadow-sm">
      <div className="container-narrow flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          {/* Logo as-is on white chrome — no plate/chip; old-site tmc-logo.webp */}
          <span className="relative block h-9 w-[160px] shrink-0 sm:h-10 sm:w-[190px]">
            <Image
              src={images.logo}
              alt={site.company}
              fill
              sizes="190px"
              className="object-contain object-left"
              priority
            />
          </span>
          <span className="hidden flex-col leading-tight border-l border-navy/20 pl-3 sm:flex">
            <span className="text-[10px] uppercase tracking-[0.15em] text-navy/55">
              Presents
            </span>
            <span className="text-xs font-medium text-gold">{site.principal}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = !item.external && pathname === item.href;
            return (
              <NavLink
                key={item.href + item.label}
                item={item}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-gold text-navy"
                    : "text-navy/70 hover:bg-gold/20 hover:text-navy"
                }`}
              />
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={bookSpeakerHref}
            className="btn-primary hidden sm:inline-flex !py-2 !text-xs"
          >
            Book a Speaker
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            {open ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-navy/10 bg-white px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => {
              const active = !item.external && pathname === item.href;
              return (
                <li key={item.href + item.label}>
                  <NavLink
                    item={item}
                    onNavigate={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-sm font-medium ${
                      active
                        ? "bg-gold text-navy"
                        : "text-navy hover:bg-gold/15"
                    }`}
                  />
                </li>
              );
            })}
            <li>
              <Link
                href={bookSpeakerHref}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-gold px-3 py-3 text-center text-sm font-semibold text-navy"
              >
                Book a Speaker
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
