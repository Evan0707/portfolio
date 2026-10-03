# Les images du studio

Ce dossier sert au site du studio (`/studio`). Chaque emplacement attend un fichier **portant exactement ce nom**. Dès qu'il
existe, il s'affiche ; sinon une maquette (ou un cadre vide) tient sa place.
Rien à changer dans le code. En développement, une étiquette en pointillés
rappelle sur la page quel fichier manque encore.

| Fichier | Ce qu'il montre | Taille conseillée | État |
|---|---|---|---|
| `openchantier-mobile-accueil.png` | L'accueil de l'app (ma semaine, chantiers en cours) | 1170 × 2532 | **à ajouter** |
| `openchantier-mobile-chantier.png` | Les photos d'un chantier | 1170 × 2532 | **à ajouter** |
| `openchantier-mobile-chrono.png` | Le chrono de pointage | 1170 × 2532 | **à ajouter** |
| `openchantier-web.png` | L'aperçu d'OpenChantier (grande image de la section Produit) | 1600 × 1200 (4:3) | repris du portfolio |
| `portrait-evan.jpg` | Ton portrait (section À propos) | 1200 × 1500 (4:5) | repris du portfolio, en 311 × 391 : une version plus grande serait plus nette |

Côté décor :

- `Logo.svg` — ton monogramme. Le site utilise son tracé (`studio/components/brand.tsx`,
  `app/studio/icon.svg`) pour qu'il suive le thème clair ou sombre.
- La forme en fil de fer du héros n'est pas ici : c'est le fichier du portfolio,
  `public/Layer_1 1.webp`, utilisé par les deux sites.

Quelques repères :

- Les captures de téléphone sont **brutes** : sans cadre, sans titre au-dessus.
  Le site dessine déjà le cadre. Les visuels de la fiche Google Play (téléphone
  incliné, accroche) ne conviennent donc pas.
- Les images sont recadrées depuis le haut : ce qui compte doit être en haut de la capture.
- Elles s'affichent en niveaux de gris et reprennent leurs couleurs au survol,
  comme les projets du portfolio.
- Next.js redimensionne et compresse tout seul : inutile d'optimiser avant.
