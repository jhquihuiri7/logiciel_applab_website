"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CHANNELS,
  CONTACT,
  contentsLabel,
  COURSE,
  type CourseModule,
  DIALOG,
  FAQ,
  FORMS,
  LEGAL,
  type LegalKey,
  LINKS,
  mailtoUrl,
  MODULES,
  PRICING,
  whatsappUrl,
} from "./content";
import { sora } from "./fonts";
import RequestForm from "./request-form";
import { PrimaryLink, SecondaryLink, WhatsappIcon } from "./ui";

type Route =
  | { kind: "enroll" }
  | { kind: "syllabus"; moduleSlug?: string }
  | { kind: "pricing" }
  | { kind: "faq" }
  | { kind: "legal"; doc: LegalKey };

const TITLE_ID = "curso-ia-dialogo-titulo";

/** "temario-excel" con prefijo "temario" → "excel", solo si el módulo existe. */
const moduleFrom = (id: string, prefix: string) => {
  const slug = id.startsWith(`${prefix}-`) ? id.slice(prefix.length + 1) : "";
  return MODULES.items.some((item) => item.slug === slug) ? slug : undefined;
};

function parseRoute(hash: string): Route | null {
  let id: string;
  try {
    id = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return null;
  }
  if (id === DIALOG.enroll) return { kind: "enroll" };
  if (id === DIALOG.syllabus) return { kind: "syllabus" };
  if (id === DIALOG.pricing) return { kind: "pricing" };
  if (id === DIALOG.faq) return { kind: "faq" };
  if (id in LEGAL) return { kind: "legal", doc: id as LegalKey };
  const syllabusModule = moduleFrom(id, DIALOG.syllabus);
  if (syllabusModule) return { kind: "syllabus", moduleSlug: syllabusModule };
  return null;
}

/**
 * Ventanas emergentes de la landing. Se abren con anclas (#inscripcion,
 * #temario-excel, #privacidad…), así cualquier enlace o URL compartida las muestra.
 */
export default function Dialogs() {
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    const sync = () => setRoute(parseRoute(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = useCallback(() => {
    setRoute(null);
    // Quita el ancla para que el mismo enlace pueda volver a abrir la ventana.
    if (parseRoute(window.location.hash)) {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <Modal open={route !== null} onClose={close}>
      {route && <DialogContent key={JSON.stringify(route)} route={route} onClose={close} />}
    </Modal>
  );
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pressedBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Bloquea el scroll de la página mientras la ventana está abierta.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={TITLE_ID}
      onClose={onClose}
      // Cierra al pulsar el fondo, salvo que el gesto empiece dentro (p. ej. al seleccionar texto).
      onPointerDown={(event) => {
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressedBackdrop.current && event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[min(88dvh,860px)] w-[calc(100%_-_24px)] max-w-[620px] overflow-hidden rounded-[24px] bg-white p-0 text-[#1A1426] shadow-[0_30px_80px_rgba(26,20,38,0.28)] backdrop:bg-[#1A1426]/55 backdrop:backdrop-blur-[3px] open:animate-in open:fade-in-0 open:zoom-in-95 motion-reduce:open:animate-none"
    >
      <div className="max-h-[inherit] overflow-y-auto overscroll-contain px-6 pb-8 pt-7 sm:px-9 sm:pb-9 sm:pt-8">
        {children}
      </div>
    </dialog>
  );
}

function Header({
  eyebrow,
  title,
  description,
  onClose,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-[var(--ia-accent)]">{eyebrow}</p>
        <h2
          id={TITLE_ID}
          className={cn(sora.className, "mt-2 text-[length:clamp(22px,3vw,28px)] font-semibold leading-[1.25] tracking-[-0.02em]")}
        >
          {title}
        </h2>
        {description && <p className="mt-3 text-[15px] leading-[1.6] text-[#59565F]">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="grid size-10 shrink-0 place-items-center rounded-full border border-[#1A1426]/15 text-[#1A1426] transition-colors hover:bg-[#F3EEFB]"
      >
        <X aria-hidden="true" className="size-[18px]" strokeWidth={2} />
      </button>
    </div>
  );
}

const Actions = ({ children }: { children: ReactNode }) => (
  <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>
);

const compactPrimary = "h-12 px-6 text-[16px]";

function LessonList({ lessons }: { lessons: string[] }) {
  return (
    <ol className="mt-4 flex flex-col gap-2.5">
      {lessons.map((lesson, index) => (
        <li key={lesson} className="flex gap-3 text-[14.5px] leading-[1.5] text-[#1A1426]">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#F3EEFB] text-[12px] font-semibold text-[var(--ia-accent)]">
            {index + 1}
          </span>
          <span className="pt-0.5">{lesson}</span>
        </li>
      ))}
    </ol>
  );
}

/** Contenidos, taller práctico y producto de un día del programa. */
function DayDetail({ item }: { item: CourseModule }) {
  return (
    <>
      <LessonList lessons={item.syllabus} />
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          { label: MODULES.workshopLabel, text: item.workshop },
          { label: MODULES.productLabel, text: item.product },
        ].map((block) => (
          <div key={block.label} className="rounded-2xl bg-[#F5F0FC] px-4 py-3.5">
            <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--ia-accent)]">
              {block.label}
            </dt>
            <dd className="mt-1.5 text-[14px] leading-[1.55] text-[#1A1426]">{block.text}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function DialogContent({ route, onClose }: { route: Route; onClose: () => void }) {
  switch (route.kind) {
    case "enroll":
      return (
        <>
          <Header eyebrow={FORMS.eyebrow} title={FORMS.title} description={FORMS.description} onClose={onClose} />
          <RequestForm onClose={onClose} />
        </>
      );

    case "syllabus": {
      const item = MODULES.items.find((entry) => entry.slug === route.moduleSlug);
      if (item) {
        return (
          <>
            <Header eyebrow={`Día ${item.day} · ${item.focus}`} title={item.title} onClose={onClose} />
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-[#59565F]">
              <span>{item.duration}</span>
              <span>{contentsLabel(item)}</span>
            </p>
            <DayDetail item={item} />
            <Actions>
              <PrimaryLink href={LINKS.enroll} className={compactPrimary}>
                Inscríbete
              </PrimaryLink>
              <SecondaryLink href={LINKS.syllabus}>Ver programa completo</SecondaryLink>
            </Actions>
          </>
        );
      }
      return (
        <>
          <Header
            eyebrow="Programa"
            title="Programa completo"
            description={`${COURSE.days} días · ${COURSE.hours} horas · ${COURSE.dailyHours} horas diarias en vivo por Google Meet`}
            onClose={onClose}
          />
          <div className="mt-6 flex flex-col gap-3">
            {MODULES.items.map((entry, index) => (
              <details
                key={entry.slug}
                open={index === 0}
                className="group rounded-2xl border border-[#ECE8F3] px-5 py-4 open:bg-[#FAF8FD]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block text-[12.5px] font-semibold text-[var(--ia-accent)]">Día {entry.day}</span>
                    <span className="mt-0.5 block text-[15px] font-semibold leading-[1.4]">{entry.title}</span>
                    <span className="mt-1 block text-[12.5px] text-[#59565F]">
                      {entry.focus} · {contentsLabel(entry)} · {entry.duration}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 transition-transform group-open:rotate-180"
                    strokeWidth={2}
                  />
                </summary>
                <DayDetail item={entry} />
              </details>
            ))}
          </div>
          <Actions>
            <PrimaryLink href={LINKS.enroll} className={compactPrimary}>
              Inscríbete
            </PrimaryLink>
            <SecondaryLink href={whatsappUrl(CONTACT.whatsappText)}>
              <WhatsappIcon className="size-[18px]" />
              {CONTACT.whatsappCta}
            </SecondaryLink>
          </Actions>
        </>
      );
    }

    case "pricing":
      return (
        <>
          <Header eyebrow="Inversión" title={PRICING.title} description={PRICING.description} onClose={onClose} />
          <div className="mt-6 rounded-2xl bg-[#F5F0FC] px-6 py-5">
            {PRICING.price ? (
              <>
                <p className="text-[13.5px] text-[#59565F]">{PRICING.priceLabel}</p>
                <p className="mt-1 text-[34px] font-semibold tracking-[-0.02em]">{PRICING.price}</p>
                <p className="mt-2 text-[14px] leading-[1.55] text-[#59565F]">{PRICING.paymentNote}</p>
              </>
            ) : (
              <p className="text-[15.5px] font-medium leading-[1.55]">{PRICING.priceNote}</p>
            )}
          </div>
          <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#737177]">
            {PRICING.includesTitle}
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {PRICING.includes.map((line) => (
              <li key={line} className="flex items-start gap-3 text-[15px] leading-[1.5]">
                <Check aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-[var(--ia-accent)]" strokeWidth={2.2} />
                {line}
              </li>
            ))}
          </ul>
          <Actions>
            <PrimaryLink href={LINKS.enroll} className={compactPrimary}>
              Inscríbete
            </PrimaryLink>
            <SecondaryLink href={whatsappUrl(PRICING.whatsappText)}>
              <WhatsappIcon className="size-[18px]" />
              {PRICING.whatsappCta}
            </SecondaryLink>
          </Actions>
        </>
      );

    case "faq":
      return (
        <>
          <Header eyebrow="Ayuda" title={FAQ.title} description={FAQ.description} onClose={onClose} />
          <div className="mt-6 flex flex-col gap-2.5">
            {FAQ.items.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-[#ECE8F3] px-5 py-4 open:bg-[#FAF8FD]">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-[15px] font-medium leading-[1.45] [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 transition-transform group-open:rotate-180"
                    strokeWidth={2}
                  />
                </summary>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-[#59565F]">{item.answer}</p>
              </details>
            ))}
          </div>
          <Actions>
            <SecondaryLink href={whatsappUrl(`Hola, tengo una consulta sobre el curso de IA.`)}>
              <WhatsappIcon className="size-[18px]" />
              Escríbenos por WhatsApp
            </SecondaryLink>
            <SecondaryLink href={mailtoUrl("Consulta sobre el curso de IA")}>
              <Mail aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
              {CHANNELS.email}
            </SecondaryLink>
          </Actions>
        </>
      );

    case "legal": {
      const doc = LEGAL[route.doc];
      return (
        <>
          <Header eyebrow="Legal" title={doc.title} description={`Última actualización: ${doc.updated}`} onClose={onClose} />
          <div className="mt-6 flex flex-col gap-5">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="text-[15.5px] font-semibold">{section.heading}</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.65] text-[#59565F]">{section.body}</p>
              </section>
            ))}
          </div>
          <p className="mt-7 border-t border-[#F0EEF5] pt-5 text-[14px] text-[#59565F]">
            ¿Dudas? Escríbenos a{" "}
            <a href={`mailto:${CHANNELS.email}`} className="font-medium text-[#1A1426] underline underline-offset-2 hover:text-[#1A1426]">
              {CHANNELS.email}
            </a>
          </p>
        </>
      );
    }
  }
}
