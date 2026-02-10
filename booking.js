const hamburger = document.getElementById("booking-hamburger");
const menuOverlay = document.getElementById("booking-menu-overlay");
const closeBtn = document.getElementById("booking-close-btn");

hamburger.addEventListener("click", () => {
    menuOverlay.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    menuOverlay.style.display = "none";
});

// ==========================
// PAYMENT MODAL
// ==========================
const paymentBtn = document.getElementById("booking-payment-btn");
const paymentModal = document.getElementById("bookingPaymentModal");
const closePaymentModal = document.getElementById("closePaymentModal");

if(paymentBtn){
  paymentBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    paymentModal.style.display = "flex";
  });
}

if(closePaymentModal){
  closePaymentModal.addEventListener("click", ()=>{
    paymentModal.style.display = "none";
  });
}

// Close modal when clicking outside content
window.addEventListener("click", (e)=>{
  if(e.target === paymentModal){
    paymentModal.style.display = "none";
  }
});

// ==========================
// GSAP SCROLL ANIMATIONS
// ==========================
gsap.registerPlugin(ScrollTrigger);

// Animate Booking Form
gsap.from(".booking-form", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".booking-form",
    start: "top 90%",
    end: "top 60%",
    toggleActions: "play none none reverse"
  }
});

// Animate Policies
gsap.from(".booking-policies-container", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".booking-policies-container",
    start: "top 90%",
    end: "top 60%",
    toggleActions: "play none none reverse"
  }
});

// Animate Payment Form
gsap.from(".booking-payment-form", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.4,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".booking-payment-form",
    start: "top 90%",
    end: "top 60%",
    toggleActions: "play none none reverse"
  }
});

// Animate Map
gsap.from(".booking-map-container iframe", {
  opacity: 0,
  scale: 0.9,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".booking-map-container",
    start: "top 90%",
    end: "top 60%",
    toggleActions: "play none none reverse"
  }
});
