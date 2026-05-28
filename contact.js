/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");    // show/hide menu
  hamburger.classList.toggle("active"); // animate X
});

/* ===== FADE-IN ON SCROLL ===== */
const elements = document.querySelectorAll(".fade-in");

const reveal = () => {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", reveal);
reveal();

/* ===== CONTACT FORM (UI only) ===== */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "Message sent successfully 💅✨";
  form.reset();
});
