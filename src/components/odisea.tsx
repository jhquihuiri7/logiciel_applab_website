"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";

import { createOdiseaBackground, type OdiseaController } from "./applab-odisea-background";
import styles from "./applab-odisea.module.css";

const WA_URL =
  "https://wa.me/593997613568?text=Hola%2C%20quiero%20crear%20una%20plataforma%20web%20de%20alto%20impacto%20con%20Logiciel%20AppLab";

const CHAPTERS = [
  { id: "inicio", label: "Inicio" },
  { id: "manifiesto", label: "Manifiesto" },
  { id: "servicios", label: "Servicios" },
  { id: "stack", label: "Stack" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contacto", label: "Contacto" },
] as const;

const MANIFESTO: { t: string; k?: "accent" | "white" }[] = [
  { t: "No" },
  { t: "construimos" },
  { t: "páginas." },
  { t: "Creamos" },
  { t: "experiencias", k: "accent" },
  { t: "vivas", k: "accent" },
  { t: "—" },
  { t: "mundos" },
  { t: "digitales" },
  { t: "donde" },
  { t: "tu" },
  { t: "producto" },
  { t: "se" },
  { t: "siente" },
  { t: "inevitable.", k: "white" },
];

const SERVICES = [
  {
    num: "/01",
    title: "Plataformas Web",
    serif: "a medida",
    text: "Arquitectura escalable, código mantenible y performance real para crecer sin límites.",
    tags: ["Next.js", "TypeScript", "SSR/SSG"],
    delay: styles.d05,
  },
  {
    num: "/02",
    title: "UX y",
    serif: "conversión",
    text: "Storytelling visual y microinteracciones que convierten cada scroll en acción.",
    tags: ["UX Research", "Motion", "CRO"],
    delay: styles.d10,
  },
  {
    num: "/03",
    title: "SEO técnico y",
    serif: "growth",
    text: "Base semántica y técnica para captar tráfico cualificado y sostener visibilidad.",
    tags: ["Schema", "CWV", "Content Ops"],
    delay: styles.d15,
  },
] as const;

const CASES = [
  {
    kicker: "Fintech",
    name: "Trading 8",
    desc: "Onboarding sin fricción para trading retail — de 6 pasos a 1.8 minutos.",
    stat: "+42%",
    statLabel: "Registros completados",
    delay: styles.d05,
  },
  {
    kicker: "Data",
    name: "Earthquake Platform",
    desc: "Telemetría sísmica crítica presentada en tiempo real para decidir más rápido.",
    stat: "120ms",
    statLabel: "Latencia de lectura",
    delay: styles.d10,
  },
  {
    kicker: "Creative",
    name: "Portfolio Pro",
    desc: "Un portafolio convertido en canal de ventas con narrativa y CRO.",
    stat: "+58%",
    statLabel: "Leads calificados / 90 días",
    delay: styles.d15,
  },
] as const;

function WaIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2s-1.1.2-3.6-.8-4.1-3.6-4.2-3.8-1-1.3-1-2.5.6-1.7.9-2 .5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5-.3.3c-.2.2-.3.4-.1.7s.8 1.3 1.7 2.1c1.1 1 2 1.3 2.3 1.4s.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3s.1.7-.1 1.2Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function Odisea() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const chapRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introLineRef = useRef<HTMLDivElement>(null);

  // imperative intro API populated on mount, called by the "Entrar" button
  const introApi = useRef<{ enter: () => void }>({ enter: () => {} });

  // ---- WebGL morphing particle world ----
  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    let ctrl: OdiseaController | null = null;
    try {
      ctrl = createOdiseaBackground(canvas, root, {
        prog: progRef.current,
        cursor: cursorRef.current,
        chapter: chapRef.current,
        count: countRef.current,
      });
    } catch (err) {
      console.warn("odisea background init", err);
    }
    return () => {
      ctrl?.dispose();
    };
  }, []);

  // ---- cinematic intro + reveal-on-scroll + portfolio spotlight ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timeouts: number[] = [];
    const reveal = (el: Element) => {
      const node = el as HTMLElement;
      node.style.opacity = "1";
      node.style.transform = "none";
    };

    const heroReveals = Array.from(root.querySelectorAll('[data-reveal="hero"]'));
    let others = Array.from(root.querySelectorAll('[data-reveal="up"]'));
    const revealHero = () => heroReveals.forEach(reveal);

    // ---- intro ----
    let introDone = false;
    const closeIntro = (instant: boolean) => {
      if (introDone) return;
      introDone = true;
      try {
        sessionStorage.setItem("la_ody_intro", "1");
      } catch {
        /* ignore */
      }
      const el = introRef.current;
      if (el) {
        if (instant) {
          el.style.display = "none";
        } else {
          el.style.opacity = "0";
          el.style.filter = "blur(10px)";
          el.style.pointerEvents = "none";
          timeouts.push(
            window.setTimeout(() => {
              if (introRef.current) introRef.current.style.display = "none";
            }, 880),
          );
        }
      }
      revealHero();
    };
    introApi.current.enter = () => closeIntro(false);
    const enterOnce = () => closeIntro(false);

    if (reducedMotion) {
      closeIntro(true);
    } else {
      let seen: string | null = null;
      try {
        seen = sessionStorage.getItem("la_ody_intro");
      } catch {
        /* ignore */
      }
      timeouts.push(
        window.setTimeout(() => {
          if (introLineRef.current) introLineRef.current.style.transform = "scaleX(1)";
        }, 120),
      );
      window.addEventListener("wheel", enterOnce, { passive: true, once: true });
      window.addEventListener("touchstart", enterOnce, { passive: true, once: true });
      timeouts.push(window.setTimeout(() => closeIntro(false), seen ? 1200 : 2400));
    }

    // ---- reveal-on-scroll ----
    let io: IntersectionObserver | null = null;
    let onScrollReveal: (() => void) | null = null;
    let revRaf = 0;

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
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      );
      others.forEach((el) => io?.observe(el));

      // Fallback sweep in case IntersectionObserver stays dormant.
      const checkReveal = () => {
        if (!others.length) return;
        const vh = window.innerHeight || 800;
        others = others.filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > -40) {
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
      timeouts.push(window.setTimeout(checkReveal, 200));
      timeouts.push(window.setTimeout(() => others.forEach(reveal), 3000));
    }

    // ---- portfolio spotlight ----
    const spots = Array.from(root.querySelectorAll<HTMLElement>("[data-spot]"));
    const spotHandlers = spots.map((el) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.backgroundImage = `radial-gradient(560px circle at ${e.clientX - r.left}px ${
          e.clientY - r.top
        }px, rgba(193,107,255,.14), rgba(193,107,255,.035) 42%, transparent 68%)`;
      };
      const leave = () => {
        el.style.backgroundImage = "none";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return { el, move, leave };
    });

    return () => {
      if (revRaf) cancelAnimationFrame(revRaf);
      timeouts.forEach((id) => clearTimeout(id));
      window.removeEventListener("wheel", enterOnce);
      window.removeEventListener("touchstart", enterOnce);
      if (onScrollReveal) window.removeEventListener("scroll", onScrollReveal);
      io?.disconnect();
      spotHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      {/* ===================== BACKGROUND LAYERS ===================== */}
      <canvas ref={canvasRef} className={styles.bgCanvas} />
      <div className={styles.vignette} />
      <div ref={cursorRef} className={styles.cursorGlow} />
      <div ref={progRef} className={styles.progress} />

      {/* ===================== HEADER ===================== */}
      <header className={styles.header}>
        <a href="#inicio" className={styles.brand}>
          <Image
            src="/images/logo.png"
            alt="Logiciel AppLab"
            width={38}
            height={38}
            className={styles.brandLogo}
          />
          <span className={styles.brandText}>
            <span className={styles.brandName}>Logiciel</span>
            <span className={styles.brandSub}>App Lab</span>
          </span>
        </a>
        <div className={styles.headerRight}>
          <span ref={countRef} className={styles.count}>
            01 / 06
          </span>
          <a href={WA_URL} target="_blank" rel="noopener" className={styles.headerCta}>
            <span className={styles.ctaDot} />
            Iniciar proyecto
          </a>
        </div>
      </header>

      {/* ===================== CHAPTER RAIL ===================== */}
      <nav className={styles.rail} aria-label="Capítulos">
        {CHAPTERS.map((ch, i) => (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            data-rail={i}
            title={ch.label}
            className={styles.railLink}
          >
            {String(i + 1).padStart(2, "0")}
          </a>
        ))}
      </nav>

      {/* ===================== CHAPTER HUD ===================== */}
      <div className={styles.hud}>
        <span ref={chapRef} className={styles.hudChip}>
          Cap. 01 — Inicio
        </span>
      </div>

      {/* ===================== CINEMATIC INTRO ===================== */}
      <div ref={introRef} className={styles.intro}>
        <div className={styles.introInner}>
          <Image
            src="/images/logo.png"
            alt="Logiciel AppLab"
            width={52}
            height={52}
            priority
            className={styles.introLogo}
          />
          <h1 className={styles.introTitle}>LOGICIEL</h1>
          <div ref={introLineRef} className={styles.introLine} />
          <p className={styles.introTag}>Experiencia 3D · Software Engineering Studio</p>
          <button
            type="button"
            onClick={() => introApi.current.enter()}
            className={styles.introBtn}
          >
            Entrar →
          </button>
        </div>
      </div>

      <main className={styles.main}>
        {/* ===================== 01 · HERO ===================== */}
        <section id="inicio" data-chapter="0" className={styles.hero}>
          <span data-reveal="hero" className={`${styles.heroReveal} ${styles.hd1} ${styles.heroKicker}`}>
            <span className={styles.pulseDot} />
            Software Engineering Studio
          </span>
          <h1 className={styles.heroTitleWrap}>
            <span data-reveal="hero" className={`${styles.heroRevealTitle} ${styles.hd2} ${styles.heroTitle}`}>
              LOGICIEL
            </span>
            <span
              data-reveal="hero"
              className={`${styles.heroRevealTitle} ${styles.hd3} ${styles.heroTitleOutline}`}
            >
              APP LAB
            </span>
          </h1>
          <p data-reveal="hero" className={`${styles.heroReveal} ${styles.hd4} ${styles.heroLead}`}>
            Experiencias web 3D, plataformas a medida y growth técnico para marcas que quieren
            dominar su categoría.
          </p>
          <p data-reveal="hero" className={`${styles.heroReveal} ${styles.hd5} ${styles.heroMeta}`}>
            +120 proyectos&nbsp;&nbsp;·&nbsp;&nbsp;99.9% uptime&nbsp;&nbsp;·&nbsp;&nbsp;4–8 semanas
            al launch
          </p>
          <div data-reveal="hero" className={styles.scrollHint}>
            <span className={styles.scrollLabel}>Scroll</span>
            <span className={styles.scrollMouse}>
              <span className={styles.scrollDot} />
            </span>
          </div>
        </section>

        {/* ===================== 02 · MANIFIESTO ===================== */}
        <section id="manifiesto" data-chapter="1" className={styles.manifesto}>
          <div className={styles.manifestoBox}>
            <span className={styles.kicker}>Manifiesto / 02</span>
            <h2 className={styles.manifestoH}>
              {MANIFESTO.map((word, i) => (
                <Fragment key={i}>
                  <span
                    data-w
                    className={`${styles.word}${
                      word.k === "accent"
                        ? ` ${styles.wordAccent}`
                        : word.k === "white"
                          ? ` ${styles.wordWhite}`
                          : ""
                    }`}
                  >
                    {word.t}
                  </span>
                  {i < MANIFESTO.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h2>
          </div>
        </section>

        {/* ===================== 03 · SERVICIOS ===================== */}
        <section id="servicios" data-chapter="2" className={styles.services}>
          <div className={styles.container}>
            <div data-reveal="up" className={`${styles.sectionHead} ${styles.revealUp}`}>
              <span className={styles.kicker}>Servicios / 03</span>
              <span className={styles.headNote}>Ingeniería con enfoque en negocio</span>
            </div>
            {SERVICES.map((service) => (
              <a
                key={service.num}
                href={WA_URL}
                target="_blank"
                rel="noopener"
                data-reveal="up"
                className={`${styles.serviceRow} ${styles.revealUp} ${service.delay}`}
              >
                <span className={styles.rowNum}>{service.num}</span>
                <span className={styles.rowTitle}>
                  {service.title} <span className={styles.serif}>{service.serif}</span>
                </span>
                <span className={styles.rowInfo}>
                  <span className={styles.rowText}>{service.text}</span>
                  <span className={styles.tagRow}>
                    {service.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
                <span className={styles.rowArrow}>
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ===================== 04 · STACK MARQUEE ===================== */}
        <section id="stack" data-chapter="3" className={styles.stack}>
          <div className={styles.stackHead}>
            <span className={styles.kicker}>Stack / 04</span>
            <span className={styles.headNote}>El stack que mueve cada lanzamiento</span>
          </div>
          <div className={styles.marqueeTilt}>
            <div className={styles.marqueeTrack}>
              <div className={styles.marqueeInnerL}>
                <span className={styles.marqueeOutline}>
                  NEXT.JS — TYPESCRIPT — MOTION — CLOUD — ANALYTICS —&nbsp;
                </span>
                <span className={styles.marqueeOutline} aria-hidden="true">
                  NEXT.JS — TYPESCRIPT — MOTION — CLOUD — ANALYTICS —&nbsp;
                </span>
              </div>
            </div>
            <div className={styles.marqueeTrack}>
              <div className={styles.marqueeInnerR}>
                <span className={styles.marqueeFill}>
                  SSR — SEO TÉCNICO — CRO — UX RESEARCH — CWV —&nbsp;
                </span>
                <span className={styles.marqueeFill} aria-hidden="true">
                  SSR — SEO TÉCNICO — CRO — UX RESEARCH — CWV —&nbsp;
                </span>
              </div>
            </div>
          </div>
          <p className={styles.stackNote}>
            Render híbrido para velocidad y SEO, tipado estricto para confiabilidad, motion para
            storytelling y despliegue cloud listo para escalar.
          </p>
        </section>

        {/* ===================== 05 · PORTFOLIO ===================== */}
        <section id="portfolio" data-chapter="4" className={styles.portfolio}>
          <div className={styles.container}>
            <div data-reveal="up" className={`${styles.sectionHead} ${styles.revealUp}`}>
              <span className={styles.kicker}>Portfolio / 05</span>
              <span className={styles.headNote}>Resultados que se miden</span>
            </div>
            {CASES.map((item) => (
              <div
                key={item.name}
                data-spot
                data-reveal="up"
                className={`${styles.caseRow} ${styles.revealUp} ${item.delay}`}
              >
                <div className={styles.caseInfo}>
                  <p className={styles.caseKicker}>{item.kicker}</p>
                  <p className={styles.caseName}>{item.name}</p>
                  <p className={styles.caseDesc}>{item.desc}</p>
                </div>
                <div className={styles.caseStat}>
                  <p className={styles.statNum}>{item.stat}</p>
                  <p className={styles.statLabel}>{item.statLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== 06 · CONTACTO ===================== */}
        <section id="contacto" data-chapter="5" className={styles.contact}>
          <span className={styles.kicker}>Let&apos;s Build / 06</span>
          <h2 className={styles.contactH}>
            Construyamos algo
            <br />
            <span className={styles.contactSerif}>imposible de ignorar</span>
          </h2>
          <div className={styles.ctaRow}>
            <a href={WA_URL} target="_blank" rel="noopener" className={styles.waCta}>
              <WaIcon />
              Iniciar proyecto en WhatsApp
            </a>
            <a href="mailto:contacto@logicielapplab.com" className={styles.emailCta}>
              contacto@logicielapplab.com
            </a>
          </div>
          <div className={styles.footerBar}>
            <span className={styles.copyright}>
              © 2021 – 2026 Logiciel AppLab — Ingeniería digital con foco en resultados.
            </span>
            <span className={styles.socials}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
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
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                <WaIcon />
              </a>
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
