# AutoClean Diois — autoclean-diois.fr

Site vitrine + tunnel de pré-réservation. Next.js 15 (App Router), TypeScript strict, Tailwind CSS 4, validation Zod, emails Resend, déploiement Vercel.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner RESEND_API_KEY
npm run dev                  # http://localhost:3000
npm run build                # build de production (0 erreur, 0 warning TS)
```

Sans `RESEND_API_KEY`, les demandes sont validées normalement et **journalisées dans la console serveur** au lieu d'être envoyées par email — pratique en local.

## Où modifier quoi

Tout le contenu éditable est centralisé et typé dans `content/` :

| Fichier | Contenu |
|---|---|
| `content/offre.ts` | Formules, prix, durées, inclusions, options, catégories de véhicules |
| `content/faq.ts` | Questions/réponses (le drapeau `home: true` = FAQ courte de l'accueil) |
| `content/avis.ts` | Avis clients (réels uniquement) |
| `content/zones.ts` | Communes couvertes : distance, itinéraire et contenu de leur page |
| `content/articles.ts` | Articles de la rubrique Conseils |
| `content/site.ts` | Coordonnées, horaires, téléphone, Instagram, délai de rappel |

### Comment fonctionne le tunnel
L'état vit dans l'URL (`/reservation?vehicule=suv&formule=confort&options=…&etape=3`) : un lien de reprise est donc partageable, le bouton « Précédent » du navigateur fonctionne, et une page rechargée ne perd rien. Les coordonnées saisies sont conservées en `sessionStorage` (sauf la case de consentement, volontairement redemandée). Une étape n'est atteignable que si les précédentes sont remplies : un lien trafiqué retombe sur la première étape incomplète.

Les liens de type `/reservation?formule=confort` (depuis la page Prestations) présélectionnent la formule et démarrent quand même à l'étape « Véhicule ».

### Modifier un prix
Dans `content/offre.ts`, changer la valeur `price` de la formule ou de l'option. Chaque formule porte aussi un objet `page` : c'est le contenu de sa page dédiée (`/prestations/essentielle`, etc.). Le nouveau prix est automatiquement répercuté sur la page Prestations, les cartes de l'accueil, le tunnel (total en temps réel), le récapitulatif, les emails et le JSON-LD.

Le champ `priceModifier` des catégories de véhicules (0 € par défaut) permet, si besoin un jour, de majorer une catégorie (ex. utilitaire +10 €) : il est déjà pris en compte dans le calcul du total.

### Ajouter un avis
Dans `content/avis.ts`, dupliquer un objet du tableau `reviews` et coller **le texte exact** laissé par le client (jamais d'avis inventé). Il apparaît aussitôt sur l'accueil.

### Remplacer une image
Déposer le fichier au chemin attendu dans `public/images/` (voir le manifeste ci-dessous). Tant que le fichier n'existe pas, un placeholder au bon ratio affiche le chemin et les dimensions attendues ; dès qu'il est déposé, le visuel apparaît, sans toucher au code.

| Chemin | Ratio | Dimensions mini |
|---|---|---|
| `hero/habitacle-principal.jpg` | 16:9 | 2400×1350 |
| `hero/atelier.jpg` | 4:3 | 1600×1200 |
| `avant-apres/{zone}-avant.jpg` / `-apres.jpg` | 4:3 | 1600×1200 |
| `formules/essentielle.jpg`, `confort.jpg`, `prestige.jpg` | 3:2 | 1200×800 |
| `process/etape-1.jpg` … `etape-4.jpg` | 1:1 | 900×900 |
| `marque/logo-noir.svg`, `logo-blanc.svg`, `logomark.svg` | — | vectoriel |
| `og/default.jpg` | 1.91:1 | 1200×630 |

Zones avant/après attendues (`{zone}`) : `sol-moquette`, `sieges-cuir`, `volant`, `sieges-tissu`, `plastiques`, `cadres-de-portes`, `sol-plastique` — cadrage identique avant/après.

Les SVG dans `marque/` sont les **exports officiels de la charte** (logomark, lockups noir/blanc/jaune) : ne pas les recolorer ni les déformer.

### Ajouter une commune
Dans `content/zones.ts`, ajouter un objet complet (nom, slug, code postal, distance, itinéraire, et les trois paragraphes `intro`, `context`, `practical`). La commune apparaît alors automatiquement : sur la page Zone d'intervention, dans le pied de page, dans le sitemap, dans l'`areaServed` du JSON-LD, et elle obtient sa propre page `/zone-intervention/[slug]` avec son image de partage.

⚠️ Les paragraphes doivent être réellement différents d'une commune à l'autre. Sept pages qui ne changeraient que le nom de la ville seraient des pages satellites : Google les déclasse, et elles n'apprennent rien au lecteur.

### Ajouter un article
Dans `content/articles.ts`, copier un objet et changer le `slug` (il devient l'URL). Le contenu s'écrit en blocs typés : `p`, `h2`, `h3`, `ul`, `ol`, `key` (encadré jaune) et `cta`. Un lien interne s'écrit `[texte](/chemin)` directement dans un paragraphe ou une puce. L'article apparaît aussitôt sur `/conseils`, dans le sitemap et reçoit son balisage `Article`.

Le champ `related` accepte des slugs d'autres articles : c'est ce qui alimente le bloc « À lire aussi » en bas de page.

## Architecture des URL

```
/                              accueil
/prestations                   les trois formules, tableau comparatif
  /prestations/essentielle     une page par formule
  /prestations/confort
  /prestations/prestige
/reservation                   tunnel de pré-réservation
  /reservation/confirmation    noindex
/avant-apres                   comparateurs photo
/zone-intervention             carte et tableau des communes
  /zone-intervention/die       une page par commune (7)
  /zone-intervention/crest     ...
/conseils                      rubrique éditoriale
  /conseils/[slug]             six articles
/faq                           questions fréquentes, balisage FAQPage
/contact
/mentions-legales
/politique-de-confidentialite
```

Le maillage suit ces silos : les articles renvoient vers les formules, les pages de commune vers les formules et vers les communes voisines, les pages de formule entre elles et vers le tableau comparatif. Le pied de page reprend les trois silos en colonnes, ce qui met chaque page à un clic de n'importe quelle autre.

## Organisation des fichiers

```
app/                    pages (App Router), sitemap.ts, robots.ts, images OG dynamiques
app/api/reservation     route handler : Zod, honeypot, délai mini, rate limiting, emails
app/api/contact         idem pour le formulaire de contact
components/ui           briques (boutons, logo, BrandImage/placeholder, pictos)
components/sections     sections de pages (header, footer, comparateur, accordéon…)
components/reservation  tunnel 5 étapes :
                          Funnel.tsx       orchestration, routage, envoi
                          StepRail.tsx     progression cliquable en arrière
                          SummaryPanel.tsx récapitulatif et total permanents
                          ContactStep.tsx  formulaire de l'étape 5
                          shared.ts        types, parsing d'URL, formats
lib/                    seo.tsx (métadonnées + JSON-LD), validation.ts, email.ts, rate-limit.ts, og.tsx
content/                tout le contenu éditable, typé
public/images/          visuels (placeholders tant que non fournis)
public/llms.txt         résumé de l'activité pour les moteurs conversationnels
```

## Choix techniques à connaître

- **Fontes** : la licence web de Steg Regular et d'Helvetica Neue n'étant pas disponible, le site self-héberge **Bricolage Grotesque 800** (display) et **Inter** (texte) en woff2, avec métriques de repli générées par `next/font` (CLS nul au swap). Pour passer aux fontes officielles : déposer les woff2 dans `app/fonts/` et ajuster les deux appels `localFont` de `app/layout.tsx`.
- **Redirections** : `/presta` → `/prestations` et `/pre-reservation` → `/reservation` sont déclarées dans `next.config.ts` (`permanent: true`, servi en 308 par Next — équivalent au 301 pour les moteurs).
- **Anti-spam** : honeypot + délai minimum de soumission + rate limiting par IP (5 requêtes/heure). Le rate limiting est en mémoire : suffisant sur Vercel pour ce trafic ; pour du multi-région strict, brancher Upstash Ratelimit dans `lib/rate-limit.ts`.
- **JSON-LD** : `AutoWash` (+ `Service`/`Offer` par formule) sur l'accueil, `FAQPage` sur `/faq` uniquement (pour ne pas dupliquer les mêmes questions dans deux balisages), `BreadcrumbList` sur toutes les pages intérieures, `ImageObject` sur les visuels avant/après. À valider après tout changement dans le [Rich Results Test](https://search.google.com/test/rich-results). Aucun `AggregateRating` auto-hébergé : la fiche Google Business Profile reste le levier avis.
- **Analytics** : aucun installé par défaut (zéro cookie → zéro bandeau). Recommandé : Vercel Analytics ou Plausible, tous deux sans cookie.
- **Carte** : l'iframe Google Maps n'est chargée qu'après clic explicite (aucune requête tierce par défaut).

## Sécurité

Les en-têtes sont définis dans `next.config.ts` (Next n'en pose aucun par défaut) :

| En-tête | Rôle |
|---|---|
| `Content-Security-Policy` | Limite les origines autorisées. Tolère `unsafe-inline` sur scripts et styles, que Next injecte en ligne : durcir demanderait un middleware à nonce et ferait perdre le rendu statique. |
| `X-Frame-Options: DENY` + `frame-ancestors 'none'` | Le site ne peut pas être intégré en iframe (clickjacking). |
| `Strict-Transport-Security` | Force HTTPS pendant deux ans. `preload` suppose un domaine servi exclusivement en HTTPS. |
| `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options` | Fuite de référent limitée, caméra/micro/géolocalisation désactivés, pas de deviner-le-type. |

Si vous ajoutez un jour un script tiers (analytics, widget d'avis), il faudra l'autoriser explicitement dans `script-src`, sinon le navigateur le bloquera silencieusement.

Autres garde-fous déjà en place :

- **Le prix est recalculé côté serveur** à partir de `content/offre.ts`. Un client qui manipulerait le total dans la requête n'obtiendrait rien.
- **Zod rejette tout champ hors schéma** : ajouter `"isAdmin": true` ou `"price": 0` à la requête est sans effet.
- **Les emails partent en text/plain** : du HTML saisi par un visiteur s'affiche littéralement. Les sujets passent par `sanitizeHeader()`, qui retire sauts de ligne et caractères de contrôle.
- **Le rate limiting est en mémoire** (5 requêtes par heure et par IP). Suffisant sur ce trafic ; pour du multi-région strict, brancher Upstash dans `lib/rate-limit.ts`.

Lancez `npm audit` avant chaque mise en production. Une alerte `postcss` subsiste : elle est transitive dans Next, concerne la génération des CSS au moment du build et non le site en ligne, et se résoudra avec Next 16.

## Déploiement (Vercel)

1. Importer le dépôt dans Vercel.
2. Renseigner les variables d'environnement (`RESEND_API_KEY`, `RESERVATION_TO_EMAIL`, `RESERVATION_FROM_EMAIL` avec un domaine vérifié dans Resend).
3. Vérifier le domaine `autoclean-diois.fr` et pointer les DNS.
4. Après mise en ligne : soumettre `sitemap.xml` dans la Search Console et valider les données structurées.

⚠️ Avant mise en ligne, traiter **NOTES-A-CONFIRMER.md**.
