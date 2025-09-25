"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Site des Comets d'Honfleur",
    description:
      "Vitrine moderne pour mon équipe de baseball, intégrant calendrier, résultats et actualités.",
    tech: ["Next.js", "Tailwind", "Supabase"],
    image: "images/screenshot-comets.png",
    link: "https://les-comets-honfleur.vercel.app",
    type: "Web",
  },
  {
    title: "Application mobile Comets",
    description:
      "Application Android officielle des Comets d'Honfleur, avec calendrier, notifications push et suivi des résultats.",
    tech: ["React Native", "Expo", "Supabase"],
    image: "images/comets.webp",
    link: "https://play.google.com/store/apps/details?id=com.lescomets.app",
    type: "Mobile",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 bg-[#0A0A0A] text-[#F5F5F5]"
    >
      <div className="max-w-6xl mx-auto">
        {/* === Header section === */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Projets <span className="text-[#B4F116]">sélectionnés</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-400 text-base md:text-lg">
            Du web au mobile — une approche orientée impact,
            où chaque ligne de code sert un objectif clair.
          </p>
        </div>

        {/* === Flex toujours centré === */}
        <div className="flex flex-wrap justify-center gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="group relative flex flex-col border border-neutral-800 hover:border-[#B4F116] transition-colors w-full max-w-[420px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <div className="overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="flex-1 flex flex-col p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg tracking-tight">
                    {project.title}
                  </h3>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir ${project.title}`}
                    className="ml-3 text-neutral-500 hover:text-[#B4F116] transition"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
                <p className="text-sm text-neutral-400 mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium uppercase tracking-wider border border-neutral-700 text-neutral-300 group-hover:border-[#B4F116] group-hover:text-[#B4F116] transition"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
