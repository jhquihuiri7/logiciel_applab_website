import { cn } from "@/lib/utils";
import { BRAND, CONTACT, whatsappUrl } from "./content";
import { sora } from "./fonts";
import { BrandMark, externalProps, PrimaryLink, WhatsappIcon } from "./ui";

const columnTitle = "text-xs font-medium uppercase tracking-[0.12em] text-[#8F8C96]";
const link = "text-[#C2C0C7] transition-colors hover:text-white";

export default function ContactFooter() {
  return (
    <footer
      id="contacto"
      className="mx-auto mt-20 w-full max-w-[1300px] scroll-mt-6 rounded-[28px] bg-[#0A0516] px-6 py-8 text-white md:px-[60px] md:py-10"
    >
      <div className="flex flex-wrap-reverse items-center justify-between gap-x-10 gap-y-6">
        <PrimaryLink href={whatsappUrl(CONTACT.whatsappText)} className="h-[54px] px-[26px] text-[17px]">
          <WhatsappIcon className="size-5" />
          {CONTACT.whatsappCta}
        </PrimaryLink>
        <h2
          className={cn(
            sora.className,
            "text-[length:clamp(32px,3.2vw,46px)] font-normal leading-[1.15] tracking-[-0.02em] text-white sm:ml-auto sm:text-right",
          )}
        >
          {CONTACT.title[0]}
          <br />
          {CONTACT.title[1]}
        </h2>
      </div>

      <div aria-hidden="true" className="my-8 h-px bg-[#2C2A31]" />

      <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark tone="accent" className="size-8 rounded-[9px]" />
            <span className="text-[26px] font-medium leading-none tracking-[-0.02em]">{BRAND}</span>
          </div>
          <p className="mt-3 max-w-[340px] text-sm leading-[1.6] text-[#BEBCC3]">{CONTACT.description}</p>
        </div>

        <nav aria-label={CONTACT.linksTitle}>
          <p className={columnTitle}>{CONTACT.linksTitle}</p>
          <ul className="mt-3 flex flex-col gap-2.5 text-[13.5px]">
            {CONTACT.links.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={columnTitle}>{CONTACT.channelsTitle}</p>
          <ul className="mt-3 flex flex-col gap-2.5 text-[13.5px]">
            {CONTACT.channels.map((item) => (
              <li key={item.label}>
                <a href={item.href} {...externalProps(item.href)} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-[#2C2A31] pt-5 text-[13px] text-[#9F9DA3]">
        <p>
          © {CONTACT.copyrightYear} {BRAND}. Todos los derechos reservados.
        </p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {CONTACT.legal.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
