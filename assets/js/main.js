(function() {
  // Always scroll to top on page load
  window.addEventListener('load', function() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('.navmenu-vertical');
    if (!selectHeader) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  const typed = new Typed('.typed-effect', {
  strings: ['Sales Development Representative', 'Designer Gráfico'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    smartBackspace: true
  });

  let skillsAnimation = document.querySelectorAll('.skills-animation');
  function fillSkillBars() {
    if (skillsAnimation) {
      let delay = 0;
      skillsAnimation.forEach((item) => {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.transition = 'none';
          el.style.width = '0%';
        });
      });
      setTimeout(() => {
        skillsAnimation.forEach((item) => {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        });
      }, 300);
    }
  }
  window.addEventListener('load', fillSkillBars);
  if (skillsAnimation) {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  let navmenulinks = document.querySelectorAll('.navmenu-vertical a');
  // Scroll with offset when clicking navmenu links
  navmenulinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        let section = document.querySelector(this.hash);
        let offset = 60; // ajuste para parar acima da linha
        let top = section.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // Atualiza o hash na URL
        history.replaceState(null, null, this.hash);
      }
    });
  });

  function navmenuScrollspy() {
    // Encontrar a seção mais visível na viewport
    let maxVisibleSection = null;
    let maxVisibleArea = 0;
    let currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = currentScrollPos + rect.top;
      const sectionHeight = rect.height;
      
      // Determinar se a seção está na viewport
      const isInViewport = (
        rect.top <= viewportHeight * 0.5 && // Seção começou antes da metade da viewport
        rect.bottom >= viewportHeight * 0.5  // Seção termina depois da metade da viewport
      );
      
      // Se a seção estiver centralizada na viewport, ela é a seção ativa
      if (isInViewport) {
        maxVisibleSection = navmenulink;
        return; // Interrompe o loop pois encontramos a seção ativa
      }
      
      // Se não encontrarmos uma seção centralizada, use a área visível como fallback
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        maxVisibleSection = navmenulink;
      }
    });

    // Atualizar classes active
    navmenulinks.forEach(link => link.classList.remove('active'));
    if (maxVisibleSection) {
      maxVisibleSection.classList.add('active');
    } else {
      navmenulinks[0].classList.add('active');
    }
  }
  // Atualiza o menu ativo em intervalos regulares
  setInterval(navmenuScrollspy, 100);

  // Atualiza o menu ativo em eventos importantes
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  window.addEventListener('resize', navmenuScrollspy);

  navmenulinks.forEach(navmenulink => {
    navmenulink.addEventListener('click', function(e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        let section = document.querySelector(this.hash);
        let offset = 60;
        let top = section.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        history.replaceState(null, null, this.hash);
      }
    });
  });

})();