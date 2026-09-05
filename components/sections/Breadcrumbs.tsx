import Link from "next/link";
import { site } from "@/content/site";
import { JsonLd } from "@/lib/seo";

type Crumb = { name: string; href: string };

/** BreadcrumbList seul, pour les pages où le fil d'Ariane visible n'a pas sa place. */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const all = [{ name: "Accueil", href: "/" }, ...items];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.href === "/" ? "" : item.href}`,
        })),
      }}
    />
  );
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Accueil", href: "/" }, ...items];
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Fil d'Ariane" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <ol className="text-noir/60 flex flex-wrap items-center gap-1.5 text-sm">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {last ? (
                  <span aria-current="page" className="text-noir font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="inline-block py-1 underline-offset-4 hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
