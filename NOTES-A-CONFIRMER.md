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
8. **Communes couvertes et temps de trajet** (`content/zones.ts`) — liste reprise du brief (Die, Châtillon-en-Diois, Luc-en-Diois, Saillans, Aouste-sur-Sye, Crest, Livron) avec temps estimés depuis Die. À valider/ajuster.
9. **Nombre d'avis Google** — hypothèse `count: 12` dans `site.rating` (affiché nulle part pour l'instant, utilisé nulle part en JSON-LD). Le « plus de 50 clients satisfaits » et la note 5/5 viennent de l'ancien site : à re-vérifier à la date de mise en ligne.
10. **Délai de rappel annoncé** — « sous 24 h ouvrées » (`site.callbackDelay`). Affiché sur l'accueil, le tunnel, la confirmation et les emails : à valider car c'est un engagement.
11. **Durées estimées des formules** (≈ 2 h / 3 h / 4 h) et **détail des inclusions** — reformulés à partir de la matière première du brief : à faire relire au client.
12. **Champ email facultatif à l'étape 5** — ajouté pour pouvoir envoyer l'email de confirmation client demandé dans le brief (le tunnel d'origine ne collectait que le téléphone). À valider ; supprimable sans casse.

## Technique
13. **Fontes** : Steg Regular et Helvetica Neue sans licence web disponible → substituts self-hostés **Bricolage Grotesque 800** (display) et **Inter** (texte), comme prévu par le brief. Si les licences sont achetées, remplacer les fichiers dans `app/fonts/`.
14. ~~Logos SVG~~ — **fait** : les exports officiels de la charte (logomark + lockups noir/blanc/jaune) sont en place dans `public/images/marque/` et dans le composant `Logo`.
15. **FAQPage JSON-LD** : posé sur `/faq` uniquement. La FAQ courte de l'accueil réutilise les mêmes questions ; les baliser deux fois créerait le doublon que le brief interdit, et Google n'affiche de toute façon plus les résultats enrichis FAQ pour ce type de site.
16. **Expéditeur email** : configurer un domaine vérifié dans Resend (`RESERVATION_FROM_EMAIL`), sinon les envois partent de `onboarding@resend.dev`.
