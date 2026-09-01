/**
 * Contenu du portfolio — source unique.
 *
 * Les entrées marquées `todo: true` sont des PLACEHOLDERS : l'information
 * manque encore. Elles s'affichent avec un style « à compléter » dans l'UI,
 * ce qui les rend impossibles à oublier. Remplace la valeur et retire le flag.
 */

export type Todo<T> = { value: T; todo?: boolean }

export const todo = <T,>(value: T): Todo<T> => ({ value, todo: true })
export const ok = <T,>(value: T): Todo<T> => ({ value })

// ---------------------------------------------------------------- identité

export const profile = {
  name: 'Evan Gery',
  role: 'Développeur web & mobile',
  school: 'BUT Informatique - IUT de Valence',
  email: 'evan.gery07@gmail.com',
  location: 'Talencieux (07) - Permis B',
  mobility: 'Mobile sur Valence, Lyon et Annonay',
  languages: 'Anglais B1 · Espagnol A2',
  portrait: ok<string | null>('/evan-gery.jpg'),
  portraitSize: { width: 311, height: 391 },
}

export const availability = {
  headline: 'Alternance BUT 3 · Rentrée septembre 2026',
  /** À confirmer par Evan : le rythme exact du BUT 3. */
  rhythm: todo('Rythme IUT de Valence'),
  area: 'Valence / Lyon / Annonay - Permis B',
  short: 'Disponible — rentrée septembre 2026',
  detail: 'BUT 3 Informatique · 12 mois',
}

export const links = {
  linkedin: ok<string | null>('https://www.linkedin.com/in/evan-gery-56a46928a/'),
  linkedinLabel: 'in/evan-gery',
  cv: ok<string | null>('/Evan_GERY_CV.pdf'),
  // cvFileName: 'Evan_GERY_CV.pdf',
}

// ---------------------------------------------------------------- parcours

export type Milestone = {
  year: string
  title: string
  subtitle: string
  current?: boolean
  featured?: boolean
  detail?: Todo<string | null>
}

export const milestones: Milestone[] = [
  {
    year: '2026 — 2027',
    title: "BUT 3 Informatique — Réalisation d'applications",
    subtitle: 'IUT de Valence',
    current: true,
  },
  {
    year: '2026',
    title: 'Stage développeur',
    subtitle: 'EDF — Centrale nucléaire de Saint-Alban',
    featured: true,
    detail: todo<string | null>(null),
  },
  {
    year: '2025 — 2026',
    title: "BUT 2 Informatique — Réalisation d'applications",
    subtitle: 'IUT de Valence',
  },
  {
    year: '2024 — 2025',
    title: 'BUT 1 Informatique',
    subtitle: 'IUT de Valence',
  },
  {
    year: '2024',
    title: 'Baccalauréat Général — mention assez bien',
    subtitle: 'Lycée Saint-Denis, Annonay',
  },
]

// ---------------------------------------------------------------- projets

export type Surface = {
  label: string
  description: string
  icon: 'browser' | 'phone'
  image?: string
}

export const featuredProject = {
  index: '01',
  title: 'openChantier',
  tagline: 'SaaS de gestion de chantier, et son application mobile de terrain. Deux surfaces, un seul produit.',
  image: '/openchantier_project.png',
  surfaces: [
    {
      label: 'Web - SaaS',
      description: 'Création, administration et reporting au bureau',
      icon: 'browser',
    },
    {
      label: 'Mobile - React Native',
      description: 'Capture terrain, offline-first, 4 langues',
      icon: 'phone',
      image: '/openchantier_mobile_icon.png',
    },
  ] satisfies Surface[],
  stack: ['Expo', 'React Native', 'tRPC', 'SQLite', 'i18next', 'Expo Router'],
  href: 'https://openchantier.com',
}

export type Project = {
  index: string
  title: string
  subtitle: Todo<string>
  image: string
  meta: Todo<string>
  href: Todo<string | null>
}

export const projects: Project[] = [
  {
    index: '02',
    title: 'SFK Project',
    subtitle: ok('Branding & développement web'),
    image: '/SFK.jpg',
    meta: ok('HTML / CSS'),
    // `ok(null)` = pas de lien, et c'est définitif. À distinguer de `todo(null)`,
    // qui veut dire « lien à trouver » et affiche un rappel dans l'UI.
    href: ok<string | null>(null),
  },
  // {
  //   index: '03',
  //   title: 'Payko',
  //   subtitle: todo('Description à écrire'),
  //   image: '/payko_project.png',
  //   meta: todo('Rôle · Stack · Année'),
  //   href: todo<string | null>(null),
  // },
  {
    index: '03',
    title: 'Le Kebabiste',
    subtitle: ok('Site vitrine — restaurant à Nantes'),
    image: '/leKebabsite.jpg',
    meta: ok('HTML / CSS'),
    href: ok<string | null>('https://lekebabiste.com/'),
  },
]

export const studyProjects = [
  {
    title: 'Application web en équipe',
    description:
      "Formalisation du besoin, note de cadrage, cahier des charges, modélisation UML puis développement en sprints.",
    tags: ['Recueil du besoin', 'Cahier des charges', 'UML', 'Scrum', 'Travail en équipe'],
  },
  {
    title: "Conception et exploitation d'une base de données",
    description:
      'Du modèle conceptuel au schéma physique : MCD, MLD, puis implémentation et requêtage SQL.',
    tags: ['MCD / MLD', 'SQL', 'Modélisation', 'PostgreSQL'],
  },
]

// ------------------------------------------------------------ compétences

export const marqueeSkills = [
  { name: 'React', sub: 'Frontend' },
  { name: 'React Native', sub: 'Mobile' },
  { name: 'Next.js', sub: 'Framework' },
  { name: 'Supabase', sub: 'Back-end' },
  { name: 'PostgreSQL', sub: 'Base de données' },
]

export const skillFamilies = [
  { label: 'Langages', items: ['JavaScript', 'TypeScript', 'SQL', 'PHP', 'Python'] },
  { label: 'Frameworks & outils', items: ['React', 'React Native', 'Next.js', 'Tailwind', 'Supabase', 'PostgreSQL'] },
  { label: 'Conception', items: ['UML', 'MCD / MLD', 'Modélisation BDD'] },
  { label: 'Méthode & projet', items: ['Scrum', 'Cahier des charges', 'Recueil du besoin'] },
]

// ---------------------------------------------------------------- à propos

export const bio = [
  {
    text: "Je suis Evan, étudiant en BUT Informatique à l'IUT de Valence, parcours Réalisation d'applications. Je cherche une alternance pour ma troisième année, à partir de septembre 2026.",
    lead: true,
  },
  {
    text: "J'ai passé mon stage de deuxième année chez EDF, sur le site de la centrale de Saint-Alban. En parallèle je développe openChantier, un SaaS de gestion de chantier et son application mobile de terrain.",
    lead: false,
  },
]

/** PLACEHOLDER — brouillon. À réécrire avec les mots d'Evan. */
export const lookingFor = todo(
  "Je cherche une alternance pour développer mes compétences sur des projets réels, découvrir de nouvelles technologies et continuer à travailler le design autant que le code."
)

/** Chiffres vérifiables — remplacent les « 3+ ans avec React » du CV. */
export const stats = [
  { value: 5, suffix: '', label: 'Projets livrés', animated: true },
  { value: 1, suffix: '', label: 'Stage en entreprise', animated: true },
  { value: 2, suffix: '', label: 'Ans de BUT validés', animated: true },
  { value: 'B1', suffix: '', label: 'Anglais', animated: false },
]
