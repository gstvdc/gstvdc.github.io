"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import StackLanes from "@/components/StackLanes";
import type { StationId } from "@/components/ui/stack-machine-3d";
import { clamp01, easeOutCubic, prefersReducedMotion } from "@/lib/motion";

// three.js only runs in the browser; load it lazily so it never blocks the first paint.
const StackMachine3D = dynamic(() => import("@/components/ui/stack-machine-3d"), {
  ssr: false,
  loading: () => <div className="stack-stage-loading">Montando a stack…</div>,
});


/**
 * The interactive machine sits in a rounded card. Scrolling pins it and grows it to fill
 * the whole screen; then the stack lanes rise up inside the card, and once they have
 * scrolled through, the page carries on.
 */
export default function StackExpand({
  active,
  onStation,
  onPick,
}: {
  active: StationId;
  onStation: (id: StationId) => void;
  onPick: (id: StationId) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const machineRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const card = cardRef.current!;
    const machine = machineRef.current!;
    const panel = panelRef.current!;

    if (prefersReducedMotion()) {
      setStill(true);
      return;
    }

    let ticking = false;
    let raf = 0;
    let expandDist = 0;
    let laneDist = 0;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      expandDist = Math.round(vh * 0.9);
      // The panel travels exactly its own height, so its bottom edge lands on the
      // card's bottom edge and the machine never peeks out underneath.
      // A few px of overshoot guarantee the panel fully covers the card's bottom.
      laneDist = panel.offsetHeight - 24;
      wrap.style.height = `${vh + expandDist + laneDist}px`;
      machine.style.width = `${vw}px`;
      machine.style.height = `${vh}px`;
    };

    const update = () => {
      ticking = false;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh || 1;
      const s = clamp01(-wrap.getBoundingClientRect().top / total) * (expandDist + laneDist);

      // Phase 1: the card grows from its in-page size to the full screen.
      const p = easeOutCubic(clamp01(s / expandDist));
      const w0 = wrap.clientWidth;
      const h0 = Math.min(820, Math.max(560, vh * 0.82));
      const w = w0 + (vw - w0) * p;
      const h = h0 + (vh - h0) * p;
      // Centred on the screen (not on the narrower page column) while it grows.
      // While the whole Stack section slides in from the right, its wrapper carries that
      // horizontal transform; subtract it so the card is placed against the real page.
      const slideInner = wrap.closest<HTMLElement>(".hs-slide-inner");
      const wrapLeft =
        wrap.getBoundingClientRect().left -
        (slideInner ? slideInner.getBoundingClientRect().left : 0);
      card.style.width = `${w}px`;
      card.style.height = `${h}px`;
      card.style.left = `${(vw - w) / 2 - wrapLeft}px`;
      card.style.top = `${(vh - h) / 2}px`;
      card.style.borderRadius = `${28 * (1 - p)}px`;
      card.style.borderColor = `rgba(245, 244, 241, ${0.12 * (1 - p)})`;
      // The machine keeps its full-screen size (so the 3D never re-lays out while
      // growing); only a uniform scale changes.
      const k = Math.min(w / vw, h / vh);
      machine.style.transform = `translate(-50%, -50%) scale(${k})`;

      // Phase 2: the lanes rise through the card.
      const u = Math.min(laneDist, Math.max(0, s - expandDist));
      panel.style.transform = `translate3d(0, ${(h - u).toFixed(1)}px, 0)`;
      // Once the lanes cover the whole card, hide the machine (and its captions)
      // so nothing of it can show through at the end.
      machine.style.visibility = u >= laneDist - 1 ? "hidden" : "visible";
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(panel);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={"stack-expand" + (still ? " is-still" : "")} ref={wrapRef}>
      <div className="stack-expand-pin">
        <div className="stack-expand-card" ref={cardRef}>
          <div className="stack-expand-machine" ref={machineRef}>
            <StackMachine3D height="100%" onStation={onStation} />
          </div>
          <div className="stack-expand-panel" ref={panelRef}>
            <StackLanes active={active} onPick={onPick} reveal={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
