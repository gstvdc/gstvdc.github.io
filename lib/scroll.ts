import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Scrolls to a CSS selector (or absolute Y), through Lenis when available. */
export function scrollToTarget(target: string | number) {
  let y: number;
  if (typeof target === "number") {
    y = target;
  } else {
    const el = document.querySelector(target);
    if (!el) return;
    // Sections inside the horizontal swap are transformed while sliding, so measure
    // them relative to their untransformed wrapper.
    const inner = el.closest<HTMLElement>(".hs-slide-inner");
    const docTop = inner
      ? inner.parentElement!.getBoundingClientRect().top +
        window.scrollY +
        (el.getBoundingClientRect().top - inner.getBoundingClientRect().top)
      : el.getBoundingClientRect().top + window.scrollY;
    y = target === "#hero" ? 0 : docTop - 60;
    history.replaceState(null, "", target);
  }

  if (instance) {
    instance.scrollTo(y, { duration: 1.6 });
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
