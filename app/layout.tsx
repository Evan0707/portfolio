import type { Metadata } from "next";
import { Dela_Gothic_One, Livvic } from "next/font/google";
import "./globals.css";

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
  title: "Evan G | Web Designer & Developer",
  description: "Portfolio d'Evan G, web designer et développeur passionné. Création de sites web modernes et sur-mesure.",
  openGraph: {
    title: "Evan G | Web Designer & Developer",
    description: "Portfolio d'Evan G, web designer et développeur passionné.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evan G | Web Designer & Developer",
    description: "Portfolio d'Evan G, web designer et développeur passionné.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${livvic.variable} ${delaGothicOne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
