import { site } from "@/content/site";

/**
 * Gabarits d'emails.
 *
 * Contraintes propres au courrier électronique, qui expliquent le style de ce
 * fichier : mise en page en tableaux, styles en ligne uniquement, largeur fixe
 * de 600 pixels, aucune police distante. Gmail, Outlook et Apple Mail
 * n'appliquent ni flexbox, ni grille, ni feuille de style externe.
 *
 * Les images sont bloquées par défaut chez beaucoup de destinataires : le
 * message doit rester lisible et complet sans elles, d'où le texte alternatif
 * soigné sur le logo et l'absence d'information portée par une image seule.
 */

const JAUNE = "#FFFF00";
const NOIR = "#000000";
const BLANC = "#FFFFFF";
const GRIS_FOND = "#F4F4F1";
const GRIS_TEXTE = "#5A5A57";
const BORDURE = "#E3E3DF";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

export function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Texte libre saisi par un visiteur, rendu sur plusieurs lignes. */
function multiline(v: string): string {
  return escapeHtml(v).replace(/\r?\n/g, "<br />");
}

interface LayoutOptions {
  /** Repris comme texte d'aperçu dans la liste des messages. */
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function emailLayout(o: LayoutOptions): string {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${escapeHtml(o.title)}</title>
</head>
<body style="margin:0;padding:0;background:${GRIS_FOND};font-family:${FONT};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(o.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${GRIS_FOND};">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

  <!-- Bandeau de marque -->
  <tr>
    <td style="background:${NOIR};border-radius:20px 20px 0 0;padding:28px 32px 22px;">
      <!--
        PNG et non SVG : Gmail, Outlook et la plupart des webmails ne rendent
        pas le SVG dans un email. L'image est servie en 4x pour rester nette
        sur les écrans à haute densité.
      -->
      <img src="${site.url}/images/marque/email-logo.png"
           alt="${escapeHtml(site.name)}"
           width="218" height="44"
           style="display:block;border:0;height:44px;width:218px;max-width:100%;" />
    </td>
  </tr>
  <tr><td style="background:${JAUNE};height:5px;line-height:5px;font-size:0;">&nbsp;</td></tr>

  <!-- Contenu -->
  <tr>
    <td style="background:${BLANC};padding:32px;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:${GRIS_TEXTE};">
        ${escapeHtml(o.eyebrow)}
      </p>
      <h1 style="margin:0 0 16px;font-size:26px;line-height:1.25;color:${NOIR};font-weight:800;">
        ${escapeHtml(o.title)}
      </h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:${GRIS_TEXTE};">
        ${o.intro}
      </p>
      ${o.body}
      ${
        o.cta
          ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
        <tr><td style="background:${NOIR};border-radius:999px;">
          <a href="${o.cta.href}" style="display:inline-block;padding:15px 30px;font-size:15px;font-weight:700;color:${BLANC};text-decoration:none;">
            ${escapeHtml(o.cta.label)}
          </a>
        </td></tr></table>`
          : ""
      }
      ${
        o.secondary
          ? `<p style="margin:16px 0 0;font-size:14px;line-height:1.6;">
        <a href="${o.secondary.href}" style="color:${NOIR};text-decoration:underline;">${escapeHtml(o.secondary.label)}</a>
      </p>`
          : ""
      }
    </td>
  </tr>

  <!-- Pied de page -->
  <tr>
    <td style="background:${NOIR};border-radius:0 0 20px 20px;padding:26px 32px;">
      <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:${BLANC};">${escapeHtml(site.name)}</p>
      <p style="margin:0 0 14px;font-size:13px;line-height:1.6;color:#C0C4C8;">
        ${escapeHtml(site.address.postalCode)} ${escapeHtml(site.address.city)}<br />
        <a href="${site.phoneHref}" style="color:${JAUNE};text-decoration:none;">${escapeHtml(site.phone)}</a>
        &nbsp;&middot;&nbsp;
        <a href="${site.url}" style="color:${JAUNE};text-decoration:none;">autoclean-diois.fr</a>
      </p>
      <p style="margin:0;font-size:12px;line-height:1.6;color:#8A8D90;">
        Vous recevez ce message parce qu'une demande a été déposée sur notre site.
        Aucun paiement n'est demandé par email.
      </p>
    </td>
  </tr>
</table>

</td></tr>
</table>
</body>
</html>`;
}

/* ------------------------------ briques ------------------------------ */

/** Tableau récapitulatif à deux colonnes. */
export function recapTable(rows: { label: string; value: string }[]): string {
  const cells = rows
    .map(
      (r, i) => `<tr>
      <td style="padding:12px 0;font-size:14px;color:${GRIS_TEXTE};${i ? `border-top:1px solid ${BORDURE};` : ""}">
        ${escapeHtml(r.label)}
      </td>
      <td align="right" style="padding:12px 0;font-size:14px;font-weight:700;color:${NOIR};${i ? `border-top:1px solid ${BORDURE};` : ""}">
        ${r.value}
      </td>
    </tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="border:1px solid ${BORDURE};border-radius:14px;padding:4px 18px;">
    ${cells}
  </table>`;
}

/** Bande noire du total, chiffre en jaune. */
export function totalBand(label: string, value: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="margin-top:12px;background:${NOIR};border-radius:14px;">
    <tr>
      <td style="padding:16px 18px;font-size:15px;font-weight:700;color:${BLANC};">${escapeHtml(label)}</td>
      <td align="right" style="padding:16px 18px;font-size:22px;font-weight:800;color:${JAUNE};">${escapeHtml(value)}</td>
    </tr>
  </table>`;
}

/** Encadré neutre pour un message libre ou une précision. */
export function noteBox(title: string, content: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="margin-top:20px;background:${GRIS_FOND};border-radius:14px;">
    <tr><td style="padding:18px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${GRIS_TEXTE};">
        ${escapeHtml(title)}
      </p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:${NOIR};">${content}</p>
    </td></tr>
  </table>`;
}

/** Liste numérotée des étapes suivantes. */
export function steps(items: string[]): string {
  const rows = items
    .map(
      (t, i) => `<tr>
      <td width="30" valign="top" style="padding:8px 12px 8px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr><td width="26" height="26" align="center"
            style="background:${NOIR};border-radius:999px;font-size:13px;font-weight:700;color:${BLANC};line-height:26px;">
            ${i + 1}
          </td></tr>
        </table>
      </td>
      <td valign="top" style="padding:8px 0;font-size:15px;line-height:1.55;color:${NOIR};">${t}</td>
    </tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;">${rows}</table>`;
}

export { multiline, JAUNE, NOIR, GRIS_TEXTE };
