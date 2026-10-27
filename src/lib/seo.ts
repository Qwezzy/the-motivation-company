import type { Metadata } from "next";
import { images, site, upcomingEvents } from "@/lib/site";

/** Canonical origin: apex + HTTPS (www and http 301 to this in .htaccess). */
export const SITE_URL = "https://themotivationcompany.co.za";
export const OG_IMAGE = {
  url: "/images/og/tmc-og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.company}: motivational speakers, MCs and facilitators in South Africa`,
};

/** Absolute URL with trailing slash for directory paths. */
export function absUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = /\.[a-z0-9]+$/i.test(p) || p.endsWith("/") ? p : `${p}/`;
  return `${SITE_URL}${withSlash}`;
}

type PageMetaInput = {
  /** Full <title> (no template applied). */
  title: string;
  description: string;
  path: string;
};

/** Per-page metadata: unique title/description, canonical, OG + Twitter. */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  const url = absUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.company,
      locale: "en_ZA",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#hector-mathabe`;

/** Site-wide JSON-LD. Facts only from site.ts (no address: none on the site). */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.company,
        alternateName: "TMC",
        url: `${SITE_URL}/`,
        logo: absUrl(images.logo),
        image: absUrl(OG_IMAGE.url),
        slogan: site.tagline,
        description: `${site.relationshipLine} Motivational talks, team building, strategic planning facilitation, MC / programme director services and the Effective Public Speaking Course.`,
        email: site.email,
        telephone: "+27820609888",
        identifier: {
          "@type": "PropertyValue",
          propertyID: "CIPC company registration number",
          value: site.companyReg,
        },
        areaServed: { "@type": "Country", name: "South Africa" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "bookings",
          email: site.email,
          telephone: "+27820609888",
          areaServed: "ZA",
          availableLanguage: "en",
        },
        knowsAbout: [
          "Motivational speaking",
          "Team building",
          "Strategic planning facilitation",
          "Master of Ceremonies",
          "Programme director",
          "Customer service training",
          "Public speaking training",
        ],
        employee: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.principal,
        alternateName: site.principalAlsoKnownAs,
        jobTitle: "Principal",
        description:
          "Motivational speaker, MC, and facilitator; Principal of The Motivation Company.",
        image: absUrl(images.principal),
        worksFor: { "@id": ORG_ID },
        url: site.mathabe.home,
        sameAs: [site.mathabe.home, "https://www.tiktok.com/@HectorMotivator"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: site.company,
        inLanguage: "en-ZA",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** BreadcrumbList for inner pages. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: absUrl(path) },
    ],
  };
}

/** Event JSON-LD for dated, not-yet-past hub events (evaluated at build time). */
export function eventsJsonLd() {
  const today = new Date().toISOString().slice(0, 10);
  const items = upcomingEvents
    .filter((e) => e.dateISO && !e.tbc && e.dateISO >= today)
    .map((e) => ({
      "@type": "Event",
      name: e.title,
      description: e.blurb,
      startDate: e.dateISO,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: { "@type": "VirtualLocation", url: e.url },
      image: e.image ? absUrl(e.image) : absUrl(OG_IMAGE.url),
      organizer: { "@id": ORG_ID },
      performer: { "@id": PERSON_ID },
    }));
  if (!items.length) return null;
  return { "@context": "https://schema.org", "@graph": items };
}

/** Course JSON-LD for the Training page. */
export function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Effective Public Speaking Course",
    description:
      "Seven practical modules that build confidence and clarity — from how you show up to how you structure and deliver a message that lands.",
    url: absUrl("/training"),
    inLanguage: "en-ZA",
    provider: { "@id": ORG_ID, "@type": "Organization", name: site.company, url: `${SITE_URL}/` },
  };
}
