import { routes } from "./site";

/**
 * Adresses publiques — pour les métadonnées et les données structurées.
 * Le studio est servi par le portfolio : même domaine, sous /studio.
 */
export const siteUrl = "https://evan-g.com";
export const studioUrl = `${siteUrl}${routes.home}`;
