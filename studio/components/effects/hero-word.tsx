"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import wave from "@/public/Layer_1 1.webp";
import { riseDelay } from "@/studio/lib/reveal";

/**
 * Le grand mot du héros, coupé en deux — « SUR— / MESURE », comme
 * « PORT— / FOLIO » sur le portfolio. Les deux moitiés s'écartent au
 * défilement ; la forme en fil de fer flotte entre elles.
 */
export function HeroWord({ word }: { word: readonly [string, string] }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const topY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -70]);
  const bottomY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 70]);

  const letters = "font-heading text-[15vw] leading-none tracking-tight md:text-[12vw]";

  return (
    <div className="relative" aria-hidden="true">
      <motion.div style={{ y: topY }}>
        <div className="rise flex items-center" style={riseDelay(0, 30)}>
          <span className={letters}>{word[0]}</span>
          {/* Le tiret s'étire jusqu'au bord du mot du dessous. */}
          <span className="ml-[1.4vw] mt-[1vw] h-[1.9vw] min-w-[6vw] flex-1 bg-fg/20 md:h-[1.5vw]" />
        </div>
      </motion.div>

      <motion.div style={{ y: bottomY }}>
        <div className="rise -mt-3 flex justify-end md:-mt-7" style={riseDelay(100, -30)}>
          <span className={`${letters} relative z-10`}>{word[1]}</span>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image src={wave} alt="" className="w-[35vw] opacity-90 md:w-[20vw]" sizes="(max-width: 768px) 35vw, 20vw" preload />
      </div>
    </div>
  );
}
