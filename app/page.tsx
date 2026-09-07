import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
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
    "Atelier de nettoyage intérieur de voiture à Solaure, à 7 km de Die : shampoing des sièges, vapeur, finitions. Formules de 60 à 160 €. Pré-réservation.",
  path: "/",
});

const steps = [
  {
    title: "Vous pré-réservez en ligne",
    text: "Cinq choix, deux minutes : véhicule, formule, options. Sans paiement et sans engagement.",
  },
  {
    title: "Nous vous rappelons",
    text: `Nous vous recontactons ${site.callbackDelay} pour confirmer le prix et définir un créneau qui vous arrange.`,
  },
  {
    title: "Vous déposez le véhicule",
    text: "À l'atelier, à Solaure. Le temps de la prestation, votre voiture est en sécurité, et cela nous permet de travailler dans les meilleures conditions.",
  },
  {
    title: "Vous le récupérez comme neuf",
    text: "Habitacle propre, sain, sans odeur. Vous réglez sur place : carte, espèces ou virement.",
  },
];

const pillars = [
  {
    title: "Des produits professionnels",
    text: "Un produit dédié par matériau (tissu, cuir, plastique, vitre). Cela permet d'éviter d'abîmer votre véhicule et d'obtenir un résultat optimal.",
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
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-20 lg:pb-20">
          <div>
            <p className="eyebrow text-jaune">Atelier à Solaure, Drôme (26)</p>
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
          <Image
            src="/images/hero/vehicule-atelier-autoclean-diois.jpg"
            alt="Utilitaire AutoClean Diois floqué aux couleurs de l'atelier de nettoyage automobile de Solaure, près de Die"
            width={1920}
            height={1080}
            sizes="(min-width: 1024px) 46vw, 100vw"
            priority
            fetchPriority="high"
            className="h-auto w-full rounded-[var(--radius-card)]"
          />
        </div>
        {/* Bandeau de réassurance */}
        <div className="border-blanc/15 relative border-t">
          <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-2 px-4 py-5 text-center text-sm font-medium sm:px-6">
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
          <div className="text-center">
            <p className="eyebrow">La preuve d'abord</p>
            <h2 className="display mx-auto mt-3 max-w-2xl text-[length:var(--text-display-lg)]">
              Faites glisser. <span className="bg-jaune px-2">C'est le même</span>{" "}
              habitacle.
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <BeforeAfter slug="sol-moquette" sizes="(min-width: 768px) 45vw, 100vw" />
            <BeforeAfter slug="sieges-cuir" sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/avant-apres" variant="outline">
              Toutes les zones traitées
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 3. Formules */}
      <section className="section-pad border-gris/50 border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
          <p className="eyebrow">Nos formules</p>
          <h2 className="display mt-3 text-[length:var(--text-display-lg)]">
            Trois niveaux, un seul standard&nbsp;: propre.
          </h2>
          <p className="text-noir/70 mx-auto mt-4 max-w-2xl">
            Le prix dépend de la formule et des options, jamais de surprise à
            l'arrivée. Le tarif est confirmé avec vous par téléphone avant le
            rendez-vous.
          </p>
          </div>
          <div className="mt-10">
            <FormulaCards />
          </div>
        </div>
      </section>

      {/* 4. Comment ça se passe */}
      <section className="section-pad bg-noir text-blanc relative overflow-hidden">
        <Logomark className="text-jaune/10 pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="eyebrow text-jaune">Comment ça se passe</p>
            <h2 className="display mt-3 text-[length:var(--text-display-lg)]">
              Quatre étapes, zéro friction.
            </h2>
          </div>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="border-blanc/20 border-t pt-5 text-center">
                <span className="display text-jaune text-xl" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-gris mx-auto mt-2 max-w-xs text-sm leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Pourquoi nous */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="eyebrow">Pourquoi nous</p>
            <h2 className="display mx-auto mt-3 max-w-3xl text-[length:var(--text-display-lg)]">
              Ce qui fait la différence entre laver et{" "}
              <span className="bg-jaune px-2">remettre à neuf</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.title} className="border-noir border-t-2 pt-5 text-center">
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
          <div className="text-center">
            <p className="eyebrow text-jaune">Ils nous ont confié leurs clés</p>
            <h2 className="display mt-3 text-[length:var(--text-display-lg)]">
              Des clients qui reviennent, et qui le disent.
            </h2>
          </div>
          <div className="mt-10">
            <Reviews />
          </div>
        </div>
      </section>

      {/* 7. FAQ courte */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 className="display mt-3 text-[length:var(--text-display-md)]">
              Avant de nous confier vos clés
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={homeFaq} headingLevel="h3" />
          </div>
          <p className="mt-8 text-center">
            <Link href="/faq" className="inline-block py-1 font-medium underline underline-offset-4">
              Toutes les questions
            </Link>
          </p>
        </div>
      </section>

      {/* 8. CTA final */}
      <section className="bg-jaune section-pad-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 text-center sm:px-6">
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
