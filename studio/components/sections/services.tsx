import { revealDelay } from "@/studio/lib/reveal";
import { routes, services } from "@/studio/lib/site";
import { splitLastWord } from "@/studio/lib/text";
import { card, section } from "@/studio/lib/ui";
import { ServiceArt } from "../illustrations";
import { ButtonLink } from "../ui/button-link";
import { Label, SectionTitle } from "../ui/section-title";
import { Tag } from "../ui/tag";

export function Services() {
  const [outHead, outLast] = splitLastWord(services.outMuted);

  return (
    <section id="services" aria-labelledby="services-title" className={section}>
      <SectionTitle id="services-title" subtitle={services.subtitle}>
        {services.title}
      </SectionTitle>

      <Label className="mb-6">{services.label}</Label>

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.items.map((item, index) => (
          <li
            key={item.id}
            data-reveal
            style={revealDelay((index % 2) * 100)}
            className={`group flex flex-col transition-colors hover:border-fg/30 ${card}`}
          >
            <div className="grid min-h-[250px] place-items-center border-b border-line px-6 py-8">
              <ServiceArt id={item.id} />
            </div>
            <div className="flex flex-1 flex-col px-8 py-7">
              <span className="text-xs text-mute">{item.index}</span>
              <h3 className="mt-3 text-[22px] font-semibold leading-8">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-6 text-soft">{item.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Tag key={tag} variant="outline">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-14 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-10">
        <p className="max-w-3xl font-heading text-2xl leading-tight md:text-3xl">
          {services.out}{" "}
          <span className="text-mute">
            {outHead}
            <span className="whitespace-nowrap">{outLast}</span>
          </span>
        </p>
        <ButtonLink href={routes.contact} icon="arrow">
          {services.outCta}
        </ButtonLink>
      </div>
    </section>
  );
}
