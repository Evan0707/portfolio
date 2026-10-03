import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/studio/components/icon";
import { routes, site } from "@/studio/lib/site";
import { card, gutter } from "@/studio/lib/ui";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales et politique de confidentialité du site ${site.name}.`,
  alternates: { canonical: routes.legal },
};

/**
 * Information que toi seul peux fournir. Elle s'affiche en négatif sur la page
 * pour qu'on ne puisse pas l'oublier avant la mise en ligne.
 */
function ACompleter({ children }: { children: ReactNode }) {
  return <mark className="bg-fg px-1.5 py-0.5 font-semibold text-bg">{children}</mark>;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="grid gap-4 border-b border-line py-9 text-base leading-relaxed text-soft [&_a]:text-fg [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-fg">
      <h2 className="text-[22px] font-semibold leading-8 text-fg">{title}</h2>
      {children}
    </section>
  );
}

const list = `grid gap-1.5 px-7 py-6 ${card}`;

export default function MentionsLegales() {
  return (
    <article className={`relative pb-10 pt-[140px] ${gutter}`}>
      <header className="pl-[7.3vw]">
        <h1 className="font-heading text-[8vw] leading-none tracking-wide md:text-[4vw]">MENTIONS LÉGALES</h1>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-mute md:text-base">Dernière mise à jour : octobre 2026</p>
      </header>

      <div className="mt-14 max-w-3xl border-t border-line">
        <Section id="editeur" title="1. Éditeur du site">
          <p>Le site {site.name} est édité par :</p>
          <ul className={list}>
            <li>
              <strong>Evan GERY</strong>, entrepreneur individuel (EI)
            </li>
            <li>Nom commercial : {site.name}</li>
            <li>SIREN : 109 423 814</li>
            <li>
              Adresse : <ACompleter>adresse professionnelle à compléter</ACompleter>
            </li>
            <li>
              Courriel : <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              Téléphone : <ACompleter>numéro à compléter</ACompleter>
            </li>
            <li>Directeur de la publication : Evan GERY</li>
          </ul>
        </Section>

        <Section id="hebergeur" title="2. Hébergement">
          <p>Le site est hébergé par :</p>
          <ul className={list}>
            <li>
              <ACompleter>Vercel Inc. — à confirmer selon l’hébergeur retenu</ACompleter>
            </li>
            <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
            <li>
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                https://vercel.com
              </a>
            </li>
          </ul>
        </Section>

        <Section id="propriete" title="3. Propriété intellectuelle">
          <p>
            Les textes, la mise en page, les illustrations et le code de ce site sont la propriété d’Evan Gery, sauf mention
            contraire. Toute reproduction, même partielle, est soumise à son accord écrit préalable.
          </p>
          <p>
            OpenChantier est un produit édité par Evan Gery. Les autres marques citées (Google Play, Android, noms de
            technologies) appartiennent à leurs propriétaires respectifs.
          </p>
        </Section>

        <Section id="donnees" title="4. Données personnelles">
          <p>
            <strong>Responsable du traitement :</strong> Evan Gery, joignable à l’adresse{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <p>
            <strong>Ce qui est collecté :</strong> uniquement ce que vous choisissez de me transmettre par le formulaire de
            contact ou par e-mail — votre nom, celui de votre entreprise, votre adresse e-mail, votre numéro de téléphone
            si vous l’indiquez, et le contenu de votre message.
          </p>
          <p>
            <strong>Pourquoi :</strong> pour répondre à votre demande et, si vous le souhaitez, préparer un devis. Ce
            traitement repose sur les démarches que vous engagez avant un éventuel contrat. Vos informations ne servent à
            rien d’autre : ni prospection automatisée, ni revente, ni partage avec des tiers.
          </p>
          <p>
            <strong>Combien de temps :</strong> vos messages sont conservés trois ans au plus après notre dernier échange,
            puis supprimés.
          </p>
          <p>
            <strong>Qui y a accès :</strong> Evan Gery, et les prestataires techniques strictement nécessaires
            (hébergement du site, messagerie électronique).
          </p>
          <p>
            <strong>Vos droits :</strong> vous pouvez demander l’accès à vos données, leur rectification, leur effacement
            ou la limitation de leur traitement, et vous opposer à celui-ci, en écrivant à{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Si vous estimez, après m’avoir contacté, que vos droits ne
            sont pas respectés, vous pouvez adresser une réclamation à la CNIL (
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              www.cnil.fr
            </a>
            ).
          </p>
        </Section>

        <Section id="cookies" title="5. Cookies et mesure d’audience">
          <p>
            Ce site ne dépose aucun cookie, n’utilise aucun outil de mesure d’audience et n’embarque aucun traceur
            publicitaire. Les polices de caractères sont servies par le site lui-même : aucune requête n’est envoyée à un
            service tiers pendant votre visite.
          </p>
          <p>
            Une seule information est gardée dans votre navigateur, et n’en sort jamais : votre préférence d’affichage,
            clair ou sombre, si vous utilisez le bouton prévu à cet effet.
          </p>
        </Section>

        <Section id="liens" title="6. Liens vers d’autres sites">
          <p>
            Ce site contient des liens vers openchantier.com, la fiche Google Play de l’application OpenChantier et
            LinkedIn. Ces sites ont leurs propres conditions d’utilisation et leur propre politique de confidentialité.
          </p>
        </Section>
      </div>

      <Link
        href={routes.home}
        className="group mt-10 inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-wider text-fg/80 transition-colors hover:text-fg"
      >
        Revenir à l’accueil
        <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
