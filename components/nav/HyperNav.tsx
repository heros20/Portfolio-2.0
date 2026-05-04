"use client";

import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/src/config/nav"; // <- tes liens

/**
 * HyperNav — 2026 • Futuriste, fun et accessible
 * - Effet "néon plasma" + glassmorphism
 * - Indicateur d'onglet actif mesuré en pixels (anti-décalage)
 * - Mobile drawer fluide (sans lib) avec backdrop blur
 * - Respecte prefers-reduced-motion
 * - Compatible GitHub Pages (Next/link gère basePath)
 * - FIXED + contraste renforcé au scroll
 */
export default function HyperNav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [noiseOn, setNoiseOn] = useState(true);

  // --- Nouveaux refs pour nav fixed + spacer dynamique
  const navRef = useRef<HTMLDivElement | null>(null);
  const [spacerH, setSpacerH] = useState<number>(100); // valeur par défaut safe

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduced(!!mq?.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  // Fermer le drawer mobile à chaque navigation
  useEffect(() => setOpen(false), [pathname]);

  // Etat scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Index actif (exact pour "/" sinon "startsWith")
  const activeIndex = useMemo(
    () => NAV_ITEMS.findIndex((i) => matchPath(pathname, i.href)),
    [pathname]
  );

  // Mesure en px pour la pilule active
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, w: 0 });

  const recompute = useCallback(() => {
    if (activeIndex < 0) return;
    const el = linkRefs.current[activeIndex];
    const wrap = wrapperRef.current;
    if (!el || !wrap) return;
    const er = el.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    const x = er.left - wr.left;
    const w = er.width;
    setPill({ x, w });
  }, [activeIndex]);

  useEffect(() => {
    recompute();
  }, [recompute, activeIndex, pathname]);

  // ResizeObservers: recalc pill + spacer height
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      recompute();
      // calcule la hauteur totale visible (top-3 = 12px, mt-4 interne = 16px)
      const TOP_OFFSET = 12 + 16; // = 28px
      const h = (navRef.current?.offsetHeight || 0) + TOP_OFFSET;
      setSpacerH(h || 100);
    });

    if (wrapperRef.current) ro.observe(wrapperRef.current);
    linkRefs.current.forEach((n) => n && ro.observe(n));
    if (navRef.current) ro.observe(navRef.current);

    const onResize = () => {
      recompute();
      const TOP_OFFSET = 12 + 16;
      const h = (navRef.current?.offsetHeight || 0) + TOP_OFFSET;
      setSpacerH(h || 100);
    };

    window.addEventListener("resize", onResize);
    // first paint
    const t = setTimeout(onResize, 0);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, [recompute]);

  return (
    <>
      {/* HEADER désormais FIXED */}
      <header className="fixed left-0 right-0 top-3 z-50">
        {/* Halo d'arrière-plan */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-3 h-[160px] bg-gradient-to-b from-[#B4F116]/25 via-[#B4F116]/10 to-transparent blur-2xl"
        />
        <nav
          ref={navRef}
          aria-label="Navigation principale"
          className={[
            "mx-auto mt-4 w-[min(1120px,92%)] rounded-2xl border backdrop-blur-xl transition-all duration-300",
            scrolled
              ? "border-white/15 bg-[#0A0A0A]/70 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_64px_-24px_rgba(180,241,22,0.28)]"
              : "border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_-20px_rgba(180,241,22,0.25)]",
          ].join(" ")}
        >
          {/* Bordure animée subtile */}
          <div className="relative rounded-2xl p-[1px]">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(1000px_200px_at_var(--mx)_-40px,rgba(180,241,22,0.15),transparent_60%)] [--mx:50%] transition-[--mx] duration-500" />
            <div className="relative flex items-center justify-between gap-3 rounded-2xl bg-[#0A0A0A]/80 px-3 py-2 sm:px-4">
              {/* Logo */}
              <Link
                href="/"
                className="group relative inline-flex items-center gap-3 rounded-xl px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4F116]/70"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-gradient-to-br from-[#B4F116] to-[#7aff00]">
                  <span className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,rgba(10,10,10,0)_0deg,rgba(10,10,10,0)_300deg,rgba(10,10,10,0.35)_360deg)]" />
                  <span className="absolute inset-[3px] rounded-[10px] bg-[#0A0A0A]" />
                  <span className="absolute inset-0 grid place-items-center text-[11px] font-black tracking-widest text-[#B4F116]">
                    KB
                  </span>
                </div>
                <span className="hidden text-sm font-semibold text-neutral-200 sm:block">
                  Kevin Bigoni
                </span>
              </Link>

              {/* Desktop nav + CTA + Toggle */}
              <div className="relative hidden items-center gap-1 md:flex">
                <div
                  ref={wrapperRef}
                  className="relative flex items-center gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/10"
                >
                  {/* Indicateur actif */}
                  <ActivePill x={pill.x} w={pill.w} reduced={reduced} />
                  {NAV_ITEMS.map((item, idx) => (
                    <NavLink
                      key={item.href}
                      ref={(el) => (linkRefs.current[idx] = el)}
                      item={item}
                      active={idx === activeIndex}
                    />
                  ))}
                </div>

                {/* Séparateur */}
                <div className="ml-2 h-6 w-px bg-white/10" />

                {/* CTA */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-[#B4F116]/30 bg-[#B4F116]/10 px-3 py-2 text-sm font-semibold text-[#D9FF6E] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4F116]/70"
                >
                  <span className="relative z-10">Contacte-moi</span>
                  <span className="absolute inset-0 -z-0 translate-y-[60%] bg-gradient-to-t from-[#B4F116]/40 to-transparent transition-transform duration-300 group-hover:translate-y-[10%]" />
                </Link>

                {/* Toggle Grain visible en desktop */}
                <div className="ml-2">
                  <NoiseToggle on={noiseOn} setOn={setNoiseOn} />
                </div>
              </div>

              {/* Burger mobile */}
              <button
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4F116]/70"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <Burger open={open} />
              </button>
            </div>
          </div>

          {/* Drawer mobile */}
          <div
            className={
              "md:hidden overflow-hidden transition-[max-height,opacity] duration-500" +
              (open ? " max-h-[520px] opacity-100" : " max-h-0 opacity-0")
            }
          >
            <div className="border-t border-white/10 px-3 py-3">
              <ul className="grid gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        "group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-base text-neutral-100 active:scale-[0.99]" +
                        (matchPath(pathname, item.href)
                          ? " ring-1 ring-[#B4F116]/60"
                          : " hover:bg-white/10")
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="rounded-md bg-[#B4F116]/15 px-2 py-0.5 text-xs font-semibold text-[#B4F116] ring-1 ring-[#B4F116]/30">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <span
                        aria-hidden
                        className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between gap-3">
                <Link
                  href="/contact"
                  className="flex-1 rounded-xl border border-[#B4F116]/40 bg-[#B4F116]/10 px-3 py-2.5 text-center text-sm font-semibold text-[#D9FF6E]"
                >
                  Contacte-moi
                </Link>
                <NoiseToggle on={noiseOn} setOn={setNoiseOn} />
              </div>
            </div>
          </div>
        </nav>

        {/* Bruit/Grain décoratif (fixed derrière) */}
        <CanvasNoise
          enabled={noiseOn}
          reduced={reduced}
          intensity={5} // ton réglage
          pixelSize={1} // 2 = plus cheap que 1
          fps={16} // 20–24 suffit
          dprMax={1.4} // cap le DPR
          scale={0.6} // 60% de la taille → énorme gain
        />

        {/* Styles utilitaires */}
        <style jsx global>{`
          .animate-spin-slow {
            animation: spin 7s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(1turn);
            }
          }
        `}</style>
      </header>

      {/* Spacer pour ne pas masquer le contenu par la nav fixed */}
      <div aria-hidden style={{ height: spacerH }} />
    </>
  );
}

/* ========================= Composants ========================= */

const NavLink = forwardRef<
  HTMLAnchorElement,
  { item: { label: string; href: string; badge?: string }; active: boolean }
>(({ item, active }, ref) => (
  <Link
  prefetch={false}
    href={item.href}
    ref={ref}
    className={
      "group relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 outline-none transition " +
      (active
        ? "text-white"
        : "hover:text-white focus-visible:ring-2 focus-visible:ring-[#B4F116]/60")
    }
  >
    <span className="relative">
      {item.label}
      {/* Soulignement comète */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 rounded bg-[#B4F116] opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"
      />
    </span>
    {item.badge && (
      <span className="rounded-md bg-[#B4F116]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B4F116] ring-1 ring-[#B4F116]/30">
        {item.badge}
      </span>
    )}
  </Link>
));
NavLink.displayName = "NavLink";

/** Pilule active positionnée/dimensionnée en pixels réels */
function ActivePill({
  x,
  w,
  reduced,
}: {
  x: number;
  w: number;
  reduced: boolean;
}) {
  if (w <= 0) return null;
  return (
    <div
      className="pointer-events-none absolute top-1 bottom-1 z-0 rounded-lg bg-white/10"
      style={{
        width: w,
        transform: `translateX(${x}px)`,
        transition: reduced
          ? "none"
          : "transform 400ms cubic-bezier(.2,.8,.2,1), width 300ms ease",
      }}
    />
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className={
          "absolute left-0 top-0 h-0.5 w-5 origin-left rounded bg-neutral-200 transition-all " +
          (open ? "translate-y-[7px] rotate-45" : "translate-y-0 rotate-0")
        }
      />
      <span
        className={
          "absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded bg-neutral-200 transition-opacity " +
          (open ? "opacity-0" : "opacity-100")
        }
      />
      <span
        className={
          "absolute bottom-0 left-0 h-0.5 w-5 origin-left rounded bg-neutral-200 transition-all " +
          (open ? "-translate-y-[7px] -rotate-45" : "translate-y-0 rotate-0")
        }
      />
    </span>
  );
}

/** Canvas de grain léger, optimisé perf (ne pas modifier tes réglages) */
function CanvasNoise({
  enabled,
  reduced,
  intensity = 50, // 0–255 (alpha)
  pixelSize = 2, // 1 = fin, 2–3 = plus grossier
  fps = 24, // limite d’images par seconde
  dprMax = 1.5, // plafonne le DPR pour éviter le x4 pixels
  scale = 0.6, // génère à 60% du viewport, puis upscale → huge boost
}: {
  enabled: boolean;
  reduced: boolean;
  intensity?: number;
  pixelSize?: number;
  fps?: number;
  dprMax?: number;
  scale?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Resize canvas (avec scale + DPR capé)
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, Math.min(dprMax, window.devicePixelRatio || 1));
    const w = Math.max(1, Math.floor(window.innerWidth * scale));
    const h = Math.max(1, Math.floor(window.innerHeight * scale));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    // On upscale via CSS pour couvrir l’écran
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }, [dprMax, scale]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // pause si onglet caché
    let visible = document.visibilityState === "visible";
    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);

    // Boucle anim avec throttling FPS
    let raf = 0;
    let last = 0;
    const frameInterval = Math.max(1, Math.floor(1000 / Math.max(1, fps)));

    const draw = (ts: number) => {
      if (!enabled || reduced || !visible) return;
      if (ts - last < frameInterval) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = ts;

      const { width, height } = canvas;
      const img = ctx.createImageData(width, height);
      const data = img.data;
      const step = Math.max(1, Math.floor(pixelSize));
      const A = Math.max(0, Math.min(255, intensity));

      // Remplit par blocs (step x step) → ~pixelation contrôlée
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const v = (Math.random() * 255) | 0;
          for (let dy = 0; dy < step; dy++) {
            const py = y + dy;
            if (py >= height) break;
            let i = (py * width + x) * 4;
            for (let dx = 0; dx < step; dx++) {
              const px = x + dx;
              if (px >= width) break;
              data[i] = v;
              data[i + 1] = v;
              data[i + 2] = v;
              data[i + 3] = A;
              i += 4;
            }
          }
        }
      }

      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    };

    if (enabled && !reduced && visible) {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [enabled, reduced, fps, intensity, pixelSize]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 mix-blend-soft-light">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function NoiseToggle({
  on,
  setOn,
}: {
  on: boolean;
  setOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4F116]/70"
      aria-pressed={on}
      aria-label="Activer/désactiver le grain visuel"
      title={on ? "Désactiver le grain" : "Activer le grain"}
    >
      <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-white/10 p-0.5 ring-1 ring-white/10">
        <span
          className={
            "block h-4 w-4 rounded-full bg-[#B4F116] transition-transform " +
            (on ? "translate-x-4" : "translate-x-0")
          }
        />
      </span>
      <span className="text-xs">Grain</span>
    </button>
  );
}

/** Helpers */
function matchPath(current: string, href: string) {
  if (href === "/") return current === "/";
  return current.startsWith(href);
}
