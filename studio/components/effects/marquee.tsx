"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

type Item = { name: string; sub: string };

const BASE_SPEED = 1.2; // % de largeur par seconde, au repos

/**
 * Bandeau défilant du portfolio : de grands mots estompés qui accélèrent
 * quand on fait défiler vite, et repartent dans l'autre sens quand on remonte.
 * Décoratif : les mêmes services sont décrits en clair juste après.
 */
export function Marquee({ items }: { items: readonly Item[] }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-2000, 2000], [-4, 4], { clamp: false });

  // Deux copies de la liste : on boucle sur −50 %.
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * BASE_SPEED * (delta / 1000);
    const boost = factor.get();
    if (boost < 0) direction.current = -1;
    else if (boost > 0) direction.current = 1;
    moveBy += direction.current * moveBy * Math.abs(boost);
    baseX.set(baseX.get() - moveBy);
  });

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-16 pr-16 md:gap-24 md:pr-24">
            {items.map((item) => (
              <div key={item.name} className="shrink-0 text-center">
                <p className="whitespace-nowrap font-heading text-4xl text-fg/10 md:text-6xl">{item.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-fg/30">{item.sub}</p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
