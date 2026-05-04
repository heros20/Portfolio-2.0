import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL("https://heros20.github.io/Portfolio-2.0"),
  title: "Portfolio Kevin Bigoni",
  description: "Cree avec du coeur",
  keywords: [
    "Portfolio",
    "Kevin Bigoni",
    "Developpeur Full-Stack",
    "Next.js",
    "React Native",
    "Supabase",
    "Baseball",
    "Code",
  ],
  authors: [{ name: "Kevin Bigoni" }],
  creator: "Kevin Bigoni",
  openGraph: {
    title: "Portfolio Kevin Bigoni",
    description: "Cree avec du coeur",
    url: "https://heros20.github.io/Portfolio-2.0/",
    siteName: "Portfolio Kevin Bigoni",
    images: [
      {
        url: `${prefix}/images/screenshot-comets.png`,
        width: 800,
        height: 400,
        alt: "Site des Comets d'Honfleur",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Kevin Bigoni",
    description: "Cree avec du coeur",
    creator: "@heros20",
    images: [`${prefix}/images/screenshot-comets.png`],
  },
  icons: {
    icon: [
      { url: `${prefix}/favicon.ico` },
      { url: `${prefix}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: `${prefix}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      {
        url: `${prefix}/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: `${prefix}/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: `${prefix}/apple-touch-icon.png`, sizes: "180x180" }],
    shortcut: [`${prefix}/favicon.ico`],
  },
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${GeistSans.className} ${GeistMono.variable} min-h-screen overflow-x-hidden bg-[#0A0A0A] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
