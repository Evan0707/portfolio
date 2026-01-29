export default function JsonLd() {
 const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://evan-g.com/#person",
  "name": "Evan G",
  "alternateName": "Evan G Creative",
  "description": "Web Designer & Developer freelance passionné. Création de sites web modernes, applications React/Next.js et React Native.",
  "url": "https://evan-g.com",
  "email": "evan.g.creative@gmail.com",
  "image": "https://evan-g.com/og-image.png",
  "jobTitle": ["Web Developer", "Web Designer", "Freelance Developer"],
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
  "sameAs": [
   "https://fr.fiverr.com/s/VYKjYYZ",
   "https://www.malt.fr/profile/evang1"
  ]
 };

 const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://evan-g.com/#website",
  "url": "https://evan-g.com",
  "name": "Evan G Portfolio",
  "description": "Portfolio d'Evan G, web designer et développeur freelance. Création de sites web modernes et applications sur-mesure.",
  "publisher": {
   "@id": "https://evan-g.com/#person"
  },
  "inLanguage": "fr-FR"
 };

 const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://evan-g.com/#business",
  "name": "Evan G - Web Development",
  "description": "Services de développement web et design freelance: création de sites web, applications mobiles, UI/UX design, e-commerce et SEO.",
  "url": "https://evan-g.com",
  "email": "evan.g.creative@gmail.com",
  "founder": {
   "@id": "https://evan-g.com/#person"
  },
  "areaServed": {
   "@type": "Country",
   "name": "France"
  },
  "serviceType": [
   "Web Design",
   "Web Development",
   "Mobile App Development",
   "UI/UX Design",
   "E-commerce",
   "SEO"
  ],
  "priceRange": "€€"
 };

 const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://evan-g.com/#portfolio",
  "name": "Portfolio Projects",
  "description": "Selected projects by Evan G",
  "numberOfItems": 3,
  "itemListElement": [
   {
    "@type": "ListItem",
    "position": 1,
    "item": {
     "@type": "CreativeWork",
     "name": "Le Kebabiste",
     "description": "Web Design & Development for restaurant website",
     "url": "https://lekebabiste.com",
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
   },
   {
    "@type": "ListItem",
    "position": 3,
    "item": {
     "@type": "CreativeWork",
     "name": "Payko",
     "description": "SaaS application for freelancer invoicing",
     "url": "https://payko.app",
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
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
   />
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
   />
  </>
 );
}
