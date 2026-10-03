import Link from "next/link";
import { routes, site } from "@/studio/lib/site";
import { gutter } from "@/studio/lib/ui";

const link = "-my-3.5 py-3.5 transition-colors hover:text-fg";

export function Footer() {
  return (
    <footer className={`relative mt-24 pb-14 ${gutter}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-8 text-xs text-mute">
        <p>
          © {new Date().getFullYear()} {site.name} — {site.owner}, entrepreneur individuel
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href={routes.legal} className={link}>
            Mentions légales
          </Link>
          <a href={site.linkedin.url} target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn
          </a>
          {/* Le portfolio est sur le même site : un lien interne, dans le même onglet. */}
          <Link href={routes.portfolio} className={link}>
            {site.portfolio.label}
          </Link>
          <a href={site.openchantier.url} target="_blank" rel="noopener noreferrer" className={link}>
            {site.openchantier.label}
          </a>
        </p>
      </div>
    </footer>
  );
}
