"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { riseDelay } from "@/studio/lib/reveal";
import { availability, cta, navLinks, routes } from "@/studio/lib/site";
import { Brand, StatusDot } from "./brand";

/**
 * Bandeau permanent en haut de page — le même que sur le portfolio, auquel
 * s'ajoutent la navigation et l'appel à l'action : un dirigeant doit pouvoir
 * écrire à tout moment, sans remonter la page.
 */
export function StatusBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Menu mobile : Échap le referme, et il disparaît quand la barre complète revient.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  // Lien actif : la section qui traverse le milieu de l'écran.
  useEffect(() => {
    if (pathname !== routes.home) return;
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    if (!sections.length) return;

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSectionId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => spy.observe(section));
    return () => spy.disconnect();
  }, [pathname]);

  const currentId = pathname === routes.home ? sectionId : null;
  const isCurrent = (href: string) => (href.endsWith(`#${currentId}`) ? "true" : undefined);

  return (
    <header
      className="fixed inset-x-0 top-0 z-100 border-b border-fg/10 bg-bg/80 backdrop-blur-md"
      onClick={(event) => {
        // Tout lien du bandeau referme le menu mobile.
        if ((event.target as Element).closest("a")) setOpen(false);
      }}
    >
      <div className="flex h-[52px] items-center justify-between gap-6 px-[5vw] md:px-[7.3vw]">
        <div className="flex min-w-0 items-center gap-6">
          <Brand className="flex h-[52px] shrink-0 items-center" />
          <p className="flex min-w-0 items-center gap-2.5 text-[12px] leading-4 tracking-[0.05em] text-soft">
            <StatusDot />
            {/* Sous 1380 px, la pastille seule : le texte reste lu par les lecteurs d'écran. */}
            <span className="sr-only truncate min-[1380px]:not-sr-only">{availability.headline}</span>
          </p>
        </div>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href)}
                  className="flex h-[52px] items-center text-[12px] uppercase tracking-[0.1em] text-soft transition-colors hover:text-fg aria-[current]:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={routes.contact}
            className="relative inline-flex h-9 items-center bg-fg px-4 text-[11px] uppercase tracking-[0.1em] text-bg transition-colors after:absolute after:-inset-y-2 after:inset-x-0 hover:bg-fg/85"
          >
            <span className="hidden sm:inline">{cta.primary}</span>
            <span className="sm:hidden">{cta.short}</span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-controls="menu"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
            className="-mr-2.5 grid h-11 w-11 cursor-pointer place-items-center text-fg/70 transition-colors hover:text-fg lg:hidden"
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      <nav
        id="menu"
        aria-label="Menu"
        hidden={!open}
        className="border-t border-fg/10 px-[5vw] py-6 md:px-[7.3vw] lg:hidden"
      >
        <ul className="flex flex-col items-end gap-1 text-sm">
          {navLinks.map((link, index) => (
            <li key={link.href} className="rise" style={riseDelay(index * 50, 12)}>
              <Link
                href={link.href}
                aria-current={isCurrent(link.href)}
                className="flex h-11 items-center uppercase tracking-wider text-soft transition-colors hover:text-fg aria-[current]:text-fg"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
