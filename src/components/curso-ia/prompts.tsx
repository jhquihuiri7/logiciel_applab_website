"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULES, PROMPTS, syllabusHref } from "./content";
import { sora } from "./fonts";
import { secondaryButton } from "./ui";

type CopyState = "idle" | "copied" | "error";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Respaldo para navegadores sin acceso al portapapeles (p. ej. sitios sin HTTPS).
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  }
}

function CopyButton({ text, title }: { text: string; title: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    setState((await copyText(text)) ? "copied" : "error");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2000);
  };

  const Icon = state === "copied" ? Check : Copy;
  const label = state === "copied" ? PROMPTS.copied : state === "error" ? PROMPTS.copyError : PROMPTS.copy;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        secondaryButton,
        "w-full",
        state === "copied" && "border-[var(--ia-accent)] text-[var(--ia-accent)] hover:text-[var(--ia-accent)]",
      )}
    >
      <Icon aria-hidden="true" className="size-[18px]" strokeWidth={2} />
      <span aria-live="polite">
        {label}
        <span className="sr-only">: {title}</span>
      </span>
    </button>
  );
}

/** Ejemplos de instrucciones del curso, listos para copiar. */
export default function Prompts() {
  return (
    <section
      id="prompts"
      aria-labelledby="prompts-titulo"
      className="mx-auto mt-28 w-full max-w-[1300px] scroll-mt-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ECE6F6] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#1A1426]">
            <span aria-hidden="true" className="size-2 rounded-full bg-[var(--ia-accent-soft)]" />
            {PROMPTS.eyebrow}
          </span>
          <h2
            id="prompts-titulo"
            className={cn(
              sora.className,
              "mt-4 text-[length:clamp(28px,2.6vw,38px)] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1A1426]",
            )}
          >
            {PROMPTS.title[0]}
            <br />
            {PROMPTS.title[1]}
          </h2>
        </div>
        <p className="max-w-[400px] text-[14.5px] leading-[1.6] text-[#59565F]">{PROMPTS.description}</p>
      </div>

      <div className="mt-11 grid gap-[26px] lg:grid-cols-3">
        {PROMPTS.items.map((item) => {
          const day = MODULES.items.find((entry) => entry.slug === item.slug);
          return (
            <article key={item.title} className="flex flex-col gap-5 rounded-[22px] bg-white p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#F3EEFB] px-3 py-1 text-[12.5px] font-semibold text-[var(--ia-accent)]">
                  {item.label}
                </span>
                {day && (
                  <a
                    href={syllabusHref(day.slug)}
                    className="text-[13px] text-[#59565F] underline-offset-2 hover:text-[#1A1426] hover:underline"
                  >
                    {PROMPTS.dayLink} {day.day}
                  </a>
                )}
              </div>
              <h3
                className={cn(sora.className, "text-[19px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#1A1426]")}
              >
                {item.title}
              </h3>
              <p className="flex-1 rounded-2xl border border-[#ECE6F6] bg-[linear-gradient(180deg,#FBF9FF_0%,#F5F0FC_100%)] p-4 text-[14.5px] leading-[1.7] text-[#1A1426]">
                {item.text}
              </p>
              <CopyButton text={item.text} title={item.title} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
