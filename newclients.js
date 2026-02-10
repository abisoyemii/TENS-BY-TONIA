document.addEventListener('DOMContentLoaded', () => {
    
    // --- HAMBURGER MENU LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeBtn');

    if (hamburger && menuOverlay && closeBtn) {
        hamburger.addEventListener('click', () => {
            menuOverlay.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });
    }

    // --- ANIMATIONS (GSAP) ---
    // If GSAP is loaded, animate text as sections come into view
    if (typeof gsap !== 'undefined') {
        
        // Animate Hero Text
        gsap.from(".reveal-text", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Animate Elements inside sticky sections
        gsap.utils.toArray('.sticky-section').forEach(section => {
            gsap.from(section.querySelectorAll('h2, p, img, .policy-card'), {
                scrollTrigger: {
                    trigger: section,
                    start: "top center", // Animation starts when top of section hits center of screen
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1
            });
        });
    }
});