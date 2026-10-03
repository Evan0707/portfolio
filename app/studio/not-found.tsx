import type { Metadata } from "next";
import { ButtonLink } from "@/studio/components/ui/button-link";
import { routes } from "@/studio/lib/site";
import { gutter } from "@/studio/lib/ui";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <section className={`relative flex min-h-[80svh] flex-col justify-center pt-[52px] ${gutter}`}>
      <p aria-hidden="true" className="font-heading text-[28vw] leading-none tracking-tight text-fg/10 md:text-[18vw]">
        404
      </p>
      <h1 className="-mt-[4vw] font-heading text-3xl uppercase leading-tight md:text-5xl">
        Cette page n’existe pas.
        <br />
        <span className="text-mute">Pas encore.</span>
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
        L’adresse a peut-être changé, ou le lien était incomplet. Le reste du site, lui, est bien là.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <ButtonLink href={routes.home} variant="solid" icon="arrow">
          Revenir à l’accueil
        </ButtonLink>
        <ButtonLink href={routes.contact}>Me contacter</ButtonLink>
      </div>
    </section>
  );
}
