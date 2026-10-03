import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** `filled` reprend le fond des cartes, `outline` la bordure seule. */
  variant?: "filled" | "outline";
  className?: string;
};

/** Étiquette de service, de technologie ou de mot-clé. */
export function Tag({ children, variant = "filled", className = "" }: Props) {
  return (
    <span
      className={[
        "inline-flex items-center border px-3 py-1.5 text-[13px] leading-[18px] text-soft transition-colors",
        variant === "filled" ? "border-line bg-card hover:border-fg/25" : "border-fg/20 hover:border-fg/35",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
