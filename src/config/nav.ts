// src/config/nav.ts
export type NavItem = { label: string; href: string; badge?: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Projets", href: "/projets" },
  { label: "À propos", href: "/about" },
];

// si tu veux en réutiliser certains ailleurs (ex: CTA):
export const CONTACT_LINK = "/contact";
