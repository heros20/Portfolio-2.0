"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

/**
 * ParticlesBg — 2026 minimal
 * - Palette : points neutres + accents lime (#B4F116)
 * - Très léger (peu de particules, vitesse lente)
 * - Pause on blur, pause on reduce-motion
 * - Layer non interactif (pointer-events-none), full-bleed derrière le contenu
 */

export default function ParticlesBg() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Respecte prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const current = !!mq?.matches;
    setReduced(current);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  // Init moteur
  useEffect(() => {
    let mounted = true;
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      if (mounted) setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Options (mémo pour éviter les re-rendus)
  const options = useMemo(() => {
    const baseCount = 48; // densité de base desktop
    return {
      background: { color: { value: "transparent" } },
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 60,
      pauseOnBlur: true,
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: false, mode: "repulse" }, // désactivé pour look éditorial
          onClick: { enable: false, mode: "push" },
          resize: true,
        },
        modes: {
          repulse: { distance: 60, duration: 0.4 },
          push: { quantity: 2 },
        },
      },
      particles: {
        number: {
          value: reduced ? Math.round(baseCount * 0.35) : baseCount,
          density: { enable: true, area: 900 },
        },
        color: {
          value: ["#D4D4D4", "#9CA3AF", "#B4F116"], // gris clairs + accent lime
        },
        opacity: {
          value: { min: 0.12, max: 0.35 },
          animation: { enable: false },
        },
        size: {
          value: { min: 1, max: 2.2 },
          animation: { enable: false },
        },
        links: {
          enable: true,
          distance: 110,
          color: "#2A2A2A",
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: !reduced,
          speed: 0.35,
          direction: "none",
          outModes: { default: "out" },
          random: true,
          straight: false,
        },
        shape: { type: "circle" },
      },
      responsive: [
        {
          maxWidth: 1024,
          options: {
            particles: {
              number: { value: reduced ? 12 : 28, density: { area: 800 } },
              links: { distance: 95 },
            },
          },
        },
        {
          maxWidth: 640,
          options: {
            particles: {
              number: { value: reduced ? 8 : 18, density: { area: 700 } },
              links: { distance: 80, opacity: 0.22 },
            },
          },
        },
      ],
    } as const;
  }, [reduced]);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      // Ce conteneur doit envelopper toute la page (place-le dans le layout ou dans la section)
    >
      <Particles id="particles-bg" options={options as any} />
    </div>
  );
}
