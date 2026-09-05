# Hypothèses prises — à confirmer avec le client avant mise en ligne

Aucune de ces hypothèses ne bloque la structure du site : tout se corrige dans `content/site.ts` et `content/zones.ts` sans toucher au code.

## Coordonnées et fiche entreprise (`content/site.ts`)
1. **Adresse exacte de l'atelier** — hypothèse : « Zone artisanale de Chamarges, 26150 Die ». Impacte : footer, contact, zone d'intervention, JSON-LD `AutoWash`, mentions légales.
2. **Coordonnées GPS** — hypothèse : 44.7539 / 5.3697 (centre de Die). À remplacer par celles de l'atelier.
3. **Téléphone** — placeholder `+33 6 00 00 00 00`. À remplacer partout via `site.phone` / `site.phoneHref`.
4. **Email de réception des demandes** — hypothèse : `contact@autoclean-diois.fr` (aussi dans `.env` : `RESERVATION_TO_EMAIL`).
5. **Horaires d'ouverture** — hypothèse : lun–ven 8h30–18h, sam 9h–12h sur RDV. Impacte l'affichage et `openingHoursSpecification`.
6. **Lien de la fiche Google Business Profile** — placeholder `https://g.page/autoclean-diois`. Utilisé dans `sameAs` et le lien « note 5/5 sur Google ».
7. **Raison sociale, forme juridique, SIRET, responsable de publication** — requis pour les mentions légales.

## Contenus
8. **Communes, distances et temps de trajet** (`content/zones.ts`) : chaque commune a désormais sa page, avec une distance en kilomètres et un temps de trajet affichés noir sur blanc. Ces valeurs sont estimées depuis Die et doivent être vérifiées une par une, car elles apparaissent aussi dans les descriptions Google.
8 bis. **Contenu des pages de commune** : les paragraphes décrivant ce que vous constatez sur les véhicules de chaque secteur (boue des cols à Châtillon, humidité de rivière à Saillans, véhicules de société à Crest) sont des hypothèses plausibles rédigées à partir de la géographie locale. Ce sont elles qui rendent ces pages légitimes aux yeux de Google : relisez-les et corrigez ce qui ne correspond pas à votre réalité de terrain.
8 ter. **Articles de conseils** (`content/articles.ts`) : six articles rédigés à partir de connaissances générales du métier. Ils n'avancent aucun chiffre sur votre entreprise, mais ils parlent en votre nom. À relire avant mise en ligne, en particulier les fourchettes de prix du marché citées dans l'article sur les tarifs.
9. **Nombre d'avis Google** — hypothèse `count: 12` dans `site.rating` (affiché nulle part pour l'instant, utilisé nulle part en JSON-LD). Le « plus de 50 clients satisfaits » et la note 5/5 viennent de l'ancien site : à re-vérifier à la date de mise en ligne.
10. **Délai de rappel annoncé** — « sous 24 h ouvrées » (`site.callbackDelay`). Affiché sur l'accueil, le tunnel, la confirmation et les emails : à valider car c'est un engagement.
11. **Durées et inclusions des formules** — désormais reprises de votre maquette (2 h à 3 h, 3 h à 4 h 30, 4 h 30 à 6 h). À relire une dernière fois dans `content/offre.ts`.
11 bis. **« Élimine 99,99 % des bactéries »** (formule Prestige) — cette allégation figurait sur votre maquette. Elle doit pouvoir être justifiée (fiche technique de l'appareil vapeur ou du produit) : la DGCCRF considère ce type de chiffre comme une allégation vérifiable. Si le justificatif n'existe pas, remplacer par « désinfection vapeur en profondeur » dans `content/offre.ts`.
11 ter. **Modèles cités par catégorie de véhicule** (Peugeot 208, Audi A4, VW Tiguan…) — repères visuels uniquement, aucune marque n'est partenaire. Modifiables dans `content/offre.ts`.
12. **Champ email facultatif à l'étape 5** — ajouté pour pouvoir envoyer l'email de confirmation client demandé dans le brief (le tunnel d'origine ne collectait que le téléphone). À valider ; supprimable sans casse.
12 bis. **Date et moment de la journée souhaités** — champs facultatifs ajoutés à l'étape 5. Ils ne réservent rien : ils remontent simplement dans l'email pour que le rappel téléphonique parte avec une proposition. Si vous préférez ne rien demander, supprimer le bloc correspondant dans `components/reservation/ContactStep.tsx`.
12 ter. **Numéro de référence** (format `AC-JJMM-XXXX`) — généré à l'envoi, affiché sur la page de confirmation et repris dans l'objet des deux emails. Pratique pour retrouver une demande au téléphone ; il n'est stocké nulle part, il vit dans l'email.

## Technique
13. **Fontes** : Steg Regular et Helvetica Neue sans licence web disponible → substituts self-hostés **Bricolage Grotesque 800** (display) et **Inter** (texte), comme prévu par le brief. Si les licences sont achetées, remplacer les fichiers dans `app/fonts/`.
14. ~~Logos SVG~~ — **fait** : les exports officiels de la charte (logomark + lockups noir/blanc/jaune) sont en place dans `public/images/marque/` et dans le composant `Logo`.
15. **FAQPage JSON-LD** : posé sur `/faq` uniquement. La FAQ courte de l'accueil réutilise les mêmes questions ; les baliser deux fois créerait le doublon que le brief interdit, et Google n'affiche de toute façon plus les résultats enrichis FAQ pour ce type de site.
16. **Expéditeur email** : configurer un domaine vérifié dans Resend (`RESERVATION_FROM_EMAIL`), sinon les envois partent de `onboarding@resend.dev`.
