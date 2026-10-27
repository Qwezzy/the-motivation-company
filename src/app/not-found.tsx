import type { Metadata } from "next";
import Link from "next/link";
import { bookSpeakerHref } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Page not found | The Motivation Company" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-narrow section-pad text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-navy">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-navy/70">
          The page you were looking for has moved or no longer exists.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-navy">Home</Link>
          <Link href="/our-speakers" className="btn-navy">Our Speakers</Link>
          <Link href="/services" className="btn-navy">Services</Link>
          <Link href={bookSpeakerHref} className="btn-primary">Book a Speaker</Link>
        </div>
      </div>
    </section>
  );
}
