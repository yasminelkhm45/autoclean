import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { OptionIcon } from "@/components/ui/OptionIcon";
import { formulas, options, formatPrice } from "@/content/offre";
import { site } from "@/content/site";
import { zones } from "@/content/zones";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return formulas.map((f) => ({ formule: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ formule: string }>;
}) {
  const { formule } = await params;
  const f = formulas.find((x) => x.id === formule);
  if (!f) return {};
  return pageMetadata({
    title: f.page.metaTitle,
    description: f.page.metaDescription,
    path: `/prestations/${f.id}`,
  });
}

export default async function FormulePage({
  params,
}: {
  params: Promise<{ formule: string }>;
}) {
  const { formule } = await params;
  const f = formulas.find((x) => x.id === formule);
  if (!f) notFound();
  const others = formulas.filter((x) => x.id !== f.id);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `Nettoyage intérieur de voiture, formule ${f.name}`,
          description: f.page.metaDescription,
          url: `${site.url}/prestations/${f.id}`,
          price: f.price,
          areaServed: zones.map((z) => z.name),
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Prestations", href: "/prestations" },
          { name: f.name, href: `/prestations/${f.id}` },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 pt-8 text-center sm:px-6">
        <h1 className="display text-[length:var(--text-display-xl)]">
          Formule {f.name}
        </h1>
        <p className="text-noir/60 mt-2 text-lg">{f.tagline}</p>

        <div className="border-noir/12 mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-[var(--radius-card)] border p-5">
          <p>
            <span className="display text-4xl">{formatPrice(f.price)}</span>
            <span className="text-noir/55 ml-2 text-sm">tarif de la formule</span>
          </p>
          <p className="text-noir/70">
            Durée : <strong className="text-noir">{f.duration}</strong> à l'atelier de Die
          </p>
          <ButtonLink href={`/reservation?formule=${f.id}`} className="ml-auto">
            Pré-réserver
          </ButtonLink>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed">{f.page.intro}</p>
      </div>

      <section aria-labelledby="deroule" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 id="deroule" className="display text-[length:var(--text-display-md)]">
          Comment se déroule la prestation
        </h2>
        <ol className="mt-6 flex flex-col gap-6">
          {f.page.process.map((p, i) => (
            <li key={p.title} className="flex gap-4">
              <span className="bg-noir text-blanc flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-noir/70 mt-1 leading-relaxed">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="inclus" className="bg-noir text-blanc">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
          <h2 id="inclus" className="display text-[length:var(--text-display-md)]">
            Ce qui est inclus
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {f.inclusions.map((inc) => (
              <li key={inc.label} className="flex gap-3">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="text-jaune mt-1 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m4 13 5 5L20 7" />
                </svg>
                <span>
                  {inc.label}
                  {inc.detail && <span className="text-gris block text-sm">{inc.detail}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pour-qui" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 id="pour-qui" className="display text-[length:var(--text-display-md)]">
          À qui elle s'adresse
        </h2>
        <ul className="mt-5 flex flex-col gap-2.5">
          {f.page.forWho.map((w) => (
            <li key={w} className="text-noir/80 flex gap-3 leading-relaxed">
              <span aria-hidden="true" className="bg-jaune mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
              {w}
            </li>
          ))}
        </ul>
        <p className="border-noir/15 mt-6 border-l-4 pl-5 leading-relaxed">{f.page.notFor}</p>
      </section>

      <section aria-labelledby="options" className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <h2 id="options" className="display text-[length:var(--text-display-md)]">
          Options disponibles avec cette formule
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {options.map((o) => (
            <li key={o.id} className="border-noir/12 flex gap-3 rounded-[var(--radius-card)] border p-4">
              <OptionIcon icon={o.icon} className="text-noir/60 mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="flex items-baseline justify-between gap-3 font-semibold">
                  {o.label} <span className="shrink-0">+{formatPrice(o.price)}</span>
                </p>
                <p className="text-noir/60 mt-1 text-sm leading-relaxed">{o.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="autres" className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <h2 id="autres" className="display text-[length:var(--text-display-md)]">
          Les autres formules
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <li key={o.id}>
              <Link
                href={`/prestations/${o.id}`}
                className="border-noir/12 hover:border-noir/45 block h-full rounded-[var(--radius-card)] border p-5 transition-colors"
              >
                <p className="display text-xl">
                  {o.name}, {formatPrice(o.price)}
                </p>
                <p className="text-noir/65 mt-2 text-sm leading-relaxed">{o.tagline}</p>
                <p className="text-noir/60 mt-3 text-sm">Durée : {o.duration}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-noir/60 mt-6">
          Vous hésitez ? Le{" "}
          <Link href="/prestations" className="font-medium underline underline-offset-4">
            tableau comparatif des trois formules
          </Link>{" "}
          met les inclusions côte à côte.
        </p>
      </section>
    </>
  );
}
