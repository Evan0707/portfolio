import type { ReactNode } from "react";

/** Cadre de téléphone. La largeur se règle en CSS avec la variable `--w`. */
export function Phone({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`phone ${className}`}>{children}</div>;
}
