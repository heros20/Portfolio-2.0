import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import './globals.css';

export const metadata: Metadata = {
  title: "Portfolio Kevin Bigoni",
  description: "Crée avec du coeur",
  keywords: ["Portfolio", "Kevin Bigoni", "Développeur Full-Stack", "Next.js", "React Native", "Supabase", "Baseball", "Code"],
  authors: [{ name: "Kevin Bigoni" }],
  creator: "Kevin Bigoni",
  themeColor: "#1e40af", // bleu sombre
  openGraph: {
    title: "Portfolio Kevin Bigoni",
    description: "Crée avec du coeur",
    url: "https://heros20.github.io/Portfolio-2.0/",
    siteName: "Portfolio Kevin Bigoni",
    images: [
      {
        url: "/images/screenshot-comets.png",
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
    description: "Crée avec du coeur",
    creator: "@heros20", // si tu as un Twitter
    images: ["/images/screenshot-comets.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      "/apple-touch-icon.png",
      "/android-chrome-192x192.png",
      "/android-chrome-512x512.png",
    ],
  },
};
export const viewport = {
  themeColor: "#1d4ed8"
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        {/* Meta viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* SEO meta tags can also be added here or use next/head in page components */}
      </head>
      <body>{children}</body>
    </html>
  );
}
