/**
 * NextLab Innovations — Main Enterprise Application Logic (Phase 1)
 * Architecture: Clean Vanilla ES6+, Zero External Dependencies
 */

(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // -------------------------------------------------------------------------
  // 1. Theme Toggle System
  // -------------------------------------------------------------------------
  const initThemeToggle = () => {
    const themeBtn = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const updateIcon = (theme) => {
      if (!themeIcon) return;
      if (theme === "light") {
        // Render Sun Icon
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
          </svg>
        `;
      } else {
        // Render Moon Icon
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        `;
      }
    };

    const currentTheme = root.getAttribute("data-theme") || "light";
    updateIcon(currentTheme);

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const activeTheme = root.getAttribute("data-theme") || "light";
        const nextTheme = activeTheme === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", nextTheme);
        try {
          localStorage.setItem("theme", nextTheme);
        } catch {
          // ignore storage error
        }
        updateIcon(nextTheme);
        themeBtn.setAttribute("aria-label", `Switch to ${activeTheme === "dark" ? "light" : "dark"} theme`);
      });
    }
  };

  // -------------------------------------------------------------------------
  // 2. Header Scroll Observer
  // -------------------------------------------------------------------------
  const initHeaderScroll = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  };

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const initMobileMenu = () => {
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const drawer = document.getElementById("mobileNavDrawer");
    if (!toggleBtn || !drawer) return;

    const toggleMenu = (forceClose) => {
      const willClose = forceClose !== undefined ? forceClose : drawer.classList.contains("open");
      if (willClose) {
        drawer.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "Open navigation menu");
        toggleBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        `;
      } else {
        drawer.classList.add("open");
        document.body.classList.add("menu-open");
        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.setAttribute("aria-label", "Close navigation menu");
        toggleBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
      }
    };

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on navigation link click
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggleMenu(true);
      });
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (drawer.classList.contains("open") && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleMenu(true);
      }
    });

    // Close on Escape key and return focus
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        toggleMenu(true);
        toggleBtn.focus();
      }
    });

    // Auto-close on viewport resize to desktop breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992 && drawer.classList.contains("open")) {
        toggleMenu(true);
      }
    }, { passive: true });
  };

  // -------------------------------------------------------------------------
  // 4. Scroll Reveal System (Usability & Accessibility Gated)
  // -------------------------------------------------------------------------
  const initScrollReveal = () => {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("active"));
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: "0px 0px -24px 0px"
      });

      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("active"));
    }
  };

  // -------------------------------------------------------------------------
  // 5. Kashandaz Phone Slider Carousel
  // -------------------------------------------------------------------------
  const initKashandazSlider = () => {
    const container = document.getElementById("kashandazSlider");
    const prevBtn = document.getElementById("sliderPrevBtn");
    const nextBtn = document.getElementById("sliderNextBtn");
    const dots = document.querySelectorAll(".slider-dot");
    if (!container) return;

    const slides = Array.from(container.querySelectorAll(".phone-slide-item"));
    if (!slides.length) return;

    let currentIndex = 0;
    let isTransitioning = false;
    const TRANSITION_SPEED = 300;

    const showSlide = (newIndex) => {
      if (isTransitioning) return;
      newIndex = ((newIndex % slides.length) + slides.length) % slides.length;
      if (newIndex === currentIndex) return;

      isTransitioning = true;
      const currentSlide = slides[currentIndex];
      const nextSlide = slides[newIndex];

      nextSlide.classList.remove("slide-current", "slide-entering", "slide-visible");
      nextSlide.classList.add("slide-entering");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          nextSlide.classList.add("slide-visible");

          setTimeout(() => {
            nextSlide.classList.remove("slide-entering", "slide-visible");
            nextSlide.classList.add("slide-current");
            currentSlide.classList.remove("slide-current");

            // Update Dots
            if (dots[currentIndex]) {
              dots[currentIndex].classList.remove("active");
              dots[currentIndex].setAttribute("aria-selected", "false");
            }
            currentIndex = newIndex;
            if (dots[currentIndex]) {
              dots[currentIndex].classList.add("active");
              dots[currentIndex].setAttribute("aria-selected", "true");
            }

            isTransitioning = false;
          }, TRANSITION_SPEED);
        });
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(idx);
      });
    });

    // Touch Swipe
    let touchStartX = 0;
    container.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 35) {
        showSlide(currentIndex + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
  };

  // -------------------------------------------------------------------------
  // 6. Accessible FAQ Accordion System
  // -------------------------------------------------------------------------
  const initFaq = () => {
    const triggers = document.querySelectorAll(".faq-trigger");

    triggers.forEach((trigger) => {
      const item = trigger.closest(".faq-item");
      if (!item) return;

      const toggle = () => {
        const isOpen = item.classList.contains("faq-open");

        // Close other accordion items
        document.querySelectorAll(".faq-item").forEach((other) => {
          if (other !== item && other.classList.contains("faq-open")) {
            other.classList.remove("faq-open");
            const otherBtn = other.querySelector(".faq-trigger");
            const otherIcon = other.querySelector(".faq-icon");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            if (otherIcon) otherIcon.textContent = "+";
          }
        });

        // Toggle clicked item
        const willOpen = !isOpen;
        item.classList.toggle("faq-open", willOpen);
        trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
        const icon = trigger.querySelector(".faq-icon");
        if (icon) icon.textContent = willOpen ? "−" : "+";
      };

      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        toggle();
      });

      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  };

  // -------------------------------------------------------------------------
  // 7. Formspree Contact Form Integration (Preserved & Hardened)
  // -------------------------------------------------------------------------
  const initContactForm = () => {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("formSubmitBtn");
    const submitText = document.getElementById("formSubmitText");
    const submitSpinner = document.getElementById("formSubmitSpinner");
    const successAlert = document.getElementById("formSuccessAlert");
    const errorAlert = document.getElementById("formErrorAlert");

    if (!form || !submitBtn) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Check honeypot
      const honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value.trim() !== "") {
        // Bot detected: Silent drop
        if (successAlert) successAlert.classList.add("show");
        form.reset();
        return;
      }

      // Hide prior alerts
      if (successAlert) successAlert.classList.remove("show");
      if (errorAlert) errorAlert.classList.remove("show");

      // Loading state
      submitBtn.disabled = true;
      if (submitSpinner) submitSpinner.style.display = "inline-block";
      if (submitText) submitText.textContent = "Sending Message...";

      try {
        const payload = {
          name: document.getElementById("form-name")?.value || "",
          email: document.getElementById("form-email")?.value || "",
          company: document.getElementById("form-company")?.value || "",
          subject: document.getElementById("form-subject")?.value || "",
          message: document.getElementById("form-message")?.value || ""
        };

        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          if (successAlert) successAlert.classList.add("show");
          form.reset();
        } else {
          if (errorAlert) errorAlert.classList.add("show");
        }
      } catch {
        if (errorAlert) errorAlert.classList.add("show");
      } finally {
        submitBtn.disabled = false;
        if (submitSpinner) submitSpinner.style.display = "none";
        if (submitText) submitText.textContent = "Send Message";
      }
    });
  };

  // -------------------------------------------------------------------------
  // DOM Ready Initialization
  // -------------------------------------------------------------------------
  const init = () => {
    initThemeToggle();
    initHeaderScroll();
    initMobileMenu();
    initScrollReveal();
    initKashandazSlider();
    initFaq();
    initContactForm();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
