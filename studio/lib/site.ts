/**
 * Tout le contenu du site.
 * Les sections lisent ces données ; pour changer un texte, c'est ici.
 */

export type IconName =
  | "arrow"
  | "arrow-out"
  | "arrow-down"
  | "check"
  | "copy"
  | "mail"
  | "plus"
  | "pin"
  | "clock"
  | "calendar"
  | "browser"
  | "phone"
  | "linkedin"
  | "portfolio"
  | "play-store"
  | "user"
  | "handshake"
  | "spinner";

export const site = {
  name: "Evan G. Studio",
  owner: "Evan Gery",
  role: "Développeur indépendant",
  tagline: "Logiciels sur mesure pour les PME",
  description:
    "Développeur indépendant en Auvergne-Rhône-Alpes. Je conçois des applications web et mobiles sur mesure pour les PME : outils métier, automatisations, portails clients.",
  email: "evan.g.creative@gmail.com",
  /** Zone où je me déplace ; le reste se fait à distance. */
  area: "Valence / Lyon / Annonay",
  region: "Auvergne-Rhône-Alpes",
  portfolio: { url: "https://evan-g.com", label: "evan-g.com" },
  linkedin: { url: "https://www.linkedin.com/in/evan-gery-56a46928a/", label: "in/evan-gery" },
  openchantier: {
    url: "https://openchantier.com",
    label: "openchantier.com",
    playStore: "https://play.google.com/store/apps/details?id=com.openchantier.mobile",
  },
} as const;

/** Bandeau fixe du haut : la disponibilité, d'un coup d'œil. */
export const availability = {
  headline: "Disponible pour de nouveaux projets",
  detail: "Premier échange gratuit, 30 minutes",
  area: `${site.area} · partout en France`,
} as const;

/**
 * Le studio vit sous /studio, sur le domaine du portfolio.
 * Toutes les adresses internes partent d'ici.
 */
export const routes = {
  home: "/studio",
  legal: "/studio/mentions-legales",
  contact: "/studio#contact",
  product: "/studio#openchantier",
  portfolio: "/",
} as const;

export const navLinks = [
  { label: "Services", href: `${routes.home}#services` },
  { label: "OpenChantier", href: routes.product },
  { label: "Méthode", href: `${routes.home}#methode` },
  { label: "À propos", href: `${routes.home}#a-propos` },
  { label: "Questions", href: `${routes.home}#faq` },
] as const;

export const cta = {
  primary: "Parlons de votre projet",
  short: "Contact",
} as const;

export const hero = {
  /** Le grand mot coupé en deux, comme « PORT—FOLIO » sur le portfolio. */
  word: ["SUR", "MESURE"],
  /** Chaque phrase en deux morceaux : sur mobile, ils passent à la ligne. */
  title: ["Votre métier", "est unique."],
  titleMuted: ["Votre logiciel", "aussi."],
  lead: "Je conçois et développe des applications web et mobiles taillées pour votre entreprise : outils métier, automatisations, portails clients. Un seul interlocuteur, du premier échange à la mise en production.",
  secondaryCta: "Découvrir OpenChantier",
  corner: ["Logiciels sur mesure", "pour les PME"],
} as const;

/** Mots du bandeau défilant, avec leur petite légende. */
export const marquee = [
  { name: "Applications métier", sub: "Web" },
  { name: "Apps mobiles", sub: "iOS & Android" },
  { name: "Automatisations", sub: "Intégrations" },
  { name: "Portails clients", sub: "Extranet" },
  { name: "Tableaux de bord", sub: "Pilotage" },
] as const;

export const pains = {
  title: "LE CONSTAT",
  subtitle: "Ça vous parle ?",
  heading: "Quand l’outil ne suit plus,",
  headingMuted: "c’est l’équipe qui compense.",
  lead: "Les logiciels standards sont faits pour tout le monde. Donc pour personne en particulier. Résultat : des contournements, des doubles saisies et du temps perdu chaque jour.",
  items: [
    { tag: "Ressaisie", quote: "On ressaisit les mêmes données dans trois logiciels différents." },
    { tag: "Tableurs", quote: "Tout repose sur un fichier Excel que personne n’ose plus toucher." },
    { tag: "Logiciel standard", quote: "Notre logiciel fait 80 % du travail. Le reste, on le fait à la main." },
    { tag: "Terrain", quote: "Sur le terrain, on note sur papier et on recopie le soir au bureau." },
  ],
  out: "Un logiciel sur mesure épouse votre façon de travailler.",
  outMuted: "Pas l’inverse.",
} as const;

export const services = {
  title: "SERVICES",
  subtitle: "Sur mesure",
  label: "Ce que je construis",
  items: [
    {
      id: "metier",
      index: "01",
      title: "Applications métier",
      text: "Remplacez vos fichiers Excel et vos ressaisies par un outil conçu autour de vos processus : gestion, suivi, planning, reporting.",
      tags: ["Suivi de production", "Commandes & stocks", "Tableaux de bord"],
    },
    {
      id: "mobile",
      index: "02",
      title: "Applications mobiles",
      text: "iOS et Android, pour vos équipes de terrain ou vos clients. Elles fonctionnent même sans réseau.",
      tags: ["Saisie hors ligne", "Photos & signatures", "Notifications"],
    },
    {
      id: "automatisation",
      index: "03",
      title: "Automatisation & intégrations",
      text: "Vos logiciels se parlent enfin : ERP, comptabilité, CRM, facturation. Moins de saisie, moins d’erreurs.",
      tags: ["Connecteurs & API", "Synchronisation", "Rapports automatiques"],
    },
    {
      id: "maintenance",
      index: "04",
      title: "Maintenance & évolution",
      text: "Un logiciel vit : corrections, nouvelles fonctions, sécurité. Je reste à vos côtés après la mise en ligne.",
      tags: ["Reprise d’existant", "Correctifs & sécurité", "Évolutions continues"],
    },
  ],
  out: "Votre besoin n’entre dans aucune case ?",
  outMuted: "C’est le principe du sur-mesure.",
  outCta: "Décrire mon besoin",
} as const;

export const product = {
  title: "PRODUIT",
  subtitle: "Sur le terrain",
  label: "Produit maison · ouvert à tous",
  index: "01",
  badge: "Produit",
  name: "OpenChantier",
  tagline:
    "Le logiciel de gestion de chantier des artisans du bâtiment : chantiers, photos, heures, devis et factures au même endroit. Je l’ai conçu, développé et mis en production de A à Z.",
  image: {
    file: "openchantier-web.png",
    alt: "Aperçu d’OpenChantier : page d’accueil et tableau de bord",
    hint: "Aperçu du site ou du tableau de bord · 1600 × 1200 (4:3)",
  },
  surfaces: [
    { label: "Web — SaaS", description: "Devis, factures, planning et suivi au bureau", icon: "browser" },
    { label: "Mobile — Android", description: "Saisie sur le chantier, même sans réseau", icon: "phone" },
  ],
  stack: ["Next.js", "React Native", "TypeScript", "tRPC", "PostgreSQL", "Stripe"],
  screensLabel: "L’application mobile",
  screens: [
    {
      id: "accueil",
      file: "openchantier-mobile-accueil.png",
      caption: "Accueil",
      alt: "Écran d’accueil de l’application mobile OpenChantier",
      illustration: "Illustration de l’accueil d’OpenChantier : la semaine et les chantiers en cours",
      hint: "Capture de l’accueil · 1170 × 2532",
    },
    {
      id: "photos",
      file: "openchantier-mobile-chantier.png",
      caption: "Photos d’un chantier",
      alt: "Suivi photo d’un chantier dans l’application mobile OpenChantier",
      illustration: "Illustration des photos d’un chantier, téléphone hors ligne",
      hint: "Capture des photos · 1170 × 2532",
    },
    {
      id: "chrono",
      file: "openchantier-mobile-chrono.png",
      caption: "Pointage des heures",
      alt: "Chronomètre de pointage des heures dans l’application mobile OpenChantier",
      illustration: "Illustration du chrono de pointage des heures",
      hint: "Capture du chrono · 1170 × 2532",
    },
  ],
  facts: [
    { value: "2", label: "Applications, web et Android, sur les mêmes données" },
    { value: "4", label: "Langues : français, anglais, allemand, espagnol" },
    { value: "0 €", label: "Jusqu’à 3 chantiers actifs, puis 15 € par mois" },
    { value: "PDF", label: "Devis signés en ligne, factures au format Factur‑X" },
  ],
  bridge: "Abonnements en ligne, devis et factures, mode hors ligne, quatre langues, application mobile :",
  bridgeStrong: "ce que j’ai construit pour OpenChantier, je sais le construire pour vous.",
  contactCta: "Un projet similaire ? Parlons-en",
} as const;

export const method = {
  title: "MÉTHODE",
  subtitle: "Sur la durée",
  steps: [
    {
      index: "01",
      title: "L’échange",
      text: "Trente minutes pour comprendre votre besoin, vos contraintes et vos outils actuels.",
      meta: "Gratuit, sans engagement",
      featured: true,
    },
    {
      index: "02",
      title: "Le cadrage",
      text: "Je reformule le besoin, je découpe le projet en étapes et je le chiffre. Vous savez ce que vous achetez.",
      meta: "Devis détaillé",
    },
    {
      index: "03",
      title: "Le développement",
      text: "Des livraisons régulières que vous testez vous-même. Vous voyez votre logiciel avancer et vous ajustez en route.",
      meta: "Démos régulières",
    },
    {
      index: "04",
      title: "La mise en ligne, et après",
      text: "Déploiement, prise en main par vos équipes, puis maintenance. Votre outil évolue avec votre entreprise.",
      meta: "Suivi dans le temps",
    },
  ],
  pledgesLabel: "Ce à quoi je m’engage",
  pledges: [
    {
      title: "Des prix annoncés à l’avance",
      text: "Un devis détaillé, étape par étape. Vous savez ce que vous payez, et pourquoi.",
    },
    {
      title: "Construit pour durer",
      text: "Technologies éprouvées, tests automatisés, code documenté : un logiciel qu’un autre développeur pourra reprendre.",
    },
    {
      title: "Vos données protégées",
      text: "Hébergement en Europe, sauvegardes et RGPD pris en compte dès la conception.",
    },
  ],
} as const;

export const about = {
  title: "À PROPOS",
  heading: "Un développeur,",
  headingMuted: "pas une agence.",
  portrait: {
    file: "portrait-evan.jpg",
    alt: "Portrait d’Evan Gery, développeur indépendant",
    hint: "Ton portrait · format 4:5",
  },
  bio: [
    {
      text: "Je m’appelle Evan Gery. Développeur indépendant installé en Auvergne-Rhône-Alpes, je conçois des logiciels de bout en bout : écoute du besoin, design des écrans, développement, mise en ligne et suivi.",
      lead: true,
    },
    {
      text: "Travailler avec moi, c’est parler directement à la personne qui construit votre outil. Pas de chef de projet intermédiaire, pas de sous-traitance : des décisions rapides, et un logiciel dont je réponds personnellement.",
      lead: false,
    },
  ],
  stackLabel: "Mes outils du quotidien",
  stack: ["TypeScript", "React", "Next.js", "React Native", "Node.js", "PostgreSQL", "Stripe"],
  cta: "Faisons connaissance",
  stats: [
    { value: 1, suffix: "", label: "Seul interlocuteur, du premier échange à la maintenance" },
    { value: 0, suffix: "", label: "Ligne de jargon dans mes devis et mes comptes rendus" },
    { value: 100, suffix: " %", label: "Du code vous appartient à la livraison" },
    { value: 24, suffix: " h", label: "Ouvrées, au plus, pour vous répondre" },
  ],
} as const;

export const faq = {
  title: "QUESTIONS",
  subtitle: "Fréquentes",
  items: [
    {
      question: "Combien coûte un logiciel sur mesure ?",
      answer:
        "Cela dépend du périmètre : un outil interne ciblé ne demande pas le même travail qu’une application complète avec son app mobile. Après un premier échange gratuit, je vous remets un devis détaillé, découpé par étapes. Vous pouvez commencer petit et faire grandir l’outil ensuite.",
    },
    {
      question: "Combien de temps faut-il ?",
      answer:
        "De quelques semaines pour un outil ciblé à plusieurs mois pour une application complète. Je livre par étapes : vous utilisez une première version rapidement, sans attendre la fin du projet.",
    },
    {
      question: "Je n’ai pas de cahier des charges. C’est un problème ?",
      answer:
        "Non. Un besoin bien expliqué suffit : l’étape de cadrage sert justement à le transformer en plan d’action clair. C’est moi qui le rédige, et vous le validez.",
    },
    {
      question: "À qui appartient le logiciel ?",
      answer:
        "À vous. À la livraison, vous recevez le code source, la documentation et tous les accès. Vous restez libre de le faire évoluer avec moi, ou avec quelqu’un d’autre.",
    },
    {
      question: "Que se passe-t-il après la mise en ligne ?",
      answer:
        "Je propose un suivi : corrections, mises à jour de sécurité et nouvelles fonctions au fil de vos besoins. Vous n’êtes jamais seul face à votre outil.",
    },
    {
      question: "Pouvez-vous reprendre un logiciel existant ?",
      answer:
        "Oui. Je commence par un audit, pour vous dire honnêtement ce qui peut être conservé, ce qui doit être amélioré et ce qu’il vaut mieux refaire.",
    },
    {
      question: "Travaillez-vous à distance ?",
      answer:
        "Oui, partout en France, en visioconférence. Et volontiers sur place autour de Valence, Lyon et Annonay.",
    },
  ],
} as const;

export const contact = {
  /** Deux lignes géantes, la seconde en retrait de ton — comme « PARLONS / ENSEMBLE ». */
  title: "PARLONS",
  titleMuted: "PROJET",
  lead: "Un projet, une idée, un fichier Excel qui déborde ? Écrivez-moi : je vous réponds sous 24 h ouvrées, sans jargon et sans engagement.",
  fields: {
    email: "E-mail",
    availability: "Disponibilité",
    area: "Zone d’intervention",
    areaDetail: "Sur place en Auvergne-Rhône-Alpes, à distance partout en France",
    reply: "Délai de réponse",
    replyValue: "Sous 24 h ouvrées",
    replyDetail: "Devis détaillé, sans engagement",
  },
  projectKinds: [
    "Application métier",
    "Application mobile",
    "Automatisation",
    "Reprise d’un logiciel",
    "Je ne sais pas encore",
  ],
  messagePlaceholder: "Ex. : nous suivons nos interventions sur Excel et nous perdons du temps à…",
} as const;
