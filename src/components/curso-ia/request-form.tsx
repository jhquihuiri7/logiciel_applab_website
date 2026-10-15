"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHANNELS, FORMS, mailtoUrl, whatsappUrl } from "./content";
import { primaryButton, secondaryButton, WhatsappIcon } from "./ui";

type Via = "whatsapp" | "email";
type Props = { onClose: () => void };

const input =
  "h-12 w-full rounded-xl border border-[#E2E0E7] bg-white px-4 text-[15px] font-normal text-[#1A1426] outline-none transition-colors placeholder:text-[#9B999F] focus:border-[var(--ia-accent)] focus:ring-2 focus:ring-[#9E06E4]/15";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-[13.5px] font-medium text-[#1A1426]">
      {label}
      {children}
    </label>
  );
}

/**
 * Formulario de inscripción. Sin backend: arma el mensaje y
 * lo abre en WhatsApp o en el correo del visitante, dirigido a CHANNELS.
 */
export default function RequestForm({ onClose }: Props) {
  const { labels } = FORMS;
  const [sent, setSent] = useState<{ via: Via; href: string; name: string } | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const via: Via = submitter?.getAttribute("value") === "email" ? "email" : "whatsapp";

    const lines = [
      FORMS.greeting,
      "",
      `Nombre: ${field("nombre")}`,
      `Correo: ${field("correo")}`,
      field("whatsapp") ? `WhatsApp: ${field("whatsapp")}` : null,
      field("mensaje") ? `\n${field("mensaje")}` : null,
    ].filter((line) => line !== null);
    const text = lines.join("\n");

    const href = via === "whatsapp" ? whatsappUrl(text) : mailtoUrl(FORMS.subject, text);
    if (via === "whatsapp") window.open(href, "_blank", "noopener,noreferrer");
    else window.location.href = href;
    setSent({ via, href, name: field("nombre").split(/\s+/)[0] });
  };

  if (sent) {
    return (
      <div role="status" className="mt-6 rounded-2xl bg-[#F5F0FC] p-6">
        <CheckCircle2 aria-hidden="true" className="size-8 text-[var(--ia-accent)]" strokeWidth={1.8} />
        <p className="mt-3 text-[19px] font-semibold text-[#1A1426]">
          {FORMS.successTitle}, {sent.name}!
        </p>
        <p className="mt-2 text-[15px] leading-[1.6] text-[#59565F]">
          {sent.via === "whatsapp" ? FORMS.successWhatsapp : FORMS.successEmail}
        </p>
        <p className="mt-3 text-[14px] leading-[1.6] text-[#59565F]">
          {FORMS.notOpened}{" "}
          <a
            href={sent.href}
            {...(sent.via === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="font-medium text-[var(--ia-accent)] underline underline-offset-2 hover:text-[var(--ia-accent)]"
          >
            {FORMS.retry}
          </a>
          {sent.via === "email" && (
            <>
              {" "}o escríbenos a{" "}
              <a
                href={`mailto:${CHANNELS.email}`}
                className="font-medium text-[#1A1426] underline underline-offset-2 hover:text-[#1A1426]"
              >
                {CHANNELS.email}
              </a>
            </>
          )}
          .
        </p>
        <button type="button" onClick={onClose} className={cn(secondaryButton, "mt-6")}>
          {FORMS.close}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      <Field label={labels.name}>
        <input name="nombre" required autoComplete="name" className={input} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={labels.email}>
          <input name="correo" type="email" required autoComplete="email" className={input} />
        </Field>
        <Field label={labels.phone}>
          <input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" className={input} />
        </Field>
      </div>
      <Field label={labels.message}>
        <textarea name="mensaje" rows={3} className={cn(input, "h-auto resize-y py-3 leading-[1.5]")} />
      </Field>
      <div className="mt-2 flex flex-wrap gap-3">
        <button type="submit" name="via" value="whatsapp" className={cn(primaryButton, "h-12 px-6 text-[16px]")}>
          <WhatsappIcon className="size-5" />
          {FORMS.submitWhatsapp}
        </button>
        <button type="submit" name="via" value="email" className={secondaryButton}>
          <Mail aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
          {FORMS.submitEmail}
        </button>
      </div>
      <p className="text-[12.5px] leading-[1.5] text-[#737177]">
        {FORMS.privacyNote}{" "}
        <a href="#privacidad" className="underline underline-offset-2 hover:text-[#1A1426]">
          Política de privacidad
        </a>
      </p>
    </form>
  );
}
