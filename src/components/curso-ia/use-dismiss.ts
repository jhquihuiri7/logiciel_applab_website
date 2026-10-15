"use client";

import { useEffect, useRef } from "react";

/** Cierra un desplegable al pulsar fuera del elemento devuelto o al presionar Escape. */
export function useDismiss<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  setOpen: (open: boolean) => void,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  return ref;
}
