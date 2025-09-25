"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export default function ContactInfos() {
  return (
    <section id="contact-infos" className="bg-[#F5F5F5] text-[#111] py-24 px-6">
      <div className="mx-auto w-full max-w-6xl">
        {/* Titre */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-snug">
            Me contacter,
            <span className="block">
              simplement et efficacement
              <span className="block h-[6px] w-40 mt-3 bg-[#B4F116]" />
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-[15px] md:text-base leading-relaxed text-neutral-700">
            <p>
              Un projet web, une app mobile, une idée à cadrer&nbsp;? Je
              réponds vite et je vais droit au but.
            </p>
            <p>
              Email pour le contexte, téléphone pour l’immédiat, carte pour
              caler un rendez-vous.
            </p>
          </div>
        </div>

        {/* Cartes coordonnées */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Email */}
          <Link
            href="mailto:kevin.bigoni@outlook.fr"
            aria-label="Envoyer un email à Kevin"
            className="flex items-center gap-4 border border-neutral-300 px-5 py-4 hover:border-[#B4F116] transition-colors"
          >
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-neutral-300">
              <Mail className="h-5 w-5 text-neutral-700" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm md:text-[15px] font-medium leading-normal text-neutral-700">
                Email
              </p>
              <p className="text-xs md:text-sm leading-normal text-neutral-500 truncate">
                kevin.bigoni@outlook.fr
              </p>
            </div>
            <ExternalLink className="h-4 w-4 flex-none text-neutral-400" />
          </Link>

          {/* Téléphone */}
          <Link
            href="tel:0613623108"
            aria-label="Appeler Kevin"
            className="flex items-center gap-4 border border-neutral-300 px-5 py-4 hover:border-[#B4F116] transition-colors"
          >
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-neutral-300">
              <Phone className="h-5 w-5 text-neutral-700" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm md:text-[15px] font-medium leading-normal text-neutral-700">
                Téléphone
              </p>
              <p className="text-xs md:text-sm leading-normal text-neutral-500">
                06.13.62.31.08
              </p>
            </div>
            <ExternalLink className="h-4 w-4 flex-none text-neutral-400" />
          </Link>

          {/* Localisation (plein largeur sur mobile, demi sur md+) */}
          <Link
            href="https://www.google.com/maps/search/?api=1&query=Boulleville+27210"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir la localisation sur Google Maps"
            className="md:col-span-2 flex items-center gap-4 border border-neutral-300 px-5 py-4 hover:border-[#B4F116] transition-colors"
          >
            <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-neutral-300">
              <MapPin className="h-5 w-5 text-neutral-700" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm md:text-[15px] font-medium leading-normal text-neutral-700">
                Localisation
              </p>
              <p className="text-xs md:text-sm leading-normal text-neutral-500">
                Boulleville (27)
              </p>
            </div>
            <ExternalLink className="h-4 w-4 flex-none text-neutral-400" />
          </Link>
        </div>

        {/* Bandeau stat simple (aucun absolute) */}
        <div className="mt-16 flex justify-center">
          <div className="w-56">
            <div className="h-px bg-neutral-300 mb-3" />
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
