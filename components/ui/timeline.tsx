"use client";

/**
 * Horizontal, scroll-pinned timeline (GSAP ScrollTrigger + SplitText).
 * Adapted from the "Timeline" component by Hyperiux Vault (vault.hyperiux.com):
 * the Tailwind utilities were rewritten as plain CSS (styles/timeline.css) and the
 * milestones are now driven by props, laid out alternately above and below the line.
 */

import {
  type CSSProperties,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* Inline stand-in for @gsap/react's useGSAP. One gsap.context lives for the
   component's lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own cleanup. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export type TimelineItem = {
  /** Unique, CSS-safe slug (letters, digits, dashes). */
  id: string;
  /** Big label: the period. */
  period: string;
  /** Small text under it. */
  content: string;
};

type SplitTextInstance = InstanceType<typeof SplitText>;

export type TimelineProps = {
  items: TimelineItem[];
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  /** Custom first card. When omitted, `imageUrl` is shown instead. */
  lead?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  /** Optional download link shown under the period label. */
  cvHref?: string;
  cvLabel?: string;
  /** Reveal animation duration, in seconds. */
  duration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
}

export default function Timeline({
  items,
  title = "Trajetória",
  periodLabel = "",
  textColor = "#f5f4f1",
  mutedTextColor = "rgba(245, 244, 241, 0.62)",
  activeColor = "#e2554d",
  backgroundColor = "#0a0a0a",
  lead,
  imageUrl,
  imageAlt = "",
  cvHref,
  cvLabel = "Baixar currículo",
  duration = 1.4,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const normalizedDuration = Math.max(0.2, duration);

  // Even positions sit above the line, odd ones below it.
  const topItems = items.filter((_, i) => i % 2 === 0);
  const bottomItems = items.filter((_, i) => i % 2 === 1);

  const sectionStyle: CSSProperties = { color: textColor, backgroundColor };
  const activeStyle: CSSProperties = { backgroundColor: activeColor };
  const mutedTextStyle: CSSProperties = { color: mutedTextColor };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < 600;
      const slidePercent = isMobile ? -57 : -65;
      const lineWidth = isMobile ? "65%" : "98%";
      const lineStart = isMobile ? "top 30%" : "top 25%";
      const slideEnd = isMobile ? "80% 50%" : "86% bottom";
      const lineEnd = isMobile ? "78% 50%" : "86% bottom";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: slideEnd,
          scrub: true,
        },
        defaults: { ease: "none" },
      });

      tl.fromTo(wholeSliderRef.current, { xPercent: 0 }, { xPercent: slidePercent });

      if (reducedMotion) {
        gsap.set(".journey-line", { width: lineWidth });
        gsap.set(".tl-end-dot--end", { opacity: 1 });
        return;
      }

      // The closing dot only appears once the line starts to draw.
      gsap.to(".tl-end-dot--end", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: lineStart,
          end: "+=160",
          scrub: true,
        },
      });

      gsap.to(".journey-line", {
        width: lineWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: lineStart,
          end: lineEnd,
          scrub: true,
        },
      });
    },
    { dependencies: [reducedMotion, items.length], scope: sectionRef }
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (reducedMotion) {
        items.forEach((item) => {
          gsap.set(`.jl-${item.id}`, { scaleY: 1 });
          gsap.set(`.jd-${item.id}`, { scale: 1 });
          gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
          gsap.set(`.description-${item.id}`, { opacity: 1, clearProps: "transform" });
        });
        return;
      }

      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 0, transformOrigin: "bottom bottom" });
        gsap.set(`.jd-${item.id}`, { scale: 0 });
        gsap.set(`.title-${item.id}`, { opacity: 1 });
        gsap.set(`.description-${item.id}`, { opacity: 1 });
      });

      const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
      const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};

      items.forEach((item) => {
        titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
          type: "chars, words, lines",
          mask: "lines",
        });
        descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
          type: "chars, words, lines",
          mask: "lines",
        });
      });

      const isTopItem = (id: string) => topItems.some((t) => t.id === id);

      const createItemTimeline = (item: TimelineItem, startPos: number, endPos: number) => {
        const lineSelector = `.jl-${item.id}`;
        const dotSelector = `.jd-${item.id}`;
        const titleLines = titleSplits[item.id]?.lines || [];
        const descriptionLines = descriptionSplits[item.id]?.lines || [];

        if (!isTopItem(item.id)) {
          gsap.set(lineSelector, { transformOrigin: "top top" });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: `${startPos}% 30%`,
            end: `${endPos}% 50%`,
            scrub: true,
          },
        });

        timeline
          .to(lineSelector, { scaleY: 1, duration: normalizedDuration * 0.4 })
          .to(dotSelector, { scale: 1, duration: normalizedDuration * 0.4 }, "<")
          .fromTo(
            titleLines,
            { y: 100 },
            {
              y: 0,
              delay: -0.8 * normalizedDuration,
              duration: normalizedDuration,
              stagger: 0.02,
              ease: "power2.out",
            }
          )
          .fromTo(
            descriptionLines,
            { y: 100 },
            { y: 0, duration: normalizedDuration, stagger: 0.02, ease: "power2.out" },
            "<"
          );

        return timeline;
      };

      // Spread the milestones evenly along the pinned scroll range.
      const mobile = window.innerWidth < 600;
      const n = items.length;
      const first = mobile ? 22 : 6;
      const last = mobile ? 66 : 56;
      const span = mobile ? 10 : 20;
      items.forEach((item, index) => {
        const startPos = n > 1 ? first + (index * (last - first)) / (n - 1) : first;
        createItemTimeline(item, Math.round(startPos), Math.round(startPos + span));
      });

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      // The page above changes height after load (fonts, 3D scene, lists): re-measure.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const timers = [window.setTimeout(refresh, 800), window.setTimeout(refresh, 2600)];
      document.fonts?.ready.then(refresh);

      // Sections above (the pinned Stack card, lists) resize the page after mount, which
      // would leave these scroll ranges stale. Re-measure whenever the page height moves.
      let lastHeight = document.documentElement.scrollHeight;
      let debounce = 0;
      const ro = new ResizeObserver(() => {
        const h = document.documentElement.scrollHeight;
        if (h === lastHeight) return;
        lastHeight = h;
        window.clearTimeout(debounce);
        debounce = window.setTimeout(refresh, 150);
      });
      ro.observe(document.body);

      return () => {
        Object.values(titleSplits).forEach((split) => split?.revert?.());
        Object.values(descriptionSplits).forEach((split) => split?.revert?.());
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("load", refresh);
        timers.forEach((t) => window.clearTimeout(t));
        window.clearTimeout(debounce);
        ro.disconnect();
      };
    },
    { dependencies: [normalizedDuration, reducedMotion, items.length], scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="resume" className="tl-section" style={sectionStyle}>
      <div className="tl-sticky">
        <div ref={wholeSliderRef} className="tl-slider">
          <div className="tl-photo">
            {lead ?? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt={imageAlt} draggable={false} />
            )}
          </div>

          <div className="tl-track">
            <div className="tl-line-wrap">
              <div className="tl-end-dot" style={activeStyle}></div>
              <div className="tl-line journey-line" style={activeStyle}></div>
              <div className="tl-end-dot tl-end-dot--end" style={activeStyle}></div>
            </div>

            <div className="tl-row tl-row--top">
              <div className="tl-side tl-side--top">
                <h2 className="tl-heading">{title}</h2>
              </div>

              <div className="tl-items tl-items--top">
                {topItems.map((item) => (
                  <div key={`top-${item.id}`} className="tl-item tl-item--top">
                    <div className="tl-stem-wrap tl-stem-wrap--top">
                      <div className={`tl-dot jd-${item.id}`} style={activeStyle}></div>
                      <div className={`tl-stem tl-stem--top jl-${item.id}`} style={activeStyle}></div>
                    </div>

                    <div className="tl-text tl-text--top">
                      <h4 className={`tl-period title-${item.id}`}>{item.period}</h4>
                      <p className={`tl-desc description-${item.id}`} style={mutedTextStyle}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tl-row tl-row--bottom">
              <div className="tl-side tl-side--bottom">
                <p className="tl-period-label" style={mutedTextStyle}>
                  {periodLabel}
                </p>
                {cvHref && (
                  <a className="tl-cv" href={cvHref} download data-magnetic>
                    <i className="bi bi-file-earmark-arrow-down"></i>
                    {cvLabel}
                  </a>
                )}
              </div>

              <div className="tl-items tl-items--bottom">
                {bottomItems.map((item) => (
                  <div key={`bottom-${item.id}`} className="tl-item tl-item--bottom">
                    <div className="tl-stem-wrap tl-stem-wrap--bottom">
                      <div className={`tl-stem tl-stem--bottom jl-${item.id}`} style={activeStyle}></div>
                      <div className={`tl-dot jd-${item.id}`} style={activeStyle}></div>
                    </div>

                    <div className="tl-text tl-text--bottom">
                      <h4 className={`tl-period title-${item.id}`}>{item.period}</h4>
                      <p className={`tl-desc description-${item.id}`} style={mutedTextStyle}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
