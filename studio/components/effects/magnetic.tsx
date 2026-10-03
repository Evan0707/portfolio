"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  /** Part du déplacement de la souris que le contenu suit. */
  strength?: number;
  className?: string;
};

/**
 * Enveloppe « aimantée » : son contenu se laisse attirer par le pointeur,
 * avec le même ressort que le bouton d'envoi du portfolio.
 */
export function Magnetic({ children, strength = 0.3, className = "inline-block" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.span
      ref={ref}
      className={className}
      onMouseMove={(event) => {
        if (reduce || !ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        setOffset({
          x: (event.clientX - left - width / 2) * strength,
          y: (event.clientY - top - height / 2) * strength,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.span>
  );
}
