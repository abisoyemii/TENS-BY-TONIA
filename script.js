document.addEventListener("DOMContentLoaded", () => {

  
  const hamburger = document.getElementById("hamburger");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeBtn = document.getElementById("closeBtn");

  if (hamburger && menuOverlay && closeBtn) {
    hamburger.addEventListener("click", () => {
      menuOverlay.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      menuOverlay.style.display = "none";
    });

    menuOverlay.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuOverlay.style.display = "none";
      });
    });
  }

  
  document.querySelectorAll(".hero-btn, .hero-btn2, .services-text .hero-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      
      if (btn.classList.contains("hero-btn") || btn.classList.contains("hero-btn2")) {
        const target = document.querySelector("#services1");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else if (btn.classList.contains("hero-btn") && btn.closest(".services-text")) {
       
        window.location.href = "services.html";
      }
    });
  });

 
  const images = [
    "images/summer nails color.jpg",
    "images/nail-2.jpeg",
    "images/pedi-1.jpg",
  ];

  const section = document.getElementById("services1");
  const desktopImage = document.querySelector(".services-image");
  let index = 0;

  function updateBackground() {
    if (!section) return;

    const isMobile = window.innerWidth <= 768;
    const url = `url('${images[index]}')`;

    if (isMobile) {
      
      section.style.backgroundImage = url;
      section.style.backgroundSize = "cover";
      section.style.backgroundPosition = "center";

      if (desktopImage) desktopImage.style.display = "none";
    } else {
      
      
      section.style.backgroundImage = "none";
      if (desktopImage) {
        desktopImage.style.display = "block";
        desktopImage.style.backgroundImage = url;
        desktopImage.style.backgroundSize = "cover";
        desktopImage.style.backgroundPosition = "center";
      }
    }
  }

  updateBackground();

  setInterval(() => {
    index = (index + 1) % images.length;
    updateBackground();
  }, 4500);

  window.addEventListener("resize", updateBackground);

});









gsap.registerPlugin(ScrollTrigger);

gsap.from("#ccc", {
  x: -100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".secondmainCon",
    start: "top 80%",   
    toggleActions: "play none none reverse"
  }
});

gsap.from("#perf", {
  x: -100,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  scrollTrigger: {
    trigger: ".secondmainCon",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

gsap.from(".hero-btn2", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  scrollTrigger: {
    trigger: ".secondmainCon",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

gsap.from("#firstNail", {
  x: 100,
  opacity: 0,
  duration: 1.5,
  scrollTrigger: {
    trigger: "#nails",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
gsap.registerPlugin(ScrollTrigger);

gsap.from(".portfolio-header h2", {
  y: 50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#portfolio",
    start: "top 80%"
  }
});

gsap.from(".portfolio-header p", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  scrollTrigger: {
    trigger: "#portfolio",
    start: "top 80%"
  }
});

gsap.from(".gallery-item", {
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".gallery",
    start: "top 80%"
  }
});




const carousel = document.querySelector('.portfolio-carousel');
const items = document.querySelectorAll('.portfolio-item');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

let centerIndex = Math.floor(items.length / 2);

function updateCarousel() {
  items.forEach((item, i) => {
    const offset = i - centerIndex;
    const scale = offset === 0 ? 1 : 0.7;
    const zIndex = -Math.abs(offset) + items.length;
    const rotateY = offset * 25; // fanned angle
    item.style.transform = `translateX(${offset * 80}px) scale(${scale}) rotateY(${rotateY}deg)`;
    item.style.zIndex = zIndex;
    item.style.opacity = scale === 0.7 ? 0.5 : 1;
  });
}

updateCarousel();

leftArrow.addEventListener('click', () => {
  centerIndex = (centerIndex - 1 + items.length) % items.length;
  updateCarousel();
});

rightArrow.addEventListener('click', () => {
  centerIndex = (centerIndex + 1) % items.length;
  updateCarousel();
});

items.forEach(item => {
  const img = item.querySelector('img');

  function peek() {
    gsap.to(img, { 
      opacity: 1, 
      duration: 0.5, 
      onComplete: () => {
        gsap.to(img, { 
          opacity: 0, 
          duration: 0.5,   
          delay: 4,        
          onComplete: peek 
        });
      }
    });
  }

  peek();
});











gsap.registerPlugin(ScrollTrigger);

gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about-container",
    start: "top 80%",
  },
  x: -50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.to(".about-image img", {
  scrollTrigger: {
    trigger: ".about-container",
    start: "top 80%",
  },
  x: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power3.out"
});

















document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-item");
  const leftArrow = document.querySelector(".carousel-arrow.left");
  const rightArrow = document.querySelector(".carousel-arrow.right");

  if (testimonials.length === 0) return; 

  let currentIndex = 0;

  function updateTestimonials() {
    testimonials.forEach((item, i) => {
      item.classList.remove("active");
      gsap.to(item, { opacity: 0.5, scale: 0.9, duration: 0.5 });
    });
    testimonials[currentIndex].classList.add("active");
    gsap.to(testimonials[currentIndex], { opacity: 1, scale: 1, duration: 0.5 });
  }

  updateTestimonials();

  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonials();
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonials();
    });
  }
});






gsap.registerPlugin(ScrollTrigger);

// ==================== SCROLL-COVER SECTIONS ====================
const sections = document.querySelectorAll("section");

sections.forEach((section, i) => {
  gsap.from(section, {
    yPercent: 20,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 30%",
      scrub: true,
      toggleActions: "play none none reverse"
    }
  });

  // inner elements animation
  const texts = section.querySelectorAll("h2, p, .blog-card, .testimonial-item, .hero-btn, .instagram-grid img");
  gsap.from(texts, {
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none reverse"
    }
  });
});

// ==================== TESTIMONIAL CAROUSEL ====================
const testimonials = document.querySelector(".testimonials-carousel");
let testimonialIndex = 0;

const showTestimonial = (index) => {
  testimonials.style.transform = `translateX(-${index * 100}%)`;
};

document.querySelector(".testimonials-section .right").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.children.length;
  showTestimonial(testimonialIndex);
});

document.querySelector(".testimonials-section .left").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.children.length) % testimonials.children.length;
  showTestimonial(testimonialIndex);
});

// ==================== BLOG CARD CAROUSEL (OPTIONAL) ====================
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.batch(".blog-card", {
  start: "top 85%",
  once: true, // 🔥 animates only once (VERY IMPORTANT)
  onEnter: batch => {
    gsap.from(batch, {
      opacity: 0,
      scale: 0.95,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    });
  }
});


// ==================== INSTAGRAM HOVER EFFECTS ====================
const instaImgs = document.querySelectorAll(".instagram-grid img");
instaImgs.forEach(img => {
  img.addEventListener("mouseenter", () => {
    gsap.to(img, { scale: 1.1, duration: 0.3 });
  });
  img.addEventListener("mouseleave", () => {
    gsap.to(img, { scale: 1, duration: 0.3 });
  });
});

