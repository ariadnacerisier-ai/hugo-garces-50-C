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

  function removeRsvpForm() {
    const form = document.querySelector("#rsvp-form");

    if (form) {
      form.remove();
    }

    const intro = document.querySelector(".rsvp-intro p");

    if (intro) {
      intro.textContent =
        "Confirma tu asistencia directamente por WhatsApp para ayudarnos a preparar cada detalle.";
    }

    const whatsappText = document.querySelector(".whatsapp-confirm__text");

    if (whatsappText) {
      whatsappText.textContent =
        "Confirma tu asistencia por WhatsApp. No es necesario llenar formulario.";
    }
  }

  function clarifyFamilySchedule() {
    const adultCard = document.querySelector(
      ".timeline-card--adultos"
    );

    if (!adultCard) {
      return;
    }

    const description = adultCard.querySelector(
      ".timeline-description"
    );

    if (description) {
      description.textContent =
        "Hasta antes del show, la celebración mantiene un ambiente familiar para disfrutar con grandes y pequeños. A partir de las 10:00 PM inicia el cierre solo para adultos con el Show JJ.";
    }

    const badge = adultCard.querySelector(".timeline-adult-badge");

    if (badge) {
      badge.textContent = "Desde 10:00 PM · Solo adultos";
      badge.setAttribute(
        "aria-label",
        "A partir de las 10:00 PM el evento es solo para adultos"
      );
    }

    if (!adultCard.querySelector(".timeline-family-note")) {
      const note = document.createElement("p");
      note.className = "timeline-family-note";
      note.textContent =
        "Antes de este momento, la convivencia es familiar.";

      const video = adultCard.querySelector(".timeline-video");
      adultCard.insertBefore(note, video || null);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    /* Navegación suave */
    document.querySelectorAll("[data-scroll]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const selector = link.getAttribute("data-scroll");
        const target = document.querySelector(selector);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

    removeRsvpForm();
    clarifyFamilySchedule();

    /*
     * Respaldo: evita que el sitio se quede detenido en
     * “Lights out” si una imagen tarda demasiado.
     */
    window.setTimeout(hideLoader, 3500);
  });

  /*
   * Cierre habitual del loader cuando termina de cargar la página.
   */
  window.addEventListener("load", () => {
    window.setTimeout(hideLoader, 700);
  });
})();
