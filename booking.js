// ============================================
// TENS BY TONIA - BOOKING JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initCustomCursor();
  initNavigation();
  initTestimonialSlider();
  initFAQAccordion();
  initServiceSelection();
  initBookingSteps();
  initPaymentMethods();
  initFormValidation();
  initModal();
  initNewsletterForm();
  initDateInput();
  initSmoothScroll();
});

// Custom Cursor
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (!cursorDot || !cursorOutline) return;
  
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    return;
  }
  
  window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
  });
  
  const interactiveElements = document.querySelectorAll('a, button, .service-card, .payment-method, input, select, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOutline.style.borderColor = '#ec4899';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.borderColor = 'rgba(236, 72, 153, 0.5)';
    });
  });
}

// Navigation
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Testimonial Slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.testimonial-btn.prev');
  const nextBtn = document.querySelector('.testimonial-btn.next');
  
  if (testimonials.length === 0) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    testimonials.forEach((t, i) => {
      t.classList.remove('active');
      dots[i]?.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    dots[index]?.classList.add('active');
    currentSlide = index;
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
  }
  
  nextBtn?.addEventListener('click', nextSlide);
  prevBtn?.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  setInterval(nextSlide, 5000);
}

// FAQ Accordion
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Service Selection
function initServiceSelection() {
  const cards = document.querySelectorAll('.service-card');
  const serviceSelect = document.getElementById('service-select');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      const serviceValue = card.dataset.service;
      if (serviceSelect) {
        serviceSelect.value = serviceValue;
        updateSummary();
      }
      
      // Scroll to booking
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateSummary);
  }
}

// Booking Steps
function initBookingSteps() {
  const steps = document.querySelectorAll('.step');
  const contents = document.querySelectorAll('.form-step');
  const nextBtns = document.querySelectorAll('.next-step');
  const prevBtns = document.querySelectorAll('.prev-step');
  
  let currentStep = 0;
  
  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.remove('active', 'completed');
      if (i < index) step.classList.add('completed');
      if (i === index) step.classList.add('active');
    });
    
    contents.forEach((content, i) => {
      content.classList.remove('active');
      if (i === index) content.classList.add('active');
    });
    
    currentStep = index;
    
    if (index === 2) {
      updateSummary();
    }
  }
  
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep) && currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      }
    });
  });
  
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });
  
  showStep(0);
}

function validateStep(step) {
  const currentContent = document.querySelector(`.form-step[data-step-content="${step + 1}"]`);
  if (!currentContent) return true;
  
  const requiredFields = currentContent.querySelectorAll('input[required], select[required]');
  let valid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      valid = false;
      field.style.borderColor = '#ff4444';
      setTimeout(() => {
        field.style.borderColor = '';
      }, 3000);
    }
  });
  
  return valid;
}

function updateSummary() {
  const serviceSelect = document.getElementById('service-select');
  const dateInput = document.querySelector('input[name="date"]');
  const timeSelect = document.querySelector('select[name="time"]');
  
  const selectedOption = serviceSelect?.options[serviceSelect.selectedIndex];
  
  if (selectedOption && selectedOption.value) {
    document.getElementById('summary-service').textContent = selectedOption.text.split(' — ')[0];
    document.getElementById('summary-duration').textContent = selectedOption.dataset.duration || '-';
    document.getElementById('summary-total').textContent = '₦' + parseInt(selectedOption.dataset.price || 0).toLocaleString();
  }
  
  if (dateInput?.value && timeSelect?.value) {
    const date = new Date(dateInput.value);
    const formattedDate = date.toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('summary-datetime').textContent = `${formattedDate} at ${timeSelect.value}`;
  }
}

// Payment Methods
function initPaymentMethods() {
  const methods = document.querySelectorAll('.payment-method input');
  const cardFields = document.getElementById('card-fields');
  const transferFields = document.getElementById('transfer-fields');
  const paypalFields = document.getElementById('paypal-fields');
  
  methods.forEach(method => {
    method.addEventListener('change', () => {
      const value = method.value;
      
      if (cardFields) cardFields.style.display = value === 'card' ? 'block' : 'none';
      if (transferFields) transferFields.style.display = value === 'transfer' ? 'block' : 'none';
      if (paypalFields) paypalFields.style.display = value === 'paypal' ? 'block' : 'none';
    });
  });
}

// Form Validation
function initFormValidation() {
  // Card number formatting
  const cardNumber = document.querySelector('input[name="cardnumber"]');
  cardNumber?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
  });
  
  // Expiry date formatting
  const expiry = document.querySelector('input[name="expiry"]');
  expiry?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
  });
  
  // CVV formatting
  const cvv = document.querySelector('input[name="cvv"]');
  cvv?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
  });
}

// Modal
function initModal() {
  const modal = document.getElementById('success-modal');
  const closeBtn = document.getElementById('modal-close');
  const doneBtn = document.getElementById('modal-done');
  const paymentForm = document.getElementById('payment-form');
  
  function openModal() {
    const email = document.querySelector('input[name="email"]')?.value;
    const date = document.querySelector('input[name="date"]')?.value;
    const time = document.querySelector('select[name="time"]')?.value;
    
    if (email) document.getElementById('confirm-email').textContent = email;
    if (date) document.getElementById('confirm-date').textContent = new Date(date).toLocaleDateString('en-NG');
    if (time) document.getElementById('confirm-time').textContent = time;
    
    const ref = '#TTB-' + Date.now().toString().slice(-6);
    document.getElementById('confirm-ref').textContent = ref;
    
    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  closeBtn?.addEventListener('click', closeModal);
  doneBtn?.addEventListener('click', closeModal);
  
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  
  paymentForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    openModal();
  });
}

// Newsletter Form
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
      alert('Thank you for subscribing!');
      form.reset();
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// Date Input
function initDateInput() {
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Utilities
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}