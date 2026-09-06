# Hypothèses prises, à confirmer avec le client avant mise en ligne

Aucune de ces hypothèses ne bloque la structure du site : tout se corrige dans `content/site.ts` et `content/zones.ts` sans toucher au code.

## Coordonnées et fiche entreprise (`content/site.ts`)
1. **Adresse exacte de l'atelier** : hypothèse : « Zone artisanale de Chamarges, 26150 Die ». Impacte : footer, contact, zone d'intervention, JSON-LD `AutoWash`, mentions légales.
2. **Coordonnées GPS** : hypothèse : 44.7539 / 5.3697 (centre de Die). À remplacer par celles de l'atelier.
3. **Téléphone** : placeholder `+33 6 00 00 00 00`. À remplacer partout via `site.phone` / `site.phoneHref`.
4. **Email de réception des demandes** : hypothèse : `contact@autoclean-diois.fr` (aussi dans `.env` : `RESERVATION_TO_EMAIL`).
5. **Horaires d'ouverture** : hypothèse : lun–ven 8h30–18h, sam 9h–12h sur RDV. Impacte l'affichage et `openingHoursSpecification`.
6. **Lien de la fiche Google Business Profile** : placeholder `https://g.page/autoclean-diois`. Utilisé dans `sameAs` et le lien « note 5/5 sur Google ».
7. **Raison sociale, forme juridique, SIRET, responsable de publication** : requis pour les mentions légales.

## Contenus
8. **Communes, distances et temps de trajet** (`content/zones.ts`) : chaque commune a désormais sa page, avec une distance en kilomètres et un temps de trajet affichés noir sur blanc. Ces valeurs sont estimées depuis Die et doivent être vérifiées une par une, car elles apparaissent aussi dans les descriptions Google.
8 bis. **Contenu des pages de commune** : les paragraphes décrivant ce que vous constatez sur les véhicules de chaque secteur (boue des cols à Châtillon, humidité de rivière à Saillans, véhicules de société à Crest) sont des hypothèses plausibles rédigées à partir de la géographie locale. Ce sont elles qui rendent ces pages légitimes aux yeux de Google : relisez-les et corrigez ce qui ne correspond pas à votre réalité de terrain.
8 ter. **Articles de conseils** (`content/articles.ts`) : six articles rédigés à partir de connaissances générales du métier. Ils n'avancent aucun chiffre sur votre entreprise, mais ils parlent en votre nom. À relire avant mise en ligne, en particulier les fourchettes de prix du marché citées dans l'article sur les tarifs.
9. **Nombre d'avis Google** : hypothèse `count: 12` dans `site.rating` (affiché nulle part pour l'instant, utilisé nulle part en JSON-LD). Le « plus de 50 clients satisfaits » et la note 5/5 viennent de l'ancien site : à re-vérifier à la date de mise en ligne.
10. **Délai de rappel annoncé** : « sous 24 h ouvrées » (`site.callbackDelay`). Affiché sur l'accueil, le tunnel, la confirmation et les emails : à valider car c'est un engagement.
11. **Durées et inclusions des formules** : désormais reprises de votre maquette (2 h à 3 h, 3 h à 4 h 30, 4 h 30 à 6 h). À relire une dernière fois dans `content/offre.ts`.
11 bis. **« Élimine 99,99 % des bactéries »** (formule Prestige), cette allégation figurait sur votre maquette. Elle doit pouvoir être justifiée (fiche technique de l'appareil vapeur ou du produit) : la DGCCRF considère ce type de chiffre comme une allégation vérifiable. Si le justificatif n'existe pas, remplacer par « désinfection vapeur en profondeur » dans `content/offre.ts`.
11 ter. **Modèles cités par catégorie de véhicule** (Peugeot 208, Audi A4, VW Tiguan…), repères visuels uniquement, aucune marque n'est partenaire. Modifiables dans `content/offre.ts`.
12. **Champ email facultatif à l'étape 5** : ajouté pour pouvoir envoyer l'email de confirmation client demandé dans le brief (le tunnel d'origine ne collectait que le téléphone). À valider ; supprimable sans casse.
12 bis. **Date et moment de la journée souhaités** : champs facultatifs ajoutés à l'étape 5. Ils ne réservent rien : ils remontent simplement dans l'email pour que le rappel téléphonique parte avec une proposition. Si vous préférez ne rien demander, supprimer le bloc correspondant dans `components/reservation/ContactStep.tsx`.
12 ter. **Numéro de référence** (format `AC-JJMM-XXXX`), généré à l'envoi, affiché sur la page de confirmation et repris dans l'objet des deux emails. Pratique pour retrouver une demande au téléphone ; il n'est stocké nulle part, il vit dans l'email.

## Technique
13. **Fontes** : Steg Regular et Helvetica Neue sans licence web disponible → substituts self-hostés **Bricolage Grotesque 800** (display) et **Inter** (texte), comme prévu par le brief. Si les licences sont achetées, remplacer les fichiers dans `app/fonts/`.
14. ~~Logos SVG~~, **fait** : les exports officiels de la charte (logomark + lockups noir/blanc/jaune) sont en place dans `public/images/marque/` et dans le composant `Logo`.
15. **FAQPage JSON-LD** : posé sur `/faq` uniquement. La FAQ courte de l'accueil réutilise les mêmes questions ; les baliser deux fois créerait le doublon que le brief interdit, et Google n'affiche de toute façon plus les résultats enrichis FAQ pour ce type de site.
16. **Expéditeur email** : configurer un domaine vérifié dans Resend (`RESERVATION_FROM_EMAIL`), sinon les envois partent de `onboarding@resend.dev`.

## Points techniques laissés ouverts

17. **Next 16** : le projet est sur la dernière version corrigée de la branche 15 (15.5.25). Le passage à Next 16 soldera l'alerte `postcss` restante, mais c'est une version majeure : à faire sur une branche, avec un `npm run build` et un parcours complet du tunnel avant de fusionner.
18. **HSTS avec `preload`** : l'en-tête annonce que le domaine ne sera servi qu'en HTTPS pendant deux ans. C'est le bon réglage pour un site sur Vercel, mais l'inscription effective à la liste de préchargement des navigateurs se fait séparément sur hstspreload.org, et se révoque lentement. Ne l'y inscrivez qu'une fois le domaine définitivement en place.
19. **Scripts tiers** : la CSP bloquera tout script externe non déclaré. Si vous ajoutez Vercel Analytics, Plausible ou un widget d'avis Google, il faudra ajouter son domaine dans `script-src` et `connect-src` de `next.config.ts`.

## Photos avant / après

20. **Les sept paires sont en ligne** : sol plastique, sol moquette, sièges cuir, sièges tissu, volant et tableau de bord, plastiques de porte, cadres de portes. La série d'origine est donc complète.

21. **Nommage de la cinquième paire** : la photo montre un panneau de porte avec sa poignée et sa grille de haut-parleur. Je l'ai appelée « Plastiques de porte », ce qui décrit ce qu'on voit. Si vous préférez votre vocabulaire d'origine (« Cadres portes »), le libellé se change dans `content/avant-apres.ts` ; le slug peut rester tel quel, il n'est pas visible.

22. **Descriptions des zones** : chaque comparateur est accompagné d'une phrase expliquant le travail réalisé (méthode, difficulté). Elles sont plausibles au vu des photos mais c'est vous le professionnel : relisez-les, elles engagent votre expertise.

23. **Traitement appliqué aux photos** : recadrage 16:9, redimensionnement à 1600×900 (1152×648 pour les sièges tissu et 1536×864 pour le sol moquette, dont les originaux étaient plus petits ; aucun agrandissement n'a été fait), JPEG progressif qualité 84, et **suppression de toutes les métadonnées**. Ce dernier point compte : des photos prises au téléphone embarquent souvent les coordonnées GPS du lieu de la prise de vue. Vos fichiers d'origine n'en contenaient pas, mais gardez le réflexe pour les prochains.

24. **Recadrage du sol moquette et des cadres de portes** : ces deux paires arrivaient en 3:2 et en 16:9. Elles ont été ramenées au format commun 16:9 par un recadrage centré, ce qui rogne légèrement le haut et le bas des photos de moquette. Si un détail important se retrouve coupé, envoyez-moi les originaux recadrés comme vous le souhaitez et je les réintégrerai tels quels.

## Icônes et partage

25. **Icônes maskable régénérées** : le générateur de favicons déclarait les deux icônes du manifeste en `purpose: "maskable"`. C'est incorrect ici, Android rogne une icône maskable dans un cercle couvrant 80 % de la surface, et les lobes de l'éclaboussure arrivent à 16 px du bord sur 512 : ils auraient été coupés sur les téléphones Android. Les icônes fournies sont donc déclarées en `any`, et deux versions dédiées ont été créées, recentrées sur fond noir de la charte.

26. **Icône SVG** : le `favicon.svg` du générateur était un PNG encapsulé dans un SVG (13 ko, aucun gain de netteté). Il a été remplacé par un vrai vecteur construit à partir de votre logomark officiel : éclaboussure jaune sur fond noir, sans le mot-clé, illisible de toute façon à 16 px. Si vous préférez votre visuel exact partout, supprimez `app/icon.svg` et le `favicon.ico` prendra le relais.

27. **Image de partage** : votre carte officielle est utilisée pour l'accueil. Les pages intérieures conservent une carte générée avec leur propre titre, ce qui est plus efficace au partage. Pour utiliser votre carte partout, supprimer les fichiers `opengraph-image.tsx` des sous-dossiers de `app/`.

## Visuel du hero

28. **Le hero de l'accueil affiche l'utilitaire floqué** issu de la charte. Deux points à trancher : c'est une image de présentation de marque, pas une photo de votre véhicule réel, et un utilitaire en pleine rue peut laisser penser à un service qui se déplace, alors que tout le site explique que le travail se fait exclusivement à l'atelier de Die. Si le doute vous gêne, une photo de l'atelier ou d'un habitacle fraîchement nettoyé collerait mieux au discours ; le remplacement se fait en changeant un seul chemin dans `app/page.tsx`.

## Jaune de la charte

29. **Le jaune officiel est `#FFFF00`.** Il est défini une seule fois, dans le jeton `--color-jaune` de `app/globals.css`. Tout le site s'y réfère par la classe `jaune` : un futur changement de teinte se fait donc à cet endroit unique, sauf pour les images de partage générées (`lib/og.tsx`), qui redéfinissent la couleur parce qu'elles sont rendues hors CSS.

30. **Visuel du véhicule recoloré** : le flocage de l'utilitaire était dans l'ancien jaune. Comme il s'agit d'une photo avec des reflets et de l'ombre, les pixels jaunes ont été basculés vers le jaune pur en conservant les écarts de luminosité, plutôt qu'aplatis en une couleur unique. Le résultat est propre, mais si vous récupérez un jour le fichier source de ce visuel avec le bon jaune, il vaudra toujours mieux que ma retouche.

31. **Contraste** : le nouveau jaune améliore le rapport avec le noir, qui passe de 17,3 à 19,6 pour 1. Il reste évidemment inutilisable en texte sur blanc (1,07 pour 1), ce que la charte interdisait déjà.

## Illustrations de véhicules

32. **Les cinq illustrations sont des images générées**, pas des photos de véhicules réels. Les couleurs reprennent celles de votre ancien site (bleu pour la citadine, rouge pour la berline, jaune pour le SUV, orange pour le monospace, vert pour l'utilitaire). Elles servent de repère visuel : le texte sous chaque carte reste ce qui fait foi, et les images portent un texte alternatif vide, puisqu'elles n'ajoutent aucune information au libellé.

## Tarifs par catégorie de véhicule

33. **La grille tarifaire dépend désormais du véhicule** (`content/offre.ts`, champ `tarifs`) : de 60 € pour une Essentielle sur citadine à 160 € pour une Prestige sur monospace. Les utilitaires sont sur devis, avec un plancher indicatif pour l'Essentielle et la Confort et aucun montant affiché pour la Prestige. Toutes les mentions de prix du site, des articles, du `llms.txt` et des métadonnées ont été alignées sur la fourchette 60 à 160 €.

34. **Logo des emails** : les clients de messagerie ne rendent pas le SVG. Un `email-logo.png` a été généré à partir de vos vecteurs, servi en 4x pour rester net sur écran Retina. Si vous changez le logo, régénérez ce PNG.

35. **Calendrier joint aux emails** : l'événement est marqué `TENTATIVE` tant que le rendez-vous n'a pas été confirmé au téléphone, et intitulé comme un créneau souhaité. C'est volontaire : ajouter un rendez-vous confirmé à l'agenda du client avant votre appel créerait un malentendu si le créneau ne convient finalement pas.
