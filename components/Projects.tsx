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
  sortByLastCommit,
  withMeta,
  type Project,
  type RepoMeta,
} from "@/lib/projects";
import { clamp01 } from "@/lib/motion";
import { useI18n } from "@/lib/i18n";
import { rich } from "@/lib/i18n/rich";

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
  const { t } = useI18n();
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
      aria-label={`${t.projects.open} ${p.title}`}
      tabIndex={i < shots.length ? 0 : -1}
    >
      <img src={p.previewImage} alt={i < shots.length ? p.title : ""} draggable={false} loading="lazy" decoding="async" />
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
          <span className="pj-eyebrow">{t.projects.eyebrow}</span>
          <h2>{t.projects.title}</h2>
          <p>{rich(t.projects.intro)}</p>
        </div>

        <div className="pj-scroll-hint" aria-hidden="true">
          <span></span>
          {t.projects.scroll}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 3: impact numbers                                              */
/* ------------------------------------------------------------------ */
function Impact({ projects }: { projects: Project[] }) {
  const { t } = useI18n();
  const stats = useMemo(() => {
    const techs = new Set(projects.flatMap((p) => p.stack));
    return [
      { label: t.projects.impactStats.featured, to: projects.length },
      { label: t.projects.impactStats.live, to: projects.filter((p) => p.liveUrl).length },
      {
        label: t.projects.impactStats.repos,
        to: projects.filter((p) => !p.private && p.htmlUrl).length,
      },
      { label: t.projects.impactStats.techs, to: techs.size },
    ];
  }, [projects, t]);

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
        {t.projects.impactPill}
      </span>
      <Split as="h2" text={t.projects.impactTitle} />
      <p data-reveal>{t.projects.impactText}</p>
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
  const { t } = useI18n();
  const [filter, setFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, fx: 0, fy: 0, on: false });

  const items = t.projects.items;
  const tagLabel = (tag: string) => t.projects.tags[tag] ?? tag;
  const groupOf = (p: Project) => items[p.id].category.split(" / ")[0];

  const groups = useMemo(
    () => Array.from(new Set(projects.map((p) => items[p.id].category.split(" / ")[0]))),
    [projects, items]
  );
  // A group from another language no longer exists after switching: fall back to "all".
  const activeGroup = filter && groups.includes(filter) ? filter : null;

  const visible = projects.filter((p) => {
    const inGroup = !activeGroup || groupOf(p) === activeGroup;
    const q = query.trim().toLowerCase();
    const inQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.stack.some((tag) => tagLabel(tag).toLowerCase().includes(q));
    return inGroup && inQuery;
  });

  // The preview image trails the cursor with a little inertia. It is placed straight from
  // the mouse events (so it can never sit at the screen corner) and only animates while
  // the pointer is over the list.
  const raf = useRef(0);
  const placeFloat = () => {
    const s = pointer.current;
    const el = floatRef.current;
    if (el) el.style.transform = `translate3d(${s.fx + 28}px, ${s.fy - 130}px, 0)`;
  };
  const stopFloat = () => {
    cancelAnimationFrame(raf.current);
    raf.current = 0;
  };
  const startFloat = () => {
    if (raf.current) return;
    const loop = () => {
      const s = pointer.current;
      s.fx += (s.x - s.fx) * 0.14;
      s.fy += (s.y - s.fy) * 0.14;
      placeFloat();
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
  };
  const trackPointer = (event: { clientX: number; clientY: number }) => {
    const s = pointer.current;
    s.x = event.clientX;
    s.y = event.clientY;
    if (!s.on) {
      s.fx = s.x;
      s.fy = s.y;
      s.on = true;
      placeFloat();
      startFloat();
    }
  };
  useEffect(() => stopFloat, []);

  return (
    <div className="pj-archive">
      <div className="pj-archive-head" data-reveal>
        <div className="pj-archive-title">
          <i className="pj-dot"></i>
          <span>{t.projects.archive}</span>
          <em>{projects.length}</em>
        </div>
        <label className="pj-search">
          <i className="bi bi-search"></i>
          <input
            type="search"
            placeholder={t.projects.search}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="pj-filters" data-reveal role="tablist">
        {[null, ...groups].map((group) => (
          <button
            key={group ?? "all"}
            type="button"
            role="tab"
            aria-selected={activeGroup === group}
            className={activeGroup === group ? "is-active" : ""}
            onClick={() => setFilter(group)}
          >
            {group ?? t.projects.all}
          </button>
        ))}
      </div>

      <div
        className="pj-list"
        onMouseMove={trackPointer}
        onMouseLeave={() => {
          pointer.current.on = false;
          stopFloat();
          setHovered(null);
        }}
      >
        {visible.map((project, index) => {
          const href = project.liveUrl || project.htmlUrl || undefined;
          const item = items[project.id];
          const badge = project.private
            ? item.badge || t.projects.badgePrivate
            : project.liveUrl
            ? t.projects.badgeLive
            : t.projects.badgeRepo;
          const tags = [...project.stack, ...project.stack, ...project.stack].map(tagLabel);
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
              onMouseEnter={(event) => {
                trackPointer(event);
                setHovered(project.title);
              }}
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
                  <p>{item.summary}</p>
                </div>
                <span className="pj-row-year">{project.year}</span>
                <span className="pj-row-view">
                  {t.projects.view} <i className="bi bi-arrow-right"></i>
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
          <p className="pj-empty">{t.projects.empty}</p>
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
            <img
              key={project.title}
              src={project.previewImage}
              alt=""
              loading="lazy"
              decoding="async"
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
        {t.projects.allRepos} <i className="bi bi-arrow-up-right"></i>
      </a>
    </div>
  );
}

export default function Projects({ meta }: { meta: Record<string, RepoMeta> }) {
  // GitHub data comes from the build (lib/github.ts); the list is newest commit first.
  const projects = useMemo(
    () => sortByLastCommit(PROJECTS.map((config) => withMeta(config, meta[config.id]))),
    [meta]
  );

  return (
    <section id="projects" className="projects-sheet">
      <Gallery projects={projects} />
      <Impact projects={projects} />
      <Archive projects={projects} />
    </section>
  );
}
