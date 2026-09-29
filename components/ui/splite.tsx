"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * Lazy-loaded Spline scene. The 3D runtime only loads once the scene is near the screen
 * (it never blocks the first paint) and its render loop is stopped while it is off screen.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const visibleRef = useRef(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) setNear(true);
        if (entry.isIntersecting) appRef.current?.play();
        else appRef.current?.stop();
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  // The robot follows the pointer, but Spline only listens on its own canvas and resets
  // itself on `pointerleave`. So, once the real pointer is outside, act as if it were still
  // over the canvas: send a `pointerenter` and then forward the mouse movements made anywhere
  // on the page. That keeps the robot looking at the cursor from far away (only while the
  // scene is on screen).
  useEffect(() => {
    let raf = 0;
    let x = 0;
    let y = 0;
    let entered = false;
    const forward = () => {
      raf = 0;
      const canvas = boxRef.current?.querySelector("canvas");
      if (!canvas || !visibleRef.current) return;
      const init = { clientX: x, clientY: y, bubbles: true, view: window, pointerType: "mouse", isPrimary: true };
      if (!entered) {
        entered = true;
        canvas.dispatchEvent(new PointerEvent("pointerenter", { ...init, bubbles: false }));
      }
      canvas.dispatchEvent(new PointerEvent("pointermove", init));
      canvas.dispatchEvent(new MouseEvent("mousemove", init));
    };
    const onMove = (event: PointerEvent) => {
      // Ignore our own synthetic events and touch.
      if (!event.isTrusted || event.pointerType !== "mouse") return;
      if (boxRef.current?.contains(event.target as Node)) {
        // Over the canvas the browser delivers everything itself; after it leaves we must
        // announce ourselves again.
        entered = false;
        return;
      }
      x = event.clientX;
      y = event.clientY;
      if (!raf && visibleRef.current) raf = requestAnimationFrame(forward);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const loader = (
    <div className="spline-fallback">
      <span className="spline-loader"></span>
    </div>
  );

  return (
    <div ref={boxRef} className="spline-box">
      {near ? (
        <Suspense fallback={loader}>
          <Spline
            scene={scene}
            className={className}
            onLoad={(app) => {
              appRef.current = app;
              // It may have scrolled away while the scene was loading.
              if (!visibleRef.current) app.stop();
            }}
          />
        </Suspense>
      ) : (
        loader
      )}
    </div>
  );
}
