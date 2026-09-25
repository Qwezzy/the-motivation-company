const mathabeBase =
  process.env.NEXT_PUBLIC_MATHABE_SITE_URL?.replace(/\/$/, "") ||
  "https://hector-motivator.vercel.app";

/** Soft-landing image slots → public paths (image pass). */
export const images = {
  logo: "/images/tmc-logo.webp",
  hero: "/images/tmc-hero-top.webp",
  principal: "/images/hector-about.webp",
  speak: "/images/hector-speak.webp",
  host: "/images/hector-mc.webp",
  facilitate: "/images/hector-facilitate.webp",
  bookVisual: "/images/hector-book.webp",
  clients: "/images/hector-clients.webp",
  gallery: [
    "/images/tmc-gallery-01.webp",
    "/images/tmc-gallery-02.webp",
    "/images/tmc-gallery-03.webp",
    "/images/tmc-gallery-04.webp",
    "/images/tmc-gallery-05.webp",
    "/images/tmc-gallery-06.webp",
    "/images/tmc-gallery-07.webp",
    "/images/tmc-gallery-09.webp",
    "/images/tmc-gallery-10.webp",
  ],
} as const;

export const site = {
  company: "The Motivation Company",
  companyReg: "2013/049231/07",
  tagline: "Elevating Events. Inspiring Audiences.",
  principal: "Hector Mathabe",
  principalAlsoKnownAs: "Hector Motivator",
  relationshipLine:
    "We deliver and present Hector Mathabe — also known as Hector Motivator.",
  phone: "082 060 9888",
  phoneHref: "tel:+27820609888",
  email: "bookings@themotivationcompany.co.za",
  emailHref: "mailto:bookings@themotivationcompany.co.za",
  website: "www.themotivationcompany.co.za",
  mathabeBase,
  mathabe: {
    home: mathabeBase,
    book: `${mathabeBase}/book`,
    about: `${mathabeBase}/about`,
    services: `${mathabeBase}/services`,
    mc: `${mathabeBase}/mc`,
  },
  real: [
    {
      letter: "R",
      word: "Results",
      blurb: "Practical tools that drive measurable impact.",
    },
    {
      letter: "E",
      word: "Entertainment",
      blurb: "Humour and energy that keep audiences engaged.",
    },
    {
      letter: "A",
      word: "Authenticity",
      blurb: "Genuine connection rooted in lived experience.",
    },
    {
      letter: "L",
      word: "Listening",
      blurb: "He reads the room and elevates the message.",
    },
  ] as const,
  offers: [
    {
      label: "Speak",
      title: "Motivational speaking",
      blurb:
        "Keynotes and talks that leave teams aligned, energised, and ready to act.",
      hrefKey: "services" as const,
      imageKey: "speak" as const,
    },
    {
      label: "Host",
      title: "MC & programme directing",
      blurb:
        "Confident stage leadership that keeps your agenda flowing and your brand represented.",
      hrefKey: "mc" as const,
      imageKey: "host" as const,
    },
    {
      label: "Facilitate",
      title: "Facilitation & workshops",
      blurb:
        "Strategy sessions and team experiences grounded in the R.E.A.L. method.",
      hrefKey: "services" as const,
      imageKey: "facilitate" as const,
    },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;
