"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Révèle en douceur les éléments marqués `data-reveal` quand ils entrent à l'écran.
 *
 * Le HTML arrive entièrement visible : rien n'est masqué tant que ce composant
 * n'a pas pris la main. Sans JavaScript, ou si l'utilisateur a demandé moins
 * d'animations, la page reste donc lisible telle quelle.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Ce qui est déjà à l'écran sort du jeu : affiché, sans animation ni clignotement.
    const fold = window.innerHeight * 0.92;
    const pending = items.filter((item) => {
      if (item.getBoundingClientRect().top >= fold) return true;
      item.removeAttribute("data-reveal");
      return false;
    });

    // À partir d'ici seulement, le CSS masque ce qui n'est pas encore révélé.
    const root = document.documentElement;
    root.setAttribute("data-reveal-ready", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      root.removeAttribute("data-reveal-ready");
    };
  }, [pathname]);

  return null;
}
