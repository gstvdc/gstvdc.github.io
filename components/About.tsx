"use client";

import type { CSSProperties } from "react";
import CountUp from "@/components/ui/CountUp";
import { useI18n } from "@/lib/i18n";

const STAT_VALUES = [1, 6, 30, 4];

const LINES = [
  { from: "left", color: "#e2554d", delay: 0 },
  { from: "right", color: "#f5f4f1", delay: 260 },
  { from: "left", color: "#d4a72c", delay: 520 },
];

export default function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="about" className="about-stats">
      <div className="about-inner">
        <span className="about-pill" data-reveal>
          <i className="about-pill-dot"></i>
          {a.pill}
        </span>

        <h2 className="rv about-headline wipe" aria-label={a.lines.join(" ")}>
          {LINES.map((line, i) => (
            <span
              className={`wipe-line wipe-line--${line.from}`}
              style={
                {
                  "--wipe": line.color,
                  "--wipe-delay": `${line.delay}ms`,
                } as CSSProperties
              }
              key={i}
              aria-hidden="true"
            >
              <span className="wipe-text">{a.lines[i]}</span>
            </span>
          ))}
        </h2>

        <div className="about-stat-bar" data-reveal>
          {a.stats.map((stat, i) => (
            <div className="about-stat" key={i}>
              <span className="about-stat-label">{stat.label}</span>
              <span className="about-stat-value">
                <CountUp to={STAT_VALUES[i]} suffix={stat.suffix} />
              </span>
            </div>
          ))}
        </div>

        <div className="about-cta" data-reveal>
          <a href="#resume" className="btn-ghost" data-magnetic>
            {a.ctaExperience}
            <i className="bi bi-arrow-right-short"></i>
          </a>
          <a href="#contact" className="btn-ghost alt" data-magnetic>
            {a.ctaContact}
            <i className="bi bi-envelope"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
