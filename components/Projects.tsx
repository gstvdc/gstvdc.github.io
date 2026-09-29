"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import CountUp from "@/components/ui/CountUp";
import Split from "@/components/ui/Split";
import {
  PROJECTS,
  baseProject,
  withMetadata,
  type Project,
} from "@/lib/projects";
import { clamp01 } from "@/lib/motion";

const IMPACT_LINES = [
  "M -60 110 L 1660 30",
  "M -60 330 C 420 250 940 430 1660 290",
  "M -60 590 L 1660 470",
  "M 260 -30 L 420 730",
  "M 1280 -30 L 1110 730",
  "M 560 730 C 820 420 1080 320 1660 -20",
];


/* ------------------------------------------------------------------ */
/* Stage 1 + 2: dim gallery with title, brightening as you scroll      */
/* ------------------------------------------------------------------ */
function Gallery({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    moved: 0,
    startX: 0,
    lastX: 0,
    dx: 0,
    vx: 0,
  });

  useEffect(() => {
    const el = ref.current;
    const rows = rowsRef.current;
    if (!el || !rows) return;
    let ticking = false;
    let raf = 0;

    const update = () => {
      ticking = false;
      const total = el.offsetHeight - window.innerHeight;
      const p = clamp01(total > 0 ? -el.getBoundingClientRect().top / total : 0);
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--b", clamp01(p / 0.5).toFixed(4));
      el.style.setProperty("--t", (1 - clamp01(p / 0.32)).toFixed(4));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Horizontal drag (mouse + touch) with a little momentum on release.
    const d = drag.current;
    const tileWidth = () => {
      const a = rows.querySelector<HTMLElement>(".pj-tile");
      const b = a?.nextElementSibling as HTMLElement | null;
      return a && b ? b.offsetLeft - a.offsetLeft : 500;
    };
    const apply = () => {
      const t = tileWidth();
      d.dx = Math.max(-6 * t, Math.min(t, d.dx));
      el.style.setProperty("--dx", `${d.dx.toFixed(1)}px`);
    };
    const glide = () => {
      if (d.active) return;
      d.vx *= 0.94;
      d.dx += d.vx;
      apply();
      if (Math.abs(d.vx) > 0.3) raf = requestAnimationFrame(glide);
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      cancelAnimationFrame(raf);
      d.active = true;
      d.moved = 0;
      d.startX = d.lastX = event.clientX;
      d.vx = 0;
    };
    const onMove = (event: PointerEvent) => {
      if (!d.active) return;
      const delta = event.clientX - d.lastX;
      d.lastX = event.clientX;
      d.moved = Math.max(d.moved, Math.abs(event.clientX - d.startX));
      if (d.moved > 6) rows.classList.add("is-dragging");
      d.dx += delta;
      d.vx = delta;
      apply();
    };
    const onUp = () => {
      if (!d.active) return;
      d.active = false;
      rows.classList.remove("is-dragging");
      raf = requestAnimationFrame(glide);
    };
    // A drag must not count as a click on the tile under the cursor.
    const onClick = (event: MouseEvent) => {
      if (d.moved > 6) {
        event.preventDefault();
        event.stopPropagation();
        d.moved = 0;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    rows.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    rows.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      rows.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      rows.removeEventListener("click", onClick, true);
    };
  }, []);

  // Repeat the projects until each row has enough tiles for scroll + drag.
  const fill = (list: Project[]) =>
    list.length
      ? Array.from({ length: 14 }, (_, i) => list[i % list.length])
      : [];
  const shots = projects.filter((p) => p.previewImage);
  // Each project lives in exactly one row (first half on top, second half
  // below), so scrolling through both rows shows every project.
  const half = Math.ceil(shots.length / 2);
  const top = shots.slice(0, half);
  const bottom = shots.length > 1 ? shots.slice(half) : shots;
  const rowA = fill(top);
  const rowB = fill(bottom);

  const tile = (p: Project, i: number) => (
    <a
      key={i}
      className="pj-tile"
      href={p.liveUrl || p.htmlUrl || undefined}
      target="_blank"
      rel="noreferrer"
      draggable={false}
      aria-label={`Abrir ${p.title}`}
      tabIndex={i < shots.length ? 0 : -1}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.previewImage} alt={i < shots.length ? p.title : ""} draggable={false} loading="lazy" />
    </a>
  );

  return (
    <div
      className="pj-gallery"
      ref={ref}
    >
      <div className="pj-gallery-sticky">
        <div className="pj-rows" ref={rowsRef}>
          <div className="pj-row pj-row--a">{rowA.map(tile)}</div>
          <div className="pj-row pj-row--b">{rowB.map(tile)}</div>
        </div>

        <div className="pj-gallery-copy">
          <span className="pj-eyebrow">// TRABALHO SELECIONADO</span>
          <h2>Projetos em destaque</h2>
          <p>
            Uma curadoria de sistemas, sites e algoritmos. Do{" "}
            <strong>full stack</strong> ao front-end, com foco em problemas
            reais e código que entrega.
          </p>
        </div>

        <div className="pj-scroll-hint" aria-hidden="true">
          <span></span>
          Scroll
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 3: impact numbers                                              */
/* ------------------------------------------------------------------ */
function Impact({ projects }: { projects: Project[] }) {
  const stats = useMemo(() => {
    const techs = new Set(projects.flatMap((p) => p.stack));
    return [
      { label: "Projetos em destaque", to: projects.length },
      { label: "Projetos no ar", to: projects.filter((p) => p.liveUrl).length },
      {
        label: "Repositórios públicos",
        to: projects.filter((p) => !p.private && p.htmlUrl).length,
      },
      { label: "Tecnologias usadas", to: techs.size },
    ];
  }, [projects]);

  return (
    <div className="pj-impact">
      <svg
        className="pj-lines"
        viewBox="0 0 1600 700"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-reveal
      >
        {IMPACT_LINES.map((d, i) => (
          <g key={i} style={{ "--i": i } as CSSProperties}>
            <path className="pj-line-base" d={d} pathLength={1} />
            <path className="pj-line-spark" d={d} pathLength={1} />
          </g>
        ))}
      </svg>
      <span className="pj-pill" data-reveal>
        <i className="bi bi-stars"></i>
        Impacto dos projetos
      </span>
      <Split as="h2" text="Construindo o que entrega resultado" />
      <p data-reveal>
        Ideias transformadas em soluções prontas para produção, com regras de
        negócio, integração e experiência de uso bem resolvidas.
      </p>
      <div className="pj-impact-stats">
        {stats.map((stat, i) => (
          <div
            className="pj-impact-stat"
            key={stat.label}
            data-reveal
            style={{ transitionDelay: `${i * 110}ms` }}
          >
            <strong>
              <CountUp to={stat.to} suffix="+" duration={1600 + i * 250} />
            </strong>
            <span className="pj-impact-bar" aria-hidden="true"></span>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 4: archive list with filters and a cursor-following preview    */
/* ------------------------------------------------------------------ */
function Archive({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, fx: 0, fy: 0, on: false });

  const groups = useMemo(
    () => [
      "Todos",
      ...Array.from(new Set(projects.map((p) => p.category.split(" / ")[0]))),
    ],
    [projects]
  );

  const visible = projects.filter((p) => {
    const inGroup = filter === "Todos" || p.category.startsWith(filter);
    const q = query.trim().toLowerCase();
    const inQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.stack.some((tag) => tag.toLowerCase().includes(q));
    return inGroup && inQuery;
  });

  // Preview image trails the cursor with a little inertia.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const el = floatRef.current;
    if (!el) return;
    let raf = 0;
    const loop = () => {
      const s = pointer.current;
      s.fx += (s.x - s.fx) * 0.14;
      s.fy += (s.y - s.fy) * 0.14;
      el.style.transform = `translate3d(${s.fx + 28}px, ${s.fy - 130}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pj-archive">
      <div className="pj-archive-head" data-reveal>
        <div className="pj-archive-title">
          <i className="pj-dot"></i>
          <span>Arquivo de projetos</span>
          <em>{projects.length}</em>
        </div>
        <label className="pj-search">
          <i className="bi bi-search"></i>
          <input
            type="search"
            placeholder="Buscar projetos ou tecnologias..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="pj-filters" data-reveal role="tablist">
        {groups.map((group) => (
          <button
            key={group}
            type="button"
            role="tab"
            aria-selected={filter === group}
            className={filter === group ? "is-active" : ""}
            onClick={() => setFilter(group)}
          >
            {group}
          </button>
        ))}
      </div>

      <div
        className="pj-list"
        onMouseMove={(event) => {
          const s = pointer.current;
          s.x = event.clientX;
          s.y = event.clientY;
          if (!s.on) {
            s.fx = s.x;
            s.fy = s.y;
            s.on = true;
          }
        }}
        onMouseLeave={() => {
          pointer.current.on = false;
          setHovered(null);
        }}
      >
        {visible.map((project, index) => {
          const href = project.liveUrl || project.htmlUrl || undefined;
          const badge = project.private
            ? project.badge || "Privado"
            : project.liveUrl
            ? "No ar"
            : "Repositório";
          const tags = [...project.stack, ...project.stack, ...project.stack];
          return (
            <a
              key={project.title}
              className={
                "pj-row-item" + (hovered === project.title ? " is-hover" : "")
              }
              style={{ "--accent": project.accent } as CSSProperties}
              href={href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHovered(project.title)}
            >
              <div className="pj-row-main">
                <span className="pj-row-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pj-row-body">
                  <h3>
                    {project.title}
                    <small>{badge}</small>
                  </h3>
                  <p>{project.summary}</p>
                </div>
                <span className="pj-row-year">{project.year}</span>
                <span className="pj-row-view">
                  ver <i className="bi bi-arrow-right"></i>
                </span>
              </div>
              <div className="pj-row-tags" aria-hidden="true">
                <div className="pj-row-track">
                  {tags.map((tag, i) => (
                    <span key={i}>
                      {tag}
                      <i>•</i>
                    </span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
        {visible.length === 0 && (
          <p className="pj-empty">Nenhum projeto encontrado.</p>
        )}
      </div>

      <div
        className={
          "pj-float" +
          (projects.some((p) => p.title === hovered && p.previewImage)
            ? " is-visible"
            : "")
        }
        ref={floatRef}
        aria-hidden="true"
      >
        {projects
          .filter((project) => project.previewImage)
          .map((project) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={project.title}
              src={project.previewImage}
              alt=""
              className={hovered === project.title ? "is-on" : ""}
            />
          ))}
      </div>

      <a
        className="pj-all-link"
        href="https://github.com/gstvdc?tab=repositories"
        target="_blank"
        rel="noreferrer"
        data-magnetic
      >
        Ver todos os repositórios <i className="bi bi-arrow-up-right"></i>
      </a>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(() =>
    PROJECTS.map(baseProject)
  );

  useEffect(() => {
    let cancelled = false;
    Promise.all(PROJECTS.map(withMetadata)).then((list) => {
      if (!cancelled) setProjects(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="projects-sheet">
      <Gallery projects={projects} />
      <Impact projects={projects} />
      <Archive projects={projects} />
    </section>
  );
}
