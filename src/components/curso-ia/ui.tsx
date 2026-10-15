import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SPARKLE_PATH =
  "M12 2.5c.9 5.2 4.3 8.6 9.5 9.5-5.2.9-8.6 4.3-9.5 9.5-.9-5.2-4.3-8.6-9.5-9.5 5.2-.9 8.6-4.3 9.5-9.5z";
const STAR_PATH =
  "M12 2.8l2.75 5.57 6.15.9-4.45 4.33 1.05 6.12L12 16.83l-5.5 2.89 1.05-6.12L3.1 9.27l6.15-.9L12 2.8z";

type IconProps = { className?: string };

/** Destello de 4 puntas (marca y viñetas). Toma el color de `text-*`. */
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={SPARKLE_PATH} fill="currentColor" />
    </svg>
  );
}

/** Estrella rellena. Toma el color de `text-*`. */
export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}

const MARK_TONES = {
  light: "bg-white text-[var(--ia-accent)]",
  accent: "bg-[var(--ia-accent)] text-white",
  ghost: "bg-white text-[#B198D9]",
} as const;

/** Isotipo provisional de la marca: destello dentro de un cuadro redondeado. */
export function BrandMark({
  tone = "light",
  className,
}: {
  tone?: keyof typeof MARK_TONES;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("grid shrink-0 place-items-center", MARK_TONES[tone], className)}>
      <SparkleIcon className="h-[58%] w-[58%]" />
    </span>
  );
}

/** Estilo del botón principal (morado con borde inferior oscuro); sirve para <a> y <button>. */
export const primaryButton =
  "inline-flex h-14 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-[var(--ia-accent)] px-7 text-[19px] font-bold tracking-[-0.01em] text-white shadow-[0_5px_0_#1F0B33] transition-transform hover:-translate-y-0.5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1426]";

/** Estilo del botón secundario (contorno). */
export const secondaryButton =
  "inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-[#1A1426]/20 bg-white px-6 text-[15px] font-medium text-[#1A1426] transition-colors hover:border-[#1A1426] hover:text-[#1A1426] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1426]";

/** Panel flotante de los desplegables del hero. */
export const popoverPanel =
  "absolute z-30 rounded-2xl bg-white p-2 shadow-[0_18px_40px_rgba(26,20,38,0.14)] animate-in fade-in-0 slide-in-from-top-1 motion-reduce:animate-none";

/** Atributos para abrir enlaces externos (WhatsApp, etc.) en otra pestaña. */
export const externalProps = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

type LinkProps = { href: string; children: ReactNode; className?: string };

/** Botón principal como enlace, con flecha. */
export function PrimaryLink({ href, children, className }: LinkProps) {
  return (
    <a href={href} {...externalProps(href)} className={cn(primaryButton, className)}>
      {children}
      <ArrowRight aria-hidden="true" className="size-5" strokeWidth={2} />
    </a>
  );
}

/** Botón secundario como enlace. */
export function SecondaryLink({ href, children, className }: LinkProps) {
  return (
    <a href={href} {...externalProps(href)} className={cn(secondaryButton, className)}>
      {children}
    </a>
  );
}

/** Logo de WhatsApp. Toma el color de `text-*`. */
export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2s-1.1.2-3.6-.8-4.1-3.6-4.2-3.8-1-1.3-1-2.5.6-1.7.9-2 .5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5-.3.3c-.2.2-.3.4-.1.7s.8 1.3 1.7 2.1c1.1 1 2 1.3 2.3 1.4s.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3s.1.7-.1 1.2Z"
      />
    </svg>
  );
}
