"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    // honeypot anti-bot (restera vide pour humains)
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { type: "ok" | "err"; text: string }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // évite le double-clic

    setLoading(true);
    setStatus(null);

    // Si le honeypot est rempli -> bot probable
    if (form.website.trim().length > 0) {
      setStatus({ type: "err", text: "Échec de l’envoi (détection bot)." });
      setLoading(false);
      return;
    }

    // Petite validation côté client (optionnelle mais utile)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "err", text: "Merci de remplir tous les champs requis." });
      setLoading(false);
      return;
    }

    // Timeout pour éviter les requêtes qui pendent
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000); // 15s

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      clearTimeout(timer);

      if (!res.ok) {
        // Essaye de lire un message d’erreur renvoyé par l’API si dispo
        let serverMsg = "";
        try {
          const data = await res.json();
          serverMsg = typeof data?.message === "string" ? data.message : "";
        } catch {
          /* ignore JSON parse error */
        }
        throw new Error(serverMsg || `Erreur d’envoi (${res.status})`);
      }

      setStatus({ type: "ok", text: "Message envoyé, merci !" });
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err: any) {
      const aborted = err?.name === "AbortError";
      setStatus({
        type: "err",
        text: aborted
          ? "Temps dépassé. Réessaie dans un instant."
          : (err?.message || "Erreur lors de l’envoi, réessaie plus tard."),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="bg-[#F5F5F5] text-[#111] py-24 px-6">
      <div className="mx-auto w-full max-w-4xl">
        {/* Titre */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-snug">
            Laissez moi un message
          </h2>
          <p className="mt-6 text-[15px] md:text-base leading-relaxed text-neutral-700">
            Donnez-moi du contexte&nbsp;: objectifs, délais, budget cible, inspirations. Je réponds sous 24h
            ouvrées en moyenne.
          </p>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6 border border-neutral-300 p-6 md:p-8"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nom
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Ton nom"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="focus-visible:ring-[#B4F116]"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ton.email@exemple.fr"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="focus-visible:ring-[#B4F116]"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Décris ton besoin, le contexte, les contraintes…"
              value={form.message}
              onChange={handleChange}
              required
              rows={7}
              className="focus-visible:ring-[#B4F116]"
              disabled={loading}
            />
          </div>

          {/* Honeypot (invisible pour les humains) */}
          <div className="hidden">
            <label htmlFor="website">Site web</label>
            <input
              id="website"
              name="website"
              type="text"
              value={form.website}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#111] hover:bg-[#111]/90 text-white focus-visible:ring-[#B4F116]"
            >
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Envoi..." : "Envoyer"}
            </Button>

            <p className="text-xs text-neutral-500">
              En cliquant sur “Envoyer”, tu acceptes d’être recontacté par email.
            </p>
          </div>

          {/* Zone de statut accessible */}
          <div
            role="status"
            aria-live="polite"
            className={`text-sm ${
              status?.type === "ok"
                ? "text-green-700"
                : status?.type === "err"
                ? "text-red-700"
                : "text-neutral-600"
            }`}
          >
            {status?.text ?? ""}
          </div>
        </form>
      </div>
    </section>
  );
}
