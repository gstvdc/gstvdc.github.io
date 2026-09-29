"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { HELLO_PATHS, HELLO_TRANSFORM, HELLO_VIEWBOX } from "@/components/ui/helloPaths";
import { prefersReducedMotion } from "@/lib/motion";
import { getLenis, scrollToTarget, setLenis } from "@/lib/scroll";

/**
 * Global motion layer: smooth scroll, intro preloader, custom cursor,
 * magnetic buttons, scroll reveals and watermark parallax.
 */
export default function Effects() {
  const [loaded, setLoaded] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // ---- Smooth scroll (Lenis) ----
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    setLenis(lenis);
    lenis.stop();
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!link || link.getAttribute("href") === "#") return;
      const selector = link.getAttribute("href")!;
      if (!document.querySelector(selector)) return;
      event.preventDefault();
      scrollToTarget(selector);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // ---- Preloader: "hello" is written in ~1.1s, then the curtain lifts ----
  useEffect(() => {
    window.scrollTo(0, 0);
    let timer: number;
    const start = performance.now();
    Promise.resolve(document.fonts?.ready).then(() => {
      const wait = Math.max(0, 1750 - (performance.now() - start));
      timer = window.setTimeout(() => setLoaded(true), wait);
    });
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-loading", !loaded);
    if (loaded) getLenis()?.start();
  }, [loaded]);

  // ---- Scroll reveals + watermark parallax ----
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], .rv"
    );

    let io: IntersectionObserver | null = null;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in-view", "rv-in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in-view", "rv-in");
            io!.unobserve(entry.target);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
      );
      targets.forEach((el) => io!.observe(el));
    }

    const marks = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-watermark, .projects-watermark"
      )
    );
    let ticking = false;
    const drift = () => {
      ticking = false;
      const vh = window.innerHeight;
      marks.forEach((mark) => {
        const rect = mark.parentElement!.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const p = (rect.top + rect.height / 2 - vh / 2) / vh;
        mark.style.setProperty("--drift", (p * -60).toFixed(1) + "px");
      });
    };
    const onScroll = () => {
      if (!ticking && !reduced) {
        ticking = true;
        requestAnimationFrame(drift);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    drift();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ---- Custom cursor + magnetic elements ----
  useEffect(() => {
    if (
      prefersReducedMotion() ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let magnet: HTMLElement | null = null;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.classList.add("is-on");
      ring.classList.add("is-on");

      const el = event.target as HTMLElement;
      const hit = el.closest<HTMLElement>(
        "a, button, input, textarea, [data-cursor], [data-magnetic]"
      );
      ring.classList.toggle("is-hover", !!hit);
      ring.dataset.label = hit?.dataset.cursor ?? "";
      ring.classList.toggle("has-label", !!hit?.dataset.cursor);

      const target = el.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== target) magnet.style.transform = "";
      magnet = target;
      if (target) {
        const rect = target.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        target.style.transform = `translate3d(${dx * 0.25}px, ${dy * 0.35}px, 0)`;
      }
    };
    const onLeave = () => {
      dot.classList.remove("is-on");
      ring.classList.remove("is-on");
      if (magnet) magnet.style.transform = "";
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        className={"preloader" + (loaded ? " is-done" : "")}
        aria-hidden={loaded}
      >
        <svg
          className="preloader-hello"
          viewBox={HELLO_VIEWBOX}
          role="img"
          aria-label="Hello"
        >
          <g transform={HELLO_TRANSFORM}>
            {HELLO_PATHS.map((d, i) => (
              <path key={i} pathLength={1} d={d} style={{ animationDelay: `${i === 0 ? 100 : 380}ms`, animationDuration: i === 0 ? "300ms" : "1100ms" }} />
            ))}
          </g>
        </svg>
      </div>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true"></div>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true"></div>
    </>
  );
}
