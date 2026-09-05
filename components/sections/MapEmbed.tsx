"use client";

import { useState } from "react";

/**
 * L'iframe Google Maps n'est injectée qu'après un clic explicite :
 * zéro requête tierce (et zéro cookie) tant que l'utilisateur n'a rien demandé.
 */
export function MapEmbed({ query, label }: { query: string; label: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div
        className="border-gris bg-gris/20 flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-[var(--radius-card)] border p-6 text-center"
      >
        <p className="text-noir/70 mx-auto max-w-sm text-sm">
          La carte interactive est fournie par Google Maps et n'est chargée qu'à votre
          demande.
        </p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="bg-noir text-blanc min-h-11 rounded-full px-6 py-3 text-sm font-semibold"
        >
          Afficher la carte
        </button>
      </div>
    );
  }

  return (
    <iframe
      title={label}
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="aspect-video w-full rounded-[var(--radius-card)] border-0"
    />
  );
}
