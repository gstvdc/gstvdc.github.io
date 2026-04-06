(function () {
  "use strict";

  const DEFAULT_REPO_OWNER = "gstvdc";
  const PROJECTS_CONFIG = [
    {
      title: "Central de Compras",
      summary:
        "Plataforma full stack para gerenciamento de compras institucionais com autenticação e regras de negócio.",
      problem:
        "Resolve o fluxo de compras com autenticação de usuários, cashback e condições comerciais por estado.",
      role:
        "Desenvolvimento completo de front-end e back-end com foco em fluxo de compra, regras do sistema e integração de dados.",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      accent: "#ff6b6b",
      year: "2025",
      htmlUrl: "https://github.com/Centra-de-Compras-Unesc",
      previewImage: "assets/img/projects/central-de-compras.svg",
    },
    {
      owner: "gstvdc",
      repo: "Gerador-de-certificados",
      title: "Gerador de Certificados",
      summary:
        "Aplicação web para geração automática de certificados personalizados em PDF com foco em praticidade e escala.",
      problem:
        "Facilita a emissão de certificados sem depender de montagem manual documento por documento.",
      role:
        "Implementação do fluxo de entrada de dados, automação da geração de documentos e experiência de uso no navegador.",
      stack: ["JavaScript", "HTML5", "CSS3", "PDF"],
      accent: "#4dabf7",
      year: "2025",
      previewImage: "assets/img/projects/gerador-de-certificados.svg",
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
    },
    {
      owner: "gstvdc",
      repo: "central-de-compras-API",
      title: "Central de Compras API",
      summary:
        "API REST para o backend da Central de Compras com documentação Swagger e integração com PostgreSQL.",
      problem:
        "Estrutura o backend da plataforma com rotas documentadas, persistência relacional e organização do domínio.",
      role:
        "Desenvolvimento do backend com Node.js, Express, TypeScript, PostgreSQL e documentação da API.",
      stack: ["Node.js", "Express", "TypeScript", "Swagger"],
      accent: "#7bd389",
      year: "2025",
      previewImage: "assets/img/projects/central-de-compras-api.svg",
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

    const liveLink = project.liveUrl
      ? `<a class="project-link primary" href="${escapeHtml(
          project.liveUrl
        )}" target="_blank" rel="noreferrer">
          Ver deploy
          <i class="bi bi-arrow-up-right"></i>
        </a>`
      : "";

    const updatedAtLabel = project.updatedAt
      ? `Atualizado em ${escapeHtml(formatUpdatedAt(project.updatedAt))}`
      : "Atualização indisponível";

    return `
      <div class="col-xl-4 col-md-6">
        <article class="project-card" style="--project-accent: ${escapeHtml(
          project.accent
        )}">
          <a
            class="project-media"
            href="${escapeHtml(project.htmlUrl)}"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir repositório ${escapeHtml(project.title)}"
          >
            <img
              src="${escapeHtml(project.previewImage)}"
              alt="Preview do projeto ${escapeHtml(project.title)}"
              loading="lazy"
            />
            <span class="project-media-badge">
              <i class="bi bi-github"></i>
              GitHub
            </span>
          </a>

          <div class="project-card-body">
            <div class="project-meta">
              <span><strong>${escapeHtml(project.year)}</strong></span>
              <span title="${escapeHtml(updatedAtLabel)}">
                <i class="bi bi-clock-history"></i>
                ${escapeHtml(updatedAtLabel)}
              </span>
            </div>

            <h3>${escapeHtml(project.title)}</h3>
            <p class="project-summary">${escapeHtml(project.summary)}</p>

            <ul class="project-points">
              <li>${escapeHtml(project.problem)}</li>
              <li>${escapeHtml(project.role)}</li>
            </ul>

            <div class="project-tags">${tags}</div>

            <div class="project-links">
              ${liveLink}
              <a
                class="project-link secondary"
                href="${escapeHtml(project.htmlUrl)}"
                target="_blank"
                rel="noreferrer"
              >
                Ver no GitHub
                <i class="bi bi-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function renderProjects(projects) {
    const grid = document.getElementById("github-projects-grid");
    if (!grid) return;

    if (!projects.length) {
      grid.innerHTML = `
        <div class="col-12">
          <div class="project-empty">
            Nenhum projeto destacado foi encontrado no momento.
          </div>
        </div>
      `;
      return;
    }

    grid.innerHTML = projects.map(buildProjectCard).join("");

    if (window.AOS && typeof window.AOS.refresh === "function") {
      window.AOS.refresh();
    }
  }

  function updateStatus(message) {
    const status = document.getElementById("github-sync-status");
    if (status) {
      status.textContent = message;
    }
  }

  function buildBaseProject(project) {
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

    if (!baseProject.owner || !baseProject.repo) {
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

      return {
        ...baseProject,
        htmlUrl: repository.html_url || baseProject.htmlUrl,
        liveUrl: repository.homepage || baseProject.liveUrl,
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

      const syncedProjects = projects.filter((project) => project.updatedAt).length;
      renderProjects(projects);

      if (syncedProjects === PROJECTS_CONFIG.length) {
        updateStatus("Projetos sincronizados com GitHub.");
        return;
      }

      if (syncedProjects > 0) {
        updateStatus(
        "Projetos sincronizados parcialmente. Alguns links não expuseram metadados completos."
        );
        return;
      }

      updateStatus(
        "Não foi possível ler as datas do GitHub agora. Exibindo a versão local."
      );
    } catch (error) {
      renderProjects(baseProjects);
      updateStatus(
        "Não foi possível sincronizar com o GitHub agora. Exibindo a versão local."
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadGithubProjects);
  } else {
    loadGithubProjects();
  }
})();
