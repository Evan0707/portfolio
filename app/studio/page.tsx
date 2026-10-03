import { Marquee } from "@/studio/components/effects/marquee";
import { About } from "@/studio/components/sections/about";
import { Contact } from "@/studio/components/sections/contact";
import { Faq } from "@/studio/components/sections/faq";
import { Hero } from "@/studio/components/sections/hero";
import { Method } from "@/studio/components/sections/method";
import { Pains } from "@/studio/components/sections/pains";
import { Product } from "@/studio/components/sections/product";
import { Services } from "@/studio/components/sections/services";
import { faq, marquee, services, site } from "@/studio/lib/site";
import { studioUrl } from "@/studio/lib/site-url";

/** Données structurées : ce que les moteurs de recherche lisent de l'activité. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${studioUrl}#studio`,
      name: site.name,
      description: site.description,
      url: studioUrl,
      email: site.email,
      founder: { "@type": "Person", name: site.owner, jobTitle: site.role, url: site.portfolio.url },
      address: { "@type": "PostalAddress", addressRegion: site.region, addressCountry: "FR" },
      areaServed: { "@type": "Country", name: "France" },
      knowsAbout: services.items.map((item) => item.title),
      sameAs: [site.linkedin.url, site.portfolio.url],
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

/**
 * Ordre pensé pour un dirigeant de PME : ce que je fais (héros), le problème
 * qu'il reconnaît (constat), ce que je construis (services), la preuve
 * (OpenChantier), comment ça se passe (méthode), qui je suis (à propos),
 * ses objections (questions), comment m'écrire (contact).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative mt-10 md:mt-16">
        <Marquee items={marquee} />
      </div>
      <Pains />
      <Services />
      <Product />
      <Method />
      <About />
      <Faq />
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
