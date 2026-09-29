"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, type SpringOptions } from "framer-motion";

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

/**
 * Soft light that follows the mouse inside its parent (adapted from ibelick/spotlight;
 * the Tailwind classes were replaced by the `.spotlight` rules in differentials.css).
 */
export function Spotlight({
  className = "",
  size = 260,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);
  const left = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const top = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (parent) setParentElement(parent);
  }, []);

  const onMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const rect = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    parentElement.addEventListener("mousemove", onMove);
    parentElement.addEventListener("mouseenter", enter);
    parentElement.addEventListener("mouseleave", leave);
    return () => {
      parentElement.removeEventListener("mousemove", onMove);
      parentElement.removeEventListener("mouseenter", enter);
      parentElement.removeEventListener("mouseleave", leave);
    };
  }, [parentElement, onMove]);

  return (
    <motion.div
      ref={containerRef}
      className={`spotlight ${isHovered ? "is-on" : ""} ${className}`.trim()}
      style={{ width: size, height: size, left, top }}
    />
  );
}
