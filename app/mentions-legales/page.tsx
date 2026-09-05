import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site autoclean-diois.fr : éditeur, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Mentions légales", href: "/mentions-legales" }]} />
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6">
        <h1 className="display text-[length:var(--text-display-lg)]">Mentions légales</h1>
        <div className="mt-8 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold">Éditeur du site</h2>
            <p className="text-noir/75 mt-2">
              {site.legalName}, {site.address.street}, {site.address.postalCode}{" "}
              {site.address.city}.
              <br />
              Téléphone : {site.phone}. Email : {site.email}.
              <br />
              {/* À CONFIRMER : forme juridique, SIRET, responsable de publication */}
              Forme juridique, numéro SIRET et responsable de publication : à compléter
              avant mise en ligne.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Hébergement</h2>
            <p className="text-noir/75 mt-2">
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
              (vercel.com).
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
            <p className="text-noir/75 mt-2">
              L'ensemble des contenus de ce site (textes, photographies, identité
              visuelle) est la propriété de {site.legalName}. Toute reproduction sans
              autorisation écrite est interdite.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
