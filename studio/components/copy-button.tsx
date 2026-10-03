"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";

type Props = {
  /** Le texte placé dans le presse-papiers. */
  text: string;
  label: string;
  doneLabel: string;
  className?: string;
};

async function copy(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Refusée (permission, page sans focus…) : on tente l'ancienne méthode.
    }
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const done = document.execCommand("copy");
  document.body.removeChild(area);
  if (!done) throw new Error("copy");
}

export function CopyButton({ text, label, doneLabel, className = "" }: Props) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async () => {
    try {
      await copy(text);
      setState("done");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 cursor-pointer items-center gap-2 text-xs uppercase tracking-widest text-mute transition-colors hover:text-fg ${className}`}
    >
      <Icon name={state === "done" ? "check" : "copy"} size={14} />
      <span aria-live="polite">{state === "done" ? doneLabel : state === "failed" ? "Copie impossible" : label}</span>
    </button>
  );
}
