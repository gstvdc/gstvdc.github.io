"use client";

import { useEffect, useState } from "react";
import { LANGS, useI18n } from "@/lib/i18n";

/**
 * Fixed language switch in the top-right corner. Collapsed it shows only the active language;
 * hovering (or focusing, or tapping it on touch screens) expands the box to reveal the others.
 */
export default function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);

  // On touch screens there is no hover: a tap outside closes the expanded box.
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!(event.target as HTMLElement).closest(".lang-switch")) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div
      className={"lang-switch" + (open ? " is-open" : "")}
      role="group"
      aria-label={t.nav.language}
      onMouseLeave={() => setOpen(false)}
    >
      {LANGS.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          className={lang === code ? "is-active" : undefined}
          aria-pressed={lang === code}
          aria-label={name}
          lang={code}
          onClick={() => {
            // The first tap on the collapsed box only opens it.
            if (lang === code && !open) {
              setOpen(true);
              return;
            }
            setLang(code);
            setOpen(false);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
