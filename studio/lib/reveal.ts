import type { CSSProperties } from "react";

/** Décale la révélation d'un élément `data-reveal` (effet de cascade). */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

/**
 * Règle l'entrée d'un élément `.rise` (animation au chargement) :
 * son retard, et la distance d'où il arrive — négative pour venir du haut.
 */
export function riseDelay(ms: number, distance = 16): CSSProperties {
  return { "--delay": `${ms}ms`, "--rise": `${distance}px` } as CSSProperties;
}
