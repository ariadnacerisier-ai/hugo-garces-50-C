(() => {
  "use strict";

  function hideLoader() {
    const loader = document.querySelector("#loader");
    if (!loader || loader.dataset.closing === "true") return;
    loader.dataset.closing = "true";
    loader.classList.add("is-hidden");
    window.setTimeout(() => loader.remove(), 900);
  }

  function injectVisualFixes() {
    if (document.querySelector("#hg-runtime-fixes")) return;

    const style = document.createElement("style");
    style.id = "hg-runtime-fixes";
    style.textContent = `
      .timeline-family-banner {
        width: min(100%, 760px);
        margin: 1.1rem auto 0;
        padding: 0.9rem 1.1rem;
        border: 1px solid rgba(201, 162, 39, 0.42);
        border-radius: var(--border-radius-full, 999px);
        background: linear-gradient(135deg, rgba(201, 162, 39, 0.16), rgba(212, 0, 31, 0.12));
        color: var(--color-gold-light, #f5d16f);
        font-family: var(--font-display, inherit);
        font-size: 0.72rem;
        line-height: 1.35;
        letter-spacing: 0.12em;
        text-align: center;
        text-transform: uppercase;
      }

      .timeline-family-note {
        margin: 0.75rem 0 0;
        color: rgba(255, 255, 255, 0.78);
        font-size: 0.92rem;
        line-height: 1.55;
      }

      .timeline-video {
        width: min(100%, 360px) !important;
        max-width: 360px !important;
        margin: var(--space-3, 1rem) auto 0 !important;
        background: #000 !important;
      }

      .timeline-video video {
        width: 100% !important;
        height: auto !important;
        aspect-ratio: 9 / 16 !important;
        max-height: 620px !important;
        display: block !important;
        object-fit: contain !important;
        object-position: center center !important;
        background: #000 !important;
      }

      @media (max-width: 768px) {
        .timeline-family-banner {
          border-radius: var(--border-radius-md, 18px);
          font-size: 0.66rem;
          letter-spacing: 0.08em;
        }

        .timeline-video {
          max-width: 300px !important;
        }

        .timeline-video video {
          max-height: 540px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function removeRsvpForm() {
    const form = document.querySelector("#rsvp-form");
    if (form) form.remove();

    const intro = document.querySelector(".rsvp-intro p");
    if (intro) {
      intro.textContent = "Confirma tu asistencia directamente por WhatsApp para ayudarnos a preparar cada detalle.";
    }

    const whatsappText = document.querySelector(".whatsapp-confirm__text");
    if (whatsappText) {
      whatsappText.textContent = "Confirma tu asistencia por WhatsApp. No es necesario llenar formulario.";
    }
  }

  function clarifyFamilySchedule() {
    const timelineHeader = document.querySelector(".timeline-header");
    if (timelineHeader && !timelineHeader.querySelector(".timeline-family-banner")) {
      const banner = document.createElement("p");
      banner.className = "timeline-family-banner";
      banner.textContent = "Para toda la familia · convivencia, comida y actividades hasta antes del Show JJ";
      timelineHeader.appendChild(banner);
    }

    const adultCard = document.querySelector(".timeline-card--adultos");
    if (!adultCard) return;

    const description = adultCard.querySelector(".timeline-description");
    if (description) {
      description.textContent = "Hasta antes del show, la celebración mantiene un ambiente familiar para disfrutar con grandes y pequeños. A partir de las 10:00 PM inicia el cierre solo para adultos con el Show JJ.";
    }

    const badge = adultCard.querySelector(".timeline-adult-badge");
    if (badge) {
      badge.textContent = "Desde 10:00 PM · Solo adultos";
      badge.setAttribute("aria-label", "A partir de las 10:00 PM el evento es solo para adultos");
    }

    if (!adultCard.querySelector(".timeline-family-note")) {
      const note = document.createElement("p");
      note.className = "timeline-family-note";
      note.textContent = "Antes de este momento, la convivencia es familiar.";
      const video = adultCard.querySelector(".timeline-video");
      adultCard.insertBefore(note, video || null);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-scroll]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const selector = link.getAttribute("data-scroll");
        const target = document.querySelector(selector);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    injectVisualFixes();
    removeRsvpForm();
    clarifyFamilySchedule();
    window.setTimeout(hideLoader, 3500);
  });

  window.addEventListener("load", () => {
    window.setTimeout(hideLoader, 700);
  });
})();
