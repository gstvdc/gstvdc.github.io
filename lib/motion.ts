import { useSyncExternalStore } from "react";

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

/**
 * Scroll-driven pinning (JS transforms updated on `scroll`) trails the native touch scroll
 * by a frame, which shows up as shaking on phones and tablets. Those layouts, and reduced
 * motion, get the plain stacked version of the pinned sections instead.
 */
const STILL_QUERY =
  "(prefers-reduced-motion: reduce), (max-width: 992px), (pointer: coarse)";

function subscribeStill(onChange: () => void) {
  const mq = window.matchMedia(STILL_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useStillLayout() {
  return useSyncExternalStore(
    subscribeStill,
    () => window.matchMedia(STILL_QUERY).matches,
    () => false
  );
}
