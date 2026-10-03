"use client";

import { useEffect, useRef } from "react";

/**
 * Quadrillage fixe de 80 px et halo qui suit la souris, comme sur le portfolio.
 * Les couleurs viennent du thème (--grid, --halo) : rien à recalculer en JS.
 */
export function MouseGrid() {
  const halo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = halo.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate(${event.clientX - 250}px, ${event.clientY - 250}px)`;
        node.style.opacity = "1";
        frame = 0;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        ref={halo}
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-0 blur-[50px] transition-opacity duration-300"
        style={{ background: "var(--halo)" }}
      />
    </div>
  );
}
