import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * Composant serveur : affiche l'image si elle existe dans public/images/,
 * sinon un placeholder au bon ratio indiquant le fichier attendu.
 * Il suffit de déposer le fichier au bon chemin pour que le visuel apparaisse.
 */
export function BrandImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
}: {
  /** Chemin relatif à public/images/, ex. "hero/habitacle-principal.jpg" */
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "images", src));

  if (!exists) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={`border-gris bg-gris/20 text-noir/60 flex w-full items-center justify-center overflow-hidden rounded-[var(--radius-card)] border ${className}`}
      >
        <p className="max-w-full px-4 text-center font-mono text-xs leading-relaxed break-words">
          images/{src}
          <br />
          {width}&thinsp;×&thinsp;{height} min.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ aspectRatio: `${width} / ${height}` }}
      className={`relative w-full overflow-hidden rounded-[var(--radius-card)] ${className}`}
    >
      <Image
        src={`/images/${src}`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
