import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site, teamBuildingNav } from "@/lib/site";
import { teamBuildingEnabled } from "@/lib/brochureGate";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.themotivationcompany.co.za"),
  title: {
    default: `${site.company} | Motivation Hub`,
    template: `%s | ${site.company}`,
  },
  description:
    "The Motivation Company — Ultimate Motivation Hub in South Africa and Beyond. Book a speaker for keynotes, MC, facilitation, and training. Hector Mathabe is Principal.",
  openGraph: {
    title: site.company,
    description: site.tagline,
    siteName: site.company,
    locale: "en_ZA",
    type: "website",
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
        <Header extraNav={extraNav} />
        <main className="flex-1">{children}</main>
        <Footer extraNav={extraNav} />
      </body>
    </html>
  );
}
