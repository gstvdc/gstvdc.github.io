"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { pt, type Dict } from "./pt";
import { en } from "./en";
import { es } from "./es";

export type Lang = "pt" | "en" | "es";

export const LANGS: { code: Lang; label: string; html: string; name: string }[] = [
  { code: "pt", label: "PT", html: "pt-BR", name: "Português" },
  { code: "en", label: "EN", html: "en", name: "English" },
  { code: "es", label: "ES", html: "es", name: "Español" },
];

const DICTS: Record<Lang, Dict> = { pt, en, es };
const STORAGE_KEY = "lang";

type I18n = { lang: Lang; t: Dict; setLang: (lang: Lang) => void };

const I18nContext = createContext<I18n>({ lang: "pt", t: pt, setLang: () => {} });

function detect(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en" || saved === "es") return saved;
  } catch {
    /* storage can be blocked */
  }
  const nav = (navigator.language || "pt").toLowerCase();
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("en")) return "en";
  return "pt";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start in Portuguese so the static HTML and first client render match.
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    // Reads the saved or browser language once, after hydration.
    setLangState(detect());
  }, []);

  const t = DICTS[lang];

  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang)!.html;
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
    // Text length changes the layout: let scroll-driven sections re-measure.
    const id = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 80);
    return () => window.clearTimeout(id);
  }, [lang, t]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
