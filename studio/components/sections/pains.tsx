import { revealDelay } from "@/studio/lib/reveal";
import { pains } from "@/studio/lib/site";
import { card, section } from "@/studio/lib/ui";
import { SectionTitle } from "../ui/section-title";

export function Pains() {
  return (
    <section id="constat" aria-labelledby="constat-title" className={section}>
      <SectionTitle id="constat-title" subtitle={pains.subtitle}>
        {pains.title}
      </SectionTitle>

      <div data-reveal className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <h3 className="font-heading text-3xl leading-tight md:text-4xl">
          {pains.heading}
          <br />
          <span className="text-mute">{pains.headingMuted}</span>
        </h3>
        <p className="text-lg leading-relaxed text-soft">{pains.lead}</p>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pains.items.map((item, index) => (
          <li
            key={item.tag}
            data-reveal
            style={revealDelay(index * 80)}
            className={`flex min-h-[230px] flex-col justify-between gap-10 px-7 py-6 transition-colors hover:border-fg/30 ${card}`}
          >
            <span className="text-[11px] uppercase tracking-[0.1em] text-mute">{item.tag}</span>
            <p className="text-xl font-semibold leading-7">«&nbsp;{item.quote}&nbsp;»</p>
          </li>
        ))}
      </ul>

      <p data-reveal className="mt-14 max-w-4xl font-heading text-2xl leading-tight md:text-3xl">
        {pains.out} <span className="text-mute">{pains.outMuted}</span>
      </p>
    </section>
  );
}
