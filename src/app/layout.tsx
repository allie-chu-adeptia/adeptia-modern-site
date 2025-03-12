import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NavbarNew } from "@/components/navbar-new";
import { Footer } from "@/components/footer";
import { SanityLive } from "@/sanity/lib/live";
import { Analytics } from "@vercel/analytics/react"


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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarNew />
        {children}
        <SanityLive />
        <Analytics />
        {/* {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )} */}
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
