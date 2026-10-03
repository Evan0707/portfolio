import { faq } from "@/studio/lib/site";
import { section } from "@/studio/lib/ui";
import { Icon } from "../icon";
import { SectionTitle } from "../ui/section-title";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={section}>
      <SectionTitle id="faq-title" subtitle={faq.subtitle}>
        {faq.title}
      </SectionTitle>

      <div data-reveal className="border-t border-line">
        {faq.items.map((item, index) => (
          // `name` identique : le navigateur n'en garde qu'une ouverte à la fois.
          <details key={item.question} name="faq" open={index === 0} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <span className="flex items-baseline gap-5">
                <span className="w-5 shrink-0 text-xs text-mute" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-semibold leading-7 md:text-xl">{item.question}</span>
              </span>
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center border border-line text-soft transition-colors duration-300 group-open:border-fg group-open:bg-fg group-open:text-bg group-hover:border-fg/30 [&>svg]:transition-transform [&>svg]:duration-300 group-open:[&>svg]:rotate-45"
              >
                <Icon name="plus" size={16} />
              </span>
            </summary>
            <p className="max-w-3xl pb-7 text-base leading-relaxed text-soft md:pl-10">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
