"use client";

import ParticlesBg from "@/components/portfolio/ParticlesBg";
import AnimatedBlob from "@/components/portfolio/AnimatedBlob";
import MarqueeBanner from "@/components/portfolio/MarqueeBanner";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import ContactForm from "@/components/portfolio/ContactForm";
import ContactInfos from "@/components/portfolio/ContactInfos";
import Footer from "@/components/portfolio/Footer";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-orange-950 text-white antialiased">
      {/* Effets globaux */}
      <ParticlesBg />
      <AnimatedBlob />
      <MarqueeBanner />

      {/* Sections principales */}
      <Hero />
      <About />
      <Projects />

      {/* Bloc Contact */}
      <section id="contact" className="py-24 px-6 bg-[#F5F5F5] text-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Entrons en <span className="text-[#B4F116]">contact</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-neutral-600 text-base md:text-lg">
              Tu as un projet en tête, une question ou une opportunité&nbsp;?  
              Écris-moi directement via le formulaire ou retrouve mes coordonnées.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfos />
          </div>
        </div>
      </section>

      {/* Footer sombre */}
      <Footer />
    </div>
  );
}
