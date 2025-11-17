// Scroll utilities
export function toggleScrolled() {
  const selectBody = document.querySelector("body");
  const selectHeader = document.querySelector(".navmenu-vertical");
  if (!selectHeader) return;
  window.scrollY > 100
    ? selectBody.classList.add("scrolled")
    : selectBody.classList.remove("scrolled");
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "auto" });
}

export function toggleScrollTop() {
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    window.scrollY > 100
      ? scrollTop.classList.add("active")
      : scrollTop.classList.remove("active");
  }
}

export function initScrollTop() {
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
