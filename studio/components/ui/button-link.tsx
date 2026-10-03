import type { ReactNode } from "react";
import Link from "next/link";
import type { IconName } from "@/studio/lib/site";
import { Icon } from "../icon";

/** Les deux boutons du portfolio : plein (inversé) et contour. */
export const buttonClasses = {
  base: "inline-flex min-h-12 items-center justify-center gap-2 px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300",
  solid: "bg-fg text-bg hover:bg-fg/85",
  outline: "border border-fg/30 text-fg/80 hover:bg-fg hover:text-bg",
} as const;

type Props = {
  href: string;
  variant?: "solid" | "outline";
  /** Icône placée après le libellé. */
  icon?: IconName;
  /** Lien vers un autre site : s'ouvre dans un nouvel onglet. */
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ href, variant = "outline", icon, external = false, className = "", children }: Props) {
  const classes = `${buttonClasses.base} ${buttonClasses[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={15} weight="bold" />}
    </>
  );

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
