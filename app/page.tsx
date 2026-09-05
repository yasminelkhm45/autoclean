import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { BrandImage } from "@/components/ui/BrandImage";
import { Logomark } from "@/components/ui/Logo";
import { FormulaCards } from "@/components/sections/FormulaCards";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Reviews } from "@/components/sections/Reviews";
import { homeFaq } from "@/content/faq";
import { site } from "@/content/site";
import { pageMetadata, JsonLd, autoWashJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nettoyage automobile intérieur à Die | AutoClean Diois",
  description:
    "Atelier de nettoyage intérieur de voiture à Die, dans le Diois : shampoing des sièges, vapeur, finitions. Formules de 70 à 120 €. Pré-réservation en ligne.",
  path: "/",
});

const steps = [
  {
    title: "Vous pré-réservez en ligne",
    text: "Cinq écrans, deux minutes : véhicule, formule, options. Sans paiement et sans engagement.",
  },
  {
    title: "Nous vous rappelons",
    text: `Nous vous recontactons ${site.callbackDelay} pour confirmer le prix et caler le créneau qui vous arrange.`,
  },
  {
    title: "Vous déposez le véhicule",
    text: "À l'atelier, à Die. Le temps de la prestation, votre voiture est au sec, entre nos mains.",
  },
  {
    title: "Vous le récupérez comme neuf",
    text: "Habitacle propre, sain, sans odeur. Vous réglez sur place : carte, espèces ou virement.",
  },
];

const pillars = [
  {
    title: "Des produits professionnels",
    text: "Un produit dédié par matériau (tissu, cuir, plastique, vitre), appliqué à la bonne dilution. C'est ce qui nettoie en profondeur sans lustrer artificiellement ni encrasser les surfaces.",
  },
  {
    title: "Le détail, jusqu'au bout",
    text: "Grilles d'aération, contours de boutons, rails de sièges, cadres de portes : les zones qu'on ne voit qu'une fois assis dans la voiture sont traitées au pinceau, une par une.",
  },
  {
    title: "Un atelier équipé",
    text: "Injecteur-extracteur, nettoyeur vapeur, éclairage de contrôle : le travail se fait à l'abri, avec du matériel qui ne tient pas dans un coffre. C'est la différence avec un nettoyage sur parking.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={autoWashJsonLd()} />

      {/* 1. Hero : split photo / aplat noir */}
      <section className="bg-noir text-blanc relative overflow-hidden">
        <Logomark className="text-jaune/10 pointer-events-none absolute -top-32 -right-32 h-[34rem] w-[34rem]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="eyebrow text-jaune">Atelier à Die, Drôme (26)</p>
            <h1 className="display display-hero mt-4 text-[length:var(--text-display-hero)]">
              Nettoyage intérieur de voiture à Die
            </h1>
            <p className="text-gris mt-6 max-w-xl text-lg leading-relaxed">
              Nous redonnons à votre habitacle son état d'origine : sièges
              shampooinés, odeurs traitées, plastiques ravivés. Vous déposez la
              voiture, vous la récupérez comme neuve.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/reservation" variant="yellow">
                Pré-réserver
              </ButtonLink>
              <ButtonLink href="/avant-apres" variant="outline-light">
                Voir les résultats
              </ButtonLink>
            </div>
          </div>
          <BrandImage
            src="hero/habitacle-principal.jpg"
            alt="Intérieur de voiture nettoyé par AutoClean Diois"
            width={2400}
            height={1350}
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
            imgClassName="grayscale"
          />
        </div>
        {/* Bandeau de réassurance */}
        <div className="border-blanc/15 relative border-t">
          <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-2 px-4 py-5 text-center text-sm font-medium sm:px-6 lg:justify-between">
            <li>{site.clientsCount}</li>
            <li>
              Note {site.rating.value}/5 sur Google
            </li>
            <li>Intervention en atelier, à l'abri</li>
            <li>Sans paiement en ligne</li>
          </ul>
        </div>
      </section>

      {/* 2. Preuve immédiate : avant / après */}
      <section className="section-pad bg-blanc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">La preuve d'abord</p>
          <h2 className="display mt-3 max-w-2xl text-[length:var(--text-display-lg)]">
            Faites glisser. <span className="bg-jaune px-2">C'est le même</span>{" "}
            habitacle.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <BeforeAfter slug="sieges-tissu" label="Sièges tissu : shampoing par injection-extraction" />
            <BeforeAfter slug="sol-moquette" label="Sol moquette : extraction en profondeur" />
          </div>
          <div className="mt-8">
            <ButtonLink href="/avant-apres" variant="outline">
              Toutes les zones traitées
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 3. Formules */}
      <section className="section-pad border-gris/50 border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">Nos formules</p>
          <h2 className="display mt-3 text-[length:var(--text-display-lg)]">
            Trois niveaux, un seul standard&nbsp;: propre.
          </h2>
          <p className="text-noir/70 mt-4 max-w-2xl">
            Le prix dépend de la formule et des options, jamais de surprise à
            l'arrivée. Le tarif est confirmé avec vous par téléphone avant le
            rendez-vous.
          </p>
          <div className="mt-10">
            <FormulaCards />
          </div>
        </div>
      </section>

      {/* 4. Comment ça se passe */}
      <section className="section-pad bg-noir text-blanc relative overflow-hidden">
        <Logomark className="text-jaune/10 pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow text-jaune">Comment ça se passe</p>
          <h2 className="display mt-3 text-[length:var(--text-display-lg)]">
            Quatre étapes, zéro friction.
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="border-blanc/20 border-t pt-5">
                <span className="display text-jaune text-xl" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-gris mt-2 text-sm leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Pourquoi nous */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">Pourquoi nous</p>
          <h2 className="display mt-3 max-w-3xl text-[length:var(--text-display-lg)]">
            Ce qui fait la différence entre laver et{" "}
            <span className="bg-jaune px-2">remettre à neuf</span>
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.title} className="border-noir border-t-2 pt-5">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-noir/70 mt-3 leading-relaxed">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Avis clients */}
      <section className="section-pad bg-noir text-blanc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow text-jaune">Ils nous ont confié leurs clés</p>
          <h2 className="display mt-3 text-[length:var(--text-display-lg)]">
            Des clients qui reviennent, et qui le disent.
          </h2>
          <div className="mt-10">
            <Reviews />
          </div>
        </div>
      </section>

      {/* 7. FAQ courte */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow">Questions fréquentes</p>
            <h2 className="display mt-3 text-[length:var(--text-display-md)]">
              Avant de nous confier vos clés
            </h2>
            <Link href="/faq" className="mt-5 inline-block font-medium underline underline-offset-4">
              Toutes les questions →
            </Link>
          </div>
          <FaqAccordion items={homeFaq} headingLevel="h3" />
        </div>
      </section>

      {/* 8. CTA final */}
      <section className="bg-jaune section-pad-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-7 px-4 sm:px-6">
          <h2 className="display max-w-3xl text-[length:var(--text-display-lg)]">
            Votre voiture mérite mieux qu'un coup d'aspirateur.
          </h2>
          <p className="max-w-xl text-lg">
            Pré-réservez en deux minutes. Nous vous rappelons {site.callbackDelay} pour
            confirmer le créneau, sans paiement en ligne et sans engagement.
          </p>
          <ButtonLink href="/reservation">Pré-réserver maintenant</ButtonLink>
        </div>
      </section>
    </>
  );
}
