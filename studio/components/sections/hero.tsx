import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { riseDelay } from "@/studio/lib/reveal";
import { availability, cta, hero, routes, site } from "@/studio/lib/site";
import { gutter } from "@/studio/lib/ui";
import { HeroWord } from "../effects/hero-word";
import { ThemeToggle } from "../theme-toggle";
import { ButtonLink } from "../ui/button-link";

export function Hero() {
  return (
    <section id="accueil" className="relative flex min-h-svh flex-col pt-[52px]">
      {/* barre haute */}
      <div className={`flex items-start justify-between pt-8 ${gutter}`}>
        <ThemeToggle />
        <p className="hidden pt-3.5 text-right text-[12px] leading-4 tracking-[0.05em] text-mute sm:block">
          {availability.area}
        </p>
      </div>

      {/* bloc central */}
      <div className="flex flex-1 flex-col items-center justify-center px-[5vw] py-10">
        <HeroWord word={hero.word} />

        <h1
          className="rise mt-8 text-center font-heading text-[7.2vw] uppercase leading-[1.08] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
          style={riseDelay(400)}
        >
          {hero.title.map((part) => (
            <span key={part} className="block sm:inline">
              {part}{" "}
            </span>
          ))}
          <br className="hidden sm:block" />
          <span className="text-mute">
            {hero.titleMuted.map((part) => (
              <span key={part} className="block sm:inline">
                {part}{" "}
              </span>
            ))}
          </span>
        </h1>

        <p className="rise mt-5 max-w-2xl text-center text-base text-soft md:text-lg" style={riseDelay(500, 0)}>
          {hero.lead}
        </p>

        <div className="rise mt-8 flex flex-wrap items-center justify-center gap-4" style={riseDelay(600, 12)}>
          <ButtonLink href={routes.contact} variant="solid" icon="arrow">
            {cta.primary}
          </ButtonLink>
          <ButtonLink href={routes.product}>{hero.secondaryCta}</ButtonLink>
        </div>
      </div>

      {/* bas de page */}
      <div className={`flex items-end justify-between gap-6 pb-8 ${gutter}`}>
        <div className="space-y-1 text-xs text-mute">
          {hero.corner.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <a
          href={`mailto:${site.email}`}
          className="-my-3.5 py-3.5 text-right text-xs text-mute transition-colors hover:text-fg"
        >
          {site.email}
        </a>
      </div>

      <div
        aria-hidden="true"
        className="rise absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        style={riseDelay(1000, 0)}
      >
        <ArrowDown size={14} className="text-fg/30" />
        <span className="text-[10px] tracking-widest text-fg/30">SCROLL</span>
      </div>
    </section>
  );
}
