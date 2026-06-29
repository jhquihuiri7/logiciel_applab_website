"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { createImmersiveBackground, type ImmersiveController } from "./applab-immersive-background";
import styles from "./applab-immersive.module.css";

const WA_URL =
  "https://wa.me/593997613568?text=Hola%2C%20quiero%20crear%20una%20plataforma%20web%20de%20alto%20impacto%20con%20Logiciel%20AppLab";

const NAV = [
  { id: "services", label: "Servicios" },
  { id: "process", label: "Proceso" },
  { id: "stack", label: "Stack" },
  { id: "portfolio", label: "Portfolio" },
] as const;

const HERO_CHIPS = ["Plataformas Web", "Apps a Medida", "UX & Conversión", "SEO & Growth"] as const;

const STATS = [
  ["Lanzamiento promedio", "4–8 semanas"],
  ["Proyectos entregados", "+120"],
  ["Disponibilidad", "99.9%"],
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
  { accent: "#c16bff", accent2: "#9e06e4", glow: "rgba(193,107,255,.55)" },
  { accent: "#9f7bff", accent2: "#6a2be0", glow: "rgba(140,100,255,.5)" },
  { accent: "#e7a6ff", accent2: "#c949ce", glow: "rgba(220,150,255,.48)" },
] as const;

const DIR_LABELS = ["Núcleo", "Constelación", "Aurora"] as const;

const INTRO_STEPS: [number, string][] = [
  [0, "Inicializando núcleo"],
  [28, "Compilando shaders"],
  [54, "Generando partículas"],
  [78, "Calibrando cámara"],
  [100, "Sistema listo"],
];

function WaIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2s-1.1.2-3.6-.8-4.1-3.6-4.2-3.8-1-1.3-1-2.5.6-1.7.9-2 .5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5-.3.3c-.2.2-.3.4-.1.7s.8 1.3 1.7 2.1c1.1 1 2 1.3 2.3 1.4s.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3s.1.7-.1 1.2Z" />
    </svg>
  );
}

const CAP_CARDS = [
  {
    title: "Personaliza tu página",
    text: "Diseño a medida para tu empresa, o un boceto gratuito según tus necesidades.",
    icon: (
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
  },
  {
    title: "Accesibilidad garantizada",
    text: "Herramientas avanzadas para una experiencia óptima para todos tus usuarios.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
  },
  {
    title: "Optimizado para móviles",
    text: "Tu página se ve perfecta en cualquier pantalla, con versión móvil cuidada al detalle.",
    icon: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    title: "Optimizado para SEO",
    text: "Potencia tu tráfico orgánico y destaca en las búsquedas que importan.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
] as const;

export default function Immersive() {
  const [dir, setDir] = useState(0);
  const [svc, setSvc] = useState(0);
  const [tech, setTech] = useState(0);
  const [kase, setKase] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  const introRef = useRef<HTMLDivElement>(null);
  const introBarRef = useRef<HTMLDivElement>(null);
  const introPctRef = useRef<HTMLSpanElement>(null);
  const introStatusRef = useRef<HTMLSpanElement>(null);

  const ctrlRef = useRef<ImmersiveController | null>(null);
  // imperative intro/reveal API populated on mount, called by header buttons
  const introApi = useRef<{ skip: () => void; replay: () => void }>({
    skip: () => {},
    replay: () => {},
  });

  // ---- WebGL background ----
  useEffect(() => {
    if (!canvasRef.current || !rootRef.current) return;
    const ctrl = createImmersiveBackground(canvasRef.current, rootRef.current, {
      prog: progRef.current,
      fps: fpsRef.current,
      cursor: cursorRef.current,
    });
    ctrlRef.current = ctrl;
    return () => {
      ctrl.dispose();
      ctrlRef.current = null;
    };
  }, []);

  useEffect(() => {
    ctrlRef.current?.setMode(dir);
  }, [dir]);

  // ---- intro + reveal-on-scroll + UTC clock ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (el: Element) => {
      const node = el as HTMLElement;
      node.style.opacity = "1";
      node.style.transform = "none";
    };

    const heroReveals = Array.from(root.querySelectorAll('[data-reveal="hero"]'));
    let others = Array.from(root.querySelectorAll("[data-reveal]")).filter(
      (el) => el.getAttribute("data-reveal") !== "hero",
    );
    const revealHero = () => heroReveals.forEach(reveal);

    let io: IntersectionObserver | null = null;
    let onScrollReveal: (() => void) | null = null;
    let revRaf = 0;
    const timeouts: number[] = [];

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      others.forEach(reveal);
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              reveal(en.target);
              io?.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      others.forEach((el) => io?.observe(el));

      // Fallback sweep in case IntersectionObserver stays dormant.
      const checkReveal = () => {
        if (!others.length) return;
        const vh = window.innerHeight || 800;
        others = others.filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.92 && r.bottom > -40) {
            reveal(el);
            io?.unobserve(el);
            return false;
          }
          return true;
        });
      };
      onScrollReveal = () => {
        if (revRaf) return;
        revRaf = requestAnimationFrame(() => {
          revRaf = 0;
          checkReveal();
        });
      };
      window.addEventListener("scroll", onScrollReveal, { passive: true });
      timeouts.push(window.setTimeout(checkReveal, 160));
      timeouts.push(window.setTimeout(checkReveal, 900));
      timeouts.push(
        window.setTimeout(() => others.forEach(reveal), 2600),
      );
    }

    // ---- intro ----
    let introRaf = 0;
    const finishIntro = () => {
      try {
        sessionStorage.setItem("la_imm_intro", "1");
      } catch {
        /* ignore */
      }
      const el = introRef.current;
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "scale(1.08)";
        el.style.filter = "blur(8px)";
        el.style.pointerEvents = "none";
        timeouts.push(
          window.setTimeout(() => {
            if (introRef.current) introRef.current.style.display = "none";
          }, 900),
        );
      }
      revealHero();
    };

    const playIntro = (fast: boolean) => {
      const el = introRef.current;
      if (!el) {
        revealHero();
        return;
      }
      el.style.display = "grid";
      el.style.pointerEvents = "auto";
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      const dur = fast ? 900 : 2400;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const pct = Math.round(p * 100);
        if (introBarRef.current) introBarRef.current.style.width = pct + "%";
        if (introPctRef.current) introPctRef.current.textContent = pct + "%";
        if (introStatusRef.current) {
          let s = INTRO_STEPS[0][1];
          for (const [at, label] of INTRO_STEPS) if (pct >= at) s = label;
          introStatusRef.current.textContent = s;
        }
        if (p < 1) introRaf = requestAnimationFrame(tick);
        else timeouts.push(window.setTimeout(finishIntro, 280));
      };
      introRaf = requestAnimationFrame(tick);
    };

    introApi.current.skip = () => {
      if (introRaf) cancelAnimationFrame(introRaf);
      finishIntro();
    };
    introApi.current.replay = () => {
      playIntro(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (reducedMotion) {
      if (introRef.current) introRef.current.style.display = "none";
      revealHero();
    } else {
      let seen: string | null = null;
      try {
        seen = sessionStorage.getItem("la_imm_intro");
      } catch {
        /* ignore */
      }
      playIntro(!!seen);
    }

    // ---- UTC clock ----
    const pad = (n: number) => String(n).padStart(2, "0");
    const tickClock = () => {
      if (!clockRef.current) return;
      const d = new Date();
      clockRef.current.textContent =
        pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds());
    };
    tickClock();
    const clockTimer = window.setInterval(tickClock, 1000);

    return () => {
      if (introRaf) cancelAnimationFrame(introRaf);
      if (revRaf) cancelAnimationFrame(revRaf);
      timeouts.forEach((id) => clearTimeout(id));
      window.clearInterval(clockTimer);
      if (onScrollReveal) window.removeEventListener("scroll", onScrollReveal);
      io?.disconnect();
    };
  }, []);

  const palette = DIR_PALETTES[dir];
  const rootStyle = {
    "--accent": palette.accent,
    "--accent2": palette.accent2,
    "--glow": palette.glow,
  } as CSSProperties;

  const activeService = SERVICES[svc];

  return (
    <div ref={rootRef} className={styles.root} style={rootStyle}>
      {/* ===================== BACKGROUND LAYERS ===================== */}
      <canvas ref={canvasRef} className={styles.bgCanvas} />
      <div className={styles.gridOverlay} />
      <div className={styles.vignette} />
      <div className={styles.scanline} />
      <div ref={cursorRef} className={styles.cursorGlow} />
      <div ref={progRef} className={styles.progress} />

      {/* ===================== CINEMATIC INTRO ===================== */}
      <div ref={introRef} className={styles.intro}>
        <div className={styles.introCorners}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.introStage}>
          <div className={styles.introRing}>
            <div className={styles.introRingA} />
            <div className={styles.introRingB} />
            <Image
              src="/images/logo.png"
              alt="Logiciel AppLab"
              width={64}
              height={64}
              priority
              className={styles.introLogo}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <p className={styles.introWordmark}>Logiciel</p>
            <p className={styles.introTagline}>App Lab // Software Studio</p>
          </div>
          <div className={styles.introMeter}>
            <div className={styles.introMeterHead}>
              <span ref={introStatusRef}>Inicializando núcleo</span>
              <span ref={introPctRef} className={styles.introPct}>
                0%
              </span>
            </div>
            <div className={styles.introTrack}>
              <div ref={introBarRef} className={styles.introBar} />
            </div>
          </div>
        </div>
        <button type="button" onClick={() => introApi.current.skip()} className={styles.introSkip}>
          Saltar intro →
        </button>
      </div>

      {/* ===================== LIVE HUD ===================== */}
      <div className={styles.hud}>
        <div className={styles.hudTopRow}>
          <span className={styles.hudOnline}>
            <span className={styles.hudOnlineDot} />
            Sys // Online
          </span>
          <span ref={fpsRef} className={styles.hudFps}>
            60 FPS
          </span>
        </div>
        <div className={styles.hudMidRow}>
          <div>
            <p className={styles.hudNodeLabel}>Render Node</p>
            <p className={styles.hudNodeMode}>{DIR_LABELS[dir]}</p>
          </div>
          <div className={styles.hudBars}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={styles.hudClockRow}>
          <span>UTC</span>
          <span ref={clockRef} className={styles.hudClock}>
            00:00:00
          </span>
        </div>
      </div>

      {/* ===================== HEADER ===================== */}
      <header className={styles.header}>
        <div className={`${styles.headerInner} ${styles.glassEdge}`}>
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              introApi.current.replay();
            }}
            className={styles.brand}
          >
            <Image
              src="/images/logo.png"
              alt="Logiciel AppLab"
              width={40}
              height={40}
              className={styles.brandLogo}
            />
            <span className={styles.brandText}>
              <span className={styles.brandName}>Logiciel</span>
              <span className={styles.brandSub}>Software Engineering Studio</span>
            </span>
          </a>
          <nav className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href={WA_URL} target="_blank" rel="noopener" className={styles.headerCta}>
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
              <span data-reveal="hero" data-d="0" className={`${styles.heroReveal} ${styles.badge}`}>
                <span className={styles.badgeDot} />
                Estudio de Desarrollo de Software
              </span>
              <h1 data-reveal="hero" data-d="1" className={`${styles.heroReveal} ${styles.h1}`}>
                Desarrollamos software que convierte tu visión en{" "}
                <span className={styles.serif}>producto digital premium</span>
              </h1>
              <p data-reveal="hero" data-d="2" className={`${styles.heroReveal} ${styles.lead}`}>
                Diseñamos y construimos plataformas, aplicaciones y experiencias web con arquitectura
                sólida, UX inmersiva y performance real para empresas que quieren destacar con
                tecnología.
              </p>
              <div data-reveal="hero" data-d="3" className={`${styles.heroReveal} ${styles.heroCtas}`}>
                <a href="#portfolio" className={styles.btnPrimary}>
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
              <div data-reveal="hero" data-d="4" className={`${styles.heroReveal} ${styles.chips}`}>
                {HERO_CHIPS.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div data-reveal="hero" data-d="5" className={`${styles.heroReveal} ${styles.heroVisual}`}>
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

          <div data-reveal="hero" data-d="6" className={`${styles.heroReveal} ${styles.statsGrid}`}>
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
          <div data-reveal="up" className={`${styles.revealUp} ${styles.headWrap}`}>
            <span className={styles.kicker}>Qué hacemos</span>
            <h2 className={styles.h2}>
              Ingeniería de software con <span className={styles.serif}>enfoque en negocio</span>
            </h2>
          </div>
          <div data-reveal="up" className={styles.revealUp}>
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
          </div>
        </section>

        {/* ===================== PROCESS ===================== */}
        <section id="process" className={styles.section}>
          <div data-reveal="up" className={`${styles.revealUp} ${styles.headWrapWide}`}>
            <span className={styles.kicker}>Proceso de Ingeniería</span>
            <h2 className={styles.h2}>
              Metodología precisa de{" "}
              <span className={styles.serif}>estrategia a lanzamiento</span>
            </h2>
          </div>
          <div data-reveal="up" className={`${styles.revealUp} ${styles.steps}`}>
            {STEPS.map(([title, text], i) => (
              <div key={title} className={styles.step}>
                <p className={styles.stepNum}>Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== CAPABILITIES ===================== */}
        <section id="capabilities" className={styles.section}>
          <div className={styles.capGrid}>
            <div data-reveal="up" className={styles.revealUp}>
              <span className={styles.kicker}>Nosotros</span>
              <h2 className={styles.capH2}>
                Liderando la nueva era de la{" "}
                <span className={styles.serif}>transformación digital</span>
              </h2>
              <p className={styles.capLead}>
                Combinamos ingeniería, diseño y estrategia para construir productos que se ven
                impecables y rinden de verdad — en cualquier dispositivo, a cualquier escala.
              </p>
            </div>
            <div data-reveal="up" className={`${styles.revealUp} ${styles.capCards}`}>
              {CAP_CARDS.map((card) => (
                <div key={card.title} className={styles.capCard}>
                  <div className={styles.capIcon}>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {card.icon}
                    </svg>
                  </div>
                  <h3 className={styles.capCardTitle}>{card.title}</h3>
                  <p className={styles.capCardText}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== STACK ===================== */}
        <section id="stack" className={styles.section}>
          <div data-reveal="up" className={`${styles.revealUp} ${styles.stackGrid}`}>
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
                {["40%", "70%", "55%", "90%", "48%"].map((height, i) => (
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
          <div data-reveal="up" className={`${styles.revealUp} ${styles.headWrap}`}>
            <span className={styles.kicker}>Casos</span>
            <h2 className={styles.h2}>
              Resultados que <span className={styles.serif}>se miden</span>
            </h2>
          </div>
          <div data-reveal="up" className={styles.revealUp}>
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
                              background: `rgba(186,120,255,${cell.o})`,
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
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className={styles.contact}>
          <div data-reveal="up" className={`${styles.revealUp} ${styles.contactCard} ${styles.glassEdge}`}>
            <span className={styles.kicker}>Let&apos;s Build</span>
            <h2 className={styles.contactH2}>
              Convierte tu producto en una experiencia que demuestre{" "}
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
              Estudio de desarrollo de software enfocado en ingeniería web, UX avanzada y
              crecimiento sostenible.
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
            © 2021 – 2026 Logiciel AppLab — Software con foco en resultados.
          </div>
        </div>
      </footer>

      {/* ===================== SCENE SWITCHER ===================== */}
      <div className={styles.switcher}>
        <span className={styles.switcherLabel}>Escena</span>
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
