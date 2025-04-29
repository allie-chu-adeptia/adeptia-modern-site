import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NavbarNew } from "@/components/navbar-new";
import { Footer } from "@/components/footer";
import { SanityLive } from "@/sanity/lib/live";
import { Analytics } from "@vercel/analytics/react"
import { GoogleTagManager } from '@next/third-parties/google'
import PlausibleProvider from 'next-plausible'


export const revalidate = 3600

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
  },
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
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Nokora:wght@400;700&display=swap"
          as="style"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PlausibleProvider domain="adeptia.com" taggedEvents={true}>
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
        </PlausibleProvider>
      </body>
    </html>
  );
}
