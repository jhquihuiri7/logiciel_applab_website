import Image from "next/image";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { contentsLabel, MODULES, syllabusHref } from "./content";
import { sora } from "./fonts";
import { PrimaryLink } from "./ui";

/** Programa de capacitación: una tarjeta por día. */
export default function Modules() {
  return (
    <section
      id="modulos"
      aria-labelledby="modulos-titulo"
      className="mx-auto mt-24 w-full max-w-[1300px] scroll-mt-6 rounded-[28px] bg-[linear-gradient(180deg,#F5F0FC_0%,#EFE9F8_100%)] px-4 pb-[60px] pt-16 sm:px-8 lg:px-10"
    >
      <h2
        id="modulos-titulo"
        className={cn(
          sora.className,
          "mx-auto max-w-[760px] text-balance text-center text-[length:clamp(28px,2.6vw,38px)] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1A1426]",
        )}
      >
        {MODULES.title[0]}
        <br />
        {MODULES.title[1]}
      </h2>
      <p className="mx-auto mt-6 max-w-[760px] text-center text-[15px] leading-[1.65] text-[#59565F]">
        <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[var(--ia-accent)]">
          {MODULES.objectiveLabel}
        </span>
        {MODULES.description}
      </p>
      <p className="mx-auto mt-4 max-w-[760px] text-center text-[14px] leading-[1.6] text-[#59565F]">
        <span className="font-semibold text-[#1A1426]">{MODULES.audienceLabel}:</span> {MODULES.audience}
      </p>

      <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {MODULES.items.map((item) => (
          <article key={item.slug} className="flex flex-col rounded-2xl bg-white px-[7px] pb-4 pt-[7px]">
            <div className="relative aspect-[1.38] overflow-hidden rounded-[11px]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 1280px) 240px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#1A1426]">
                Día {item.day}
              </span>
            </div>
            <h3
              className={cn(
                sora.className,
                "mx-2.5 mt-3.5 text-[15.5px] font-semibold leading-[1.45] tracking-[-0.01em] text-[#1A1426]",
              )}
            >
              {item.title}
            </h3>
            <p className="mx-2.5 mt-2.5 text-[13px] leading-[1.5] text-[#59565F]">
              {item.focus} · {contentsLabel(item)}
            </p>
            <div className="mx-2.5 mt-auto flex items-center justify-between gap-3 pt-[18px]">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-[#59565F]">
                <Clock aria-hidden="true" className="size-4 shrink-0 text-[var(--ia-accent-soft)]" strokeWidth={2.2} />
                {item.duration}
              </span>
              <a
                href={syllabusHref(item.slug)}
                className="relative inline-flex h-11 shrink-0 items-center rounded-full border border-[#E2E0E7] px-4 text-[13.5px] text-[#1A1426] transition-colors hover:border-[#1A1426] hover:text-[#1A1426]"
              >
                Ver detalle<span className="sr-only">: Día {item.day}, {item.title}</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <PrimaryLink href={MODULES.ctaHref}>{MODULES.cta}</PrimaryLink>
      </div>
    </section>
  );
}
