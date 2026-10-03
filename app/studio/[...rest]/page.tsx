import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page introuvable",
};

/**
 * Toute adresse inconnue sous /studio. Sans cette route, elle tomberait sur la
 * page 404 par défaut de Next : le projet a deux layouts racine, donc aucune
 * page 404 commune. Ici, elle s'affiche dans le décor du studio (`not-found.tsx`).
 */
export default function Rest() {
  notFound();
}
