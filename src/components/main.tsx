"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { createBackground, type BackgroundController } from "./applab-background";
import styles from "./applab-3d.module.css";

const WA_URL =
  "https://wa.me/593997613568?text=Hola%2C%20quiero%20crear%20una%20plataforma%20web%20de%20alto%20impacto%20con%20Logiciel%20AppLab";

const NAV = [
  { id: "services", label: "Servicios" },
  { id: "process", label: "Proceso" },
  { id: "stack", label: "Stack" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contacto" },
] as const;

const HERO_CHIPS = ["Plataformas Web", "UX & Conversión", "SEO & Growth"] as const;

const STATS = [
  ["Lanzamiento promedio", "4–8 semanas"],
  ["Proyectos entregados", "+120"],
  ["Target de disponibilidad", "99.9%"],
  ["Core Web Vitals", "Optimizados"],
] as const;

const SERVICES = [
  {
    num: "Servicio 01",
    title: "Plataformas Web a Medida",
    sub: "Arquitectura & performance",
    text: "Arquitectura frontend escalable, UX premium y código mantenible para crecimiento real. Construimos bases técnicas que aguantan tráfico, equipos y tiempo.",
    tags: ["Next.js", "TypeScript", "Tailwind", "SSR/SSG"],
  },
  {
    num: "Servicio 02",
    title: "UX y Conversión",
    sub: "Storytelling & CRO",
    text: "Flujos centrados en negocio, storytelling visual y microinteracciones que elevan conversión. Cada pantalla empuja a la siguiente acción.",
    tags: ["UX Research", "Motion", "CRO", "Analytics"],
  },
  {
    num: "Servicio 03",
    title: "SEO Técnico y Growth",
    sub: "Visibilidad orgánica",
    text: "Base semántica y técnica para captar tráfico cualificado y sostener visibilidad orgánica. Crecimiento medible, no humo.",
    tags: ["Schema", "Search Console", "CWV", "Content Ops"],
  },
] as const;

const STEPS = [
  ["Discovery", "Objetivos, audiencia y roadmap técnico."],
  ["UX/UI", "Sistema visual y prototipado interactivo."],
  ["Build", "Desarrollo modular con calidad de código."],
  ["QA", "Validación de rendimiento, accesibilidad y flujos."],
  ["Launch", "Despliegue, medición y mejora continua."],
] as const;

const TECH = [
  ["Next.js", "Render híbrido para velocidad y SEO."],
  ["TypeScript", "Tipado estricto para confiabilidad."],
  ["Motion", "Transiciones y microinteracciones fluidas."],
  ["Cloud", "Despliegue preparado para escalar."],
  ["Analytics", "Medición orientada a negocio."],
] as const;

const BAR_HEIGHTS = ["40%", "70%", "55%", "90%", "48%"] as const;

const CASES = [
  { name: "Trading 8", sector: "Fintech", desc: "Reducir fricción en onboarding." },
  { name: "Earthquake Platform", sector: "Data", desc: "Información crítica en tiempo real." },
  { name: "Portfolio Pro", sector: "Creative", desc: "Convertir portafolio en canal de ventas." },
] as const;

const HEATMAP: { o: number; glow?: boolean }[] = [
  { o: 0.18 }, { o: 0.4 }, { o: 0.12 }, { o: 0.6 }, { o: 0.28 }, { o: 0.85, glow: true },
  { o: 0.22 }, { o: 0.5 }, { o: 0.15 }, { o: 0.35 }, { o: 0.7 }, { o: 0.2 },
];

const DIR_PALETTES = [
  { accent: "#5fe0ff", accent2: "#5fe0ff", glow: "rgba(95,224,255,.55)" },
  { accent: "#7cf0ff", accent2: "#b6a4ff", glow: "rgba(150,130,255,.5)" },
  { accent: "#e9f1ff", accent2: "#aebfd6", glow: "rgba(200,220,255,.42)" },
] as const;

const DIR_LABELS = ["Núcleo", "Constelación", "Aurora"] as const;

function WaIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2s-1.1.2-3.6-.8-4.1-3.6-4.2-3.8-1-1.3-1-2.5.6-1.7.9-2 .5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5-.3.3c-.2.2-.3.4-.1.7s.8 1.3 1.7 2.1c1.1 1 2 1.3 2.3 1.4s.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3s.1.7-.1 1.2Z" />
    </svg>
  );
}

export default function Main() {
  const [dir, setDir] = useState(0);
  const [svc, setSvc] = useState(0);
  const [tech, setTech] = useState(0);
  const [kase, setKase] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<BackgroundController | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !rootRef.current) return;
    const ctrl = createBackground(canvasRef.current, rootRef.current, progRef.current);
    ctrlRef.current = ctrl;
    return () => {
      ctrl.dispose();
      ctrlRef.current = null;
    };
  }, []);

  useEffect(() => {
    ctrlRef.current?.setMode(dir);
  }, [dir]);

  const palette = DIR_PALETTES[dir];
  const rootStyle = {
    "--accent": palette.accent,
    "--accent2": palette.accent2,
    "--glow": palette.glow,
  } as CSSProperties;

  const activeService = SERVICES[svc];

  return (
    <div ref={rootRef} className={styles.root} style={rootStyle}>
      <canvas ref={canvasRef} className={styles.bgCanvas} />
      <div className={styles.vignette} />
      <div ref={progRef} className={styles.progress} />

      {/* ===================== HEADER ===================== */}
      <header className={styles.header}>
        <div className={`${styles.headerInner} ${styles.glassEdge}`}>
          <a href="#inicio" className={styles.brand}>
            <span className={styles.brandMark}>LA</span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Logiciel</span>
              <span className={styles.brandSub}>Digital Engineering Studio</span>
            </span>
          </a>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href={WA_URL} target="_blank" rel="noopener" className={styles.cta}>
            <span className={styles.ctaDot} />
            Iniciar proyecto
          </a>
        </div>
      </header>

      <main className={styles.main}>
        {/* ===================== HERO ===================== */}
        <section id="inicio" className={styles.hero}>
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.badge}>
                <span className={styles.badgeDot} />
                Web Experiences de Alto Impacto
              </span>
              <h1 className={styles.h1}>
                Ingeniería web que convierte visión en{" "}
                <span className={styles.serif}>producto digital premium</span>
              </h1>
              <p className={styles.lead}>
                Diseñamos plataformas modernas con arquitectura sólida, UX inmersiva y performance
                real para empresas que quieren destacar con tecnología.
              </p>
              <div className={styles.heroCtas}>
                <a href="#portfolio" className={`${styles.btnPrimary} ${styles.glassEdge}`}>
                  Explorar casos
                  <span className={styles.btnArrow}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 5 7 7-7 7" />
                    </svg>
                  </span>
                </a>
                <a href={WA_URL} target="_blank" rel="noopener" className={styles.btnGhost}>
                  Agendar consultoría
                </a>
              </div>
              <div className={styles.chips}>
                {HERO_CHIPS.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroFloat}>
                <div className={`${styles.floatCard} ${styles.glassEdge}`}>
                  <span className={styles.liveBadge}>
                    <span className={styles.liveDot} />
                    Live Build
                  </span>
                  <p className={styles.cardLabel}>Core Stack</p>
                  <p className={styles.cardStack}>Next.js + Motion</p>
                  <div className={styles.cardBar}>
                    <div className={styles.cardBarFill} />
                  </div>
                </div>
                <div className={`${styles.floatPill} ${styles.floatPillTR}`}>99.9% uptime</div>
                <div className={`${styles.floatPill} ${styles.floatPillBL}`}>TypeScript</div>
              </div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {STATS.map(([label, value]) => (
              <div key={label} className={styles.statCard}>
                <p className={styles.statLabel}>{label}</p>
                <p className={styles.statValue}>{value}</p>
              </div>
            ))}
          </div>

          <div className={styles.scrollHint}>
            <span className={styles.scrollDot} />
          </div>
        </section>

        {/* ===================== SERVICES ===================== */}
        <section id="services" className={styles.section}>
          <div className={styles.headWrap}>
            <span className={styles.kicker}>Qué hacemos</span>
            <h2 className={styles.h2}>
              Servicios de ingeniería con <span className={styles.serif}>enfoque en negocio</span>
            </h2>
          </div>
          <div className={styles.splitGrid}>
            <div className={styles.selectList}>
              {SERVICES.map((service, i) => (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => setSvc(i)}
                  className={styles.selectBtn}
                >
                  {svc === i && <span className={styles.selectMarker} />}
                  <span className={styles.selectTitle}>{service.title}</span>
                  <span className={styles.selectSub}>{service.sub}</span>
                </button>
              ))}
            </div>
            <div className={`${styles.detailPanel} ${styles.glassEdge}`}>
              <div>
                <p className={styles.panelNum}>{activeService.num}</p>
                <p className={styles.panelTitle}>{activeService.title}</p>
                <p className={styles.panelText}>{activeService.text}</p>
                <div className={styles.tags}>
                  {activeService.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== PROCESS ===================== */}
        <section id="process" className={styles.section}>
          <div className={styles.headWrapWide}>
            <span className={styles.kicker}>Proceso de Ingeniería</span>
            <h2 className={styles.h2}>
              Metodología precisa de{" "}
              <span className={styles.serif}>estrategia a lanzamiento</span>
            </h2>
          </div>
          <div className={styles.steps}>
            {STEPS.map(([title, text], i) => (
              <div key={title} className={styles.step}>
                <p className={styles.stepNum}>Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== STACK ===================== */}
        <section id="stack" className={styles.section}>
          <div className={styles.stackGrid}>
            <div className={styles.stackLeft}>
              <span className={styles.kicker}>Technology Constellation</span>
              <h2 className={styles.stackH2}>
                El stack que mueve cada <span className={styles.serif}>lanzamiento</span>
              </h2>
              <div className={styles.techGrid}>
                {TECH.map(([name], i) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setTech(i)}
                    className={styles.techBtn}
                  >
                    {tech === i && <span className={styles.techRing} />}
                    <span className={styles.techBtnLabel}>{name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className={`${styles.stackPanel} ${styles.glassEdge}`}>
              <p className={styles.nodeLabel}>Nodo activo</p>
              <p className={styles.techName}>{TECH[tech][0]}</p>
              <p className={styles.techDesc}>{TECH[tech][1]}</p>
              <div className={styles.bars}>
                {BAR_HEIGHTS.map((height, i) => (
                  <span
                    key={i}
                    className={styles.bar}
                    style={{ height, animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== PORTFOLIO ===================== */}
        <section id="portfolio" className={styles.section}>
          <div className={styles.headWrap}>
            <span className={styles.kicker}>Casos</span>
            <h2 className={styles.h2}>
              Resultados que <span className={styles.serif}>se miden</span>
            </h2>
          </div>
          <div className={styles.caseSplit}>
            <div className={styles.selectList}>
              {CASES.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setKase(i)}
                  className={styles.selectBtn}
                >
                  {kase === i && <span className={styles.selectMarker} />}
                  <span className={styles.selectTitle}>{c.name}</span>
                  <span className={styles.selectSector}>{c.sector}</span>
                  <span className={styles.selectDesc}>{c.desc}</span>
                </button>
              ))}
            </div>
            <div className={`${styles.casePanel} ${styles.glassEdge}`}>
              {kase === 0 && (
                <div>
                  <p className={styles.caseKicker}>Fintech</p>
                  <p className={styles.caseName}>Trading 8</p>
                  <div className={styles.caseWidget}>
                    <div className={styles.caseRow}>
                      <div>
                        <p className={styles.miniLabel}>Balance total</p>
                        <p className={styles.miniBalance}>$ 184,920</p>
                      </div>
                      <span className={styles.posPill}>+ 42%</span>
                    </div>
                    <svg
                      viewBox="0 0 320 90"
                      width="100%"
                      height="90"
                      style={{ marginTop: 18, display: "block" }}
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="trading8grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="var(--accent)" stopOpacity=".4" />
                          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 70 L40 60 L80 64 L120 44 L160 50 L200 30 L240 36 L280 16 L320 22 L320 90 L0 90 Z"
                        fill="url(#trading8grad)"
                      />
                      <path
                        d="M0 70 L40 60 L80 64 L120 44 L160 50 L200 30 L240 36 L280 16 L320 22"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className={styles.metricRow}>
                      <span className={styles.metric}>
                        Onboarding
                        <br />
                        <b>1.8 min</b>
                      </span>
                      <span className={styles.metric}>
                        Drop-off
                        <br />
                        <b>-31%</b>
                      </span>
                    </div>
                  </div>
                  <div className={styles.resultBlock}>
                    <p className={styles.resultLabel}>Resultado</p>
                    <p className={styles.resultText}>+42% en registros completados.</p>
                  </div>
                </div>
              )}

              {kase === 1 && (
                <div>
                  <p className={styles.caseKicker}>Data</p>
                  <p className={styles.caseName}>Earthquake Platform</p>
                  <div className={styles.caseWidget}>
                    <div className={styles.caseRowCenter}>
                      <p className={styles.caseTitle}>Actividad sísmica · live</p>
                      <span className={styles.liveTag}>
                        <span className={styles.liveTagDot} />
                        Tiempo real
                      </span>
                    </div>
                    <div className={styles.heatmap}>
                      {HEATMAP.map((cell, i) => (
                        <span
                          key={i}
                          className={styles.heatCell}
                          style={{
                            background: `rgba(120,225,255,${cell.o})`,
                            boxShadow: cell.glow ? "0 0 12px var(--glow)" : undefined,
                          }}
                        />
                      ))}
                    </div>
                    <div className={styles.metricRow}>
                      <span className={styles.metric}>
                        Eventos/min
                        <br />
                        <b>2,140</b>
                      </span>
                      <span className={styles.metric}>
                        Latencia
                        <br />
                        <b>120 ms</b>
                      </span>
                    </div>
                  </div>
                  <div className={styles.resultBlock}>
                    <p className={styles.resultLabel}>Resultado</p>
                    <p className={styles.resultText}>
                      Mejor lectura operativa y menor tiempo de decisión.
                    </p>
                  </div>
                </div>
              )}

              {kase === 2 && (
                <div>
                  <p className={styles.caseKicker}>Creative</p>
                  <p className={styles.caseName}>Portfolio Pro</p>
                  <div className={styles.caseImageWrap}>
                    <Image
                      src="/images/nosotros.png"
                      alt="Portfolio Pro preview"
                      width={1100}
                      height={700}
                      className={styles.caseImage}
                    />
                  </div>
                  <div className={styles.resultBlock}>
                    <p className={styles.resultLabel}>Resultado</p>
                    <p className={styles.resultText}>+58% en leads calificados en 90 días.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className={styles.contact}>
          <div className={`${styles.contactCard} ${styles.glassEdge}`}>
            <span className={styles.kicker}>Let&apos;s Build</span>
            <h2 className={styles.contactH2}>
              Convierte tu web en una experiencia que demuestre{" "}
              <span className={styles.serif}>capacidad técnica</span> desde el primer segundo
            </h2>
            <div className={styles.contactBtns}>
              <a href={WA_URL} target="_blank" rel="noopener" className={styles.btnWa}>
                <WaIcon />
                Hablar por WhatsApp
              </a>
              <a href="mailto:contacto@logicielapplab.com" className={styles.btnEmail}>
                contacto@logicielapplab.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerBrand}>Logiciel AppLab</p>
            <p className={styles.footerDesc}>
              Estudio digital enfocado en ingeniería web, UX avanzada y crecimiento sostenible.
            </p>
          </div>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 9h2.5l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.3 15.7.2 14.6.2 12.2.2 10.6 1.7 10.6 4.3V6H8v3h2.6v8H14V9Z" />
              </svg>
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener"
              className={styles.socialLink}
              aria-label="WhatsApp"
            >
              <WaIcon size={18} />
            </a>
          </div>
        </div>
        <div className={styles.footerBottomWrap}>
          <div className={styles.footerBottom}>
            © 2021 – 2026 Logiciel AppLab. Ingeniería digital con foco en resultados.
          </div>
        </div>
      </footer>

      {/* ===================== DIRECTION SWITCHER ===================== */}
      <div className={styles.switcher}>
        <span className={styles.switcherLabel}>Dirección</span>
        {DIR_LABELS.map((label, i) => (
          <button key={label} type="button" onClick={() => setDir(i)} className={styles.dirBtn}>
            {dir === i && <span className={styles.dirGlow} />}
            <span className={styles.dirLabel}>{label}</span>
          </button>
        ))}
      </div>

      <a href={WA_URL} target="_blank" rel="noopener" className={styles.floatWa}>
        <WaIcon />
        <span>Escríbenos</span>
      </a>
    </div>
  );
}
