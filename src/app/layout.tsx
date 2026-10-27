import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site, teamBuildingNav } from "@/lib/site";
import { teamBuildingEnabled } from "@/lib/brochureGate";
import { OG_IMAGE, SITE_URL, siteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Motivation Company | Motivational Speakers South Africa",
    template: `%s | ${site.company}`,
  },
  description:
    "Book motivational speakers, MCs and team building facilitators in South Africa. Keynotes, programme directors and training. Principal: Hector Mathabe.",
  applicationName: site.company,
  authors: [{ name: site.company, url: `${SITE_URL}/` }],
  creator: site.company,
  publisher: site.company,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
  openGraph: {
    title: site.company,
    description: site.tagline,
    siteName: site.company,
    locale: "en_ZA",
    type: "website",
    url: `${SITE_URL}/`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: site.company,
    description: site.tagline,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const extraNav = teamBuildingEnabled() ? [teamBuildingNav] : [];
  return (
    <html lang="en-ZA" className={inter.variable}>
      <body
        className={`${inter.className} flex min-h-screen flex-col font-sans`}
      >
        <JsonLd data={siteJsonLd()} />
        <Header extraNav={extraNav} />
        <main className="flex-1">{children}</main>
        <Footer extraNav={extraNav} />
      </body>
    </html>
  );
}
