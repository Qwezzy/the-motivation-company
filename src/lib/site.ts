const mathabeBase =
  process.env.NEXT_PUBLIC_MATHABE_SITE_URL?.replace(/\/$/, "") ||
  "https://hector-motivator.vercel.app";

/**
 * Soft-landing image slots → public paths.
 * Default source: themotivationcompany.co.za/images/ (old-site gallery).
 * EXCEPTION — principal: approved Hector Mathabe face from hector-motivator
 * (DSC_6860 → public/images/hector-hero-a.webp). Do NOT use old gallery 08
 * (wrong person). Other slots stay old-site only.
 */
export const images = {
  logo: "/images/tmc-logo.webp", // old: logo.jpg
  hero: "/images/tmc-hero-top.webp", // old: top-image.jpg
  principal: "/images/tmc-principal.webp", // hector-motivator hector-hero-a.webp (DSC_6860)
  speak: "/images/tmc-speak.webp", // old: gallery/large/04.jpg (4:5 crop)
  host: "/images/tmc-host.webp", // old: gallery/large/09.jpg
  facilitate: "/images/tmc-facilitate.webp", // old: gallery/large/07.jpg
  gallery: [
    "/images/tmc-gallery-01.webp",
    "/images/tmc-gallery-02.webp",
    "/images/tmc-gallery-03.webp",
    "/images/tmc-gallery-04.webp",
    "/images/tmc-gallery-05.webp",
    "/images/tmc-gallery-06.webp",
    "/images/tmc-gallery-07.webp",
    "/images/tmc-gallery-08.webp",
    "/images/tmc-gallery-09.webp",
    "/images/tmc-gallery-10.webp",
  ],
} as const;

/**
 * Speakers mock (4-card SCAMP graduate grid).
 * Press/org portraits = mock only; commercial use needs permission.
 * Attribution lives in PR description — do not claim image rights.
 */
export const speakers = [
  {
    name: "Masingita Masunga",
    role: "SCAMP graduate",
    image: "/images/speakers/masingita-masunga.webp",
    attribution: "Flow Communications",
  },
  {
    name: "Demore Pretorius",
    role: "SCAMP graduate",
    image: "/images/speakers/demore-pretorius.webp",
    attribution: "National Citizen",
  },
  {
    name: "Ndumi Hadebe",
    role: "SCAMP graduate",
    image: "/images/speakers/ndumi-hadebe.webp",
    attribution: "Moonstone",
  },
  {
    name: 'Metsantika Seopela ("Santi")',
    role: "SCAMP graduate",
    image: "/images/speakers/metsantika-seopela.webp",
    attribution: "DPSA The Public Servant",
  },
] as const;

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

/** Old-site IA order for SEO soft landing. About/Contact remain as deep links. */
export const profilePdf = "/pdf/TMCCompanyProfile-2014.pdf";

export type NavItem = {
  href: string;
  label: string;
  /** Open in new tab (PDF / external) */
  external?: boolean;
};

export const nav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/our-speakers", label: "Our Speakers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/training", label: "Training" },
  {
    href: profilePdf,
    label: "Download our Profile",
    external: true,
  },
] as const;
