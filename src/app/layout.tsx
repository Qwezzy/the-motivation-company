import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.themotivationcompany.co.za"),
  title: {
    default: `${site.company} | Soft landing`,
    template: `%s | ${site.company}`,
  },
  description:
    "The Motivation Company delivers and presents Hector Mathabe (Hector Motivator) — motivational speaking, MC, and facilitation. Company face for legal, ops, and trust.",
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
  return (
    <html lang="en-ZA" className={inter.variable}>
      <body
        className={`${inter.className} flex min-h-screen flex-col font-sans`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
