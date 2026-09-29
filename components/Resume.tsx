import Timeline, { type TimelineItem } from "@/components/ui/timeline";
import SectionTitle from "@/components/ui/SectionTitle";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

// Career and education in order. Even positions sit above the line, odd ones below.
const ITEMS: TimelineItem[] = [
  {
    id: "pip-2023",
    period: "Jan – Mai 2023",
    content: "Designer Gráfico na Pip Publicidade: peças para mídia impressa e composição visual.",
  },
  {
    id: "unesc-2024",
    period: "2024 – 2028",
    content: "Bacharelado em Ciência da Computação na UNESC, em andamento.",
  },
  {
    id: "hsports-2024",
    period: "Mar – Ago 2024",
    content: "Designer Gráfico na HSports: materiais visuais e artes para produção.",
  },
  {
    id: "emasel-2024",
    period: "Nov 2024 – Jul 2025",
    content: "Auxiliar de Escritório na Emasel Contabilidade: rotinas administrativas e organização documental.",
  },
  {
    id: "simples-2025",
    period: "Jul – Out 2025",
    content: "SDR na Simples Dental: dados em CRM, automações e fluxos de mensagens.",
  },
  {
    id: "procer-2025",
    period: "Out 2025 – Ago 2026",
    content: "Estagiário Full Stack na PROCER: Angular, NestJS, APIs REST, JWT, Git e Scrum.",
  },
  {
    id: "cia-2026",
    period: "Ago 2026 – Atual",
    content: "Desenvolvedor Full Stack na CIA Engenharia Elétrica: SvelteKit, Laravel, MySQL e Nginx.",
  },
];

const DIFFERENTIALS = [
  {
    num: "01",
    title: "Experiência real em software",
    text: "Atuação atual em ambiente corporativo com SvelteKit, Laravel, MySQL e Nginx, evoluindo sistemas que as pessoas usam de verdade.",
  },
  {
    num: "02",
    title: "Amplitude técnica",
    text: "Além do stack principal, prática com Angular, NestJS, React, Next.js, Node.js, Java, Python, C++ e bancos relacionais e não relacionais.",
  },
  {
    num: "03",
    title: "Comunicação e produto",
    text: "Base em UI/UX, design e experiência comercial, que ajuda na leitura de contexto e na construção de interfaces mais claras.",
  },
];

const GROUPS = [
  {
    title: "Stack principal",
    hot: true,
    tags: ["SvelteKit", "Laravel", "TypeScript", "MySQL", "Nginx", "Git", "PHP"],
  },
  {
    title: "Outras tecnologias",
    hot: false,
    tags: [
      "Angular",
      "NestJS",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "APIs REST",
      "Docker",
      "MongoDB",
      "PostgreSQL",
      "Java",
      "Python",
      "C++",
    ],
  },
  {
    title: "Métodos, design e idiomas",
    hot: false,
    tags: [
      "UI/UX",
      "Figma",
      "Scrum",
      "Postman",
      "LangChain",
      "LangGraph",
      "Inglês intermediário",
      "Espanhol básico",
    ],
  },
];

// First card of the timeline: the portrait with a short caption on top of it.
function PortraitCard() {
  return (
    <div className="tl-portrait">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/profile/profile-6.jpg" alt="Gustavo Constante" draggable={false} />
      <div className="tl-portrait-caption">
        <span className="tl-portrait-eyebrow">// GUSTAVO CONSTANTE</span>
        <strong>Full Stack Developer</strong>
      </div>
    </div>
  );
}

export default function Resume() {
  return (
    <>
      <Timeline
        items={ITEMS}
        title="Trajetória"
        periodLabel="2023 — 2026"
        lead={<PortraitCard />}
        cvHref="/docs/gustavo-constante.pdf"
        cvLabel="Baixar currículo"
      />

      <section id="resume-extra" className="resume section dif-section">
        <SectionTitle
          eyebrow="// APRENDIZADO EM FOCO"
          title="Diferenciais"
          text="O que sustenta a entrega: experiência real, amplitude técnica e comunicação."
        />

        <div className="container dif-wrap" data-reveal>
          <div className="dif-stage">
            <Spotlight size={340} />

            <div className="dif-left">
              <span className="dif-tag">// O QUE ME DIFERENCIA</span>
              <ol className="dif-list">
                {DIFFERENTIALS.map((d) => (
                  <li className="dif-item" key={d.title}>
                    <span className="dif-item-num">{d.num}</span>
                    <div>
                      <h3>{d.title}</h3>
                      <p>{d.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="dif-robot" aria-hidden="true">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="dif-robot-scene"
              />
            </div>
          </div>

          <div className="dif-marquees">
            {GROUPS.map((group, i) => {
              const half = group.tags.length < 8 ? [...group.tags, ...group.tags] : group.tags;
              const track = [...half, ...half];
              return (
                <div className="dif-mrow" key={group.title}>
                  <span className="dif-mrow-title">{group.title}</span>
                  <div className={"dif-mrow-view " + (i % 2 ? "to-right" : "to-left")}>
                    <ul className="dif-mrow-track" aria-label={group.title}>
                      {track.map((t, k) => (
                        <li
                          className={"dif-mrow-chip" + (group.hot ? " is-hot" : "")}
                          key={`${t}-${k}`}
                          aria-hidden={k >= half.length ? true : undefined}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
