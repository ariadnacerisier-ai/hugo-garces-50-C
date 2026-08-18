(() => {
  "use strict";

  function hideLoader() {
    const loader = document.querySelector("#loader");

    if (!loader || loader.dataset.closing === "true") {
      return;
    }

    loader.dataset.closing = "true";
    loader.classList.add("is-hidden");

    window.setTimeout(() => {
      loader.remove();
    }, 900);
  }

  function injectVisualFixes() {
    if (document.querySelector("#hg-runtime-fixes")) {
      return