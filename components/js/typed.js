// Typed.js initialization
export function initTyped() {
  const typed = new Typed(".typed-effect", {
    strings: ["Sales Development Representative", "Designer Gráfico"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    smartBackspace: true,
  });
  return typed;
}
