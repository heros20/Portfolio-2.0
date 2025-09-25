"use client";

import Image from "next/image";
import { Heart, Coffee, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const SOCIAL = [
    {
      label: "Email",
      href: "mailto:kevin.bigoni@outlook.fr",
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Bandeau “cta” simple */}
        <div className="text-center mb-14">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            On crée quelque chose de{" "}
            <span className="text-[#B4F116]">solide</span> ?
          </h3>
          <p className="mt-3 text-neutral-400">
            Du web au mobile — orienté impact, propre et performant.
          </p>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-neutral-800" />

        {/* Zone identité + social */}
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="space-y-3 leading-normal">
            <p className="text-lg font-semibold">
              Kevin — Développeur Full-Stack
            </p>
            <p className="text-neutral-400 text-sm">
              Code propre, UX nette, et livraison qui compte.{" "}
              <span className="whitespace-nowrap">Baseball mindset ⚾</span>
            </p>
            <p className="text-neutral-500 text-xs italic">
              “Code like you&apos;re batting for the championship.”
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Rester en contact</p>
            <ul className="flex flex-wrap gap-3">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex items-center gap-2 border border-neutral-800 hover:border-[#B4F116] px-4 py-2 text-sm text-neutral-300 hover:text-[#B4F116] transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="mt-12 h-px bg-neutral-800" />

        {/* Logo centré et mis en avant */}
        <div className="mt-10 flex justify-center">
          <Image
            src="/android-chrome-512x512.png"
            alt="Logo de l’entreprise"
            width={100}
            height={100}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>

        {/* Bas de page */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 leading-normal">
          <p className="flex items-center gap-2">
            © {year} Kevin — Fait avec
            <Heart className="h-3.5 w-3.5" aria-hidden />
            & beaucoup de
            <Coffee className="h-3.5 w-3.5" aria-hidden />
          </p>
          <p className="text-neutral-600">
            Performance-first • Accessibilité • CI/CD sobre
          </p>
        </div>
      </div>
    </footer>
  );
}
