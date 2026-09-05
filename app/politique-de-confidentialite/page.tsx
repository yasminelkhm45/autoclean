import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Données collectées par autoclean-diois.fr, finalités, durées de conservation et droits RGPD. Site sans cookies publicitaires.",
  path: "/politique-de-confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Politique de confidentialité", href: "/politique-de-confidentialite" }]}
      />
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6">
        <h1 className="display text-[length:var(--text-display-lg)]">
          Politique de confidentialité
        </h1>
        <div className="mt-8 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold">Données collectées</h2>
            <p className="text-noir/75 mt-2">
              Le formulaire de pré-réservation collecte : nom, prénom, numéro de
              téléphone, email (facultatif), préférence de contact et les informations que
              vous choisissez de nous transmettre. Le formulaire de contact collecte :
              nom, email et votre message. Aucune donnée n'est collectée à votre insu.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Finalité et base légale</h2>
            <p className="text-noir/75 mt-2">
              Ces données servent exclusivement à traiter votre demande : vous rappeler
              pour confirmer un créneau, ou répondre à votre question. La base légale est
              votre consentement, recueilli par la case à cocher du formulaire. Elles ne
              sont ni revendues, ni utilisées à des fins publicitaires.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Destinataires et conservation</h2>
            <p className="text-noir/75 mt-2">
              Les demandes nous sont transmises par email via le prestataire Resend
              (resend.com). Elles sont conservées au maximum 12 mois après le dernier
              contact, puis supprimées.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Cookies et mesure d'audience</h2>
            <p className="text-noir/75 mt-2">
              Ce site ne dépose aucun cookie publicitaire ni traceur tiers. La mesure
              d'audience éventuelle est réalisée sans cookie et sans données personnelles,
              ce qui dispense d'un bandeau de consentement. La carte Google Maps n'est
              chargée qu'après votre clic explicite.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Vos droits</h2>
            <p className="text-noir/75 mt-2">
              Vous pouvez demander l'accès, la rectification ou la suppression de vos
              données à tout moment en écrivant à {site.email} ou par téléphone au{" "}
              {site.phone}. Vous pouvez également adresser une réclamation à la CNIL
              (cnil.fr).
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
