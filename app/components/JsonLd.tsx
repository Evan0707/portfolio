export default function JsonLd() {
 const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://evan-g.com/#person",
  "name": "Evan G",
  "alternateName": "Evan G Creative",
  // "description": "Web Designer & Developer freelance passionné. Création de sites web modernes, applications React/Next.js et React Native.",
  "description": "Web Designer & Developer passionné. Création de sites web modernes, applications React/Next.js et React Native.",
  "url": "https://evan-g.com",
  "email": "evan.gery07@gmail.com",
  "image": "https://evan-g.com/og-image.png",
  // "jobTitle": ["Web Developer", "Web Designer", "Freelance Developer"],
  "jobTitle": ["Web Developer", "Web Designer"],
  "knowsAbout": [
   "React",
   "React Native",
   "Next.js",
   "TypeScript",
   "JavaScript",
   "Supabase",
   "PostgreSQL",
   "Tailwind CSS",
   "Framer Motion",
   "UI/UX Design",
   "Web Development",
   "Mobile App Development"
  ],
  // "sameAs": [
  //  "https://fr.fiverr.com/s/VYKjYYZ",
  //  "https://www.malt.fr/profile/evang1"
  // ]
  "sameAs": []
 };

 const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://evan-g.com/#website",
  "url": "https://evan-g.com",
  "name": "Evan G Portfolio",
  // "description": "Portfolio d'Evan G, web designer et développeur freelance. Création de sites web modernes et applications sur-mesure.",
  "description": "Portfolio d'Evan G, web designer et développeur. Création de sites web modernes et applications sur-mesure.",
  "publisher": {
   "@id": "https://evan-g.com/#person"
  },
  "inLanguage": "fr-FR"
 };

 // ProfessionalService schema disabled (freelance business markup) while applying for an apprenticeship.
 // const professionalServiceSchema = {
 //  "@context": "https://schema.org",
 //  "@type": "ProfessionalService",
 //  "@id": "https://evan-g.com/#business",
 //  "name": "Evan G - Web Development",
 //  "description": "Services de développement web et design freelance: création de sites web, applications mobiles, UI/UX design, e-commerce et SEO.",
 //  "url": "https://evan-g.com",
 //  "email": "evan.gery07@gmail.com",
 //  "founder": {
 //   "@id": "https://evan-g.com/#person"
 //  },
 //  "areaServed": {
 //   "@type": "Country",
 //   "name": "France"
 //  },
 //  "serviceType": [
 //   "Web Design",
 //   "Web Development",
 //   "Mobile App Development",
 //   "UI/UX Design",
 //   "E-commerce",
 //   "SEO"
 //  ],
 //  "priceRange": "€€"
 // };

 const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://evan-g.com/#portfolio",
  "name": "Portfolio Projects",
  "description": "Selected projects by Evan G",
  "numberOfItems": 2,
  "itemListElement": [
   {
    "@type": "ListItem",
    "position": 1,
    "item": {
     "@type": "CreativeWork",
     "name": "openChantier",
     "description": "SaaS — Gestion de chantier",
     "url": "https://openchantier.com",
     "creator": { "@id": "https://evan-g.com/#person" }
    }
   },
   {
    "@type": "ListItem",
    "position": 2,
    "item": {
     "@type": "CreativeWork",
     "name": "SFK Project",
     "description": "Branding & Web Development",
     "creator": { "@id": "https://evan-g.com/#person" }
    }
   }
  ]
 };

 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
   />
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
   />
   {/* <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
   /> */}
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
   />
  </>
 );
}
