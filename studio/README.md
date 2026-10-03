# Evan G. Studio

Site vitrine du studio : développement de logiciels sur mesure pour les PME, avec
OpenChantier en produit de démonstration.

Il vit dans le dépôt du portfolio et se sert à l'adresse
[evan-g.com/studio](https://evan-g.com/studio). Même direction artistique, même
pile : Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Lenis · icônes Phosphor.

## Démarrer

Depuis la racine du dépôt :

```bash
npm install
npm run dev      # http://localhost:3000/studio
npm run build    # build de production (portfolio + studio)
npm run lint     # ESLint
npx tsc --noEmit # vérification des types
```

## Deux sites, un projet

Le projet a deux layouts racine, donc deux pages HTML indépendantes :

| | Portfolio | Studio |
|---|---|---|
| Adresse | `/` | `/studio` |
| Routes | `app/(portfolio)/` | `app/studio/` |
| Code | `app/components/`, `app/data/` | `studio/components/`, `studio/lib/` |
| Styles | `app/(portfolio)/globals.css` | `app/studio/globals.css` |

- Chaque site charge sa propre feuille de style : les jetons de l'un ne
  débordent pas sur l'autre.
- Passer de l'un à l'autre recharge la page entière. C'est voulu, et c'est ce
  que Next fait entre deux layouts racine.
- Le thème clair ou sombre est partagé : les deux sites lisent la même clé
  `theme` dans le navigateur.
- `app/robots.ts`, `app/sitemap.ts` et `app/favicon.ico` sont communs.
- Une adresse inconnue sous `/studio` affiche la page 404 du studio, grâce à
  `app/studio/[...rest]/page.tsx`. Ailleurs, c'est la page 404 par défaut de Next.

## Où changer quoi

| Je veux… | Fichier |
|---|---|
| Modifier un texte, un service, une question de la FAQ | `studio/lib/site.ts` — tout le contenu est là |
| Changer une adresse interne (`/studio`, `/studio#contact`…) | `routes`, dans `studio/lib/site.ts` |
| Changer les couleurs du thème | `app/studio/globals.css` (blocs sombre et clair, en tête) |
| Changer les polices | `app/studio/layout.tsx` (chargement) et `app/studio/globals.css` (`@theme`) |
| Ajouter ou remplacer une image | `public/images/` — voir `public/images/LISEZ-MOI.md` |
| Modifier une section | `studio/components/sections/` — un fichier par section |
| Modifier les mentions légales | `app/studio/mentions-legales/page.tsx` |

## Ce qui vient du portfolio

- **Les jetons** : fond `#0A0A0B`, texte blanc et son échelle d'opacité (`text-fg/20`,
  `border-fg/10`, `bg-fg/3`…), thème clair inversé, bande inversée (`.band`,
  utilisée par la section Méthode comme « Parcours » sur le portfolio).
- **Les polices** : Dela Gothic One (titres) et Livvic (texte).
- **Les composants** : bandeau de statut, titre de section, étiquette, boutons
  plein et contour, cartes à filet, champs soulignés, grille + halo de souris,
  grain, halos colorés, bouton aimanté, carte inclinable, bandeau défilant lié
  à la vitesse de défilement, frise à rail.
- **Les images** : la forme en fil de fer du héros (le même fichier,
  `public/Layer_1 1.webp`), le portrait, l'aperçu d'OpenChantier.

Deux écarts volontaires :

- Les textes secondaires utilisent `text-soft` et `text-mute` plutôt que
  `text-fg/50` et `text-fg/40` : un cran plus soutenus, ils passent le contraste
  AA dans les deux thèmes.
- Le contenu arrive visible et n'est masqué qu'une fois le JavaScript prêt
  (`studio/components/reveal-observer.tsx`) : la page se lit sans lui.

> **À corriger côté portfolio.** Sur evan-g.com, Livvic ne s'applique pas : le
> texte courant s'affiche dans la police système. Les variables de police sont
> posées sur `<body>`, alors que `--font-sans` (dans `@theme inline`) est résolue
> sur `:root`, où `--font-livvic` n'existe pas. Il suffit de déplacer
> `${livvic.variable} ${delaGothicOne.variable}` de `<body>` vers `<html>` dans
> `app/(portfolio)/layout.tsx`. Côté studio, c'est déjà le cas.

## Les images

Tant qu'un fichier manque, une maquette de l'application (ou un cadre vide, pour
le portrait) tient sa place : le site reste présentable. En développement, une
étiquette en pointillés indique le nom du fichier à déposer ; elle n'apparaît
jamais en production.

Les noms et les tailles sont listés dans [`public/images/LISEZ-MOI.md`](../public/images/LISEZ-MOI.md).

## Le formulaire de contact

Deux modes, choisis automatiquement :

- **Avec la clé Resend** (`RESEND_API_KEY`, celle du formulaire du portfolio) —
  le message part directement depuis le site (`app/studio/actions.ts`), depuis
  `contact@evan-g.com`, vers l'adresse du studio. Si l'envoi échoue, le visiteur
  retombe sur le second mode : un message n'est jamais perdu.
- **Sans clé** — le formulaire ouvre la messagerie du visiteur avec le message
  déjà rédigé, et propose Gmail, Outlook ou la copie du message si rien ne
  s'ouvre. Aucun service tiers, aucune donnée stockée.

Les variables sont décrites dans [`.env.example`](../.env.example).

## Avant de communiquer l'adresse

- [ ] Compléter les mentions légales : les passages en négatif dans
      `app/studio/mentions-legales/page.tsx` (adresse, téléphone, hébergeur).
- [ ] Relire `studio/lib/site.ts` : les engagements écrits en ton nom doivent être les
      tiens (réponse sous 24 h ouvrées, premier échange gratuit de 30 minutes,
      code remis au client, hébergement en Europe, disponibilité).
- [ ] Déposer les trois captures de l'application mobile.
- [ ] Envoyer un message de test depuis le formulaire en ligne.

## Structure

```
app/studio/
  layout.tsx            polices, métadonnées, thème, bandeau et pied de page
  page.tsx              la page d'accueil : assemble les sections
  globals.css           jetons de thème, animations, maquettes d'écran
  actions.ts            envoi du formulaire (Server Action)
  mentions-legales/     page légale
  [...rest]/            adresses inconnues : renvoie vers not-found.tsx
  opengraph-image.tsx   image de partage, générée au build
  icon.svg, apple-icon.tsx, not-found.tsx
studio/
  components/
    sections/           une section = un fichier
    effects/            décor et mouvement repris du portfolio
    ui/                 titre de section, étiquette, bouton
    status-bar.tsx, footer.tsx, contact-form.tsx, theme-toggle.tsx…
    mocks.tsx           écrans d'OpenChantier redessinés en HTML/CSS
    illustrations.tsx   illustrations des services (SVG)
  lib/
    site.ts             tout le contenu, et les adresses internes (`routes`)
    ui.ts               recettes de classes partagées (marges, cartes)
    contact.ts          validation et rédaction du message
  assets/fonts/         polices .ttf de l'image de partage
public/images/          les images du studio
```
