document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".reveal, .stagger");

    /*
     * Respect users who prefer reduced motion.
     * Everything appears normally without animation.
     */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    /*
     * Reveal elements that are already visible when the page loads.
     */
    elements.forEach(element => {

        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight) {
            element.classList.add("visible");
        }

    });

    /*
     * Reveal remaining elements as they enter the viewport.
     */
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    elements.forEach(element => {
        observer.observe(element);
    });

});
