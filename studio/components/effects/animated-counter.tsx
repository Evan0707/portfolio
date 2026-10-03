"use client";

import { useEffect, useRef } from "react";

type Props = {
  end: number;
  suffix?: string;
  /** Durée du décompte, en millisecondes. */
  duration?: number;
};

/**
 * Nombre qui se compte quand il entre à l'écran.
 *
 * Le HTML porte la valeur finale : sans JavaScript, ou si l'utilisateur a
 * demandé moins d'animations, le chiffre affiché est simplement le bon.
 * Le décompte écrit directement dans le nœud, sans passer par l'état React.
 */
export function AnimatedCounter({ end, suffix = "", duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || end === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const write = (value: number) => {
      node.textContent = `${value}${suffix}`;
    };
    write(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          write(Math.round((1 - Math.pow(1 - progress, 3)) * end));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-60px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      write(end);
    };
  }, [end, suffix, duration]);

  return (
    <span ref={ref}>
      {end}
      {suffix}
    </span>
  );
}
