
    // PART 1: HAMBURGER (Run this as soon as the HTML is ready)
    document.addEventListener("DOMContentLoaded", function() {
        const openBtn = document.getElementById("hamburger-open");
        const closeBtn = document.getElementById("hamburger-close");
        const overlay = document.getElementById("mobile-menu-overlay");

        if (openBtn && overlay) {
            openBtn.onclick = function(e) {
                e.preventDefault();
                overlay.classList.add("is-active");
            };
            closeBtn.onclick = function(e) {
                e.preventDefault();
                overlay.classList.remove("is-active");
            };
        }
    });

    // PART 2: STACKY EFFECT (Run this after images load)
    window.onload = function() {
        gsap.registerPlugin(ScrollTrigger);

        // Force a refresh of the scroll positions
        ScrollTrigger.clearScrollMemory();
        window.scrollTo(0, 0);

        const panels = gsap.utils.toArray(".abt-panel");
        
        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top top",
                pin: true, 
                pinSpacing: false,
                anticipatePin: 1, // Smooths out the transition
                // This prevents the sticky panel from hiding the nav
                zIndex: i + 1 
            });
        });
        
        ScrollTrigger.refresh();
    };
