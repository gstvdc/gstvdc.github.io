(function () {
  "use strict";

  const components = [
    { id: "nav-component", path: "components/html/nav.html" },
    { id: "hero-component", path: "components/html/hero.html" },
    { id: "about-component", path: "components/html/about.html" },
    { id: "skills-component", path: "components/html/skills.html" },
    { id: "resume-component", path: "components/html/resume.html" },
    { id: "contact-component", path: "components/html/contact.html" },
    { id: "footer-component", path: "components/html/footer.html" },
  ];

  function loadComponent(id, path) {
    return fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${path}`);
        }
        return response.text();
      })
      .then((html) => {
        const container = document.getElementById(id);
        if (container) {
          container.innerHTML = html;
        }
      })
      .catch((error) => {
        console.error(`Error loading component ${path}:`, error);
      });
  }

  function loadAllComponents() {
    const promises = components.map((component) =>
      loadComponent(component.id, component.path)
    );

    return Promise.all(promises)
      .then(() => {
        setTimeout(() => {
          const preloader = document.querySelector("#preloader");
          if (preloader) {
            preloader.remove();
          }
          window.dispatchEvent(new Event("componentsLoaded"));
        }, 100);
      })
      .catch((error) => {
        console.error("Error loading components:", error);
        const preloader = document.querySelector("#preloader");
        if (preloader) {
          preloader.remove();
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAllComponents);
  } else {
    loadAllComponents();
  }
})();
