import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ButtonLink } from "@/components/ui/Button";
import { faq } from "@/content/faq";
import { pageMetadata, JsonLd, faqJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ nettoyage intérieur : durée, produits, odeurs",
  description:
    "Durée des prestations, produits utilisés, odeurs de tabac ou d'animaux, taches anciennes, paiement : toutes les réponses de l'atelier AutoClean Diois.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />

      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <p className="eyebrow">Questions fréquentes</p>
        <h1 className="display mt-3 max-w-3xl text-[length:var(--text-display-xl)]">
          Tout ce qu'on nous demande avant de confier ses clés
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6">
        <FaqAccordion items={faq} />
        <div className="bg-jaune mt-14 flex flex-col items-start gap-4 rounded-[var(--radius-card)] p-8">
          <h2 className="display text-[length:var(--text-display-sm)]">
            Une question qui n'est pas ici ?
          </h2>
          <p>Appelez-nous ou écrivez-nous, on vous répond directement.</p>
          <ButtonLink href="/contact">Nous contacter</ButtonLink>
        </div>
      </div>
    </>
  );
}
