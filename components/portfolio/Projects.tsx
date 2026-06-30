"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { defaultProjects } from "@/lib/default-projects";
import type { Project } from "@/lib/projects";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Projects() {
  const reduced = useReducedMotion();
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    let mounted = true;

    fetch(`${prefix}/projects.json?t=${Date.now()}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load projects");
        }
        return response.json() as Promise<Project[]>;
      })
      .then((nextProjects) => {
        if (mounted && Array.isArray(nextProjects)) {
          setProjects(nextProjects);
        }
      })
      .catch(() => {
        // Keep the build-time fallback if the production JSON cannot be loaded.
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 text-[#F5F5F5]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-gradient-to-b from-[#B4F116]/25 via-[#B4F116]/10 to-transparent blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-64 h-72 w-72 rounded-full bg-[#B4F116]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-24 h-72 w-72 rounded-full bg-[#B4F116]/10 blur-3xl"
      />

      <div className="mx-auto w-[min(1120px,92%)]">
        <div className="mb-10 text-center md:mb-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-neutral-300">
            Projets{" "}
            <span className="rounded-full bg-[#B4F116]/15 px-2 py-0.5 text-[#B4F116] ring-1 ring-[#B4F116]/30">
              selection 2026
            </span>
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Du web au mobile,{" "}
            <span className="bg-gradient-to-br from-[#D9FF6E] to-[#B4F116] bg-clip-text text-transparent">
              oriente impact
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
            Cartes glass, perfs propres et UX nette. Chaque feature sert un
            objectif clair.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id || project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_-40px_rgba(180,241,22,0.25)] backdrop-blur-xl"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 transition-opacity duration-300 group-hover:opacity-100 [mask-image:radial-gradient(500px_160px_at_20%_-10%,#000_30%,transparent_70%)]"
              >
                <div className="absolute -inset-px rounded-2xl bg-[radial-gradient(800px_160px_at_var(--x,50%)_-40px,rgba(180,241,22,0.18),transparent_60%)] transition-[--x] duration-500" />
              </div>

              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ouvrir ${project.title}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <motion.img
                    src={`${prefix}${project.image}`}
                    alt={project.title}
                    className="block h-full w-full bg-[#0A0A0A] object-contain"
                    whileHover={reduced ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-70" />
                  <span className="absolute left-3 top-3 rounded-md bg-[#B4F116]/15 px-2 py-0.5 text-xs font-semibold text-[#B4F116] ring-1 ring-[#B4F116]/30">
                    {project.type}
                  </span>
                </div>
              </Link>

              <div className="relative z-10 p-4">
                <div className="mb-2.5 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <Link
                    prefetch={false}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir ${project.title}`}
                    className="rounded-lg border border-white/10 bg-white/5 p-2 text-neutral-300 transition-colors hover:border-[#B4F116]/40 hover:bg-white/10 hover:text-[#B4F116]"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-200 transition-colors group-hover:border-[#B4F116]/40 group-hover:text-[#B4F116]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <style jsx>{`
                article:hover {
                  transform: translateY(-2px);
                  transition: transform 220ms ease;
                }
              `}</style>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#B4F116]/30 bg-[#B4F116]/10 px-4 py-2.5 text-sm font-semibold text-[#D9FF6E]"
          >
            Un projet en tête ? Parlons-en
            <span className="absolute inset-0 -z-0 translate-y-[60%] bg-gradient-to-t from-[#B4F116]/40 to-transparent transition-transform duration-300 group-hover:translate-y-[10%]" />
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:14px_14px]" />
    </section>
  );
}
