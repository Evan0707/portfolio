import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Livvic } from "next/font/google";
import { AnimatedGradient, NoiseOverlay } from "@/studio/components/effects/backdrop";
import { MouseGrid } from "@/studio/components/effects/mouse-grid";
import { SmoothScroll } from "@/studio/components/effects/smooth-scroll";
import { Footer } from "@/studio/components/footer";
import { RevealObserver } from "@/studio/components/reveal-observer";
import { StatusBar } from "@/studio/components/status-bar";
import { routes, site } from "@/studio/lib/site";
import { siteUrl } from "@/studio/lib/site-url";
import { theme } from "@/studio/lib/theme";
import "./globals.css";

// Les deux polices du portfolio. Téléchargées au build puis servies par le
// site lui-même : aucun appel à Google depuis le navigateur du visiteur.
const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  variable: "--font-dela-gothic-one",
  subsets: ["latin"],
  display: "swap",
});

const livvic = Livvic({
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-livvic",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner, url: site.portfolio.url }],
  creator: site.owner,
  alternates: { canonical: routes.home },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title,
    description:
      "Applications web et mobiles taillées pour votre entreprise. Un seul interlocuteur, du premier échange à la mise en production.",
    url: routes.home,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: theme.bg,
};

/**
 * Applique le thème mémorisé avant le premier affichage : sans ce script, un
 * visiteur en mode clair verrait un éclair sombre à chaque chargement.
 */
const applySavedTheme = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

/**
 * Layout racine du studio. Le portfolio a le sien, dans `app/(portfolio)` :
 * passer de l'un à l'autre recharge donc la page entière.
 */
export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      // Le défilement doux (CSS) ne s'applique qu'aux ancres, pas aux changements de page.
      data-scroll-behavior="smooth"
      className={`${livvic.variable} ${delaGothicOne.variable}`}
      // data-theme peut être modifié par le script ci-dessous avant l'hydratation.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedTheme }} />
      </head>
      <body className="antialiased">
        <a
          href="#contenu"
          className="fixed left-4 top-[-100px] z-[200] bg-fg px-4 py-3 text-sm uppercase tracking-wider text-bg focus:top-4"
        >
          Aller au contenu
        </a>
        <SmoothScroll />
        <NoiseOverlay />
        <AnimatedGradient />
        <StatusBar />
        <main id="contenu" className="relative overflow-x-clip">
          <MouseGrid />
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
