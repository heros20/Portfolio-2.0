"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * AnimatedBlob (refonte 2026)
 * - Remplacé par un accent diagonal minimal (hatch lime)
 * - Zéro gradient / zéro blur -> plus éditorial, plus tranchant
 * - Respecte prefers-reduced-motion
 */
export default function AnimatedBlob() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduced(!!mq?.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -z-10 top-[-80px] left-0 w-[120vw] h-[240px] origin-left rotate-[-6deg]"
      initial={false}
      animate={reduced ? {} : { rotate: [-6, -5, -6], transition: { duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
    >
      <motion.svg
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Bandeau de base (discret) */}
        <rect x="0" y="0" width="1200" height="240" fill="currentColor" className="text-black/30 md:text-black/20" />

        {/* Hatch lime animé */}
        <defs>
          <pattern id="hatch" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <rect width="22" height="22" fill="transparent" />
            <path d="M0 11 H22" stroke="#B4F116" strokeWidth="2" strokeLinecap="square" opacity="0.35" />
          </pattern>
          {/* Masque doux pour fondre les bords */}
          <linearGradient id="fadeX" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.08" stopColor="white" stopOpacity="1" />
            <stop offset="0.92" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fadeY" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.15" stopColor="white" stopOpacity="1" />
            <stop offset="0.85" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="softEdges">
            <rect x="0" y="0" width="1200" height="240" fill="url(#fadeX)" />
            <rect x="0" y="0" width="1200" height="240" fill="url(#fadeY)" />
          </mask>
        </defs>

        {/* Groupe hatch qui glisse lentement */}
        <motion.rect
          x="0"
          y="0"
          width="1200"
          height="240"
          fill="url(#hatch)"
          mask="url(#softEdges)"
          animate={reduced ? {} : { x: [0, -22] }}
          transition={reduced ? undefined : { duration: 10, ease: "linear", repeat: Infinity }}
        />

        {/* Liseré haut lime très fin (signature) */}
        <rect x="0" y="0" width="1200" height="2" fill="#B4F116" opacity="0.8" />
      </motion.svg>
    </motion.div>
  );
}
