import type { Project } from "@/lib/projects";

export const defaultProjects: Project[] = [
  {
    id: "coeur-epheria",
    title: "Jeu Web :Le Coeur d'Epheria",
    description:
      "Jeu web RPG dark fantasy developpe from scratch en JavaScript : exploration, puzzles, progression, boss fights et UI immersive, jouable PC et mobile.",
    tech: ["JavaScript", "HTML", "CSS", "Supabase"],
    image: "/images/epheria.png",
    link: "https://le-coeur-d-epheria.vercel.app/",
    type: "Web",
  },
  {
    id: "comets-site",
    title: "Site des Comets d'Honfleur",
    description:
      "Site officiel des Comets d'Honfleur : plateforme web moderne avec actualites, calendrier, infos club et espace admin connecte a Supabase (gestion des membres, contenus et cotisations).",
    tech: ["Next.js", "Tailwind", "Supabase"],
    image: "/images/screenshot-comets.png",
    link: "https://les-comets-honfleur.vercel.app",
    type: "Web",
  },
  {
    id: "comets-mobile",
    title: "Application mobile Comets",
    description:
      "Application Android officielle des Comets d'Honfleur, avec calendrier, notifications push et suivi des resultats.",
    tech: ["React Native", "Expo", "Supabase"],
    image: "/images/comets.webp",
    link: "https://play.google.com/store/apps/details?id=com.lescomets.app",
    type: "Mobile",
  },
];
