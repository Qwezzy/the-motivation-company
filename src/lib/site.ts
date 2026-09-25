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
  /** Home proof strip only — curated stage/event shots; not a gallery tease. Skip 08 (wrong person). */
  proof: [
    "/images/tmc-speak.webp",
    "/images/tmc-host.webp",
    "/images/tmc-facilitate.webp",
    "/images/tmc-gallery-01.webp",
    "/images/tmc-gallery-03.webp",
    "/images/tmc-gallery-07.webp",
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

/** Company profile PDF (Khwezi 2026 refresh — replaces 2014). */
export const profilePdf = "/pdf/TMC-Company-Profile.pdf";

/**
 * Primary Book a Speaker destination — on-site enquiry (not Hector /book).
 * Contact page + mailto remain the booking path for the hub roster.
 */
export const bookSpeakerHref = "/contact";

export type UpcomingEvent = {
  id: string;
  title: string;
  subtitle?: string;
  /** ISO date YYYY-MM-DD for sort; omit or empty when tbc */
  dateISO?: string;
  dateLabel: string;
  time: string;
  platform: string;
  topic?: string;
  withHandle?: string;
  blurb: string;
  tagline?: string;
  /** Flyer path; omit for navy/gold brand-block placeholder (no fake flyer) */
  image?: string;
  /** Live event / watch URL; defaults to TikTok handle if omitted */
  url?: string;
  /** CTA label — default "Watch on TikTok" (swap to TMC TikTok later) */
  ctaLabel?: string;
  /** Date TBD — shows "Date to be announced"; sorts after dated events */
  tbc?: boolean;
};

/** Default watch channel for hub events (Hector for now; swap to TMC TikTok later). */
export const defaultEventTikTok = "https://www.tiktok.com/@HectorMotivator";

/**
 * Upcoming hub events (Home strip). Data-driven — Home lists all current items
 * sorted by date (TBC last). Hector may headline; commercial CTA stays Book a Speaker.
 */
const upcomingEventsRaw: UpcomingEvent[] = [
  {
    id: "teachers-day-2026-tiktok",
    title: "National Teacher's Day & World Teacher's Day 2026",
    subtitle: "INSPIRE · MOTIVATE · EMPOWER",
    dateISO: "2026-10-05",
    dateLabel: "05 October 2026",
    time: "6PM",
    platform: "TikTok",
    topic: "#BeYourBest",
    withHandle: "@HectorMotivator",
    blurb:
      "Today we celebrate the educators who teach, guide, uplift and shape a brighter tomorrow. FREE appreciation motivation for educators and teachers.",
    tagline: "Educators Build Nations",
    image: "/images/events/teachers-day-2026-tiktok.jpg",
    url: defaultEventTikTok,
    ctaLabel: "Watch on TikTok",
  },
  {
    id: "mens-day-conference-2026",
    title: "International Men's Day / National Men's Conference",
    subtitle: "National + International Men's Day",
    dateISO: "2026-11-19",
    dateLabel: "19 November 2026",
    time: "TBA",
    platform: "TikTok",
    topic: "National Men's Conference",
    withHandle: "@HectorMotivator",
    blurb: "Motivation for men — National Men's Conference",
    tagline: "Motivation for men",
    // No flyer — navy/gold brand block in UI
    url: defaultEventTikTok,
    ctaLabel: "Watch on TikTok",
  },
  {
    id: "matric-prelims-motivation-2026",
    title: "Matric prelims motivation",
    subtitle: "Learners · prelims pipeline",
    dateLabel: "Date to be announced",
    time: "TBA",
    platform: "TikTok",
    withHandle: "@HectorMotivator",
    blurb:
      "Planned motivational session for learners writing matric prelims. Date and details to be announced.",
    tagline: "Motivation for matric learners",
    tbc: true,
    url: defaultEventTikTok,
    ctaLabel: "Watch on TikTok",
  },
];

/** Sorted: dated ascending, then TBC. */
export const upcomingEvents: UpcomingEvent[] = [...upcomingEventsRaw].sort(
  (a, b) => {
    if (a.tbc && !b.tbc) return 1;
    if (!a.tbc && b.tbc) return -1;
    if (a.tbc && b.tbc) return a.title.localeCompare(b.title);
    return (a.dateISO || "").localeCompare(b.dateISO || "");
  },
);


export const site = {
  company: "The Motivation Company",
  companyReg: "2013/049231/07",
  tagline: "Elevating Events. Inspiring Audiences.",
  vision: "Ultimate Motivation Hub in South Africa and Beyond",
  mission:
    "Our daily mission is to advocate the importance of continuous motivation and personal development for the purpose of achieving greater results on a personal and business capacity.",
  principal: "Hector Mathabe",
  principalAlsoKnownAs: "Hector Motivator",
  relationshipLine:
    "South Africa's motivation training hub — a roster of speakers and facilitators, with Hector Mathabe as Principal.",
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
  values: [
    {
      name: "Practicality",
      blurb:
        "We empower audiences with practical tools that are simple yet effective.",
    },
    {
      name: "Sustainability",
      blurb:
        "Motivation must be refilled regularly — we build habits that keep the tank full.",
    },
    {
      name: "Measurability",
      blurb:
        "We obsess over measuring the effectiveness of talks, teambuilding, and consulting.",
    },
    {
      name: "Psychologically Sound",
      blurb:
        "Professional psychologists help shape our products and interventions.",
    },
    {
      name: "Spiritually Sound",
      blurb:
        "We recognise spiritual depth as invaluable to high-impact motivation.",
    },
    {
      name: "Smile",
      blurb:
        "Humour and a culture of smiling are held in high regard on every stage.",
    },
  ] as const,
  serviceModel: [
    {
      label: "Energy",
      title: "Motivational Talks",
      blurb:
        "Keynotes and talks tailored through pre-presentation analysis of your dynamics and needs.",
      topics: [
        "Self-discovery",
        "Personal Development",
        "Workplace Relations",
        "Change",
        "Excellence",
        "Teamwork",
      ],
    },
    {
      label: "Synergy",
      title: "Team Building",
      blurb:
        "Situation-specific teambuilding talks or facilitated sessions that strengthen spirit and dynamics.",
      topics: [
        "Personality traits",
        "Team dynamics",
        "Collage exercise for team vision",
        "In-house & outdoor exercises",
        "Team motivation",
      ],
    },
    {
      label: "Strategy",
      title: "Strategic Planning Facilitation",
      blurb:
        "Experienced facilitators who help organisations review or craft strategy with depth.",
      topics: [
        "Comprehensive strategy",
        "Strategic review",
        "Mid-term strategy review",
        "Operational plans",
      ],
    },
  ] as const,
  otherServices: [
    {
      title: "Motivational Programme Director / MC",
      blurb:
        "Speakers who run functions smoothly with a motivational flavour while keeping the occasion vibrant.",
    },
    {
      title: "Presentation Skills Coaching",
      blurb:
        "Group or one-on-one coaching — an essential skill for career advancement.",
    },
    {
      title: "Customer Service Consulting",
      blurb:
        "High-impact customer-service presentations and training that unite teams in service.",
    },
    {
      title: "Youth Life Skills Programme",
      blurb:
        "Positive lifestyle, know your country, career pathing, and related life-skills modules.",
    },
    {
      title: "Employee Appreciation Programme",
      blurb:
        "Appreciation experiences that include massage, meditation, and yoga.",
    },
  ] as const,
  /** Kept for Services page deep links / legacy Real strip if reused. */
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
      blurb: "We read the room and elevate the message.",
    },
  ] as const,
  offers: [
    {
      label: "Energy",
      title: "Motivational speaking",
      blurb:
        "Keynotes and talks on self-discovery, change, excellence, and teamwork that leave audiences ready to act.",
      href: "/services",
      imageKey: "speak" as const,
    },
    {
      label: "Synergy",
      title: "Team building & facilitation",
      blurb:
        "Situation-specific teambuilding talks and facilitated sessions that strengthen dynamics and spirit.",
      href: "/services",
      imageKey: "facilitate" as const,
    },
    {
      label: "Strategy",
      title: "Strategic planning & MC",
      blurb:
        "Strategy facilitation, programme directing, presentation coaching, and customer-service training.",
      href: "/services",
      imageKey: "host" as const,
    },
  ],
} as const;

/** Old-site IA order for SEO soft landing. About/Contact remain as deep links. */
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
