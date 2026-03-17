"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  useReducedMotion,
  useScroll,
} from "motion/react";
import React, { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const CONTACT_URL =
  "https://wa.me/593997613568?text=Hola%2C%20quiero%20crear%20una%20plataforma%20web%20de%20alto%20impacto%20con%20Logiciel%20AppLab";

const NAV = [
  { id: "services", label: "Servicios" },
  { id: "process", label: "Proceso" },
  { id: "stack", label: "Stack" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contacto" },
] as const;

const STATS = [
  ["Lanzamiento promedio", "4-8 semanas"],
  ["Proyectos entregados", "+120"],
  ["Target de disponibilidad", "99.9%"],
  ["Core Web Vitals", "Optimizados"],
] as const;

const SERVICES = [
  {
    id: "platforms",
    title: "Plataformas Web a Medida",
    text: "Arquitectura frontend escalable, UX premium y codigo mantenible para crecimiento real.",
    stack: ["Next.js", "TypeScript", "Tailwind", "SSR/SSG"],
  },
  {
    id: "conversion",
    title: "UX y Conversion",
    text: "Flujos centrados en negocio, storytelling visual y microinteracciones que elevan conversion.",
    stack: ["UX Research", "Motion", "CRO", "Analytics"],
  },
  {
    id: "seo",
    title: "SEO Tecnico y Growth",
    text: "Base semantica y tecnica para captar trafico cualificado y sostener visibilidad organica.",
    stack: ["Schema", "Search Console", "CWV", "Content Ops"],
  },
] as const;

const STEPS = [
  ["Discovery", "Objetivos, audiencia y roadmap tecnico."],
  ["UX/UI", "Sistema visual y prototipado interactivo."],
  ["Build", "Desarrollo modular con calidad de codigo."],
  ["QA", "Validacion de rendimiento, accesibilidad y flujos."],
  ["Launch", "Despliegue, medicion y mejora continua."],
] as const;

const CASES = [
  {
    id: "trading8",
    name: "Trading 8",
    sector: "Fintech",
    challenge: "Reducir friccion en onboarding.",
    outcome: "+42% en registros completados.",
    gradient:
      "linear-gradient(135deg, rgba(11,24,58,0.95) 0%, rgba(26,103,178,0.75) 50%, rgba(69,230,255,0.55) 100%)",
  },
  {
    id: "earthquake",
    name: "Earthquake Platform",
    sector: "Data",
    challenge: "Presentar informacion critica en tiempo real.",
    outcome: "Mejor lectura operativa y menor tiempo de decision.",
    gradient:
      "linear-gradient(120deg, rgba(8,16,30,0.95) 0%, rgba(49,74,142,0.8) 50%, rgba(0,205,255,0.5) 100%)",
  },
  {
    id: "portfolio",
    name: "Portfolio Pro",
    sector: "Creative",
    challenge: "Convertir portafolio en canal de ventas.",
    outcome: "+58% en leads calificados en 90 dias.",
    gradient:
      "linear-gradient(125deg, rgba(5,22,36,0.95) 0%, rgba(19,87,146,0.8) 45%, rgba(106,255,231,0.5) 100%)",
  },
] as const;

const TECH = [
  ["Next.js", "Render hibrido para velocidad y SEO."],
  ["TypeScript", "Tipado estricto para confiabilidad."],
  ["Motion", "Transiciones y microinteracciones fluidas."],
  ["Cloud", "Despliegue preparado para escalar."],
  ["Analytics", "Medicion orientada a negocio."],
] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };
function Reveal({ className, delay = 0, children, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function HeroVisual() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="orb-wrap relative mx-auto mt-10 flex aspect-square w-full max-w-[480px] items-center justify-center">
      <div className="absolute inset-[16%] rounded-full bg-cyan-300/20 blur-3xl" />
      <motion.div className="orb-ring" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
      <motion.div className="orb-ring orb-ring-b" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
      <motion.div className="orb-ring orb-ring-c" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
      <div className="glass-panel relative flex h-[58%] w-[58%] flex-col justify-between p-6">
        <span className="section-label w-fit">Live Build</span>
        <div>
          <p className="font-[var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-cyan-100">Core Stack</p>
          <p className="mt-2 text-2xl font-semibold text-white">Next.js + Motion</p>
        </div>
        <div className="signal-line h-1 w-full rounded-full bg-white/10" />
      </div>
    </div>
  );
}

type ServiceId = (typeof SERVICES)[number]["id"];
type CaseId = (typeof CASES)[number]["id"];

export default function Main() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [serviceId, setServiceId] = useState<ServiceId>(SERVICES[0].id);
  const [caseId, setCaseId] = useState<CaseId>(CASES[0].id);
  const [techIndex, setTechIndex] = useState(0);

  const activeService = useMemo(
    () => SERVICES.find((item) => item.id === serviceId) ?? SERVICES[0],
    [serviceId],
  );
  const activeCase = useMemo(() => CASES.find((item) => item.id === caseId) ?? CASES[0], [caseId]);

  return (
    <div className="page-shell">
      <motion.div className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-200" style={{ scaleX: scrollYProgress }} />

      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#070d1b]/70 backdrop-blur-xl">
        <div className="layout-container flex h-20 items-center justify-between">
          <Link href="#inicio" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/35 bg-cyan-300/10 text-sm font-semibold text-cyan-100">LA</span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Logiciel</p>
              <p className="text-xs text-slate-300">Digital Engineering Studio</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link key={item.id} href={`#${item.id}`} className="text-sm text-slate-300 transition hover:text-cyan-100">
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cyan-200/35 bg-cyan-300/15 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/25">
            Iniciar proyecto
          </a>
        </div>
      </header>

      <main>
        <section id="inicio" className="section-shell pt-36">
          <div className="layout-container grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <Reveal className="space-y-8">
              <span className="section-label">Web Experiences de Alto Impacto</span>
              <h1 className="max-w-2xl text-4xl leading-[1.03] text-white md:text-6xl">
                Ingenieria web que convierte vision en <span className="text-gradient">producto digital premium</span>
              </h1>
              <p className="max-w-xl text-lg text-slate-300 md:text-xl">
                Disenamos plataformas modernas con arquitectura solida, UX inmersiva y performance real para empresas que quieren destacar con tecnologia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#portfolio" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">Explorar casos</Link>
                <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-200 hover:text-cyan-100">Agendar consultoria</a>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {STATS.map(([label, value]) => (
                  <div key={label} className="glass-panel p-4">
                    <p className="font-[var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.2em] text-cyan-200/75">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}><HeroVisual /></Reveal>
          </div>
        </section>

        <section id="services" className="section-shell section-transition">
          <div className="layout-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {SERVICES.map((service) => (
                <button key={service.id} onClick={() => setServiceId(service.id)} className={cn("w-full rounded-2xl border px-5 py-4 text-left transition", service.id === activeService.id ? "border-cyan-200/40 bg-cyan-300/10" : "border-white/10 bg-white/5 hover:border-white/25")}>
                  <p className="text-lg font-semibold text-white">{service.title}</p>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.article key={activeService.id} initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -14 }} className="glass-panel p-8">
                <p className="text-xl font-semibold text-white">{activeService.title}</p>
                <p className="mt-3 text-slate-300">{activeService.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeService.stack.map((item) => <span key={item} className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-50">{item}</span>)}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </section>

        <section id="process" className="section-shell">
          <div className="layout-container">
            <Reveal className="mb-10 max-w-3xl">
              <span className="section-label">Proceso de Ingenieria</span>
              <h2 className="mt-4 text-3xl text-white md:text-5xl">Metodologia precisa de estrategia a lanzamiento</h2>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {STEPS.map(([title, text], idx) => (
                <Reveal key={title} delay={idx * 0.05}>
                  <article className="glass-panel h-full p-6">
                    <p className="font-[var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-cyan-200/80">Step {String(idx + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="section-shell section-transition">
          <div className="layout-container grid gap-8 lg:grid-cols-2">
            <Reveal className="glass-panel p-7">
              <span className="section-label">Technology Constellation</span>
              <h2 className="mt-4 text-3xl text-white md:text-4xl">Visualizacion creativa de stack</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {TECH.map(([name], idx) => (
                  <button key={name} onMouseEnter={() => setTechIndex(idx)} onClick={() => setTechIndex(idx)} className={cn("rounded-2xl border p-4 text-left transition", idx === techIndex ? "border-cyan-200/40 bg-cyan-300/10" : "border-white/10 bg-black/20")}>
                    <p className="font-semibold text-white">{name}</p>
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal className="glass-panel p-7">
              <p className="font-[var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-cyan-100">Nodo activo</p>
              <p className="mt-4 text-3xl font-semibold text-white">{TECH[techIndex][0]}</p>
              <p className="mt-3 text-slate-300">{TECH[techIndex][1]}</p>
            </Reveal>
          </div>
        </section>

        <section id="portfolio" className="section-shell">
          <div className="layout-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-3">
              {CASES.map((item) => (
                <button key={item.id} onClick={() => setCaseId(item.id)} className={cn("w-full rounded-2xl border p-5 text-left transition", item.id === activeCase.id ? "border-cyan-200/45 bg-cyan-300/10" : "border-white/10 bg-white/5 hover:border-white/25")}>
                  <p className="text-lg font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-cyan-100/85">{item.sector}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.challenge}</p>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.article key={activeCase.id} initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -14 }} className="glass-panel overflow-hidden">
                <div className="relative min-h-[340px] p-8" style={{ background: activeCase.gradient }}>
                  <p className="font-[var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-cyan-50">{activeCase.sector}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{activeCase.name}</p>
                  <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/25">
                    <Image src="/images/nosotros.png" alt={`Preview ${activeCase.name}`} width={1100} height={700} className="h-[190px] w-full object-cover opacity-85" />
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-100">Resultado</p>
                  <p className="mt-2 text-slate-200">{activeCase.outcome}</p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </section>

        <section id="contact" className="section-shell pb-28 section-transition">
          <div className="layout-container">
            <Reveal className="glass-panel p-8 md:p-14">
              <span className="section-label">Let&apos;s Build</span>
              <h2 className="mt-4 max-w-3xl text-3xl text-white md:text-5xl">Convierte tu web en una experiencia que demuestre capacidad tecnica desde el primer segundo</h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-300 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Hablar por WhatsApp</a>
                <a href="mailto:contacto@logicielapplab.com" className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:border-cyan-200 hover:text-cyan-100">contacto@logicielapplab.com</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/30 py-10">
        <div className="layout-container flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">Logiciel AppLab</p>
            <p className="mt-1 max-w-lg text-sm text-slate-300">Estudio digital enfocado en ingenieria web, UX avanzada y crecimiento sostenible.</p>
          </div>
          <div className="flex gap-4 text-sm text-slate-300">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-100">Instagram</a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-100">Facebook</a>
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-100">WhatsApp</a>
          </div>
        </div>
        <div className="layout-container mt-7 border-t border-white/10 pt-6 text-xs text-slate-400">(c) 2021 - {new Date().getFullYear()} Logiciel AppLab. Ingenieria digital con foco en resultados.</div>
      </footer>

      <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 rounded-full border border-cyan-200/40 bg-cyan-300/20 px-5 py-3 text-sm font-semibold text-cyan-50 backdrop-blur transition hover:bg-cyan-300/35">Escribenos</a>
    </div>
  );
}
