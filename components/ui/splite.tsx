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
