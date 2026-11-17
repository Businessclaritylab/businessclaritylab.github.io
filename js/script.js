document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. HAMBURGER NAVIGATION DRAWER
    ========================================== */
    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelectorAll("header nav a");

    if (header && menuToggle) {
        const closeMenu = () => {
            header.classList.remove("nav-open");
            menuToggle.setAttribute("aria-expanded", "false");
        };

        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = header.classList.toggle("nav-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (e) => {
            if (header.classList.contains("nav-open") && !header.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && header.classList.contains("nav-open")) {
                closeMenu();
            }
        });
    }

    /* ==========================================
       2. SILO FILTER PILLS (ARTICLES LIBRARY)
    ========================================== */
    const filterButtons = document.querySelectorAll("[data-filter]");
    const filterableCards = document.querySelectorAll("[data-silo]");

    if (filterButtons.length && filterableCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const target = btn.getAttribute("data-filter");

                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                filterableCards.forEach(card => {
                    const silos = (card.getAttribute("data-silo") || "").split(" ");
                    const match = target === "all" || silos.includes(target);
                    card.style.display = match ? "" : "none";
                    if (match) {
                        card.classList.add("visible");
                    }
                });
            });
        });
    }

    /* ==========================================
       3. LAG-FREE SCROLL REVEAL (NO BLANK TRAPS)
    ========================================== */
    const revealTargets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .stagger > *");

    if (!revealTargets.length) return;

    const revealAllImmediately = () => {
        revealTargets.forEach(el => el.classList.add("visible"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
        revealAllImmediately();
        return;
    }

    const revealVisibleInViewport = () => {
        const triggerLine = window.innerHeight + 120;
        revealTargets.forEach(el => {
            if (!el.classList.contains("visible")) {
                const rect = el.getBoundingClientRect();
                if (rect.top < triggerLine) {
                    el.classList.add("visible");
                }
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.01,
        rootMargin: "120px 0px 120px 0px"
    });

    revealTargets.forEach(el => observer.observe(el));

    // Immediate sweep + mobile scroll/orientation safety fallback
    revealVisibleInViewport();
    window.addEventListener("scroll", revealVisibleInViewport, { passive: true });
    window.addEventListener("resize", revealVisibleInViewport, { passive: true });
    window.addEventListener("orientationchange", () => setTimeout(revealVisibleInViewport, 120));
    window.addEventListener("hashchange", () => setTimeout(revealVisibleInViewport, 60));

});
