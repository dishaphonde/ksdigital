// KS Digital Global JavaScript Controller

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParticleBackground();
  initNavbarScroll();
  initMobileMenu();
  initActiveLinks();
  initScrollAnimations();
  initCounters();
  initAccordions();
  initMarquee();
  initContactForms();
  initBackToTop();
  initCopyrightYear();
  initQueryPrefill();
});

/* ---------------------------------------------------
   1. Dynamic Particle Canvas Background
--------------------------------------------------- */
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const particleCount = 60;
  const connectionDistance = 120;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      // Electric blue or violet colors
      this.color = Math.random() > 0.5 ? 'rgba(0, 194, 255, 0.4)' : 'rgba(123, 47, 255, 0.4)';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw() {
      const isLightMode = document.body.classList.contains('light-mode');
      if (isLightMode) {
        ctx.fillStyle = this.color.includes('0, 194') ? 'rgba(0, 112, 224, 0.15)' : 'rgba(106, 31, 224, 0.15)';
      } else {
        ctx.fillStyle = this.color;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particlesArray = [];
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const isLightMode = document.body.classList.contains('light-mode');
          const maxOpacity = isLightMode ? 0.05 : 0.15;
          const opacity = (1 - distance / connectionDistance) * maxOpacity;
          
          if (isLightMode) {
            ctx.strokeStyle = `rgba(106, 31, 224, ${opacity})`;
          } else {
            ctx.strokeStyle = `rgba(0, 194, 255, ${opacity})`;
          }
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    const isLightMode = document.body.classList.contains('light-mode');
    if (!isLightMode) {
      // Draw background subtle radial glow in dark mode
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
      gradient.addColorStop(0, '#0d0d15');
      gradient.addColorStop(1, '#0A0A0F');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  init();
  animate();
}

/* ---------------------------------------------------
   2. Sticky Navbar Scroll Effect
--------------------------------------------------- */
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately in case page is refreshed while scrolled
}

/* ---------------------------------------------------
   3. Mobile Responsive Menu
--------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate menu toggle icon spans
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/* ---------------------------------------------------
   4. Highlight Active Navigation Links
--------------------------------------------------- */
function initActiveLinks() {
  const links = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const href = link.getAttribute('href');
    
    // Handle home page variations (/ and /index.html and absolute/relative link checks)
    if (
      currentPath === '/' || 
      currentPath === '/index.html' || 
      currentPath.endsWith('/Ksdigital/') ||
      currentPath.endsWith('/Ksdigital/index.html')
    ) {
      if (href === '/' || href === '/index.html' || href === '../index.html' || href === 'index.html') {
        link.classList.add('active');
      }
    } else {
      // For subpages, match folder name in the URL
      if (href !== '/' && href !== '/index.html' && href !== '../index.html' && href !== 'index.html') {
        const cleanHref = href.replace(/\.\.\//g, '').replace(/\//g, '');
        const cleanPath = currentPath.replace(/\//g, '');
        if (cleanPath.includes(cleanHref)) {
          link.classList.add('active');
        }
      }
    }
  });
}

/* ---------------------------------------------------
   5. Scroll-based Slide In / Fade In Animations
--------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-section');
  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

/* ---------------------------------------------------
   6. Stat Counters Animation
--------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (counters.length === 0) return;

  const countUp = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const speed = 1000; // duration in ms
    const increment = target / (speed / 16); // ~60fps
    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.floor(current).toLocaleString() + '+';
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toLocaleString() + '+';
      }
    };

    updateCount();
  };

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -30px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));

  // Fallback: if IntersectionObserver never fires (e.g. element already visible on load),
  // trigger any counter whose bounding rect is inside the viewport after a short delay.
  setTimeout(() => {
    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Only animate if still showing the initial '0+' value
        if (counter.innerText === '0+' || counter.innerText === '0') {
          countUp(counter);
        }
      }
    });
  }, 300);
}

/* ---------------------------------------------------
   7. Accordion FAQ Collapse/Expand
--------------------------------------------------- */
function initAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open accordions
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle active status
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ---------------------------------------------------
   8. Client Logos Auto-scrolling Marquee Clone Logic
--------------------------------------------------- */
function initMarquee() {
  const marqueeContent = document.querySelector('.marquee-content');
  if (!marqueeContent) return;

  // Duplicate the children of marqueeContent to ensure seamless looping
  const children = Array.from(marqueeContent.children);
  children.forEach((child) => {
    const clone = child.cloneNode(true);
    marqueeContent.appendChild(clone);
  });
}

/* ---------------------------------------------------
   9. Web3Forms Connected Form Submissions
--------------------------------------------------- */
function initContactForms() {
  const forms = document.querySelectorAll('form');
  if (forms.length === 0) return;

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const statusDiv = form.querySelector('.form-status');
      const originalHtml = submitBtn.innerHTML;

      // Reset state of status banner
      if (statusDiv) {
        statusDiv.style.display = 'none';
        statusDiv.className = 'form-status';
        statusDiv.innerHTML = '';
      }

      // Input fields validation
      const emailInput = form.querySelector('input[name="email"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      let errors = [];

      if (emailInput) {
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
          errors.push('Please enter a valid email address.');
        }
      }

      if (phoneInput) {
        const phoneVal = phoneInput.value.trim();
        const cleanPhone = phoneVal.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
          errors.push('Phone number must be exactly 10 digits.');
        }
      }

      if (errors.length > 0) {
        if (statusDiv) {
          statusDiv.className = 'form-status error';
          statusDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${errors.join('<br>')}`;
          statusDiv.style.display = 'flex';
        }
        return;
      }
      
      // Submitting state
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      const formData = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200 && json.success) {
          if (statusDiv) {
            statusDiv.className = 'form-status success';
            statusDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! We\'ll get back to you shortly.';
            statusDiv.style.display = 'flex';
          }
          form.reset();
        } else {
          console.error(json);
          if (statusDiv) {
            statusDiv.className = 'form-status error';
            statusDiv.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Something went wrong. Please try again or call +91 7276503159';
            statusDiv.style.display = 'flex';
          }
        }
      })
      .catch((error) => {
        console.error(error);
        if (statusDiv) {
          statusDiv.className = 'form-status error';
          statusDiv.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Something went wrong. Please try again or call +91 7276503159';
          statusDiv.style.display = 'flex';
        }
      })
      .finally(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      });
    });
  });
}

/* ---------------------------------------------------
   10. Light/Dark Theme Toggle
--------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector('i');
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (icon) {
      icon.className = 'fa-solid fa-sun';
    }
  } else {
    document.body.classList.remove('light-mode');
    if (icon) {
      icon.className = 'fa-solid fa-moon';
    }
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    if (icon) {
      icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  });
}

/* ---------------------------------------------------
   11. Back to Top Button
--------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  // Show/hide button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility(); // Run immediately in case page loads already scrolled

  // Smooth scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ---------------------------------------------------
   12. Dynamic Copyright Year
--------------------------------------------------- */
function initCopyrightYear() {
  const yearSpans = document.querySelectorAll('.copyright-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = currentYear;
  });
}

/* ---------------------------------------------------
   13. URL Query Parameter Pre-filling (Contact Form)
   Supported params: plan, service, name, email, phone, message
   Example: /contact-us/?plan=Professional&service=SEO
--------------------------------------------------- */
function initQueryPrefill() {
  const form = document.querySelector('form');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);

  // Map URL param keys to form field name attributes
  const fieldMap = {
    name:    'name',
    email:   'email',
    phone:   'phone',
    message: 'message',
    service: 'service',
  };

  Object.entries(fieldMap).forEach(([param, fieldName]) => {
    const value = params.get(param);
    if (!value) return;

    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      if (field.tagName === 'SELECT') {
        // Try to select the matching option (case-insensitive)
        const options = Array.from(field.options);
        const match = options.find(
          (o) => o.value.toLowerCase() === value.toLowerCase() ||
                 o.text.toLowerCase() === value.toLowerCase()
        );
        if (match) field.value = match.value;
      } else {
        field.value = value;
      }
    }
  });

  // Handle 'plan' param: pre-fill message with plan context if message not set
  const plan = params.get('plan');
  if (plan) {
    const messageField = form.querySelector('[name="message"], textarea');
    if (messageField && !params.get('message')) {
      messageField.value = `Hi, I'm interested in the ${plan} plan. Please reach out to discuss further.`;
    }

    // Also highlight the plan in a banner if one exists
    const planBanner = document.getElementById('selected-plan-banner');
    if (planBanner) {
      planBanner.textContent = `You selected: ${plan} Plan`;
      planBanner.style.display = 'block';
    }
  }
}
