"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS } from "./content";
import { popoverPanel } from "./ui";
import { useDismiss } from "./use-dismiss";

/** Botón "Menú" del hero con un desplegable de anclas a las secciones. */
export default function HeroMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useDismiss(open, setOpen);

  const Icon = open ? X : Menu;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="curso-ia-menu"
        onClick={() => setOpen(!open)}
        className="flex h-[52px] items-center gap-2.5 rounded-full bg-white px-5 text-[15px] font-medium text-[#1A1426]"
      >
        Menú
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </button>
      {open && (
        <ul id="curso-ia-menu" className={cn(popoverPanel, "right-0 top-[60px] min-w-[220px]")}>
          {NAV_SECTIONS.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-[15px] text-[#1A1426] hover:bg-[#F3EEFB] hover:text-[#1A1426]"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
