import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NavbarNew } from "@/components/navbar-new";
import { Footer } from "@/components/footer";
import { SanityLive } from "@/sanity/lib/live";
import { Analytics } from "@vercel/analytics/react"
import { GoogleTagManager } from '@next/third-parties/google'
import Script from "next/script";

export const revalidate = 86400

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adeptia AI Data Exchange Platform",
  description: "Adeptia AI Data Exchange Platform",
  alternates: {
    canonical: 'https://www.adeptia.com'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TGBWNG" />
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e1747c23-c3f4-44ac-a465-b4e247a565be"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TGBWNG" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <NavbarNew />
        {children}
        <SanityLive />
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
