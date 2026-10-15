import { cn } from "@/lib/utils";
import { LINKS, METHODOLOGY } from "./content";
import { sora } from "./fonts";
import { PrimaryLink } from "./ui";

/** Las tres etapas de cada sesión con su reparto de tiempo, todas a la vista. */
export default function MethodologySteps() {
  const { steps } = METHODOLOGY;

  return (
    <div className="flex min-w-0 flex-col gap-7 rounded-[22px] bg-white px-6 pb-9 pt-[34px] sm:px-10 lg:min-h-[560px]">
      <h2
        className={cn(sora.className, "text-[length:clamp(20px,1.7vw,24px)] font-semibold tracking-[-0.02em] text-[#1A1426]")}
      >
        {METHODOLOGY.title}
      </h2>

      {/* Reparto de los 120 minutos: un tramo por etapa, proporcional a su duración. */}
      <div aria-hidden="true" className="flex h-3 gap-1.5">
        {steps.map((step, index) => (
          <span
            key={step.title}
            style={{ flex: `${step.share} 1 0` }}
            className={cn("rounded-full", index === 1 ? "bg-[var(--ia-accent)]" : "bg-[#E4D2FB]")}
          />
        ))}
      </div>

      <ol className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="w-6 shrink-0 pt-0.5 text-[15px] font-medium tabular-nums text-[#76747A]">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="text-[17px] font-semibold text-[#1A1426]">{step.title}</span>
                <span className="rounded-full bg-[#F3EEFB] px-3 py-1 text-[13px] font-medium text-[var(--ia-accent)]">
                  {step.minutes} min · {step.share} %
                </span>
              </p>
              <p className="mt-2 max-w-[560px] text-[15px] leading-[1.6] text-[#59565F]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <p className="max-w-[320px] text-[12.5px] leading-[1.5] text-[#737177]">{METHODOLOGY.note}</p>
        <PrimaryLink href={LINKS.enroll} className="h-[54px] px-[26px]">
          {METHODOLOGY.cta}
        </PrimaryLink>
      </div>
    </div>
  );
}
