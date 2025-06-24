// Add this to your main.js file
document.addEventListener("DOMContentLoaded", function () {
  // Adjust hero stats position
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    // Set a slight delay to ensure all elements are properly loaded
    setTimeout(() => {
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        // Calculate appropriate position
        const contentHeight = heroContent.offsetHeight;
        const statsHeight = heroStats.offsetHeight;
        const newPosition = contentHeight - statsHeight - 100; // Adjust as needed

        // Apply the position
        heroStats.style.marginTop = `${newPosition}px`;
      }
    }, 500);
  }
});

// Initialize particles function
function initParticles(elementId, color = "#6C63FF") {
  try {
    const element = document.getElementById(elementId);
    if (!element) return;

    particlesJS(elementId, {
      particles: {
        number: {
          value: window.innerWidth < 768 ? 40 : 80,
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        color: {
          value: color,
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 1.5,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: true,
            speed: 3,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 180,
          color: color,
          opacity: 0.5,
          width: 1.5,
          shadow: {
            enable: true,
            color: color,
            blur: 5,
          },
        },
        move: {
          enable: true,
          speed: 4,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 800,
            rotateY: 1500,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          repulse: {
            distance: 150,
            duration: 0.4,
            speed: 1,
            factor: 5,
            maxSpeed: 50,
            easing: "ease-out-quad",
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  } catch (error) {
    console.error(`Failed to initialize particles for ${elementId}:`, error);
  }
}

// Custom cursor setup - removed to avoid duplication with script.js implementation

// Responsive Design Handler
function handleResponsiveDesign() {
  const width = window.innerWidth;
  try {
    [
      "particles-js-overview",
      "particles-js-work",
      "particles-js-footer",
    ].forEach((id) => {
      let particleCount = width <= 480 ? 20 : width <= 767 ? 30 : 50;
      let particleSize = width <= 480 ? 1 : 2;

      initParticles(id, "#6C63FF");
    });
  } catch (error) {
    console.error("Responsive particles update failed:", error);
  }
}

// Intersection Observer setup
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.1 }
);

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Initialize particles
    initParticles("particles-js-overview", "#6C63FF");
    initParticles("particles-js-work", "#6C63FF");
    initParticles("particles-js-footer", "#6C63FF");

    // Initialize responsive design
    handleResponsiveDesign();

    // Initialize scroll animations
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    // Initialize smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Initialize process steps
    const processSteps = document.querySelectorAll(".process-step");
    processSteps.forEach((step, index) => {
      step.style.transitionDelay = `${index * 0.1}s`;
    });

    // Initialize tool items
    const toolItems = document.querySelectorAll(".tool-item");
    toolItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "scale(1.1)";
      });
      item.addEventListener("mouseleave", () => {
        item.style.transform = "scale(1)";
      });
    });

    // Initialize mobile menu
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
      });

      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
          menuBtn.classList.remove("active");
          navLinks.classList.remove("active");
          document.body.classList.remove("no-scroll");
        });
      });
    }

    // Initialize contact form
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        try {
          console.log("Form data:", data);
          alert("Message sent successfully!");
          contactForm.reset();
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to send message. Please try again.");
        }
      });
    }
  } catch (error) {
    console.error("Initialization failed:", error);
  }
});

// Resize handler
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResponsiveDesign, 250);
});
