import { Sora } from "next/font/google";

/** Tipografía de la landing /curso-ia (solo se descarga en esta ruta). */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
