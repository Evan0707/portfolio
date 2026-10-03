import Link from "next/link";
import { routes, site } from "@/studio/lib/site";

/**
 * Le monogramme « eG » — tracé de public/images/Logo.svg.
 * Il prend la couleur du texte : blanc en thème sombre, noir en thème clair.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 82 114" fill="currentColor" aria-hidden="true">
      <path d="M76 67V60H62V67H69H76ZM69 47H76V43H69H62V47H69ZM13 43H6V71H13H20V43H13ZM69 71H76V67H69H62V71H69ZM41 99V106C60.33 106 76 90.33 76 71H69H62C62 82.598 52.598 92 41 92V99ZM13 71H6C6 90.33 21.67 106 41 106V99V92C29.402 92 20 82.598 20 71H13ZM41 15V8C21.67 8 6 23.67 6 43H13H20C20 31.402 29.402 22 41 22V15ZM69 43H76C76 23.67 60.33 8 41 8V15V22C52.598 22 62 31.402 62 43H69Z" />
      <path d="M48 41C48 37.134 44.866 34 41 34C37.134 34 34 37.134 34 41H41H48ZM41 47H48V41H41H34V47H41Z" />
      <path d="M66.5087 67C68.4417 67 70.0087 65.433 70.0087 63.5C70.0087 61.567 68.4417 60 66.5087 60V63.5V67ZM37.5 60H34V67H37.5V63.5V60ZM66.5087 63.5V60H37.5V63.5V67H66.5087V63.5Z" />
      <path d="M41 67V71.8" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
    </svg>
  );
}

/** Le logo et le nom du studio, lien vers l'accueil. */
export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href={routes.home} aria-label={`${site.name} — accueil`} className={`flex items-center gap-3 text-fg ${className}`}>
      <Logo className="h-7 w-auto shrink-0" />
      <span className="font-heading text-[13px] uppercase leading-none tracking-wide">
        Evan G. <span className="text-fg/40">Studio</span>
      </span>
    </Link>
  );
}

/** Pastille verte qui pulse : « disponible ». */
export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-2 w-2 shrink-0 ${className}`} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
    </span>
  );
}

/** Le logo d'OpenChantier : un anneau de points. Il prend la couleur du texte. */
export function OpenChantierMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 52" fill="currentColor" aria-hidden="true">
      <circle cx="19.5" cy="7.5" r="4" />
      <circle cx="7.5" cy="32.5" r="4" />
      <circle cx="32.5" cy="44.5" r="4" />
      <circle cx="44.5" cy="19.5" r="4" />
      <circle cx="8.5" cy="11" r="3" />
      <circle cx="11" cy="43.5" r="3" />
      <circle cx="43.5" cy="41" r="3" />
      <circle cx="41" cy="8.5" r="3" />
      <circle cx="30.5" cy="11" r="3" />
      <circle cx="11" cy="21.5" r="3" />
      <circle cx="21.5" cy="41" r="3" />
      <circle cx="41" cy="30.5" r="3" />
      <circle cx="36" cy="18" r="2" />
      <circle cx="18" cy="16" r="2" />
      <circle cx="16" cy="34" r="2" />
      <circle cx="34" cy="36" r="2" />
      <circle cx="3" cy="18" r="2" />
      <circle cx="18" cy="49" r="2" />
      <circle cx="49" cy="34" r="2" />
      <circle cx="34" cy="3" r="2" />
    </svg>
  );
}
