"use client";

import Image from "next/image";
import { Heart, Coffee, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-[#F5F5F5]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 text-center">
          <h3 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            On crée quelque chose de <span className="text-[#B4F116]">solide</span> ?
          </h3>
          <p className="mt-3 text-neutral-400">
            Du web au mobile, orienté impact, propre et performant.
          </p>
        </div>

        <div className="h-px bg-neutral-800" />

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="space-y-3 leading-normal">
            <p className="text-lg font-semibold">Kevin - Développeur Full-Stack</p>
            <p className="text-sm text-neutral-400">
              Code propre, UX nette, et livraison qui compte.
              <span className="whitespace-nowrap"> Baseball mindset</span>
            </p>
            <p className="text-xs italic text-neutral-500">
              "Code like you&apos;re batting for the championship."
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">Rester en contact</p>
            <ul className="flex flex-wrap gap-3">
              <li>
                <a
                  href="mailto:kevin.bigoni@outlook.fr"
                  aria-label="Email"
                  className="inline-flex items-center gap-2 border border-neutral-800 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-[#B4F116] hover:text-[#B4F116]"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px bg-neutral-800" />

        <div className="mt-10 flex justify-center">
          <Image
            src="/android-chrome-512x512.png"
            alt="Logo de l'entreprise"
            width={100}
            height={100}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs leading-normal text-neutral-500 sm:flex-row">
          <p className="flex items-center gap-2">
            © {year} Kevin - Fait avec
            <Heart className="h-3.5 w-3.5" aria-hidden />
            & beaucoup de
            <Coffee className="h-3.5 w-3.5" aria-hidden />
          </p>
          <p className="text-neutral-600">Performance-first • Accessibilité • CI/CD sobre</p>
        </div>
      </div>
    </footer>
  );
}
