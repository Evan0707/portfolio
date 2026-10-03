"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Frise verticale du portfolio (section « Parcours ») : un rail creux, et un
 * trait plein qui se remplit à mesure qu'on fait défiler.
 */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-fg/15 md:left-[190px]">
        <motion.div
          // Le serveur ne sait pas si l'utilisateur veut moins d'animations.
          suppressHydrationWarning
          style={reduce ? undefined : { scaleY }}
          className="absolute inset-0 origin-top bg-fg/40"
        />
      </div>
      {children}
    </div>
  );
}
