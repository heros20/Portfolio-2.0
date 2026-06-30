"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const CONTACT_EMAIL = "kevin.bigoni@outlook.fr";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<null | { type: "ok" | "err"; text: string }>(null);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio - contact de ${form.name || "visiteur"}`);
    const body = encodeURIComponent(
      [
        `Nom: ${form.name}`,
        `Email: ${form.email}`,
        "",
        "Message:",
        form.message,
      ].join("\n"),
    );

    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }, [form.email, form.message, form.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (form.website.trim().length > 0) {
      setStatus({ type: "err", text: "Échec de l'envoi." });
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "err", text: "Merci de remplir tous les champs requis." });
      return;
    }

    window.location.href = mailtoHref;
    setStatus({
      type: "ok",
      text: "Ton application email va s'ouvrir avec le message prêt à envoyer.",
    });
  };

  return (
    <section id="contact-form" className="bg-[#F5F5F5] px-6 py-24 text-[#111]">
      <div className="mx-auto w-full max-w-4xl">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-snug tracking-tight md:text-5xl">
            Laisse-moi un message
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-neutral-700 md:text-base">
            Donne-moi du contexte&nbsp;: objectifs, délais, budget cible, inspirations.
            Je réponds sous 24h ouvrées en moyenne.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6 border border-neutral-300 p-6 md:p-8"
          noValidate
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
              placeholder="Décris ton besoin, le contexte, les contraintes..."
              value={form.message}
              onChange={handleChange}
              required
              rows={7}
              className="focus-visible:ring-[#B4F116]"
            />
          </div>

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

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              type="submit"
              className="w-full bg-[#111] text-white hover:bg-[#111]/90 focus-visible:ring-[#B4F116] sm:w-auto"
            >
              <Send className="mr-2 h-4 w-4" />
              Envoyer
            </Button>

            <p className="text-xs text-neutral-500">
              En cliquant sur "Envoyer", tu ouvres ton client email avec un message prérempli.
            </p>
          </div>

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
