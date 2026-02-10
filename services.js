document.addEventListener("scroll", () => {
  const animatedElements = document.querySelectorAll(".service-card, .testimonials blockquote");
  animatedElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});


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

  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.style.display = "none";
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for contacting Tens! We'll get back to you soon.");
      form.reset();
    });
  }
});

// GSAP ScrollTrigger panel cover (hero included)
gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray("section");

// Make body scrollable
document.body.style.height = `${panels.length * 100}vh`;

panels.forEach((panel, i) => {
  if (i === 0) return; // skip first section

  ScrollTrigger.create({
    trigger: panels[i - 1],
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: false
  });

  gsap.from(panel, {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: panels[i - 1],
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
});


















































// ===============================
// Floating sparkle particles
// ===============================
const sparkleLayer = document.querySelector(".sparkle-layer");

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.animationDuration = 6 + Math.random() * 6 + "s";
  sparkle.style.opacity = Math.random();

  sparkleLayer.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 12000);
}

// Create sparkles continuously
setInterval(createSparkle, 400);

















// Initialize the map and set view
const map = L.map('map').setView([6.5244, 3.3792], 13); // Lagos coordinates

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a marker with popup
L.marker([6.5244, 3.3792]).addTo(map)
  .bindPopup('Hello from Lagos!')
  .openPopup();
