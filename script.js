/**
 * TENS BY TONIA - Pink Luxury Theme JavaScript
 * All animations and interactions - FIXED VERSION
 */

// ============================================
// 1. LOADER
// ============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        initHeroAnimations();
    }, 1500);
});

// ============================================
// 2. CUSTOM CURSOR - PINK
// ============================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice && cursorDot && cursorOutline) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, .tilt-card, input, select, textarea, .gallery-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
        });
    });
}

// ============================================
// 3. THREE.JS HERO BACKGROUND - PINK PARTICLES
// ============================================
const initThreeJS = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create pink particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 6;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.008,
        color: 0xec4899,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    
    // Second layer
    const particlesGeometry2 = new THREE.BufferGeometry();
    const posArray2 = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray2[i] = (Math.random() - 0.5) * 8;
    }
    
    particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
    
    const material2 = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xf472b6,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh2 = new THREE.Points(particlesGeometry2, material2);
    scene.add(particlesMesh2);
    
    camera.position.z = 2;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - windowHalfX) / 100;
        mouseY = (e.clientY - windowHalfY) / 100;
    });
    
    const clock = new THREE.Clock();
    
    const animate = () => {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;
        
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x += 0.0005;
        
        particlesMesh2.rotation.y = -elapsedTime * 0.03;
        particlesMesh2.rotation.x -= 0.0003;
        
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        
        particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.1;
        particlesMesh2.position.y = Math.cos(elapsedTime * 0.3) * 0.15;
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initThreeJS();

// ============================================
// 4. GSAP ANIMATIONS - FIXED
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Hero Entrance Animation
const initHeroAnimations = () => {
    const tl = gsap.timeline();
    
    tl.to("#hero-badge", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
    })
    .to("#hero-title-1", { 
        y: 0, 
        duration: 1, 
        ease: "power3.out" 
    }, "-=0.4")
    .to("#hero-title-2", { 
        y: 0, 
        duration: 1, 
        ease: "power3.out" 
    }, "-=0.8")
    .to("#hero-desc", { 
        opacity: 1, 
        duration: 0.8 
    }, "-=0.6")
    .to("#hero-cta", { 
        opacity: 1, 
        duration: 0.8 
    }, "-=0.6");
};

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('py-6');
        navbar.classList.add('py-4');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('py-4');
        navbar.classList.add('py-6');
    }
});

// Features Animation
gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "power3.out"
    });
    
    const text = card.querySelector('.feature-text');
    if (text) {
        gsap.to(text, {
            scrollTrigger: {
                trigger: card,
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2 + 0.3,
            ease: "power2.out"
        });
    }
});

// ============================================
// SERVICES SECTION - FIXED ANIMATION
// ============================================
const servicesSection = document.querySelector('#services');
const serviceCards = document.querySelectorAll('.service-card');

if (servicesSection && serviceCards.length > 0) {
    // Make sure cards are visible first
    gsap.set(serviceCards, { opacity: 1, y: 0 });
    
    // Then animate them
    gsap.from(serviceCards, {
        scrollTrigger: {
            trigger: servicesSection,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        onComplete: () => {
            // Ensure visibility after animation
            gsap.set(serviceCards, { clearProps: "all" });
        }
    });
}

// About Section Animation
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutElements = aboutSection.querySelectorAll('.lg\\\\:w-1\\\\/2');
    gsap.from(aboutElements, {
        scrollTrigger: {
            trigger: aboutSection,
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        x: (i) => i === 0 ? -50 : 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
}

// Gallery Animation
const gallerySection = document.querySelector('#gallery');
if (gallerySection) {
    const galleryItems = gallerySection.querySelectorAll('.gallery-item');
    gsap.from(galleryItems, {
        scrollTrigger: {
            trigger: gallerySection,
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)"
    });
}

// Booking Section Animation
const bookingSection = document.querySelector('#booking');
if (bookingSection) {
    const bookingCard = bookingSection.querySelector('.bg-dark-900\\\\/80');
    if (bookingCard) {
        gsap.from(bookingCard, {
            scrollTrigger: {
                trigger: bookingSection,
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    }
}

// ============================================
// 5. 3D TILT EFFECT - FIXED
// ============================================
const cards = document.querySelectorAll('.tilt-card');

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

cards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
});

// ============================================
// 6. MAGNETIC BUTTON EFFECT
// ============================================
const magneticBtns = document.querySelectorAll('.magnetic-btn');

function handleMagnetic(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
}

function resetMagnetic(e) {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0px, 0px)';
}

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', handleMagnetic);
    btn.addEventListener('mouseleave', resetMagnetic);
});

// ============================================
// 7. TESTIMONIAL CAROUSEL WITH DOTS
// ============================================
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('testimonial-dots');
const dots = dotsContainer ? dotsContainer.querySelectorAll('button') : [];
const prevBtn = document.getElementById('prev-test');
const nextBtn = document.getElementById('next-test');
let currentSlide = 0;
let autoPlayInterval;

function updateDots(index) {
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
            dot.style.backgroundColor = '#ec4899';
            dot.style.transform = 'scale(1.2)';
        } else {
            dot.classList.remove('active');
            dot.style.backgroundColor = 'rgba(236, 72, 153, 0.3)';
            dot.style.transform = 'scale(1)';
        }
    });
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(0)';
            slide.style.pointerEvents = 'auto';
            slide.style.zIndex = '10';
        } else {
            slide.style.opacity = '0';
            slide.style.transform = i < index ? 'translateX(-100%)' : 'translateX(100%)';
            slide.style.pointerEvents = 'none';
            slide.style.zIndex = '1';
        }
    });
    updateDots(index);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoPlay();
    });
});

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

if (slides.length > 0) {
    showSlide(0);
    startAutoPlay();
}

const testimonialContainer = document.getElementById('testimonial-container');
if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// ============================================
// 8. HAMBURGER MENU - COMPLETE FIXED VERSION
// ============================================
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

function toggleMenu() {
    const isActive = hamburgerBtn.classList.contains('active');
    
    if (isActive) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    hamburgerBtn.classList.add('active');
    mobileMenu.classList.add('active');
    body.classList.add('menu-open');
    body.style.overflow = 'hidden';
    
    if (cursorDot && cursorOutline) {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    }
    
    // Animate menu items
    mobileNavLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

function closeMenu() {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.overflow = '';
    
    if (cursorDot && cursorOutline) {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    }
    
    // Reset menu items
    mobileNavLinks.forEach(link => {
        link.style.opacity = '';
        link.style.transform = '';
    });
}

// Hamburger click event
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
}

// Mobile nav links click
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        closeMenu();
        
        setTimeout(() => {
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);
    });
});

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Close when clicking on menu background
if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });
}

// Prevent menu content clicks from closing
const mobileMenuContent = mobileMenu ? mobileMenu.querySelector('.mobile-menu-content') : null;
if (mobileMenuContent) {
    mobileMenuContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ============================================
// 9. SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.closest('.mobile-menu-content')) return; // Skip if in mobile menu
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 10. BOOKING FORM & MODAL
// ============================================
function handleBooking(e) {
    e.preventDefault();
    
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('active');
    }
    
    const form = document.getElementById('booking-form');
    if (form) {
        form.reset();
    }
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

const modalBackdrop = document.querySelector('.modal-backdrop');
if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
}

// Make functions globally available
window.handleBooking = handleBooking;
window.closeModal = closeModal;

// ============================================
// 11. PERFORMANCE UTILITIES
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
}, 250));

// ============================================
// 12. INTERSECTION OBSERVER
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .service-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// 13. CONSOLE EASTER EGG
// ============================================
console.log('%c 💅 TENS BY TONIA 💅 ', 'background: linear-gradient(90deg, #ec4899, #f472b6); color: #fff; font-size: 24px; font-weight: bold; padding: 15px; border-radius: 10px;');
console.log('%c Pink Luxury Nail Studio - Crafted with love ', 'color: #ec4899; font-size: 14px; font-weight: bold;');
console.log('%c ✅ CSS/JS Loaded - Check Network tab for styles.css ', 'color: #10b981; font-size: 12px;');

// Enhanced error handling
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - verifying CSS');
    
    // Check if styles.css loaded
    const styleSheets = document.styleSheets;
    let customCSSLoaded = false;
    for (let sheet of styleSheets) {
        try {
            if (sheet.href && sheet.href.includes('styles.css')) {
                customCSSLoaded = true;
                console.log('✅ styles.css loaded successfully');
                break;
            }
        } catch(e) {
            console.warn('CORS blocking stylesheet check:', e);
        }
    }
    if (!customCSSLoaded) {
        console.error('❌ styles.css NOT found - check file path');
    }
    
    // Ensure services visible as fallback
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.transform = 'none';
    });
    
    // Test Tailwind (should apply)
    document.body.classList.add('css-test');
    
    // Verify GSAP
    if (typeof gsap !== 'undefined') {
        console.log('✅ GSAP loaded');
    } else {
        console.error('❌ GSAP failed to load');
    }
    
    // Verify Three.js
    if (typeof THREE !== 'undefined') {
        console.log('✅ Three.js loaded');
    } else {
        console.error('❌ Three.js failed to load');
    }
});

// Remove after 5s
setTimeout(() => {
    document.body.classList.remove('css-test');
}, 5000);
// ============================================
// HAMBURGER MENU - COMPLETE ISOLATED VERSION
// ============================================

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initHamburger() {
        const toggle = document.getElementById('menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const body = document.body;
        
        // Check if elements exist
        if (!toggle || !mobileNav) {
            console.error('Hamburger elements not found');
            return;
        }
        
        let isOpen = false;
        
        function openMenu() {
            isOpen = true;
            toggle.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            mobileNav.classList.add('active');
            body.classList.add('menu-locked');
            
            // Animate links
            mobileLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateY(0)';
                    link.style.opacity = '1';
                }, 100 + (index * 100));
            });
        }
        
        function closeMenu() {
            isOpen = false;
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-locked');
            
            // Reset links
            mobileLinks.forEach(link => {
                link.style.transform = '';
                link.style.opacity = '';
            });
        }
        
        function toggleMenu(e) {
            if (e) e.preventDefault();
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        // Click event on hamburger
        toggle.addEventListener('click', toggleMenu);
        
        // Click on links to close and scroll
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                
                closeMenu();
                
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        });
        
        // Close when clicking outside links
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                closeMenu();
            }
        });
        
        console.log('✅ Hamburger menu initialized');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHamburger);
    } else {
        initHamburger();
    }
    
})();