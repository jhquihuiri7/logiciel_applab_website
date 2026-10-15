import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import ContactFooter from "./contact-footer";
import { THEME } from "./content";
import Dialogs from "./dialogs";
import { sora } from "./fonts";
import Hero from "./hero";
import Methodology from "./methodology";
import Modules from "./modules";
import Prompts from "./prompts";
import Team from "./team";
import Tools from "./tools";

/** Landing del taller de IA aplicada a la gestión administrativa y la ofimática. */
export default function CursoIaLanding() {
  const themeVars = {
    "--ia-accent": THEME.accent,
    "--ia-accent-soft": THEME.accentSoft,
  } as CSSProperties;

  return (
    <div
      style={themeVars}
      className={cn(
        sora.className,
        "min-h-screen bg-[#F8F7FB] px-3 pb-10 pt-3 text-[#1A1426] antialiased selection:bg-[#9E06E4]/20 selection:text-[#1A1426] sm:px-4 sm:pt-4",
      )}
    >
      <Hero />
      <main>
        <Modules />
        <Methodology />
        <Team />
        <Prompts />
        <Tools />
      </main>
      <ContactFooter />
      <Dialogs />
    </div>
  );
}
