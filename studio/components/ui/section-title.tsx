type Props = {
  /** Le mot du titre, en capitales. */
  children: string;
  id: string;
  /** Petite ligne sous le titre, en capitales espacées. */
  subtitle?: string;
};

/**
 * Titre de section, comme sur le portfolio : un grand mot en Dela Gothic,
 * décalé vers la droite, révélé par le bas avec un léger flou.
 */
export function SectionTitle({ children, id, subtitle }: Props) {
  return (
    <div className="mb-10 pl-[7.3vw] md:mb-14">
      <div className="overflow-hidden pb-[0.08em]">
        <h2 id={id} data-reveal="title" className="font-heading text-[8vw] leading-none tracking-wide md:text-[4vw]">
          {children}
        </h2>
      </div>
      {subtitle && (
        <p data-reveal className="mt-3 text-sm uppercase tracking-[0.2em] text-mute md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Petite étiquette de rubrique, au-dessus d'un groupe de cartes. */
export function Label({ children, className = "" }: { children: string; className?: string }) {
  return <p className={`text-[12px] uppercase tracking-[0.1em] text-mute ${className}`}>{children}</p>;
}
