"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";

type Theme = "dark" | "light";

const EVENT = "themechange";

/**
 * Le thème vit dans l'attribut data-theme de <html>. Un petit script, dans
 * app/studio/layout.tsx, y applique le choix mémorisé avant le premier affichage :
 * pas de clignotement au chargement.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const serverTheme = (): Theme => "dark";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Stockage indisponible (navigation privée…) : le choix vaut pour la visite.
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-fg/10 transition-colors hover:border-fg/40"
    >
      <span
        className={`absolute transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : "rotate-180 scale-0"}`}
      >
        <Moon size={18} className="text-fg/70" />
      </span>
      <span
        className={`absolute transition-all duration-300 ${theme === "light" ? "rotate-0 scale-100" : "-rotate-180 scale-0"}`}
      >
        <Sun size={18} className="text-fg/80" />
      </span>
    </button>
  );
}
