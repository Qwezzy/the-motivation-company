const mathabeBase =
  process.env.NEXT_PUBLIC_MATHABE_SITE_URL?.replace(/\/$/, "") ||
  "https://hectormathabe.com";

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
    },
    {
      label: "Host",
      title: "MC & programme directing",
      blurb:
        "Confident stage leadership that keeps your agenda flowing and your brand represented.",
      hrefKey: "mc" as const,
    },
    {
      label: "Facilitate",
      title: "Facilitation & workshops",
      blurb:
        "Strategy sessions and team experiences grounded in the R.E.A.L. method.",
      hrefKey: "services" as const,
    },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;
