import { useEffect, useRef } from "react";
import { useReducedMotion, useStillLayout } from "@/lib/motion";

/**
 * Rotating phrases that write straight into the node (no re-renders). Desktop types and
 * erases them; phones and tablets fade each phrase out and the next one in (typing makes a
 * wrapped line grow and get cut off); with reduced motion only the first phrase shows.
 */
export function useTyped(strings: string[], typeSpeed = 42, backSpeed = 24) {
  const ref = useRef<HTMLSpanElement>(null);
  const still = useStillLayout();
  const reduced = useReducedMotion();

  // Restart the typing whenever the phrases change (e.g. the language switches).
  const key = strings.join("|");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = ` ${strings[0]}`;
      return;
    }

    if (still) {
      const SHOW = 3400;
      const FADE = 450;
      let i = 0;
      let t1 = 0;
      let t2 = 0;
      el.style.transition = `opacity ${FADE}ms ease`;
      el.textContent = ` ${strings[0]}`;
      el.style.opacity = "1";
      const next = () => {
        el.style.opacity = "0";
        t2 = window.setTimeout(() => {
          i = (i + 1) % strings.length;
          el.textContent = ` ${strings[i]}`;
          el.style.opacity = "1";
          t1 = window.setTimeout(next, SHOW);
        }, FADE);
      };
      t1 = window.setTimeout(next, SHOW);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        el.style.transition = "";
        el.style.opacity = "";
      };
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
  }, [key, still, reduced]);

  return ref;
}
