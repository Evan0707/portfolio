import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";

type Props = {
  /** Nom du fichier attendu dans `public/images/`. */
  file: string;
  alt: string;
  /** Ce que l'image doit montrer, et sa taille conseillée. */
  hint: string;
  /** Largeur affichée, pour que Next serve la bonne taille (attribut `sizes`). */
  sizes: string;
  className?: string;
  /** Classes de l'image elle-même (cadrage, niveaux de gris…). */
  imageClassName?: string;
  /** À activer pour une image visible dès l'arrivée sur la page. */
  eager?: boolean;
  /**
   * Ce qui s'affiche tant que l'image manque : une maquette, un motif…
   * `illustration` le décrit aux lecteurs d'écran ; sans lui, le décor est ignoré.
   */
  children?: ReactNode;
  illustration?: string;
};

const isDev = process.env.NODE_ENV === "development";

/**
 * Emplacement d'image.
 *
 * - Le fichier `public/images/<file>` existe : il s'affiche, optimisé par next/image.
 * - Il n'existe pas : le contenu de remplacement (`children`) tient la place.
 *   En développement, une étiquette rappelle en plus quel fichier déposer ;
 *   elle n'apparaît jamais sur le site en ligne.
 */
export function ImageSlot({
  file,
  alt,
  hint,
  sizes,
  className = "",
  imageClassName = "object-cover object-top",
  eager = false,
  children,
  illustration,
}: Props) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "images", file));
  // @container : les maquettes se dimensionnent d'après la largeur de l'emplacement.
  const classes = `@container relative overflow-hidden ${className}`;

  if (exists) {
    return (
      <div className={classes}>
        <Image
          className={imageClassName}
          src={`/images/${file}`}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      </div>
    );
  }

  return (
    <div className={classes}>
      {illustration ? (
        <div className="absolute inset-0" role="img" aria-label={illustration}>
          {children}
        </div>
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          {children}
        </div>
      )}
      {isDev && (
        <p
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-10 w-max max-w-[88%] -translate-x-1/2 -translate-y-1/2 border border-dashed border-white/50 bg-[#0a0a0b]/95 px-3 py-2 text-center font-sans text-[11px] leading-[15px] text-white/70"
        >
          <span className="block text-[10px] uppercase tracking-[0.1em] text-white/50">Image à ajouter</span>
          <span className="block break-all font-semibold text-white">{file}</span>
          <span className="block @max-[240px]:hidden">{hint}</span>
        </p>
      )}
    </div>
  );
}
