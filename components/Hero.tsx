"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTyped } from "@/lib/useTyped";
import BioPanel from "@/components/Bio";
import { clamp01, prefersReducedMotion } from "@/lib/motion";

const PHRASES = [
  "criando sistemas que facilitam o trabalho das empresas",
  "transformando ideias em sites e aplicações úteis",
  "automatizando tarefas e conectando ferramentas do dia a dia",
  "evoluindo produtos com atenção à qualidade e às pessoas",
];

const SCRIBBLES = [
  "M-40,90 C120,20 220,160 340,80 S560,10 620,110 S780,220 900,90 S1080,20 1260,120",
  "M-40,260 C160,180 260,340 420,240 S640,140 760,260 S960,380 1120,240 S1260,180 1300,260",
  "M-40,420 C140,360 300,460 460,380 S680,300 820,400 S1020,460 1180,380 S1260,340 1300,400",
  "M60,60 C90,40 130,90 160,60 S220,20 250,70",
  "M950,430 C990,400 1030,460 1070,420 S1140,380 1170,440",
];

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function Hero() {
  const typedRef = useTyped(PHRASES);
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLHeadingElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const flyFirstRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const scribbleRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const hero = heroRef.current!;
    const split = splitRef.current!;
    const ghost = ghostRef.current!;
    const fly = flyRef.current!;
    const flyFirst = flyFirstRef.current!;
    const overlay = overlayRef.current!;
    const spacer = spacerRef.current!;
    const scribbles = scribbleRefs.current.filter(
      (p): p is SVGPathElement => !!p
    );

    if (prefersReducedMotion()) return;

    // Motion is active: the in-flow name becomes an invisible placeholder
    // (still readable by assistive tech) and the flying copy takes over.
    ghost.classList.add("is-ghost");
    fly.style.display = "block";

    const lengths = scribbles.map((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      return len;
    });
    const windows = scribbles.map((_, i) => ({
      start: i * 0.07,
      end: Math.min(1, i * 0.07 + 0.5),
    }));

    let total = 0;
    let firstShift = 0;
    let lineWidth = 0;
    let target = 0;
    let current = 0;
    let running = false;
    // After the name has settled in the centre, a further stretch of scroll brings in
    // the "sobre mim" panel on the very same screen.
    let bioDist = 0;
    let bioTarget = 0;
    let bioCurrent = 0;

    function measure() {
      // The last viewport of the wrap is the zone the About sheet slides over.
      bioDist = window.innerHeight * 1.3;
      total = wrap.offsetHeight - window.innerHeight * 2 - bioDist;
      const firstEl = ghost.firstElementChild as HTMLElement | null;
      const lastEl = ghost.querySelector("b");
      if (firstEl && lastEl) {
        const w1 = firstEl.getBoundingClientRect().width;
        const range = document.createRange();
        range.selectNodeContents(lastEl);
        const w2 = range.getBoundingClientRect().width;
        lineWidth = Math.max(w1, w2);
        firstShift = (lineWidth - w1) / 2;
      }
    }

    function readTarget() {
      const top = wrap.getBoundingClientRect().top;
      target = clamp01(total > 0 ? -top / total : 0);
      bioTarget = clamp01(bioDist > 0 ? (-top - total) / bioDist : 0);
    }

    function paint(progress: number, bio: number = bioCurrent) {
      overlay.style.opacity = String(Math.min(1, progress / 0.6));
      split.style.opacity = String(1 - Math.min(1, progress / 0.5));
      // --bp: how far the "sobre mim" panel has come in; --p drives its word-by-word reveal.
      overlay.style.setProperty("--bp", bio.toFixed(4));
      overlay.style.setProperty("--p", clamp01((bio - 0.2) / 0.8).toFixed(4));
      // The name leaves completely (first 10% of the stretch) before the panel starts to
      // fade in (10% to 20%), so the two are never on screen together.
      const nameOpacity = 1 - clamp01(bio / 0.1);
      fly.style.opacity = String(nameOpacity);
      fly.style.visibility = nameOpacity <= 0.01 ? "hidden" : "visible";

      scribbles.forEach((path, i) => {
        const w = windows[i];
        const local = clamp01((progress - w.start) / (w.end - w.start));
        path.style.strokeDashoffset = String(lengths[i] * (1 - local));
      });

      // Everything is measured against the (sticky) hero, so the path stays
      // correct while the whole block scrolls away at the end of the pin.
      const heroTop = hero.getBoundingClientRect().top;
      const slot = ghost.getBoundingClientRect();
      const dest = spacer.getBoundingClientRect();
      const startX = slot.left;
      const startY = slot.top - heroTop;
      const endX = window.innerWidth / 2 - Math.max(lineWidth, 1) / 2;
      const endY = dest.top - overlay.getBoundingClientRect().top;

      const e = easeInOut(progress);
      fly.style.width = slot.width + "px";
      fly.style.transform = `translate3d(${startX + (endX - startX) * e}px, ${
        startY + (endY - startY) * e + heroTop
      }px, 0)`;
      flyFirst.style.transform = `translate3d(${firstShift * e}px, 0, 0)`;
    }

    function frame() {
      const diff = target - current;
      const bioDiff = bioTarget - bioCurrent;
      if (Math.abs(diff) < 0.0004 && Math.abs(bioDiff) < 0.0004) {
        current = target;
        bioCurrent = bioTarget;
        running = false;
      } else {
        current += diff * 0.14;
        bioCurrent += bioDiff * 0.12;
      }
      paint(current, bioCurrent);
      if (running) requestAnimationFrame(frame);
    }

    function onScroll() {
      readTarget();
      if (!running) {
        running = true;
        requestAnimationFrame(frame);
      }
    }

    function refresh() {
      measure();
      readTarget();
      current = target;
      bioCurrent = bioTarget;
      paint(current, bioCurrent);
    }

    refresh();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    const ro = new ResizeObserver(refresh);
    ro.observe(ghost);
    ro.observe(document.documentElement);

    // Late layout shifts (centred flex content moves without resizing).
    const end = performance.now() + 3000;
    let watching = true;
    (function watch() {
      if (!watching) return;
      paint(current);
      if (performance.now() < end) requestAnimationFrame(watch);
    })();
    const poll = window.setInterval(() => paint(current), 250);

    return () => {
      watching = false;
      window.clearInterval(poll);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      ghost.classList.remove("is-ghost");
      fly.style.display = "none";
    };
  }, []);

  return (
    <div className="hero-pin-wrap" ref={wrapRef}>
      <section id="hero" className="hero-cover" ref={heroRef}>
        <div className="hero-cover-topbar">
          <a href="#hero" className="hero-cover-mark" data-magnetic>
            <Image
              src="/img/logo.png"
              alt=""
              aria-hidden="true"
              width={30}
              height={30}
              priority
            />
            <span>
              Gustavo
              <br />
              <em>Constante</em>
            </span>
          </a>
          <a href="#contact" className="hero-cover-contact" data-magnetic>
            Contato
          </a>
        </div>

        <div className="hero-cover-split" ref={splitRef}>
          <div className="hero-cover-text">
            <div className="hero-cover-row">
              <span className="hero-cover-index">01 / Portfólio</span>

              <div className="hero-cover-body">
                <h1 className="hero-cover-name" ref={ghostRef}>
                  <span className="hero-name-first">Gustavo</span>
                  <br />
                  <b>Constante</b>
                </h1>
                <p className="hero-cover-sub">
                  Full Stack Developer ·
                  <span className="hero-cover-typed-line">
                    <span className="typed-effect" ref={typedRef}></span>
                    <span className="typed-cursor" aria-hidden="true">
                      |
                    </span>
                  </span>
                </p>

                <div className="hero-cover-rail">
                  <span></span>
                </div>
                <div className="hero-cover-rail-lbl">
                  Role para ver o portfólio
                </div>
              </div>
            </div>
          </div>

          <figure className="hero-cover-photo">
            <Image
              src="/img/profile/profile-cutout.webp"
              alt="Foto de Gustavo Constante"
              fill
              sizes="50vw"
              priority
            />
            <p className="hero-float-note hero-float-note--left">
              Olá, sou Gustavo. Construo sistemas que resolvem problemas reais.
            </p>
            <p className="hero-float-note hero-float-note--right">
              Aberto a oportunidades e colaborações, em qualquer lugar.
            </p>
            <a
              className="hero-float-icon hero-float-icon--github"
              href="https://github.com/gstvdc"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-magnetic
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              className="hero-float-icon hero-float-icon--linkedin"
              href="https://www.linkedin.com/in/gstvdc"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-magnetic
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              className="hero-float-icon hero-float-icon--instagram"
              href="https://www.instagram.com/gstvdc"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              data-magnetic
            >
              <i className="bi bi-instagram"></i>
            </a>
            <span className="hero-cover-photo-tag">
              SC — Brasil
            </span>
          </figure>
        </div>
      </section>

      <div className="signature-overlay" ref={overlayRef}>
        <svg
          className="signature-scribbles"
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {SCRIBBLES.map((d, i) => (
            <path
              key={i}
              className={i < 3 ? "scribble" : "scribble scribble-accent"}
              d={d}
              ref={(el) => {
                scribbleRefs.current[i] = el;
              }}
            />
          ))}
        </svg>

        <div className="signature-content" aria-hidden="true">
          <span className="signature-kicker">GC</span>
          <div className="signature-name-spacer" ref={spacerRef}></div>
          <p className="signature-tagline">
            Código com propósito. Entrega com consistência.
          </p>
        </div>

        {/* Same screen, same background: it fades in once the name has settled. */}
        <BioPanel />
      </div>

      {/* The name that travels to the centre; a copy of the in-flow heading. */}
      <div
        className="hero-cover-name is-traveling"
        aria-hidden="true"
        ref={flyRef}
        style={{ display: "none" }}
      >
        <span className="hero-name-first" ref={flyFirstRef}>
          Gustavo
        </span>
        <br />
        <b>Constante</b>
      </div>
    </div>
  );
}
