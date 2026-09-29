"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The end of `front` stays pinned while `next` slides in from the right, as if the
 * next section were sitting beside it. Scroll drives the slide; once it has fully
 * arrived, `next` continues scrolling vertically as usual.
 */
export default function HorizontalSwap({
  front,
  next,
}: {
  front: ReactNode;
  next: ReactNode;
}) {
  const frontRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frontEl = frontRef.current!;
    const slide = slideRef.current!;
    const inner = innerRef.current!;
    const holdEl = holdRef.current!;
    if (prefersReducedMotion()) {
      frontEl.style.position = "relative";
      return;
    }

    let raf = 0;
    let ticking = false;

    // Pin the front once its bottom edge reaches the bottom of the viewport.
    const pin = () => {
      const top = Math.min(0, window.innerHeight - frontEl.offsetHeight);
      frontEl.style.top = `${top}px`;
    };

    // A pause before the slide: the last screen stays put while you keep scrolling,
    // so reaching the end of the list never throws you sideways by accident.
    const holdPx = () => Math.round(window.innerHeight * 0.85);
    const applyHold = () => {
      holdEl.style.height = `${holdPx()}px`;
    };

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const hold = holdPx();
      const naturalTop = slide.getBoundingClientRect().top;
      // Distance scrolled since the front's last screen got pinned.
      const pinned = vh - (naturalTop - hold);
      const s = Math.min(vh, Math.max(0, pinned - hold));
      const p = s / vh;
      const eased = 1 - Math.pow(1 - p, 3);
      const x = (1 - eased) * window.innerWidth;
      // While sliding, keep `next` glued to the top of the screen instead of rising.
      const y = p < 1 ? s - vh : 0;
      inner.style.transform =
        p >= 1 ? "" : `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      inner.style.visibility = p <= 0 ? "hidden" : "visible";
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      applyHold();
      pin();
      update();
    };

    applyHold();
    pin();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(frontEl);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="hs-wrap">
      <div className="hs-front" ref={frontRef}>
        {front}
      </div>
      <div className="hs-hold" ref={holdRef} aria-hidden="true"></div>
      <div className="hs-slide" ref={slideRef}>
        <div className="hs-slide-inner" ref={innerRef}>
          {next}
        </div>
      </div>
    </div>
  );
}
