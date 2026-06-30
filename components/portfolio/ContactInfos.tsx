"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export default function ContactInfos() {
  return (
    <section id="contact-infos" className="bg-[#F5F5F5] px-6 py-24 text-[#111]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-snug tracking-tight md:text-5xl">
            Me contacter,
            <span className="block">
              simplement et efficacement
              <span className="mt-3 block h-[6px] w-40 bg-[#B4F116]" />
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-neutral-700 md:text-base">
            <p>
              Un projet web, une app mobile, une idée à cadrer&nbsp;? Je réponds vite et je vais
              droit au but.
            </p>
            <p>
              Email pour le contexte, téléphone pour l'immédiat, carte pour caler un rendez-vous.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="mailto:kevin.bigoni@outlook.fr"
            aria-label="Envoyer un email à Kevin"
            className="flex items-center gap-4 border border-neutral-300 px-5 py-4 transition-colors hover:border-[#B4F116]"
          >
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-neutral-300">
              <Mail className="h-5 w-5 text-neutral-700" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-normal text-neutral-700 md:text-[15px]">
                Email
              </p>
              <p className="truncate text-xs leading-normal text-neutral-500 md:text-sm">
                kevin.bigoni@outlook.fr
              </p>
            </div>
            <ExternalLink className="h-4 w-4 flex-none text-neutral-400" />
          </Link>

          <Link
            href="tel:0613623108"
            aria-label="Appeler Kevin"
            className="flex items-center gap-4 border border-neutral-300 px-5 py-4 transition-colors hover:border-[#B4F116]"
          >
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-neutral-300">
              <Phone className="h-5 w-5 text-neutral-700" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-normal text-neutral-700 md:text-[15px]">
                Téléphone
              </p>
              <p className="text-xs leading-normal text-neutral-500 md:text-sm">06.13.62.31.08</p>
            </div>
            <ExternalLink className="h-4 w-4 flex-none text-neutral-400" />
          </Link>

          <Link
            href="https://www.google.com/maps/search/?api=1&query=Boulleville+27210"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir la localisation sur Google Maps"
            className="flex items-center gap-4 border border-neutral-300 px-5 py-4 transition-colors hover:border-[#B4F116] md:col-span-2"
          >
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-neutral-300">
              <MapPin className="h-5 w-5 text-neutral-700" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-normal text-neutral-700 md:text-[15px]">
                Localisation
              </p>
              <p className="text-xs leading-normal text-neutral-500 md:text-sm">Boulleville (27)</p>
            </div>
            <ExternalLink className="h-4 w-4 flex-none text-neutral-400" />
          </Link>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-56">
            <div className="mb-3 h-px bg-neutral-300" />
            <div className="border border-neutral-300 px-5 py-4 text-center">
              <Mail className="mx-auto mb-2 h-5 w-5 text-[#B4F116]" />
              <p className="text-3xl font-extrabold leading-none">100%</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                Réponses personnalisées
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
