"use client";

import ParticlesBg from "@/components/portfolio/ParticlesBg";
import AnimatedBlob from "@/components/portfolio/AnimatedBlob";
import MarqueeBanner from "@/components/portfolio/MarqueeBanner";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import ContactForm from "@/components/portfolio/ContactForm";
import ContactInfos from "@/components/portfolio/ContactInfos";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-orange-950 text-white antialiased">
      <ParticlesBg />
      <AnimatedBlob />
      <MarqueeBanner />

      <Hero />
      <About />
      <Projects />

      <section id="contact" className="bg-[#F5F5F5] px-6 py-24 text-[#111]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Entrons en <span className="text-[#B4F116]">contact</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 md:text-lg">
              Tu as un projet en tête, une question ou une opportunité&nbsp;?
              Écris-moi directement via le formulaire ou retrouve mes coordonnées.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <ContactForm />
            <ContactInfos />
          </div>
        </div>
      </section>
    </div>
  );
}
