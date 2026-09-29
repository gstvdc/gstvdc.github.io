"use client";

import type { CSSProperties } from "react";
import { useI18n } from "@/lib/i18n";
import { rich } from "@/lib/i18n/rich";

// Each headline word lights up in order during the reveal; `s` is the point (0 to 1)
// of the reveal where the word turns on.
const START = 0.04;
const STEP = 0.042;

const words = (line: string, offset: number, tone: "bright" | "dim") =>
  line.split(/\s+/).map((text, i) => (
    <span
      key={`${tone}-${i}`}
      className={`bio-w bio-w--${tone}`}
      style={{ "--s": (START + (offset + i) * STEP).toFixed(3) } as CSSProperties}
    >
      {text}{" "}
    </span>
  ));

const fade = (s: number): CSSProperties => ({ "--s": s } as CSSProperties);

/**
 * "Sobre mim" panel. It lives inside the hero's signature screen and is driven by the CSS
 * variables `--bp` (panel in/out) and `--p` (word-by-word reveal), set by the hero on scroll.
 */
export default function BioPanel() {
  const { t } = useI18n();
  const b = t.bio;
  const first = b.line1.split(/\s+/).length;

  return (
    <div className="bio-panel" aria-label={b.aria}>
      <div className="bio-frame">
        <span className="bio-corner bio-corner--tl" aria-hidden="true"></span>
        <span className="bio-corner bio-corner--tr" aria-hidden="true"></span>
        <span className="bio-corner bio-corner--bl" aria-hidden="true"></span>
        <span className="bio-corner bio-corner--br" aria-hidden="true"></span>

        <div className="bio-head">
          <span className="bio-label">{b.label}</span>
          <span className="bio-tag">{b.tag}</span>
        </div>

        <h2 className="bio-headline" aria-label={`${b.line1} ${b.line2}`}>
          <span className="bio-quote" aria-hidden="true">
            &ldquo;
          </span>
          <span aria-hidden="true">
            {words(b.line1, 0, "bright")}
            <br />
            {words(b.line2, first, "dim")}
          </span>
          <span className="bio-quote bio-quote--end" aria-hidden="true">
            &rdquo;
          </span>
        </h2>

        <div className="bio-rule" aria-hidden="true"></div>

        <div className="bio-grid">
          <p className="bio-lead bio-fade" style={fade(0.52)}>
            {rich(b.lead)}
          </p>

          <div className="bio-col bio-fade" style={fade(0.62)}>
            <h3>{b.pathTitle}</h3>
            <p>{b.pathText}</p>
            <p className="bio-accent">{b.pathAccent}</p>
          </div>

          <div className="bio-col bio-fade" style={fade(0.72)}>
            <h3>{b.focusTitle}</h3>
            <p>{b.focusText}</p>
            <span className="bio-sign">Gustavo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
