"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS, useI18n, type Lang } from "@/lib/i18n";

/** Round flag badges, drawn inline (emoji flags do not render on Windows). */
function Flag({ code }: { code: Lang }) {
  return (
    <svg
      className="lang-flag"
      viewBox={code === "pt" ? "0 0 640 480" : "0 0 30 20"}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {code === "pt" && (
        <>
          {/* Official proportions (as in flag-icons), without the stars and lettering. */}
          <path fill="#229e45" d="M0 0h640v480H0z" />
          <path fill="#f8e509" d="m321.4 436 301.5-195.7L319.6 44 17.1 240.7z" />
          <path fill="#2b49a3" d="M452.8 240c0 70.3-57.1 127.3-127.6 127.3A127.4 127.4 0 1 1 452.8 240" />
          <path fill="#fff" d="M444.4 285.8a125 125 0 0 0 5.8-19.8c-67.8-59.5-143.3-90-238.7-83.7a125 125 0 0 0-8.5 20.9c113-10.8 196 39.2 241.4 82.6" />
        </>
      )}
      {code === "en" && (
        <>
          <rect width="30" height="20" fill="#012169" />
          <path d="M0 0 30 20M30 0 0 20" stroke="#fff" strokeWidth="4" />
          <path d="M0 0 30 20M30 0 0 20" stroke="#c8102e" strokeWidth="1.4" />
          <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
          <path d="M15 0v20M0 10h30" stroke="#c8102e" strokeWidth="3.4" />
        </>
      )}
      {code === "es" && (
        <>
          <rect width="30" height="20" fill="#aa151b" />
          <rect y="5" width="30" height="10" fill="#f1bf00" />
        </>
      )}
    </svg>
  );
}

/**
 * Fixed language switch in the top-right corner. Collapsed it shows only the active language;
 * hovering (or focusing, or tapping it on touch screens) expands the box to reveal the others.
 */
export default function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  // Once a language is picked the box stays expanded until the next click elsewhere.
  const pinned = useRef(false);

  // The hero's "Contato" link slides aside while the box is expanded (see lang.css).
  useEffect(() => {
    document.documentElement.classList.toggle("lang-open", open);
    return () => document.documentElement.classList.remove("lang-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest(".lang-switch")) return;
      pinned.current = false;
      setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <div
      className={"lang-switch" + (open ? " is-open" : "")}
      role="group"
      aria-label={t.nav.language}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (!pinned.current) setOpen(false);
      }}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!pinned.current && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      {LANGS.map(({ code, name }) => (
        <button
          key={code}
          type="button"
          className={lang === code ? "is-active" : undefined}
          aria-pressed={lang === code}
          aria-label={name}
          lang={code}
          onClick={() => {
            // The first tap on the collapsed box (touch) only opens it.
            if (!(lang === code && !open)) setLang(code);
            pinned.current = true;
            setOpen(true);
          }}
        >
          <Flag code={code} />
        </button>
      ))}
    </div>
  );
}
