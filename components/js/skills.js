// Skills bar animation
export function fillSkillBars() {
  const skillsAnimation = document.querySelectorAll(".skills-animation");

  if (skillsAnimation) {
    skillsAnimation.forEach((item) => {
      const progress = item.querySelectorAll(".progress .progress-bar");
      progress.forEach((el) => {
        el.style.transition = "none";
        el.style.width = "0%";
      });
    });

    setTimeout(() => {
      skillsAnimation.forEach((item) => {
        const progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.transition = "width 1s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      });
    }, 300);
  }
}

export function initSkillsWaypoint() {
  const skillsAnimation = document.querySelectorAll(".skills-animation");

  if (skillsAnimation) {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: "80%",
        handler: function (direction) {
          const progress = item.querySelectorAll(".progress .progress-bar");
          progress.forEach((el) => {
            el.style.width = el.getAttribute("aria-valuenow") + "%";
          });
        },
      });
    });
  }
}
