"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Inclinaison maximale, en degrés. */
  tilt?: number;
  scale?: number;
};

const REST = { rotateX: 0, rotateY: 0, scale: 1 };

/** Carte qui s'incline vers le pointeur, comme les projets du portfolio. */
export function TiltCard({ children, className = "", tilt = 8, scale = 1.02 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pose, setPose] = useState(REST);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={(event) => {
        if (reduce || !ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (event.clientX - left) / width - 0.5;
        const y = (event.clientY - top) / height - 0.5;
        setPose({ rotateX: -y * tilt, rotateY: x * tilt, scale });
      }}
      onMouseLeave={() => setPose(REST)}
      animate={pose}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
