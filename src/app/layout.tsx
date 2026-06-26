import type { Metadata } from "next";
import { JetBrains_Mono, Poppins, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Logiciel AppLab | Ingenieria Web de Alto Impacto",
  description:
    "Disenamos, desarrollamos y optimizamos plataformas web de alto rendimiento con enfoque en negocio, experiencia y escalabilidad.",
  openGraph: {
    title: "Logiciel AppLab",
    description:
      "Transformamos ideas en productos digitales premium con arquitectura moderna, UX avanzada y performance real.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${sourceSerif.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
