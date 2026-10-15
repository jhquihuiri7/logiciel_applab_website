import Image from "next/image";
import { ArrowUpRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { TOOLS } from "./content";
import { sora } from "./fonts";
import { externalProps } from "./ui";

const groupTitle = "text-xs font-medium uppercase tracking-[0.12em] text-[#8F8C96]";
/** Logo oficial sobre fondo blanco, como piden las guías de marca. */
const logoTile = "grid shrink-0 place-items-center rounded-[14px] border border-[#ECE6F6] bg-white";

/** Herramientas del taller: asistentes de IA y Google Workspace, con enlace a su sitio oficial. */
export default function Tools() {
  return (
    <section
      id="herramientas"
      aria-labelledby="herramientas-titulo"
      className="mx-auto mt-28 w-full max-w-[1300px] scroll-mt-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ECE6F6] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#1A1426]">
            <span aria-hidden="true" className="size-2 rounded-full bg-[var(--ia-accent-soft)]" />
            {TOOLS.eyebrow}
          </span>
          <h2
            id="herramientas-titulo"
            className={cn(
              sora.className,
              "mt-4 text-[length:clamp(28px,2.6vw,38px)] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1A1426]",
            )}
          >
            {TOOLS.title[0]}
            <br />
            {TOOLS.title[1]}
          </h2>
        </div>
        <p className="max-w-[400px] text-[14.5px] leading-[1.6] text-[#59565F]">{TOOLS.description}</p>
      </div>

      <h3 className={cn(groupTitle, "mt-11")}>{TOOLS.assistantsTitle}</h3>
      <ul className="mt-4 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {TOOLS.assistants.map((tool) => (
          <li key={tool.name}>
            <a
              href={tool.href}
              {...externalProps(tool.href)}
              className="group flex h-full flex-col gap-4 rounded-[22px] bg-white p-6 transition-transform hover:-translate-y-1 hover:text-[#1A1426]"
            >
              <span className="flex items-center justify-between">
                <span className={cn(logoTile, "size-12")}>
                  <Image src={tool.logo} alt="" width={26} height={26} unoptimized className="size-[26px]" />
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-[18px] text-[#B9AFCB] transition-colors group-hover:text-[var(--ia-accent)]"
                  strokeWidth={2}
                />
              </span>
              <span
                className={cn(sora.className, "text-[18px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#1A1426]")}
              >
                {tool.name}
              </span>
              <span className="text-[14px] leading-[1.6] text-[#59565F]">{tool.text}</span>
            </a>
          </li>
        ))}
      </ul>

      <h3 className={cn(groupTitle, "mt-9")}>{TOOLS.workspaceTitle}</h3>
      <ul className="mt-4 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {TOOLS.workspace.map((tool) => (
          <li key={tool.name}>
            <a
              href={tool.href}
              {...externalProps(tool.href)}
              className="flex h-full items-center gap-3 rounded-[18px] bg-white p-4 transition-transform hover:-translate-y-0.5 hover:text-[#1A1426] xl:flex-col xl:items-start"
            >
              <span className={cn(logoTile, "size-10 rounded-xl")}>
                <Image src={tool.logo} alt="" width={22} height={22} unoptimized className="size-[22px]" />
              </span>
              <span>
                <span className="block text-[14.5px] font-semibold text-[#1A1426]">{tool.name}</span>
                <span className="mt-0.5 block text-[13px] leading-[1.45] text-[#59565F]">{tool.text}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 flex gap-3 rounded-2xl border border-[#ECE6F6] bg-white/70 px-5 py-4 text-[14px] leading-[1.6] text-[#59565F]">
        <Info aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-[var(--ia-accent)]" strokeWidth={2} />
        {TOOLS.note}
      </p>
    </section>
  );
}
