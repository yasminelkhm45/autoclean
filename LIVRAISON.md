# Checklist de livraison

Tout ce qu'il reste à fournir ou à confirmer avant la mise en ligne définitive.
Trois niveaux : **bloquant** (le site ne peut pas partir sans), **important**
(le site fonctionne mais quelque chose est faux ou manquant à l'écran),
**complémentaire** (hors du dépôt, mais nécessaire à la présence en ligne).

---

## 1. BLOQUANT : informations de l'entreprise

Tout se modifie dans `content/site.ts`. Chaque valeur marquée `À CONFIRMER`
est aujourd'hui une hypothèse de travail.

| Champ | Valeur actuelle | À fournir |
|---|---|---|
| `legalName` | AutoClean Diois | Raison sociale exacte |
| `phone` / `phoneHref` | `+33 6 00 00 00 00` | Le vrai numéro |
| `email` | contact@autoclean-diois.fr | L'adresse qui reçoit les demandes |
| `address.street` | Zone artisanale de Chamarges | Adresse exacte de l'atelier |
| `geo` | 44.7539 / 5.3697 | Coordonnées GPS de l'atelier (clic droit sur Google Maps, « Plus d'infos sur cet endroit ») |
| `openingHours` | lun-ven 8h30-18h, sam 9h-12h | Horaires réels |
| `googleBusinessUrl` | `https://g.page/autoclean-diois` | Lien de la fiche Google Business Profile |
| `rating.count` | 12 | Nombre d'avis Google réel |
| `callbackDelay` | sous 24 h ouvrées | Le délai que vous vous engagez à tenir |

**Mentions légales** (`app/mentions-legales/page.tsx`) : forme juridique,
numéro SIRET, nom du responsable de publication. Obligatoire légalement.

**Le numéro de téléphone est le point le plus critique** : il apparaît dans le
pied de page, la page Contact, la barre fixe mobile, les emails et les données
structurées lues par Google.

---

## 2. BLOQUANT : envoi des emails

Sans cette configuration, les demandes de pré-réservation ne partent pas :
elles sont seulement écrites dans les journaux du serveur.

1. Créer un compte sur [resend.com](https://resend.com).
2. Y vérifier le domaine `autoclean-diois.fr` (ajout de trois enregistrements DNS).
3. Renseigner les trois variables dans Vercel (Settings, Environment Variables) :

```
RESEND_API_KEY=re_...
RESERVATION_TO_EMAIL=votre@adresse.fr
RESERVATION_FROM_EMAIL="AutoClean Diois <no-reply@autoclean-diois.fr>"
```

L'adresse d'expédition doit utiliser le domaine vérifié, sans quoi les messages
finissent en indésirables.

---

## 3. IMPORTANT : images manquantes

### Trois visuels de formule

**Fait.** Les trois images sont en place dans `public/images/formules/`. Plus
aucun cadre gris sur le site.

### Photo de l'atelier (recommandée)

Le hero de l'accueil affiche aujourd'hui le visuel de l'utilitaire floqué, issu
de votre charte. C'est une image de présentation de marque, et un utilitaire en
pleine rue peut laisser croire à un service qui se déplace, alors que tout le
site répète que le travail se fait en atelier.

Une photo de l'atelier ou d'un habitacle fraîchement terminé serait plus juste :
`public/images/hero/atelier.jpg`, 1920×1080, puis un chemin à changer dans
`app/page.tsx`.

### Ce qui est déjà en place, à ne pas refournir

- 7 paires avant / après (14 photos + 14 vignettes)
- 5 illustrations de véhicules
- Logos SVG, favicons, icônes d'application, image de partage

---

## 4. IMPORTANT : contenus à relire

| Où | Quoi |
|---|---|
| `content/avis.ts` | Deux avis en ligne. Coller le **texte exact** des avis Google, jamais de texte réécrit. |
| `content/zones.ts` | Distances et temps de trajet des 7 communes (estimés), plus le paragraphe décrivant ce que vous constatez sur les véhicules de chaque secteur. |
| `content/offre.ts` | Grille tarifaire complète, durées, et l'allégation « élimine 99,99 % des bactéries » qui doit pouvoir être justifiée par une fiche technique. |
| `content/articles.ts` | Six articles rédigés en votre nom, dont les fourchettes de prix du marché. |
| `content/faq.ts` | 14 questions et réponses. |

---

## 5. COMPLÉMENTAIRE : présence en ligne

Ces éléments ne sont pas dans le dépôt mais conditionnent la visibilité.

### Fiche Google Business Profile

C'est le premier levier de référencement local, devant le site lui-même.

- **Logo** : carré, 720×720 minimum. Utiliser `public/icons/icon-512.png`.
- **Photo de couverture** : 1024×576 minimum, paysage. La photo de l'atelier convient.
- **Photos supplémentaires** : les avant / après fonctionnent très bien ici.
- Renseigner la catégorie « Service de nettoyage de voitures », les horaires,
  la zone desservie et le lien vers `autoclean-diois.fr`.
- Une fois la fiche créée, reporter son URL dans `content/site.ts`.

### Instagram

- **Photo de profil** : carrée. `public/icons/icon-512.png` fonctionne telle quelle.
- Le compte `@autoclean_diois` est déjà lié depuis le site : vérifier qu'il est
  actif, sinon retirer le lien.

### Après la mise en ligne

1. Créer une propriété dans la Google Search Console et soumettre
   `https://autoclean-diois.fr/sitemap.xml`.
2. Passer les pages dans le [test des résultats enrichis](https://search.google.com/test/rich-results).
3. Vérifier une pré-réservation de bout en bout : formulaire, email reçu,
   fichier calendrier joint qui s'ouvre correctement.

---

## 6. Récapitulatif des dossiers

```
public/
├── icons/                 icônes d'application         ✔ fourni
├── images/
│   ├── avant-apres/       7 paires + vignettes         ✔ fourni
│   ├── formules/          3 visuels                    ✘ À FOURNIR
│   ├── hero/              visuel principal             ✔ fourni (à arbitrer)
│   ├── marque/            logos et logo email          ✔ fourni
│   └── vehicules/         5 illustrations              ✔ fourni
└── llms.txt                                            ✔ fourni

app/favicon.ico, app/icon.svg, app/apple-icon.png,
app/opengraph-image.png                                 ✔ fourni
```

Le détail des hypothèses restantes est dans `NOTES-A-CONFIRMER.md`,
les procédures de modification dans `README.md`.
