(function () {
  "use strict";

  const PROJECTS_CONFIG = [
    {
      title: "Tales Llantada",
      summary:
        "Website institucional para clínica odontológica com Next.js 15, foco em SEO, animações e agendamento via WhatsApp.",
      problem:
        "Apresenta os serviços e especialidades do Dr. Tales Llantada com foco em conversão e agendamento direto.",
      role:
        "Desenvolvimento completo com Next.js 15, TypeScript e Tailwind CSS v4, com SEO, sitemap e animações com Framer Motion.",
      stack: ["Next.js 15", "TypeScript", "Tailwind CSS"],
      accent: "#1d6f8c",
      year: "2026",
      liveUrl: "https://drtalesllantada.com",
      previewImage: "assets/img/drtalesllantada.png",
      imagePosition: "58% center",
      private: true,
      badge: "Freelance",
    },
    {
      owner: "gstvdc",
      repo: "OrganizaAI",
      title: "OrganizaAI",
      summary:
        "Aplicação web de educação financeira com IA generativa para análise e planejamento financeiro pessoal.",
      problem:
        "Transforma dados financeiros do usuário em insights e orientações geradas por IA.",
      role:
        "Desenvolvimento completo com React e TypeScript, integração com IA generativa e deploy no Vercel.",
      stack: ["React", "TypeScript", "IA Generativa"],
      accent: "#8B5CF6",
      year: "2026",
      liveUrl: "https://organiz-ai.vercel.app",
      previewImage: "assets/img/OrganizAI.png",
      imagePosition: "center center",
    },
    {
      owner: "gstvdc",
      repo: "Gerador-de-certificados",
      title: "Gerador de Certificados",
      summary:
        "Aplicação web para geração automática de certificados acadêmicos personalizados com Angular.",
      problem:
        "Facilita a emissão de certificados sem depender de montagem manual documento por documento.",
      role:
        "Implementação com Angular e TypeScript, automação da geração de documentos e experiência de uso no navegador.",
      stack: ["Angular", "TypeScript", "Bootstrap"],
      accent: "#4dabf7",
      year: "2025",
      previewImage: "assets/img/projects/gerador-de-certificados.svg",
      imagePosition: "center top",
      isArtwork: true,
    },
    {
      owner: "gstvdc",
      repo: "8-Graus-de-Network",
      title: "8 Graus de Network",
      summary:
        "Aplicação que encontra o menor caminho entre dois atores usando BFS em um grafo de coatuações.",
      problem:
        "Resolve o problema de seis graus de separação sobre dados reais de colaboração entre atores.",
      role:
        "Implementação do algoritmo BFS, modelagem do grafo e interface de consulta de conexões.",
      stack: ["JavaScript", "BFS", "Grafos"],
      accent: "#06B6D4",
      year: "2026",
      previewImage: "assets/img/projects/8-graus-de-network.svg",
      imagePosition: "center top",
      isArtwork: true,
    },
    {
      owner: "gstvdc",
      repo: "Gerenciamento-de-Universidade",
      title: "Gerenciamento de Universidade",
      summary:
        "Sistema desktop para administração acadêmica com entidades, relacionamentos e operações de cadastro.",
      problem:
        "Organiza cursos, fases, disciplinas e professores em uma aplicação orientada a regras acadêmicas.",
      role:
        "Modelagem da aplicação em Java com interface Swing, persistência e padrão DAO.",
      stack: ["Java", "Swing", "PostgreSQL", "DAO"],
      accent: "#ffd166",
      year: "2024",
      previewImage: "assets/img/projects/gerenciamento-de-universidade.svg",
      imagePosition: "center top",
      isArtwork: true,
    },
    {
      owner: "gstvdc",
      repo: "central-de-compras-API",
      title: "Central de Compras",
      summary:
        "Plataforma full stack para gerenciamento de compras institucionais.",
      problem:
        "Organiza compras institucionais com autenticação, cashback e condições específicas por estado.",
      role:
        "Desenvolvimento completo de frontend e backend, com regras de negócio e persistência de dados.",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      accent: "#7bd389",
      year: "2025",
      previewImage: "assets/img/projects/central-de-compras-api.svg",
      imagePosition: "center top",
      isArtwork: true,
    },
  ];

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function parseRepoFromUrl(url) {
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname !== "github.com") return null;

      const parts = parsedUrl.pathname
        .split("/")
        .filter(Boolean)
        .slice(0, 2);

      if (parts.length < 2) return null;

      return {
        owner: parts[0],
        repo: parts[1],
      };
    } catch (error) {
      return null;
    }
  }

  function getProjectRepository(project) {
    if (project.owner && project.repo) {
      return {
        owner: project.owner,
        repo: project.repo,
      };
    }

    return parseRepoFromUrl(project.htmlUrl);
  }

  function formatUpdatedAt(dateString) {
    if (!dateString) return "Atualização indisponível";

    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function buildProjectCard(project) {
    const tags = project.stack
      .slice(0, 4)
      .map((tag) => `<span class="project-tag">${escapeHtml(tag)}</span>`)
      .join("");

    const isPrivate = project.private || !project.htmlUrl;
    const mediaHref = isPrivate ? project.liveUrl || "#" : project.htmlUrl;

    const githubIcon = project.liveUrl && !isPrivate
      ? `<a
          class="project-repository-link"
          href="${escapeHtml(project.htmlUrl)}"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir repositório de ${escapeHtml(project.title)} no GitHub"
          title="Ver no GitHub"
        >
          <i class="bi bi-github"></i>
        </a>`
      : "";

    const badgeHtml = project.badge
      ? `<span class="project-type-badge">${escapeHtml(project.badge)}</span>`
      : "";

    return `
      <article class="project-card" style="--project-accent: ${escapeHtml(
        project.accent
      )}; --project-image-position: ${escapeHtml(project.imagePosition || "center")}; --project-image-fit: ${escapeHtml(project.imageFit || "cover")}">
        <img
          class="project-media${project.isArtwork ? " project-media-artwork" : ""}"
          src="${escapeHtml(project.previewImage)}"
          alt="Preview do projeto ${escapeHtml(project.title)}"
          loading="lazy"
        />
        <div class="project-card-overlay"></div>
        <div class="project-card-body">
          <div class="project-meta">
            <strong>${escapeHtml(project.year)}</strong>
            ${badgeHtml}
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <div class="project-card-details">
            <p class="project-summary">${escapeHtml(project.summary)}</p>
            <div class="project-tags">${tags}</div>
          </div>
        </div>
        ${githubIcon}
        <a
          class="project-expand-link"
          href="${escapeHtml(mediaHref)}"
          target="_blank"
          rel="noreferrer"
          aria-label="${isPrivate ? "Abrir demo" : "Abrir repositório"} ${escapeHtml(project.title)}"
        ></a>
      </article>
    `;
  }

  function renderProjects(projects) {
    const grid = document.getElementById("github-projects-grid");
    if (!grid) return;

    if (!projects.length) {
      grid.innerHTML = `
        <div class="project-empty">
          Nenhum projeto destacado foi encontrado no momento.
        </div>
      `;
      return;
    }

    grid.innerHTML = projects.map(buildProjectCard).join("");

    if (window.AOS && typeof window.AOS.refresh === "function") {
      window.AOS.refresh();
    }
  }

  function buildBaseProject(project) {
    if (project.private) {
      return {
        ...project,
        htmlUrl: "",
        updatedAt: "",
        liveUrl: project.liveUrl || "",
      };
    }

    const repository = getProjectRepository(project);

    if (!repository) {
      return {
        ...project,
        htmlUrl: project.htmlUrl || "#",
        updatedAt: "",
        liveUrl: project.liveUrl || "",
      };
    }

    return {
      ...project,
      owner: repository.owner,
      repo: repository.repo,
      htmlUrl: project.htmlUrl || `https://github.com/${repository.owner}/${repository.repo}`,
      updatedAt: "",
      liveUrl: project.liveUrl || "",
    };
  }

  async function fetchRepositoryMetadata(project) {
    const baseProject = buildBaseProject(project);

    if (project.private || !baseProject.owner || !baseProject.repo) {
      return baseProject;
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${baseProject.owner}/${baseProject.repo}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub request failed with ${response.status}`);
      }

      const repository = await response.json();

      const rawHomepage = repository.homepage || "";
      const resolvedLiveUrl = rawHomepage
        ? rawHomepage.startsWith("http") ? rawHomepage : `https://${rawHomepage}`
        : baseProject.liveUrl;

      return {
        ...baseProject,
        htmlUrl: repository.html_url || baseProject.htmlUrl,
        liveUrl: resolvedLiveUrl,
        updatedAt: repository.pushed_at || repository.updated_at || "",
      };
    } catch (error) {
      return baseProject;
    }
  }

  async function loadGithubProjects() {
    const baseProjects = PROJECTS_CONFIG.map(buildBaseProject);
    renderProjects(baseProjects);

    try {
      const projects = await Promise.all(
        PROJECTS_CONFIG.map((project) => fetchRepositoryMetadata(project))
      );
      renderProjects(projects);
    } catch (error) {
      // baseProjects already rendered, nothing to do
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadGithubProjects);
  } else {
    loadGithubProjects();
  }
})();
