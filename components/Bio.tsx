import type { CSSProperties } from "react";

// Words of the headline. `tone` picks the colour, `s` is the point (0 to 1) of the reveal
// where the word lights up, in order.
const HEADLINE: { text: string; tone: "bright" | "dim" | "serif"; s: number }[] = [
  { text: "Código", tone: "bright", s: 0.04 },
  { text: "com", tone: "bright", s: 0.08 },
  { text: "propósito.", tone: "bright", s: 0.12 },
  { text: "Entrega", tone: "dim", s: 0.17 },
  { text: "com", tone: "dim", s: 0.21 },
  { text: "consistência.", tone: "dim", s: 0.25 },
];

const word = (w: (typeof HEADLINE)[number], i: number) => (
  <span key={i} className={`bio-w bio-w--${w.tone}`} style={{ "--s": w.s } as CSSProperties}>
    {w.text}{" "}
  </span>
);

const fade = (s: number): CSSProperties => ({ "--s": s } as CSSProperties);

/**
 * "Sobre mim" panel. It lives inside the hero's signature screen and is driven by the CSS
 * variables `--bp` (panel in/out) and `--p` (word-by-word reveal), set by the hero on scroll.
 */
export default function BioPanel() {
  return (
    <div className="bio-panel" aria-label="Sobre mim">
      <div className="bio-frame">
        <span className="bio-corner bio-corner--tl" aria-hidden="true"></span>
        <span className="bio-corner bio-corner--tr" aria-hidden="true"></span>
        <span className="bio-corner bio-corner--bl" aria-hidden="true"></span>
        <span className="bio-corner bio-corner--br" aria-hidden="true"></span>

        <div className="bio-head">
          <span className="bio-label">SOBRE MIM</span>
          <span className="bio-tag">FULL STACK DEVELOPER · SOMBRIO, SC</span>
        </div>

        <h2
          className="bio-headline"
          aria-label="Código com propósito. Entrega com consistência."
        >
          <span className="bio-quote" aria-hidden="true">
            &ldquo;
          </span>
          <span aria-hidden="true">
            {HEADLINE.slice(0, 3).map((w, i) => word(w, i))}
            <br />
            {HEADLINE.slice(3).map((w, i) => word(w, i + 3))}
          </span>
          <span className="bio-quote bio-quote--end" aria-hidden="true">
            &rdquo;
          </span>
        </h2>

        <div className="bio-rule" aria-hidden="true"></div>

        <div className="bio-grid">
          <p className="bio-lead bio-fade" style={fade(0.52)}>
            Sou <strong>Gustavo Constante</strong>, estudante de Ciência da Computação na UNESC e
            desenvolvedor full stack. Construo aplicações que resolvem problemas reais,{" "}
            <em>do banco de dados à interface</em>.
          </p>

          <div className="bio-col bio-fade" style={fade(0.62)}>
            <h3>TRAJETÓRIA</h3>
            <p>
              Comecei no design gráfico, passei por vendas e rotinas administrativas e hoje
              desenvolvo sistemas corporativos com SvelteKit e Laravel na CIA Engenharia Elétrica.
            </p>
            <p className="bio-accent">Do design ao código, pensando sempre no usuário.</p>
          </div>

          <div className="bio-col bio-fade" style={fade(0.72)}>
            <h3>FOCO ATUAL</h3>
            <p>
              Aprendo e entrego com Angular, NestJS, React e Next.js, cuido de APIs, banco de dados
              e deploy, e mantenho projetos próprios com IA, algoritmos e hardware.
            </p>
            <span className="bio-sign">Gustavo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
