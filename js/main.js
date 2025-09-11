// ===== GLOBAL VARIABLES =====
const darkModeBtn = document.getElementById("darkModeBtn");
const scrollToTopBtn = document.getElementById("toTop");
const body = document.body;
const personalImg = document.getElementById("MYphoto");
const navbar = document.querySelector(".navbar");

// Theme constants
const THEME_KEY = "portfolio-theme";
const DARK_THEME = "dark-mode";
const LIGHT_THEME = "light";

// Image paths
const LIGHT_IMAGE = "img/Picsart_25-02-16_21-36-35-726.jpg";
const DARK_IMAGE = "img/Linked In.png";

// ===== UTILITY FUNCTIONS =====

// Smooth image transition function
function changeImage(newSrc) {
  if (!personalImg) return;

  personalImg.style.opacity = "0";

  setTimeout(() => {
    personalImg.src = newSrc;
    personalImg.style.opacity = "1";
  }, 300);
}

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== THEME MANAGEMENT =====

// Get current theme from localStorage or default to light
function getCurrentTheme() {
  return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
}

// Apply theme to the page
function applyTheme(theme) {
  if (theme === DARK_THEME) {
    body.classList.add(DARK_THEME);
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    changeImage(DARK_IMAGE);
  } else {
    body.classList.remove(DARK_THEME);
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    changeImage(LIGHT_IMAGE);
  }
}

// Toggle theme function
function toggleTheme() {
  const currentTheme = body.classList.contains(DARK_THEME)
    ? LIGHT_THEME
    : DARK_THEME;

  applyTheme(currentTheme);
  localStorage.setItem(THEME_KEY, currentTheme);

  // Add a subtle animation to the theme button
  darkModeBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    darkModeBtn.style.transform = "scale(1)";
  }, 150);
}

// ===== SCROLL FUNCTIONALITY =====

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Handle scroll events
const handleScroll = throttle(() => {
  const scrollY = window.scrollY;

  // Show/hide scroll to top button
  if (scrollY >= 600) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }

  // Add navbar background on scroll
  if (scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}, 16); // ~60fps

// ===== SMOOTH SCROLLING FOR NAVIGATION =====

// Handle navigation link clicks
function handleNavClick(e) {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;

  e.preventDefault();

  const targetId = target.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    // Close mobile menu if open
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      const navbarToggler = document.querySelector(".navbar-toggler");
      navbarToggler.click();
    }
  }
}

// ===== SCROLL ANIMATIONS =====

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el) => observer.observe(el));
}

// ===== SKILL BAR ANIMATIONS =====

// Animate skill bars when they come into view
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.style.width;
          skillBar.style.width = "0%";

          setTimeout(() => {
            skillBar.style.width = width;
          }, 200);

          skillObserver.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));
}

// ===== TYPING ANIMATION =====

// Typing effect for hero title
function initTypingAnimation() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  const words = text.split(" ");
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      heroTitle.textContent = text.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      heroTitle.textContent = text.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentCharIndex === text.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing
    }

    setTimeout(typeWriter, typeSpeed);
  }

  // Start typing animation after a delay
  setTimeout(typeWriter, 1000);
}

// ===== PARTICLE ANIMATION =====

// Create floating particles in hero section
function createParticles() {
  const heroParticles = document.querySelector(".hero-particles");
  if (!heroParticles) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: var(--primary-color);
      border-radius: 50%;
      opacity: 0.3;
      animation: float ${5 + Math.random() * 10}s infinite linear;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 5}s;
    `;
    heroParticles.appendChild(particle);
  }

  // Add CSS animation for particles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes float {
      0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
      10% { opacity: 0.3; }
      90% { opacity: 0.3; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ===== FORM HANDLING =====

// Handle contact form submission (if added later)
function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Add loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual implementation)
  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.");
    e.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy load images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Preload critical images
function preloadImages() {
  const criticalImages = [LIGHT_IMAGE, DARK_IMAGE];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
  // ESC key to close mobile menu
  if (e.key === "Escape") {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      const navbarToggler = document.querySelector(".navbar-toggler");
      navbarToggler.click();
    }
  }

  // Enter key for theme toggle
  if (e.key === "Enter" && e.target === darkModeBtn) {
    toggleTheme();
  }
}

// Announce theme changes to screen readers
function announceThemeChange(theme) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = `Theme changed to ${theme} mode`;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// ===== ERROR HANDLING =====

// Global error handler
function handleError(error) {
  console.error("Portfolio Error:", error);

  // Show user-friendly error message if needed
  if (error.name === "NetworkError") {
    console.warn(
      "Network error detected. Some features may not work properly."
    );
  }
}

// ===== INITIALIZATION =====

// Initialize all functionality when DOM is loaded
function init() {
  try {
    // Set initial theme
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);

    // Set current year in footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Initialize features
    initScrollAnimations();
    animateSkillBars();
    createParticles();
    preloadImages();
    initLazyLoading();

    // Add event listeners
    if (darkModeBtn) {
      darkModeBtn.addEventListener("click", toggleTheme);
    }

    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener("click", scrollToTop);
    }

    // Navigation smooth scrolling
    document.addEventListener("click", handleNavClick);

    // Scroll events
    window.addEventListener("scroll", handleScroll);

    // Keyboard navigation
    document.addEventListener("keydown", handleKeyboardNavigation);

    // Contact form (if exists)
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", handleContactForm);
    }

    // Handle resize events
    window.addEventListener(
      "resize",
      debounce(() => {
        // Recalculate any position-dependent elements
        console.log("Window resized");
      }, 250)
    );

    console.log("Portfolio initialized successfully!");
  } catch (error) {
    handleError(error);
  }
}

// ===== LOADING STATES =====

// Show loading state
function showLoading() {
  document.body.classList.add("loading");
}

// Hide loading state
function hideLoading() {
  document.body.classList.remove("loading");
}

// ===== PAGE VISIBILITY API =====

// Handle page visibility changes
function handleVisibilityChange() {
  if (document.hidden) {
    // Page is hidden, pause animations if needed
    console.log("Page hidden");
  } else {
    // Page is visible, resume animations
    console.log("Page visible");
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

// ===== SERVICE WORKER REGISTRATION =====

// Register service worker for PWA capabilities (optional)
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((error) => {
        console.log("SW registration failed:", error);
      });
  }
}

// ===== ANALYTICS =====

// Simple analytics tracking (replace with your preferred solution)
function trackEvent(eventName, eventData = {}) {
  // Example: Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData);
  }

  console.log("Event tracked:", eventName, eventData);
}

// Track theme changes
function trackThemeChange(theme) {
  trackEvent("theme_change", {
    theme: theme,
    timestamp: new Date().toISOString(),
  });
}

// ===== ENHANCED THEME TOGGLE =====

// Enhanced theme toggle with analytics and announcements
function enhancedToggleTheme() {
  const newTheme = body.classList.contains(DARK_THEME)
    ? LIGHT_THEME
    : DARK_THEME;

  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  announceThemeChange(newTheme);
  trackThemeChange(newTheme);

  // Visual feedback
  darkModeBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    darkModeBtn.style.transform = "scale(1)";
  }, 150);
}

// ===== DOM READY =====

// Wait for DOM to be fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ===== EXPORT FOR TESTING =====

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    toggleTheme,
    changeImage,
    scrollToTop,
    getCurrentTheme,
    applyTheme,
  };
}
