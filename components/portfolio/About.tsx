"use client";

import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";

const techLinks: Record<string, string> = {
  "Next.js": "https://nextjs.org/",
  "React Native": "https://reactnative.dev/",
  "TypeScript": "https://www.typescriptlang.org/",
  Supabase: "https://supabase.com/",
  "Tailwind CSS": "https://tailwindcss.com/",
  "Node.js": "https://nodejs.org/",
  PostgreSQL: "https://www.postgresql.org/",
  Git: "https://git-scm.com/",
};

export default function About() {
  return (
    <section id="about" className="bg-[#F5F5F5] text-[#111] py-24 px-6">
      <div className="mx-auto max-w-6xl grid gap-14 md:grid-cols-2">
        {/* Col gauche */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Développeur par passion,
            <span className="block">
              compétiteur par nature
              <span className="block h-[6px] w-40 mt-2 bg-[#B4F116]" />
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-[15px] md:text-base leading-relaxed text-neutral-700">
            <p>
              Le code est devenu ma deuxième passion après le baseball. Même
              esprit&nbsp;: stratégie, précision, et ne jamais lâcher.
            </p>
            <p>
              Chez les Comets, j’ai appris que chaque détail compte. En
              développement, c’est pareil&nbsp;: chaque décision technique sert
              un objectif mesurable.
            </p>
            <p>
              Mon truc&nbsp;? Concevoir des produits qui performent vraiment,
              avec une UX nette et sans friction.
            </p>
          </div>
        </div>

        {/* Col droite */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl md:text-2xl font-bold">Stack technique</h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              Sélection 2026
            </span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(techLinks).map(([tech, url]) => (
              <li key={tech} className="group">
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Découvrir ${tech}`}
                  className="flex items-center justify-between border border-neutral-300 hover:border-[#B4F116] transition-colors px-4 py-3"
                >
                  <span className="text-sm md:text-[15px] font-medium text-neutral-700 group-hover:text-[#B4F116] transition-colors">
                    {tech}
                  </span>
                  <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-[#B4F116] transition-colors" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-neutral-500">
            TypeScript partout. Tests ciblés. CI/CD sobre. Priorité aux
            performances perçues.
          </p>
        </div>
      </div>

      {/* Stat */}
      <div className="mt-16 flex justify-center">
        <div className="relative w-56">
          <div className="absolute inset-x-0 -top-3 h-px bg-neutral-300" />
          <div className="border border-neutral-300 px-5 py-4 text-center">
            <Globe className="mx-auto mb-2 h-5 w-5 text-[#B4F116]" />
            <p className="text-3xl font-extrabold leading-none">2</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Projet en ligne
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
