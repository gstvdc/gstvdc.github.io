// Preloader
export function removePreloader() {
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    preloader.remove();
  }
}
