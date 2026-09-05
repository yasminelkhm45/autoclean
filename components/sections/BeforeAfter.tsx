import { BrandImage } from "@/components/ui/BrandImage";
import { CompareSlider } from "@/components/sections/CompareSlider";

/** Zones traitées, alignées sur le manifeste d'images avant-apres/{zone}-avant|apres.jpg */
export const beforeAfterZones = [
  { slug: "sol-moquette", label: "Sol moquette" },
  { slug: "sieges-cuir", label: "Sièges cuir" },
  { slug: "volant", label: "Volant" },
  { slug: "sieges-tissu", label: "Sièges tissu" },
  { slug: "plastiques", label: "Plastiques" },
  { slug: "cadres-de-portes", label: "Cadres de portes" },
  { slug: "sol-plastique", label: "Sol plastique" },
] as const;

export function BeforeAfter({
  slug,
  label,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: {
  slug: string;
  label: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <CompareSlider
      label={label}
      before={
        <BrandImage
          src={`avant-apres/${slug}-avant.jpg`}
          alt=""
          width={1600}
          height={1200}
          sizes={sizes}
          priority={priority}
          className="rounded-none"
        />
      }
      after={
        <BrandImage
          src={`avant-apres/${slug}-apres.jpg`}
          alt=""
          width={1600}
          height={1200}
          sizes={sizes}
          className="rounded-none"
        />
      }
    />
  );
}
