import Image from "next/image";
import { CompareSlider } from "@/components/sections/CompareSlider";
import { getZoneBySlug, zoneImagePath } from "@/content/avant-apres";

/**
 * Comparateur unique, rendu côté serveur.
 * Utilisé sur l'accueil ; la page Avant / Après passe par la galerie.
 */
export function BeforeAfter({
  slug,
  sizes = "(min-width: 768px) 45vw, 100vw",
  priority = false,
}: {
  slug: string;
  sizes?: string;
  priority?: boolean;
}) {
  const zone = getZoneBySlug(slug);
  if (!zone) return null;

  return (
    <CompareSlider
      label={zone.label}
      before={
        <Image
          src={zoneImagePath(zone.slug, "avant")}
          alt={zone.altBefore}
          width={zone.width}
          height={zone.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      }
      after={
        <Image
          src={zoneImagePath(zone.slug, "apres")}
          alt={zone.altAfter}
          width={zone.width}
          height={zone.height}
          sizes={sizes}
          className="h-auto w-full"
        />
      }
    />
  );
}
