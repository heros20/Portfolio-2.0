"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["PRODUITS", "APPS", "EXPÉRIENCES", "SYSTÈMES"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#0A0A0A] text-[#F5F5F5]"
      aria-label="Présentation"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="absolute left-0 right-0 top-0 h-[6px] bg-[#B4F116]" />

      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-[-90deg] md:block">
        <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">
          Full-Stack • Next.js • React Native • Supabase
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 pt-20 sm:px-8 md:pt-28">
        <div className="flex flex-col gap-6">
          <h1 className="text-[11vw] font-extrabold leading-[0.85] tracking-[-0.02em] md:text-[8rem]">
            <span className="block">KEVIN</span>
            <span className="block bg-[linear-gradient(90deg,#F5F5F5_0%,#B4F116_80%)] bg-clip-text text-transparent">
              BIGONI
            </span>
          </h1>

          <div className="flex flex-wrap items-end gap-4 md:gap-6">
            <span className="text-lg text-neutral-300 md:text-2xl">Je conçois & propose des</span>
            <div className="relative h-[2.2em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block text-2xl font-bold text-[#B4F116] md:text-4xl"
                >
                  {WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-lg text-neutral-300 md:text-2xl">qui performent.</span>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
            J'aime les interfaces franches, les stacks nettes et les livraisons régulières. Du
            concept au produit, avec une obsession&nbsp;: l'impact mesurable.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
            className="border-0 bg-[#B4F116] px-6 font-semibold text-black hover:brightness-110"
          >
            <a href="mailto:kevin.bigoni@outlook.fr" aria-label="Contacter Kevin par email">
              <Mail className="mr-2 h-5 w-5" />
              Discutons
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-neutral-700 bg-black px-6 text-neutral-200 hover:bg-white hover:text-black"
          >
            <a
              href="https://github.com/heros20"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir le GitHub de Kevin"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="lg"
            className="px-6 text-neutral-300 hover:bg-neutral-900 hover:text-white"
          >
            <Link href="#projects" aria-label="Aller à la section projets">
              Voir mes projets <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0">
        <div className="relative w-full overflow-hidden">
          <motion.div
            aria-hidden
            className="flex gap-12 whitespace-nowrap text-sm font-semibold md:text-base"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex gap-12 px-6 text-neutral-400">
                <span className="text-[#B4F116]">•</span> Next.js
                <span className="text-[#B4F116]">•</span> React&nbsp;Native
                <span className="text-[#B4F116]">•</span> TypeScript
                <span className="text-[#B4F116]">•</span> Supabase
                <span className="text-[#B4F116]">•</span> Stripe
                <span className="text-[#B4F116]">•</span> Edge&nbsp;Functions
                <span className="text-[#B4F116]">•</span> CI/CD
              </span>
            ))}
          </motion.div>
          <div className="absolute inset-x-0 -top-3 h-px bg-neutral-800" />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-1 right-6 hidden items-center gap-2 text-xs uppercase tracking-widest md:flex">
        <span className="h-2 w-2 rounded-full bg-[#B4F116]" />
        <span className="text-neutral-400">v2026 • Portfolio</span>
      </div>
    </section>
  );
}
