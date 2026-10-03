import type { ReactNode } from "react";
import { revealDelay } from "@/studio/lib/reveal";
import { product, routes, site } from "@/studio/lib/site";
import { card, section } from "@/studio/lib/ui";
import { OpenChantierMark } from "../brand";
import { Phone } from "../devices";
import { TiltCard } from "../effects/tilt-card";
import { Icon } from "../icon";
import { ImageSlot } from "../image-slot";
import { AppChronoMock, AppHomeMock, AppPhotosMock, WebDashboardMock } from "../mocks";
import { ButtonLink } from "../ui/button-link";
import { Label, SectionTitle } from "../ui/section-title";
import { Tag } from "../ui/tag";

/** Maquette affichée dans chaque téléphone tant que la capture manque. */
const mocks: Record<(typeof product.screens)[number]["id"], ReactNode> = {
  accueil: <AppHomeMock />,
  photos: <AppPhotosMock />,
  chrono: <AppChronoMock />,
};

/**
 * OpenChantier n'est pas « une référence de plus » : c'est le produit du
 * studio. Il est présenté comme sur le portfolio — une grande image, ses deux
 * surfaces, sa pile technique — puis par ses écrans et ses chiffres.
 */
export function Product() {
  return (
    <section id="openchantier" aria-labelledby="product-title" className={section}>
      <SectionTitle id="product-title" subtitle={product.subtitle}>
        {product.title}
      </SectionTitle>

      <Label className="mb-6">{product.label}</Label>

      <article data-reveal className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-14">
        <a
          href={site.openchantier.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${product.name} — ouvrir ${site.openchantier.label}`}
          className="group relative block overflow-hidden border border-line"
        >
          <ImageSlot
            className="aspect-[4/3] grayscale transition-all duration-500 group-hover:grayscale-0"
            file={product.image.file}
            alt={product.image.alt}
            hint={product.image.hint}
            sizes="(max-width: 1024px) 90vw, 52vw"
            illustration="Illustration du tableau de bord web d’OpenChantier"
          >
            <WebDashboardMock />
          </ImageSlot>
        </a>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-mute">{product.index}</span>
            <span className="bg-fg px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-bg">{product.badge}</span>
          </div>

          <h3 className="flex items-center gap-3 font-heading text-4xl leading-[1.15] tracking-tight">
            <OpenChantierMark className="h-8 w-8 shrink-0" />
            {product.name}
          </h3>

          <p className="text-base leading-relaxed text-soft">{product.tagline}</p>

          <div className="flex flex-col gap-px">
            {product.surfaces.map((surface) => (
              <div key={surface.label} className="flex items-center gap-3.5 bg-fg/3 px-4 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center bg-fg/10">
                  <Icon name={surface.icon} size={19} className="text-soft" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-5">{surface.label}</span>
                  <span className="block text-xs leading-[17px] text-mute">{surface.description}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.stack.map((tool) => (
              <Tag key={tool} variant="outline">
                {tool}
              </Tag>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href={site.openchantier.url} icon="arrow-out" external>
              {site.openchantier.label}
            </ButtonLink>
            <ButtonLink href={site.openchantier.playStore} icon="play-store" external>
              Google Play
            </ButtonLink>
          </div>
        </div>
      </article>

      <Label className="mb-6 mt-18">{product.screensLabel}</Label>

      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {product.screens.map((screen, index) => (
          <li key={screen.id} data-reveal style={revealDelay(index * 100)}>
            <TiltCard className="group">
              <div className={`flex h-[380px] justify-center overflow-hidden px-6 pt-10 md:h-[440px] ${card}`}>
                <Phone className="grayscale transition-all duration-500 group-hover:grayscale-0">
                  <ImageSlot
                    className="phone__screen"
                    file={screen.file}
                    alt={screen.alt}
                    hint={screen.hint}
                    sizes="220px"
                    illustration={screen.illustration}
                  >
                    {mocks[screen.id]}
                  </ImageSlot>
                </Phone>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h4 className="text-lg">{screen.caption}</h4>
                <span className="text-xs text-mute">0{index + 2}</span>
              </div>
            </TiltCard>
          </li>
        ))}
      </ul>

      <ul className="mt-18 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {product.facts.map((fact, index) => (
          <li
            key={fact.label}
            data-reveal
            style={revealDelay(index * 80)}
            className="border border-line p-6 transition-colors hover:border-fg/30"
          >
            <p className="font-heading text-4xl">{fact.value}</p>
            <p className="mt-2 text-sm text-mute">{fact.label}</p>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-14 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-10">
        <p className="max-w-3xl text-lg leading-relaxed text-soft">
          {product.bridge} <strong className="font-semibold text-fg">{product.bridgeStrong}</strong>
        </p>
        <ButtonLink href={routes.contact} variant="solid" icon="arrow">
          {product.contactCta}
        </ButtonLink>
      </div>
    </section>
  );
}
