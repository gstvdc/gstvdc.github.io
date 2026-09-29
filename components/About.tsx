import type { CSSProperties } from "react";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  { label: "Experiência profissional", to: 1, suffix: "+ ano" },
  { label: "Projetos em destaque", to: 6, suffix: "" },
  { label: "Tecnologias e ferramentas", to: 30, suffix: "+" },
  { label: "Camadas do stack", to: 4, suffix: "" },
];

const LINES = [
  { text: "Aplicações reais.", from: "left", color: "#e2554d", delay: 0 },
  {
    text: "Do front-end ao banco de dados.",
    from: "right",
    color: "#f5f4f1",
    delay: 260,
  },
  {
    text: "Entrega com consistência.",
    from: "left",
    color: "#d4a72c",
    delay: 520,
  },
];

export default function About() {
  return (
    <section id="about" className="about-stats">
      <div className="about-inner">
        <span className="about-pill" data-reveal>
          <i className="about-pill-dot"></i>
          Foco em resultados
        </span>

        <h2
          className="rv about-headline wipe"
          aria-label="Aplicações reais. Do front-end ao banco de dados. Entrega com consistência."
        >
          {LINES.map((line) => (
            <span
              className={`wipe-line wipe-line--${line.from}`}
              style={
                {
                  "--wipe": line.color,
                  "--wipe-delay": `${line.delay}ms`,
                } as CSSProperties
              }
              key={line.text}
              aria-hidden="true"
            >
              <span className="wipe-text">{line.text}</span>
            </span>
          ))}
        </h2>

        <div className="about-stat-bar" data-reveal>
          {STATS.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <span className="about-stat-label">{stat.label}</span>
              <span className="about-stat-value">
                <CountUp to={stat.to} suffix={stat.suffix} />
              </span>
            </div>
          ))}
        </div>

        <div className="about-cta" data-reveal>
          <a href="#resume" className="btn-ghost" data-magnetic>
            Ver experiência
            <i className="bi bi-arrow-right-short"></i>
          </a>
          <a href="#contact" className="btn-ghost alt" data-magnetic>
            Entrar em contato
            <i className="bi bi-envelope"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
