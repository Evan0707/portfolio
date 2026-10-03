import Link from "next/link";
import { revealDelay } from "@/studio/lib/reveal";
import { about, routes } from "@/studio/lib/site";
import { card, section } from "@/studio/lib/ui";
import { AnimatedCounter } from "../effects/animated-counter";
import { Icon } from "../icon";
import { ImageSlot } from "../image-slot";
import { SectionTitle } from "../ui/section-title";
import { Tag } from "../ui/tag";

export function About() {
  return (
    <section id="a-propos" aria-labelledby="about-title" className={section}>
      <SectionTitle id="about-title">{about.title}</SectionTitle>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[380px_minmax(0,1fr)] md:gap-14">
        <div data-reveal>
          <ImageSlot
            className="aspect-[4/5] border border-line"
            imageClassName="object-cover"
            file={about.portrait.file}
            alt={about.portrait.alt}
            hint={about.portrait.hint}
            sizes="(max-width: 768px) 90vw, 380px"
          >
            {/* Portrait manquant : on montre l'emplacement plutôt que de le passer sous silence. */}
            <div className="grid h-full place-items-center border border-dashed border-fg/15 bg-fg/3 text-center">
              <div className="flex flex-col items-center gap-2 px-6">
                <Icon name="user" size={30} className="text-fg/25" />
                <p className="text-[12px] uppercase tracking-[0.1em] text-mute">Photo</p>
              </div>
            </div>
          </ImageSlot>
        </div>

        <div data-reveal style={revealDelay(100)} className="space-y-6">
          <h3 className="font-heading text-3xl leading-tight md:text-4xl">
            {about.heading}
            <br />
            <span className="text-mute">{about.headingMuted}</span>
          </h3>

          {about.bio.map((paragraph) => (
            <p
              key={paragraph.text.slice(0, 24)}
              className={paragraph.lead ? "text-lg leading-relaxed text-fg/80" : "text-base leading-relaxed text-soft"}
            >
              {paragraph.text}
            </p>
          ))}

          <div className={`px-7 py-6 ${card}`}>
            <p className="text-[11px] uppercase tracking-[0.1em] text-mute">{about.stackLabel}</p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {about.stack.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </div>
            <Link
              href={routes.contact}
              className="group mt-3 inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-wider text-fg/80 transition-colors hover:text-fg"
            >
              {about.cta}
              <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Des engagements, pas des trophées : aucun chiffre d'audience inventé. */}
      <ul className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {about.stats.map((stat, index) => (
          <li
            key={stat.label}
            data-reveal
            style={revealDelay(index * 80)}
            className="border border-line p-6 transition-colors hover:border-fg/30"
          >
            <p className="font-heading text-4xl">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-mute">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
