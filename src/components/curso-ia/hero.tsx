import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, HERO, IMAGES, LINKS } from "./content";
import { sora } from "./fonts";
import HeroMenu from "./hero-menu";
import { BrandMark, PrimaryLink, StarIcon } from "./ui";

const factValue = "block text-[26px] font-medium leading-none tracking-[-0.02em] text-[#1A1426]";
const factLabel = "mt-2 flex items-center gap-1 text-[13.5px] text-[#59565F]";

export default function Hero() {
  const photo = IMAGES.hero;

  return (
    <header
      id="inicio"
      className="mx-auto grid w-full max-w-[1408px] gap-7 rounded-[28px] bg-[linear-gradient(180deg,#E3D9F5_0%,#ECE6F8_40%,#F7F5FC_76%,#FEFDFF_100%)] p-3.5 lg:grid-cols-2"
    >
      <div className="relative min-h-[540px] overflow-hidden rounded-[22px] bg-[#BCA6E0] sm:min-h-[640px] lg:min-h-[772px]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute left-[30px] top-7 flex items-center gap-2.5 text-white">
          <BrandMark tone="light" className="size-[34px] rounded-[10px]" />
          <span className="text-[28px] font-medium leading-none tracking-[-0.02em]">{BRAND}</span>
        </div>
      </div>

      <div className="flex min-w-0 flex-col px-2 pb-3.5 pt-1 lg:pl-5">
        <nav aria-label="Principal" className="relative z-20 flex justify-end">
          <HeroMenu />
        </nav>

        <div className="flex flex-1 flex-col justify-center py-12 lg:pb-8">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ia-accent-soft)] px-2.5 py-1 text-[13px] font-semibold text-[#1A1426]">
              <StarIcon className="size-3" />
              {HERO.badge}
            </span>
            <span className="text-[15px] text-[#1A1426]">{HERO.badgeText}</span>
          </div>

          <h1
            className={cn(
              sora.className,
              "mt-[22px] text-[length:clamp(40px,4.3vw,62px)] font-semibold leading-[1.2] tracking-[-0.025em] text-[#1A1426]",
            )}
          >
            {HERO.title[0]}
            <br />
            {HERO.title[1]}
          </h1>

          <p className="mt-[22px] max-w-[540px] text-base leading-[1.65] text-[#59565F]">{HERO.description}</p>

          <div className="mt-9 flex flex-wrap items-center gap-[26px]">
            <PrimaryLink href={LINKS.enroll} className="h-[58px] px-[30px]">
              {HERO.primaryCta}
            </PrimaryLink>
            <a
              href={HERO.secondaryHref}
              className="inline-flex items-center gap-3.5 text-[17px] font-medium text-[#1A1426] hover:text-[#1A1426]"
            >
              <span
                aria-hidden="true"
                className="grid size-[58px] place-items-center rounded-full border-[1.5px] border-[#1A1426]"
              >
                <Play className="ml-0.5 size-[22px] fill-[var(--ia-accent)] text-[var(--ia-accent)]" strokeWidth={1.5} />
              </span>
              {HERO.secondaryCta}
            </a>
          </div>
        </div>

        {/* Datos clave del curso; el precio abre la ventana de inversión. */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#1A1426]/10 pt-6 sm:grid-cols-4">
          {HERO.facts.map((fact) => (
            <li key={fact.label}>
              {fact.href ? (
                <a href={fact.href} className="group block hover:text-[#1A1426]">
                  <span className={cn(factValue, "text-[var(--ia-accent)]")}>{fact.value}</span>
                  <span className={cn(factLabel, "group-hover:text-[#1A1426] group-hover:underline")}>
                    {fact.label}
                    <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={2} />
                  </span>
                </a>
              ) : (
                <>
                  <span className={factValue}>{fact.value}</span>
                  <span className={factLabel}>{fact.label}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
