import type { Metadata } from "next";
import { Dela_Gothic_One, Livvic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import SmoothScroll from "./components/SmoothScroll";
import NoiseOverlay from "./components/NoiseOverlay";
import AnimatedGradient from "./components/AnimatedGradient";
import JsonLd from "./components/JsonLd";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://evan-g.com'),
  title: {
    default: "Evan G | Web Designer & Developer Freelance",
    template: "%s | Evan G"
  },
  description: "Portfolio d'Evan G, web designer et développeur freelance passionné. Création de sites web modernes, applications React/Next.js, React Native et solutions sur-mesure.",
  keywords: [
    "web designer",
    "développeur web",
    "freelance",
    "React",
    "Next.js",
    "React Native",
    "portfolio",
    "création site web",
    "développeur freelance",
    "Evan G",
    "web developer",
    "UI/UX designer",
    "développeur mobile",
    "application mobile",
    "site web moderne",
    "freelance France"
  ],
  authors: [{ name: "Evan G", url: "https://evan-g.com" }],
  creator: "Evan G",
  publisher: "Evan G",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Evan G | Web Designer & Developer Freelance",
    description: "Portfolio d'Evan G, web designer et développeur freelance passionné. Création de sites web modernes et sur-mesure.",
    url: "https://evan-g.com",
    siteName: "Evan G Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evan G - Web Designer & Developer Portfolio",
      },
    ],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evan G | Web Designer & Developer Freelance",
    description: "Portfolio d'Evan G, web designer et développeur freelance passionné.",
    images: ["/og-image.png"],
    creator: "@evang_creative",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://evan-g.com",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  other: {
    'theme-color': '#0a0a0a',
    'msapplication-TileColor': '#0a0a0a',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={`${livvic.variable} ${delaGothicOne.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScroll>
            <NoiseOverlay />
            <AnimatedGradient />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

