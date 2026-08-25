# Audit portfolio × CV — Evan Gery

> Croisement du CV (`Evan_GERY_CV.pdf`) et du site (`app/page.tsx`, `app/layout.tsx`).
> Objectif affiché sur le site : **décrocher une alternance**. Tout est jugé à cette aune.
> Date : 25 août 2026.

---

## 1. Diagnostic — ce qui manque, par criticité

### 🔴 Bloquant : un recruteur ne peut pas décider avec ce qu'il lit

| # | Manque | Pourquoi c'est bloquant |
|---|--------|--------------------------|
| 1 | **Le rythme et les dates de l'alternance** | Le site dit « Disponible en alternance » et s'arrête là. Un recruteur a besoin de 4 données avant même de lire le reste : **date de début**, **durée**, **rythme** (ex. 15 j / 15 j), **zone géographique**. Sans ça, il passe au CV suivant. D'après le CV, tu entres en **BUT 3 en 2026-2027** — donc rentrée **septembre 2026**, soit *maintenant*. C'est l'information la plus urgente du site. |
| 2 | **Aucun CV téléchargeable** | Pas de bouton « Télécharger mon CV (PDF) ». Le recruteur qui aime le site n'a rien à transférer à son manager ou à déposer dans son ATS. |
| 3 | **Aucun lien GitHub** | Pour un profil dev, l'absence de GitHub est lue comme un signal négatif. Le seul point de contact est un formulaire + une adresse Gmail. |
| 4 | **Aucun lien LinkedIn** | C'est le canal n°1 du recrutement en alternance. Sans lien, tu perds tous les recruteurs qui veulent te contacter *dans leur outil*. |
| 5 | **La formation est totalement absente** | BUT Informatique à l'IUT de Valence, parcours « Réalisation d'applications », Bac général mention AB. Rien sur le site. Or en alternance, **l'école et le diplôme préparé sont le premier filtre** (l'entreprise doit savoir avec quel établissement elle signe la convention). |

### 🟠 Fort impact : ton meilleur contenu n'est pas exposé

| # | Manque | Ce que ça coûte |
|---|--------|------------------|
| 6 | **Le stage chez EDF (Centrale de Saint-Alban, 2026)** | C'est la ligne la plus forte de ton CV : un grand groupe, un environnement industriel exigeant, un cadre sécurisé. Elle n'apparaît nulle part sur le site. C'est la preuve que « quelqu'un t'a déjà fait confiance ». |
| 7 | **Les projets d'études** | Le CV mentionne (a) une application web avec formalisation du besoin, note de cadrage, cahier des charges, UML, Scrum, travail en équipe et (b) une base de données MCD/MLD → SQL. Le site ne montre que 2 projets « produit » (openChantier, SFK). Or ces projets d'études prouvent exactement ce qu'une entreprise cherche chez un alternant : **méthode, travail en équipe, capacité à cadrer un besoin**. |
| 8 | **La moitié de tes compétences** | Absents du site alors qu'ils sont au CV : **PHP, Python, Java, Angular, SQL, MCD/MLD, UML, Scrum/Agile, Linux, cahier des charges, planification de projet**. Le site ne liste que React / React Native / Next / Supabase / PostgreSQL / JS / TS / Tailwind / Framer Motion / Git. Tu te vends *moins large* que ton CV. |
| 9 | **Localisation et mobilité** | Talencieux (07), permis B. Rien sur le site. Une alternance est un contrat de travail : la distance domicile-entreprise est un critère éliminatoire, et le permis B est un vrai atout en Ardèche / Drôme / vallée du Rhône. |
| 10 | **Les langues** | Anglais B1, Espagnol A2. Absent. Les ESN et grands groupes filtrent là-dessus. |
| 11 | **Projets déjà présents dans `/public` mais non affichés** | `payko_project.png`, `leKebabsite.jpg`, et le dossier `WorkyMobile` à côté du portfolio. Tu as au moins 3-5 projets et tu n'en montres que 2. Une grille à 2 cartes donne l'impression d'un portfolio vide. |
| 12 | **SFK n'est cliquable nulle part** | `TiltCard` de la carte 2 ([page.tsx:299-301](app/page.tsx#L299-L301)) n'a **pas de `onClick`**, alors que la carte affiche « Voir le projet → ». Le lien ne mène nulle part : clic mort, promesse trahie. |

### 🟡 Cohérence et crédibilité

| # | Problème | Recommandation |
|---|----------|-----------------|
| 13 | **Contradiction CV ↔ site sur l'ancienneté** | Le site annonce « **3+ ans avec React** », « 2+ ans Next.js », « 2+ ans TypeScript » ([page.tsx:468-491](app/page.tsx#L468-L491)). Le CV dit BUT 1 en 2024-2025, Bac en 2024. Un recruteur qui croise les deux voit une incohérence — et une incohérence, en entretien, coûte plus cher que le chiffre ne rapporte. **Change l'axe** : au lieu de compter des années, compte des livrables (voir §2.6). |
| 14 | **Aucune trace des centres d'intérêt** | 14 ans de cyclisme **en compétition** = discipline, endurance, régularité sur le long terme. C'est un argument d'entretien redoutable pour un alternant, et ça humanise. Les **VFX / 3D** expliquent directement le soin esthétique du site : c'est ton fil rouge, exploite-le. |
| 15 | **Pas de photo** | Optionnel, mais sur un portfolio d'alternance ça crée un lien. Au minimum une photo dans la section « À propos ». |
| 16 | **Pas de page ni de détail par projet** | Chaque carte donne un titre + une ligne. Manquent : **ton rôle exact**, la **stack**, le **problème résolu**, la **durée**, le **résultat**, et si c'était **seul ou en équipe**. C'est là que se joue la différence entre « il a fait un site » et « il sait construire un produit ». |
| 17 | **Témoignages fictifs neutralisés mais pas remplacés** | Bon réflexe d'avoir désactivé les faux témoignages ([page.tsx:523](app/page.tsx#L523)). Mais le bloc reste vide. Remplace-le par du **vrai** : un mot de ton tuteur EDF, d'un enseignant de l'IUT, ou d'un client d'openChantier. Une seule phrase authentique bat trois fausses. |
| 18 | **Le `<h1>` visible ne contient pas ton nom** | Le titre affiché est « PORT—FOLIO » en `aria-hidden`, et le vrai `<h1>` est en `sr-only` ([page.tsx:193](app/page.tsx#L193)). Le mot le plus gros de la page ne dit rien de toi. Une variante : « PORT—FOLIO » reste, mais ton nom et ta recherche apparaissent juste dessous en typo de titre, pas en petit gris à 50 % d'opacité. |

---

## 2. Propositions concrètes de contenu

### 2.1 Un bandeau « statut » permanent (haut de page ou barre fixe)

Le plus rentable de toutes les propositions. Une seule ligne, toujours visible :

```
● Alternance BUT 3 · Rentrée septembre 2026 · Rythme IUT de Valence · Valence / Lyon / Annonay · Permis B
```

À placer soit en barre fixe en haut, soit juste sous le titre du hero. La pastille verte pulsante existe déjà ([page.tsx:672-675](app/page.tsx#L672-L675)) — remonte-la ici, elle est enterrée en bas de page.

> ⚠️ **À confirmer par toi** : le rythme exact d'alternance de ton BUT 3 et ta zone de mobilité réelle. Je les ai déduits du CV, ne publie pas des dates approximatives.

### 2.2 Une section **PARCOURS** (formation + expérience) — la grande absente

Une seule frise chronologique inversée, qui fusionne les deux colonnes du CV :

```
2026-2027   BUT 3 Informatique — Réalisation d'applications · IUT de Valence   [en cours]
2026        Stage développeur — EDF, Centrale nucléaire de Saint-Alban
2025-2026   BUT 2 Informatique — Réalisation d'applications · IUT de Valence
2024-2025   BUT 1 Informatique · IUT de Valence
2024        Baccalauréat Général, mention assez bien · Lycée Saint-Denis, Annonay
```

Pour **EDF**, ajoute 2-3 lignes concrètes : sur quoi tu as travaillé, avec quelle stack, dans quelle équipe. C'est ta carte maîtresse, elle mérite plus qu'une ligne de frise.

### 2.3 Élargir la section **COMPÉTENCES** en 4 familles

Aujourd'hui : un marquee (5 technos) + 5 tags. Trop étroit face à ton CV. Propose plutôt :

- **Langages** — JavaScript, TypeScript, PHP, Python, SQL, Java *(en cours)*, HTML, CSS
- **Frameworks & outils** — React, React Native, Next.js, Angular *(en cours)*, Tailwind, Framer Motion, Supabase, PostgreSQL, Git, Linux
- **Conception** — UML, MCD / MLD, modélisation de bases de données, conception d'interfaces
- **Méthode & projet** — Scrum, sprints & reviews, cycle en V, cahier des charges, note de cadrage, recueil du besoin, planification

Garde la mention *« en cours »* sur Java et Angular : l'honnêteté sur ce qu'on est en train d'apprendre est un **argument** en alternance, pas une faiblesse.

### 2.4 Passer de 2 à 5 projets, avec deux catégories assumées

- **Produits** — openChantier (SaaS gestion de chantier), SFK, Payko, WorkyMobile, leKebabsite
- **Projets d'études** — Application web en équipe (Scrum, UML, cahier des charges) · Conception et exploitation d'une base de données (MCD → MLD → SQL)

Pour chaque carte, 5 métadonnées courtes : **Rôle · Stack · Contexte (perso / études / client) · Année · Lien**. Et si le code est public : bouton GitHub.

### 2.5 Une section **CONTACT** complète

Ajoute à côté du formulaire : **GitHub**, **LinkedIn**, **CV en PDF**, **localisation + mobilité**, **téléphone** (à toi de voir — sur un site public indexé, beaucoup préfèrent le réserver au PDF).

### 2.6 Remplacer les 4 compteurs « années d'expérience »

Ils créent l'incohérence du point 13 et ne disent rien. Remplace par des chiffres **vrais et vérifiables** :

```
5      Projets livrés
1      Stage en entreprise (EDF)
2      Ans de BUT Informatique validés
B1     Anglais
```

Le composant `AnimatedCounter` reste utilisable tel quel pour les trois premiers.

### 2.7 Deux sections courtes, à forte valeur humaine

- **« Ce que je cherche »** — 3 lignes : le type d'équipe, le type de projet, ce que tu veux apprendre. Ça montre que tu as réfléchi au poste, pas juste au diplôme.
- **« En dehors du code »** — cyclisme (14 ans en compétition) et VFX / 3D. Deux phrases, pas plus. Ça fait la différence en fin d'entretien.

---

## 3. Animations — innovantes, mais cohérentes avec l'existant

**Le langage visuel actuel** (à préserver, il est bon) : fond `#0A0A0B`, typo massive Dela Gothic One, grain SVG, grille filaire, blobs floutés, scroll Lenis, tilt 3D, boutons magnétiques. Tout ce qui suit s'y branche sans le casser.

> Règle transversale, non négociable : **tout doit respecter `prefers-reduced-motion`**. Aucune animation actuelle ne le fait. C'est un critère d'accessibilité que certains recruteurs testent — et sur un portfolio de dev, échouer là-dessus est ironique.

---

### 🥇 A. Frise « Parcours » qui se dessine au scroll — *la plus rentable*

Elle règle un manque de contenu **et** apporte l'animation la plus mémorable. Une ligne verticale en SVG qui se trace au fil du scroll (`pathLength` piloté par `scrollYProgress`), et chaque jalon (BUT 1, BUT 2, EDF, BUT 3) qui s'allume quand il franchit le milieu de l'écran : le point passe de creux à plein, le texte se dévoile, l'année glisse depuis la marge.

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] })
const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
// <motion.path style={{ pathLength }} />
```

Détail qui fait la différence : le jalon **EDF** reçoit un traitement distinct (trait plus épais, halo léger), pour signaler visuellement « ici, c'est du réel ».

---

### 🥈 B. Marquee compétences piloté par la vélocité du scroll

Ton marquee tourne aujourd'hui à vitesse fixe ([page.tsx:340-343](app/page.tsx#L340-L343)). Branché sur la **vélocité de scroll**, il accélère quand tu scrolles vite et **change de sens** quand tu remontes. Effet signature, très reconnaissable, et parfaitement raccord avec Lenis.

```tsx
const { scrollY } = useScroll()
const scrollVelocity = useVelocity(scrollY)
const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
const skew = useTransform(smooth, [-2000, 2000], [-8, 8], { clamp: false })
// direction = Math.sign(smooth.get()), vitesse = base + |smooth| * k
```

Bonus : un léger `skewX` proportionnel à la vélocité donne une sensation de matière, d'inertie.

---

### 🥉 C. Cartes projet en pile collante (*sticky stacking*)

Pour afficher 5 projets sans allonger la page : chaque carte se colle en haut de l'écran, la suivante glisse par-dessus, celle du dessous perd légèrement en échelle et en luminosité. Le lecteur traverse tes projets un par un, sans en sauter aucun — contrairement à une grille où l'œil balaie et oublie.

```tsx
// carte i : position sticky, top = 6rem + i * 1.5rem
const scale = useTransform(scrollYProgress, [i / n, 1], [1, 1 - (n - i) * 0.04])
```

Cela remplacerait aussi le **scroll hijacking horizontal** de [page.tsx:108-134](app/page.tsx#L108-L134), qui est aujourd'hui du code mort (le conteneur est devenu une `grid`) et pénalise la performance.

---

### D. Grille magnétique en canvas — remplacer `MouseGrid`

Ton fond actuel est une grille CSS statique + un halo positionné par `setState` à chaque `mousemove` : cela **re-render tout l'arbre React à chaque pixel de souris**. Un seul `<canvas>` avec une grille de points qui se déplacent doucement vers le curseur (attraction dégressive, retour élastique) rend l'effet plus vivant *et* bien plus fluide — un seul repaint, zéro re-render React.

Variante plus sobre si tu préfères : les points **s'éclairent** au lieu de bouger, avec une chute d'intensité radiale.

---

### E. Titre du hero à masque déformant

Le mot `PORT—FOLIO` s'écarte déjà légèrement au scroll. Va au bout de l'idée : les deux moitiés continuent de s'écarter, la vague centrale se déforme via un `feTurbulence` SVG animé, et en dessous ton nom + ta recherche d'alternance apparaissent **dans l'espace libéré**. L'animation devient porteuse d'information, pas seulement décorative.

---

### F. Reveal typographique par ligne, avec masque

Ton `GradualSpacing` anime **chaque caractère** dans un `<motion.h3>` séparé — soit 11 nœuds animés pour « COMPÉTENCES ». Coûteux, et il y a un bug : le `ref` est posé sur chaque caractère dans le `.map` ([page.tsx:25](app/page.tsx#L25)), donc seul le dernier compte réellement.

Un reveal **par ligne** avec `clip-path` + un léger `blur(6px) → blur(0)` est plus élégant, plus « studio », et anime 1 nœud au lieu de 11.

---

### G. Curseur contextuel

Un point discret qui suit le curseur avec une inertie ressort, et qui **morphe selon le contexte** : cercle plein avec la mention « VOIR » sur une carte projet, barre verticale sur un champ de texte, anneau sur un lien. Fusionne-le avec le halo de la grille pour n'avoir qu'un seul suiveur de souris. Sur mobile / tactile : désactivé.

---

### H. Inversion de thème pilotée par le scroll

Tu as déjà un thème clair complet dans `globals.css`. Utilise-le comme **rythme visuel** : une section (par exemple « Parcours » ou « À propos ») passe progressivement en fond clair au scroll, puis revient au sombre. Interpolation continue de la couleur de fond via `useTransform(scrollYProgress, [0,0.5,1], [dark, light, dark])`. Effet fort, coût nul en contenu — et ça justifie enfin tout le CSS de thème clair déjà écrit.

---

### I. Signature qui se trace dans le footer

Ton nom en écriture manuscrite (SVG, `pathLength` de 0 à 1) qui se dessine quand le footer entre à l'écran. Trois secondes, une seule fois. C'est le genre de détail dont un recruteur se souvient à la fin d'une journée de portfolios.

---

### J. Preloader compte-à-rebours typographique

`000 → 100` en Dela Gothic One, puis un volet qui se lève pour révéler le hero. À n'implémenter **que** si le site charge vite : un preloader sur un site lent double la peine. Sinon, garde-le sous 800 ms.

---

## 4. Corrections techniques repérées en passant

| Fichier | Ligne | Problème |
|---|---|---|
| [app/page.tsx](app/page.tsx#L108-L134) | 108-134 | Scroll hijacking horizontal devenu **code mort** (le conteneur est une `grid`), avec un listener `wheel` non-passif attaché à `window` → coût perf pur, zéro effet. |
| [app/page.tsx](app/page.tsx#L299-L301) | 299-301 | Carte SFK sans `onClick` : « Voir le projet → » ne mène nulle part. |
| [app/page.tsx](app/page.tsx#L25) | 25 | `ref` posé sur chaque caractère dans un `.map` → seul le dernier est réellement observé par `useInView`. |
| [app/page.tsx](app/page.tsx#L93) | 93 | `catch (error)` avec `error` non utilisé → warning ESLint. |
| [app/components/MouseGrid.tsx](app/components/MouseGrid.tsx#L11-L17) | 11-17 | `setState` à chaque `mousemove` → re-render de tout l'arbre. À passer en `motionValue` + `useSpring`, ou en canvas (§3.D). |
| [app/page.tsx](app/page.tsx) | partout | Beaucoup de `text-white/40` en dur, rattrapés par des overrides CSS `.light` fragiles. Basculer sur les variables `--foreground` / `--text-muted` déjà définies. |
| [app/layout.tsx](app/layout.tsx#L92) | 92 | `twitter.creator: "@evang_creative"` — à vérifier : si ce compte n'existe pas, autant retirer le champ. |
| global | — | Aucun respect de `prefers-reduced-motion`. |

---

## 5. Plan d'action, par ordre de rentabilité

**Étape 1 — le contenu qui débloque une candidature** *(~1 h, impact maximal)*
1. Bandeau statut : dates, rythme, mobilité *(§2.1)*
2. Bouton « Télécharger mon CV (PDF) »
3. Liens GitHub + LinkedIn
4. Remplacer les compteurs « années » par des chiffres vérifiables *(§2.6)*
5. Corriger le clic mort sur la carte SFK

**Étape 2 — les sections manquantes** *(~3 h)*
6. Section **PARCOURS** avec la frise animée *(§2.2 + §3.A)* ← la plus forte combinaison contenu × animation
7. Détailler le stage **EDF**
8. Élargir **COMPÉTENCES** aux 4 familles *(§2.3)*
9. Ajouter 3 projets et les métadonnées par carte *(§2.4)*

**Étape 3 — la couche animation** *(~3-4 h)*
10. Marquee à vélocité de scroll *(§3.B)*
11. Cartes en pile collante + suppression du scroll hijack mort *(§3.C)*
12. Reveal par ligne à la place de `GradualSpacing` *(§3.F)*
13. `MouseGrid` en canvas ou en `motionValue` *(§3.D)*
14. `prefers-reduced-motion` partout

**Étape 4 — la finition qui marque** *(~2 h)*
15. Curseur contextuel *(§3.G)*
16. Inversion de thème au scroll *(§3.H)*
17. Signature tracée dans le footer *(§3.I)*
18. Un vrai témoignage (tuteur EDF, enseignant IUT ou client) à la place du bloc désactivé

---

### En une phrase

Le site est **très réussi visuellement** et **sous-vendu sur le fond** : il montre qu'Evan sait faire un beau site, mais ne dit ni où il étudie, ni qu'il a fait un stage chez EDF, ni quand il est disponible, ni comment le contacter ailleurs que par un formulaire. Les 5 corrections de l'étape 1 valent, à elles seules, plus que toutes les animations de la liste.
