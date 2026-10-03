import { revealDelay } from "@/studio/lib/reveal";
import { method } from "@/studio/lib/site";
import { card, gutter } from "@/studio/lib/ui";
import { Timeline } from "../effects/timeline";
import { Icon } from "../icon";
import { Label, SectionTitle } from "../ui/section-title";

type Step = (typeof method.steps)[number];

/**
 * MÉTHODE — la bande inversée de la page, comme « Parcours » sur le portfolio :
 * au milieu d'une page sombre, un fond clair (et l'inverse en thème clair).
 * La classe `band` retourne les couleurs du thème pour tout ce qu'elle contient.
 */
export function Method() {
  return (
    <section
      id="methode"
      aria-labelledby="method-title"
      className="band relative mt-[140px] bg-bg py-24 text-fg md:mt-[240px] md:py-30"
    >
      <div className={gutter}>
        <SectionTitle id="method-title" subtitle={method.subtitle}>
          {method.title}
        </SectionTitle>

        <Timeline>
          <ol className="space-y-12">
            {method.steps.map((step) => (
              <StepRow key={step.index} step={step} />
            ))}
          </ol>
        </Timeline>

        <Label className="mb-6 mt-20">{method.pledgesLabel}</Label>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {method.pledges.map((pledge, index) => (
            <li key={pledge.title} data-reveal style={revealDelay(index * 80)} className={`px-8 py-7 ${card}`}>
              <h3 className="text-[22px] font-semibold leading-8">{pledge.title}</h3>
              <p className="mt-3.5 text-[15px] leading-6 text-soft">{pledge.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StepRow({ step }: { step: Step }) {
  const featured = "featured" in step;

  return (
    <li data-reveal className="relative grid grid-cols-1 pl-8 md:grid-cols-[170px_40px_1fr] md:pl-0">
      {/* jalon sur le rail */}
      <span
        aria-hidden="true"
        className={[
          "absolute left-[7px] -translate-x-1/2 rounded-full md:left-[190px]",
          featured ? "top-[7px] h-3.5 w-3.5 bg-fg ring-6 ring-bg" : "top-[9px] h-[9px] w-[9px] border-[1.5px] border-fg/30 bg-bg",
        ].join(" ")}
      />

      <p className={`font-heading text-lg leading-7 md:text-right ${featured ? "text-fg" : "text-fg/30"}`} aria-hidden="true">
        {step.index}
      </p>

      <span aria-hidden="true" />

      <div className="mt-2 md:mt-0">
        {featured ? (
          // La première étape a droit à une carte : elle est gratuite, et c'est par là qu'on commence.
          <article className="border-[1.5px] border-fg px-8 py-7">
            <span className="inline-flex items-center gap-2 bg-fg px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-bg">
              <Icon name="handshake" size={13} weight="fill" />
              {step.meta}
            </span>
            <h3 className="mt-3.5 text-2xl font-semibold leading-9 md:text-[26px]">{step.title}</h3>
            <p className="mt-3.5 max-w-2xl text-lg text-soft">{step.text}</p>
          </article>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold leading-7">{step.title}</h3>
              <span className="border border-fg/20 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-mute">
                {step.meta}
              </span>
            </div>
            <p className="mt-1.5 max-w-2xl text-[15px] leading-6 text-soft">{step.text}</p>
          </>
        )}
      </div>
    </li>
  );
}
