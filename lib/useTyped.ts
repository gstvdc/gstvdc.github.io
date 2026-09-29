import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Typewriter effect that writes straight into the node (no re-renders). */
export function useTyped(strings: string[], typeSpeed = 42, backSpeed = 24) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = ` ${strings[0]}`;
      return;
    }

    let index = 0;
    let length = 0;
    let deleting = false;
    let timer: number;

    const common = (a: string, b: string) => {
      let i = 0;
      while (i < a.length && i < b.length && a[i] === b[i]) i++;
      return i;
    };

    function tick() {
      const text = strings[index];
      if (!deleting) {
        length++;
        el!.textContent = " " + text.slice(0, length);
        if (length === text.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1800);
          return;
        }
        timer = window.setTimeout(tick, typeSpeed);
      } else {
        const next = strings[(index + 1) % strings.length];
        const keep = common(text, next);
        length--;
        el!.textContent = " " + text.slice(0, length);
        if (length <= keep) {
          deleting = false;
          index = (index + 1) % strings.length;
          length = keep;
        }
        timer = window.setTimeout(tick, backSpeed);
      }
    }

    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
