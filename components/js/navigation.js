// Navigation utilities
export function initNavigation() {
  const navmenulinks = document.querySelectorAll(".navmenu-vertical a");

  // Scroll with offset when clicking navmenu links
  navmenulinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        const section = document.querySelector(this.hash);
        const offset = 60;
        const top = section.offsetTop - offset;
        window.scrollTo({ top, behavior: "smooth" });
        history.replaceState(null, null, this.hash);
      }
    });
  });
}

export function navmenuScrollspy() {
  const navmenulinks = document.querySelectorAll(".navmenu-vertical a");
  let maxVisibleSection = null;
  let maxVisibleArea = 0;
  const currentScrollPos =
    window.pageYOffset || document.documentElement.scrollTop;

  navmenulinks.forEach((navmenulink) => {
    if (!navmenulink.hash) return;
    const section = document.querySelector(navmenulink.hash);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const isInViewport =
      rect.top <= viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.5;

    if (isInViewport) {
      maxVisibleSection = navmenulink;
      return;
    }

    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(viewportHeight, rect.bottom);
    const visibleArea = Math.max(0, visibleBottom - visibleTop);

    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea;
      maxVisibleSection = navmenulink;
    }
  });

  navmenulinks.forEach((link) => link.classList.remove("active"));
  if (maxVisibleSection) {
    maxVisibleSection.classList.add("active");
  } else {
    navmenulinks[0].classList.add("active");
  }
}

export function initScrollSpy() {
  setInterval(navmenuScrollspy, 100);
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
  window.addEventListener("resize", navmenuScrollspy);
}
