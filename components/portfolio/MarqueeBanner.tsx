"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const ITEMS = [
  "Disponible en freelance",
  "Next.js",
  "React Native",
  "TypeScript",
  "Supabase",
  "Stripe",
  "CI/CD",
  "Honfleur - FR",
];

export default function MarqueeBanner() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduced(!!mq?.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq?.addEventListener?.("change", handler);
    return () => mq?.removeEventListener?.("change", handler);
  }, []);

  return (
    <section
      className="relative w-full select-none bg-[#0A0A0A] text-[#F5F5F5]"
      aria-label="Infos défilantes"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#B4F116]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-neutral-900" />

      <div className="py-2.5">
        <Marquee
          gradient={false}
          speed={28}
          pauseOnHover
          pauseOnClick
          autoFill
          play={!reduced}
        >
          {ITEMS.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="mx-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-neutral-300 md:text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#B4F116]" />
              <span className="font-semibold">{label}</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
