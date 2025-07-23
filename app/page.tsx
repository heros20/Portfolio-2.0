"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, ExternalLink, Globe, Send, MapPin, Phone } from "lucide-react";
import { RoughNotation } from "react-rough-notation";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import Marquee from "react-fast-marquee";

// ----- PARTICULES ANIMÉES -----
const particlesInit = async (engine: any) => {
  await loadFull(engine);
};

const particlesOptions = {
  background: { color: { value: "#10192a" }, opacity: 0 },
  fpsLimit: 60,
  particles: {
    number: { value: 90, density: { enable: true, value_area: 900 } },
    color: { value: ["#38bdf8", "#f472b6", "#eab308"] },
    shape: { type: "circle" },
    opacity: { value: 0.25, random: true },
    size: { value: 2, random: true },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      outModes: "out",
      straight: false,
    },
    links: { enable: false },
  },
  detectRetina: true,
};

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message envoyé ! Je te recontacte rapidement 🚀");
    setFormData({ name: "", email: "", message: "" });
  };

  const projects = [
    {
      title: "Site des Comets d'Honfleur",
      description: "Site vitrine moderne pour mon équipe de baseball avec gestion des matchs et actualités.",
      tech: ["Next.js", "Tailwind", "Supabase"],
      image: "/images/screenshot-comets.png",
      link: "https://les-comets-honfleur.vercel.app",
      type: "Web",
    },
    // Ajoute d’autres projets stylés ici si tu veux
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-orange-950 text-white antialiased">
      {/* ---- PARTICULES ANIMÉES ---- */}
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="fixed inset-0 -z-20 pointer-events-none" />

      {/* ---- SVG BLOB ANIMÉ ---- */}
      <motion.div
        className="absolute top-[-100px] left-[-80px] w-[820px] h-[420px] -z-10 opacity-60 pointer-events-none"
        initial={{ scale: 1, rotate: 0 }}
        animate={{
          scale: [1, 1.04, 1, 0.97, 1],
          rotate: [0, 10, -8, 8, 0],
          transition: { repeat: Infinity, duration: 14, ease: "easeInOut" },
        }}
      >
        <motion.svg
          viewBox="0 0 800 400"
          fill="none"
          className="w-full h-full"
        >
          <ellipse
            cx="400"
            cy="200"
            rx="380"
            ry="160"
            fill="url(#grad1)"
          />
          <defs>
            <linearGradient id="grad1" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>

      {/* ---- MARQUEE ---- */}
      <div className="py-2 border-b border-slate-800 bg-gradient-to-r from-blue-950/60 via-orange-900/40 to-blue-900/60">
        <Marquee gradient={false} speed={35}>
          <span className="mx-8 text-lg tracking-wide text-blue-200 font-semibold">Baseball, code & créativité – Let’s build the future.</span>
          <span className="mx-8 text-pink-200">Portfolio ⚾️ | Développement web et mobile | Projet sur-mesure</span>
        </Marquee>
      </div>

      {/* ---- HERO ---- */}
      <section className="relative flex flex-col justify-center items-center min-h-[70vh] py-20 px-4">
  {/* Glow dynamique autour */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: [1, 1.09, 1] }}
    transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none"
  >
    <div className="rounded-3xl blur-3xl bg-gradient-to-tr from-blue-500 via-sky-400 to-orange-400 opacity-40 w-[480px] h-[340px]"></div>
  </motion.div>
  
  {/* Boîte d'accueil principale */}
  <motion.div
    initial={{ y: 60, opacity: 0, scale: 0.97 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ type: "spring", duration: 1.3, bounce: 0.24 }}
    className="relative z-10 max-w-2xl w-full bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-400/30 p-10 flex flex-col items-center"
    style={{
      boxShadow: "0 8px 48px 0 rgba(30,64,175,0.21), 0 1.5px 16px 0 rgba(251,191,36,0.14)"
    }}
  >
    <Badge className="mb-5 bg-gradient-to-r from-blue-500 to-orange-400 text-white px-5 py-1.5 text-lg shadow-md border-0" variant="default">
      Développeur Full-Stack passionné
    </Badge>
    <motion.h1
      initial={{ letterSpacing: "-0.08em" }}
      animate={{ letterSpacing: "0.03em" }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-orange-400 drop-shadow-xl mb-3"
    >
      Kevin Bigoni
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1.1 }}
      className="text-xl md:text-2xl text-gray-100 mb-6 font-medium text-center max-w-xl"
    >
      <span className="block mb-1 italic">Créer des solutions, gagner des défis</span>
      <span className="font-bold text-blue-300">Next.js</span>, <span className="font-bold text-orange-300">React Native</span>, <span className="font-bold text-cyan-300">Supabase</span><br />
      <span className="text-sm text-orange-100 opacity-70 font-mono tracking-wider block mt-2">
        — Mon terrain de jeu préféré ⚾️
      </span>
    </motion.p>

    {/* Boutons d'action */}
    <div className="flex flex-wrap gap-5 justify-center mt-4">
      <motion.div whileHover={{ scale: 1.09 }} whileTap={{ scale: 0.97 }}>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white shadow-lg border-0 px-7"
          asChild
        >
          <a href="mailto:kevin.bigoni@outlook.fr">
            <Mail className="mr-2 h-5 w-5" /> Discutons projet
          </a>
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.09 }} whileTap={{ scale: 0.97 }}>
        <Button
          variant="outline"
          className="border-2 border-blue-400/50 text-blue-100 hover:bg-white/90 hover:text-slate-900 hover:border-orange-400 bg-white/10 shadow-lg px-7 transition"
          asChild
        >
          <a href="https://github.com/heros20" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-5 w-5" /> GitHub
          </a>
        </Button>
      </motion.div>
    </div>

    {/* Slogan animé */}
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 0.82, y: 0 }}
      transition={{ delay: 1, duration: 1.2 }}
    >
      <span className="uppercase tracking-widest text-xs text-blue-200 font-semibold">
        #BuiltWithPassion #CodeAndPlay #NeverBackDown
      </span>
    </motion.div>
  </motion.div>
</section>

      {/* About */}
      <section className="py-20 px-6 bg-slate-800/70">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <RoughNotation type="underline" color="#38bdf8" show={true} animationDelay={2600} animationDuration={800}>
                Développeur par passion, <span className="text-blue-400">compétiteur par nature</span>
              </RoughNotation>
            </h2>
            <p className="text-gray-300 text-lg mb-4">
              Depuis que j'ai découvert le code, c'est devenu ma deuxième passion après le baseball. Même esprit : stratégie, précision, et ne jamais lâcher.
            </p>
            <p className="text-gray-300 text-lg mb-4">
              Chez les Comets, j'ai appris que chaque détail compte. Dans le dev, c'est pareil : chaque ligne de code a son importance.
            </p>
            <p className="text-gray-300 text-lg">
              Mon truc ? Créer des apps qui marchent vraiment, avec une UX qui fait plaisir.
            </p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-blue-600 to-red-600 p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Stack Technique</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Next.js", "React Native", "TypeScript", "Supabase", "Tailwind CSS", "Node.js", "PostgreSQL", "Git"].map(tech => (
                <Badge key={tech} className="bg-white/20 text-white text-center py-2 rounded-md">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Box Projet en ligne centrée */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="bg-slate-700/60 rounded-lg p-4 text-center w-44 shadow-lg backdrop-blur-xl border border-slate-600">
            <Globe className="mx-auto text-red-400 mb-2 animate-pulse" />
            <p className="font-bold text-xl">1</p>
            <p className="text-sm text-gray-400">Projet en ligne</p>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            <RoughNotation type="circle" color="#f472b6" show={true} animationDelay={3500} animationDuration={800}>
              Mes derniers <span className="text-blue-400">home runs</span>
            </RoughNotation>
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
            Quelques projets qui montrent ce que je sais faire. Du web au mobile, toujours avec la même obsession : que ça marche parfaitement.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.1 * idx }}
                style={{ maxWidth: 480, width: "100%" }}
              >
                <Card className="bg-white/10 backdrop-blur-xl border border-slate-700 hover:border-blue-500 shadow-2xl transition group">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-md transition group-hover:scale-105 duration-300"
                    />
                  </a>
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      {project.title}
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition" />
                      </a>
                    </CardTitle>
                    <CardDescription className="text-gray-400">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <Badge key={t} className="border border-blue-300 text-blue-300">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-slate-800/60">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-slate-600 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Parlons projet</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Ton nom" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-600 border-slate-500 text-white" required />
                  <Input placeholder="Ton email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-slate-600 border-slate-500 text-white" required />
                  <Textarea placeholder="Ton message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-slate-600 border-slate-500 text-white" required />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="mr-2 h-4 w-4" /> Envoyer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="space-y-6 text-gray-300"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-blue-400" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href="mailto:kevin.bigoni@outlook.fr" className="hover:underline text-blue-300">
                  kevin.bigoni@outlook.fr
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-red-400" />
              <div>
                <p className="font-semibold text-white">Localisation</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Boulleville+27210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-red-300"
                >
                  Boulleville (27)
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-green-400" />
              <div>
                <p className="font-semibold text-white">Téléphone</p>
                <a href="tel:0613623108" className="hover:underline text-green-300">
                  06.13.62.31.08
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-slate-700 text-sm text-gray-500">
        <p>© 2025 Kevin - Développeur Full-Stack • Fait avec ❤️ et beaucoup de ☕</p>
        <p className="mt-2 italic">"Code like you're batting for the championship" ⚾</p>
      </footer>
    </div>
  );
}
