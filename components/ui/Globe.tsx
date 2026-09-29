"use client";

import { useEffect, useRef } from "react";
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import { prefersReducedMotion } from "@/lib/motion";

/** Sombrio, SC: [longitude, latitude]. */
const HOME: [number, number] = [-49.63, -29.12];

const INK = "245, 244, 241";
const RED = "226, 85, 77";

/**
 * Wireframe globe drawn on a canvas (d3-geo, orthographic). It spins slowly while it is on
 * screen, can be dragged, and marks Sombrio, SC. The sphere is wider than the box, so only
 * a band of it shows; the CSS mask fades the band's edges.
 */
export default function Globe({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!box || !canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const projection = geoOrthographic().precision(0.6);
    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();
    const sphere = { type: "Sphere" } as const;

    // Rotation that puts HOME at the centre of the sphere.
    const rot = { lon: -HOME[0], lat: -HOME[1] };
    const size = { w: 0, h: 0, dpr: 1 };
    let land: ReturnType<typeof feature> | null = null;
    let visible = false;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    let disposed = false;

    const draw = (now: number) => {
      const { w, h, dpr } = size;
      if (!w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      projection
        .scale(w * 0.46)
        .translate([w / 2, h / 2])
        .rotate([rot.lon, rot.lat]);

      ctx.lineWidth = 1;

      ctx.beginPath();
      path(sphere);
      ctx.fillStyle = `rgba(${INK}, 0.025)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${INK}, 0.32)`;
      ctx.stroke();

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = `rgba(${INK}, 0.09)`;
      ctx.stroke();

      if (land) {
        ctx.beginPath();
        path(land);
        ctx.fillStyle = `rgba(${INK}, 0.05)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${INK}, 0.5)`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Home marker, only while it faces the viewer.
      const facing = geoDistance(HOME, [-rot.lon, -rot.lat]) < Math.PI / 2 - 0.05;
      const point = facing ? projection(HOME) : null;
      if (point) {
        const pulse = reduced ? 0.5 : (now % 2200) / 2200;
        ctx.beginPath();
        ctx.arc(point[0], point[1], 5 + pulse * 16, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${RED}, ${(1 - pulse) * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(point[0], point[1], 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${RED})`;
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !visible) return;
      if (!dragging && !reduced) rot.lon += 0.16;
      draw(now);
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const rect = box.getBoundingClientRect();
      size.dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.w = rect.width;
      size.h = rect.height;
      canvas.width = Math.round(rect.width * size.dpr);
      canvas.height = Math.round(rect.height * size.dpr);
      draw(performance.now());
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0.05 }
    );
    io.observe(box);

    import("world-atlas/countries-110m.json").then((mod) => {
      if (disposed) return;
      const world = (mod.default ?? mod) as unknown as Topology<{
        countries: GeometryCollection;
      }>;
      land = feature(world, world.objects.countries);
      draw(performance.now());
      if (visible) start();
    });

    const onDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      rot.lon += (event.clientX - lastX) * 0.4;
      // Touch keeps vertical movement for page scroll (touch-action: pan-y).
      rot.lat = Math.max(-70, Math.min(70, rot.lat - (event.clientY - lastY) * 0.3));
      lastX = event.clientX;
      lastY = event.clientY;
      if (reduced) draw(performance.now());
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={boxRef} className={className}>
      <canvas ref={canvasRef} role="img" aria-label={label} />
    </div>
  );
}
