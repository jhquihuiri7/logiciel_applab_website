import type { Metadata } from "next";
import CursoIaLanding from "@/components/curso-ia/landing";
import { BRAND, COURSE, HERO } from "@/components/curso-ia/content";

const title = `${COURSE.name} | ${BRAND}`;

export const metadata: Metadata = {
  title,
  description: HERO.description,
  openGraph: {
    title,
    description: HERO.description,
    type: "website",
    locale: "es_ES",
  },
};

export default function CursoIaPage() {
  return <CursoIaLanding />;
}
