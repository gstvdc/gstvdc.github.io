(function () {
  "use strict";

  function initializeAll() {
    window.scrollTo({ top: 0, behavior: "auto" });

    function toggleScrolled() {
      const selectBody = document.querySelector("body");
      const selectHeader = document.querySelector(".navmenu-vertical");
      if (!selectHeader) return;
      window.scrollY > 100
        ? selectBody.classList.add("scrolled")
        : selectBody.classList.remove("scrolled");
    }
    document.addEventListener("scroll", toggleScrolled);
    toggleScrolled();

    let scrollTop = document.querySelector(".scroll-top");
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100
          ? scrollTop.classList.add("active")
          : scrollTop.classList.remove("active");
      }
    }
    if (scrollTop) {
      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
    document.addEventListener("scroll", toggleScrollTop);
    toggleScrollTop();

    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    const typedElement = document.querySelector(".typed-effect");
    if (typedElement) {
      new Typed(".typed-effect", {
        strings: [
          "Desenvolvedor FullStack",
          "Estudante de Ciência da Computação",
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        smartBackspace: true,
      });
    }

    let skillsAnimation = document.querySelectorAll(".skills-animation");
    if (skillsAnimation.length > 0) {
      skillsAnimation.forEach((item) => {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.transition = "none";
          el.style.width = "0%";
        });
      });
      setTimeout(() => {
        skillsAnimation.forEach((item) => {
          let progress = item.querySelectorAll(".progress .progress-bar");
          progress.forEach((el) => {
            el.style.transition = "width 1s cubic-bezier(0.4, 0, 0.2, 1)";
            el.style.width = el.getAttribute("aria-valuenow") + "%";
          });
        });
      }, 300);

      skillsAnimation.forEach((item) => {
        new Waypoint({
          element: item,
          offset: "80%",
          handler: function (direction) {
            let progress = item.querySelectorAll(".progress .progress-bar");
            progress.forEach((el) => {
              el.style.width = el.getAttribute("aria-valuenow") + "%";
            });
          },
        });
      });
    }

    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }

    let navmenulinks = document.querySelectorAll(".navmenu-vertical a");
    navmenulinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        if (this.hash && document.querySelector(this.hash)) {
          e.preventDefault();
          let section = document.querySelector(this.hash);
          let offset = 60;
          let top = section.offsetTop - offset;
          window.scrollTo({ top, behavior: "smooth" });
          history.replaceState(null, null, this.hash);
        }
      });
    });

    function navmenuScrollspy() {
      let maxVisibleSection = null;
      let maxVisibleArea = 0;
      let currentScrollPos =
        window.pageYOffset || document.documentElement.scrollTop;

      navmenulinks.forEach((navmenulink) => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const isInViewport =
          rect.top <= viewportHeight * 0.5 &&
          rect.bottom >= viewportHeight * 0.5;

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

    setInterval(navmenuScrollspy, 100);
    document.addEventListener("scroll", navmenuScrollspy);
    window.addEventListener("resize", navmenuScrollspy);
    navmenuScrollspy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAll);
  } else {
    initializeAll();
  }

  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }
})();
