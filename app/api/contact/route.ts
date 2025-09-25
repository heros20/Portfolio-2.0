// app/api/contact/route.ts

import { NextResponse } from "next/server";

// Variables d'environnement (penser à les mettre dans .env.local en prod)
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1397597288066711689/sZxIfiyepJfgKjXkyLpHrZqNuVIo-Kc4HQHzSvgfpniISlNyVOiSyvFroHIXfuIHzqxT";
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || "6Le0-YwrAAAAAN0vnE1oyDTV0PSXr2MK8HhmfQV1";

export async function POST(req: Request) {
  try {
    const { name, email, message, captcha } = await req.json();

    // --- Validation stricte des champs ---
    if (
      !name || !email || !message || !captcha ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      typeof captcha !== "string" ||
      name.length < 2 || name.length > 40 ||
      email.length < 5 || email.length > 60 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.length < 6 || message.length > 600
    ) {
      return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
    }

    // --- Vérification reCAPTCHA Google (anti-bot) ---
    const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${RECAPTCHA_SECRET}&response=${captcha}`,
    });
    const captchaJson = await captchaRes.json();

    if (!captchaJson.success || (typeof captchaJson.score === "number" && captchaJson.score < 0.5)) {
      return NextResponse.json({ error: "Captcha échec" }, { status: 403 });
    }

    // --- Formatage et nettoyage des champs ---
    const content = [
      `**Nouveau message du portfolio !**`,
      `👤 **Nom** : ${sanitize(name)}`,
      `📧 **Email** : ${sanitize(email)}`,
      `💬 **Message** :`,
      sanitize(message),
    ].join("\n");

    // --- Envoi du message sur Discord ---
    const discordRes = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!discordRes.ok) {
      return NextResponse.json({ error: "Erreur Discord" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Nettoyage de base pour éviter les injections/merdes dans Discord
function sanitize(str: string) {
  return str.replace(/[<>{}\[\]$;]/g, "").trim();
}
