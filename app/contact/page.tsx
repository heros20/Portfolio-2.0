import ContactForm from "@/components/portfolio/ContactForm";
import ContactInfos from "@/components/portfolio/ContactInfos";

export const metadata = {
  title: "Contact - Portfolio Kevin Bigoni",
  description: "Contacter Kevin Bigoni pour un projet web ou mobile.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#F5F5F5] text-[#111]">
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Parlons de ton projet
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Un site, une application, une refonte ou une idée à cadrer. Donne-moi le contexte,
            je te réponds avec une suite claire.
          </p>
        </div>
      </section>
      <div className="grid gap-0 lg:grid-cols-2">
        <ContactForm />
        <ContactInfos />
      </div>
    </main>
  );
}
