// Typing effect for hero section
document.addEventListener("DOMContentLoaded", function () {
  const typedTextSpan = document.querySelector(".typed-text");
  
  const textArray = [
    "responsive websites.",
    "modern UI designs.",
    "interactive experiences.",
    "optimized applications.",
  ];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      // Pause before starting to erase
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      // Move to next text
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Modified parallax effect for hero background - reduced intensity
document.addEventListener("mousemove", function (e) {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const heroRect = hero.getBoundingClientRect();

  if (
    e.clientX >= heroRect.left &&
    e.clientX <= heroRect.right &&
    e.clientY >= heroRect.top &&
    e.clientY <= heroRect.bottom
  ) {
    // Reduced movement intensity from 25 to 75 (smaller movement)
    const xAxis = (window.innerWidth / 2 - e.pageX) / 75;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 75;

    const heroImage = document.querySelector(".hero-bg-image");
    if (heroImage) {
      heroImage.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    }
  }
});

// Glitch effect animation enhancement
document.addEventListener("DOMContentLoaded", function () {
  const glitchText = document.querySelector(".glitch-text");

  if (glitchText) {
    // Random glitch effect
    setInterval(() => {
      glitchText.classList.add("active-glitch");

      setTimeout(() => {
        glitchText.classList.remove("active-glitch");
      }, 200);
    }, 3000);
  }
});

// Scroll indicator animation
document.addEventListener("DOMContentLoaded", function () {
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const overviewSection = document.getElementById("overview");
      if (overviewSection) {
        overviewSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

// Add some additional CSS styles dynamically
document.addEventListener("DOMContentLoaded", function () {
  // Add active-glitch class styles
  const style = document.createElement("style");
  style.textContent = `
    .active-glitch {
      animation: intense-glitch 0.3s linear;
    }
    
    @keyframes intense-glitch {
      0% { 
        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        transform: translate(0);
      }
      25% {
        text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        transform: translate(-2px, 2px);
      }
      50% {
        text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                    0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                    -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
        transform: translate(2px, -2px);
      }
      75% {
        text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                    0.05em 0 0 rgba(0, 255, 0, 0.75),
                    0 -0.05em 0 rgba(0, 0, 255, 0.75);
        transform: translate(-2px, -2px);
      }
      100% {
        text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                    -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                    -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
        transform: translate(0);
      }
    }
    
    .scroll-indicator {
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .scroll-indicator:hover {
      transform: translateY(5px) translateX(-50%);
    }
  `;
  document.head.appendChild(style);
});

// Initialize AOS for hero elements specifically
document.addEventListener("DOMContentLoaded", function () {
  if (typeof AOS !== "undefined") {
    // Refresh AOS for hero elements
    const heroElements = document.querySelectorAll(".hero *[data-aos]");
    if (heroElements.length > 0) {
      AOS.refresh();
    }
  }
});

// NEW: Fix hero section layout on page load
window.addEventListener("load", function () {
  // Fix hero background height
  const heroBackground = document.querySelector(".hero-background");
  if (heroBackground) {
    heroBackground.style.height = "100%";
  }

  // Ensure code snap image is properly loaded and positioned
  const codeSnapImage = document.querySelector(".code-snap-image");
  if (codeSnapImage) {
    codeSnapImage.onload = function () {
      // Force layout recalculation after image loads
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.style.opacity = "0.99";
        setTimeout(() => {
          heroContent.style.opacity = "1";
        }, 10);
      }
    };

    // If image is already loaded, trigger manually
    if (codeSnapImage.complete) {
      const event = new Event("load");
      codeSnapImage.dispatchEvent(event);
    }
  }

  // Balance hero section elements
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    // Ensure stats are properly positioned
    heroStats.style.display = "flex";
    heroStats.style.justifyContent = "center";
  }
});

// NEW: Handle window resize to maintain hero layout
window.addEventListener("resize", function () {
  // Recalculate hero section layout on window resize
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent) {
    // Adjust hero content based on window height
    if (window.innerHeight < 700) {
      heroContent.style.gap = "1rem";
    } else {
      heroContent.style.gap = "2rem";
    }
  }
});

// Simple cursor implementation with enhanced performance
document.addEventListener('DOMContentLoaded', function() {
  // Create cursor element if it doesn't exist
  if (!document.querySelector('.cursor')) {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
  }

  const cursor = document.querySelector('.cursor');
  
  // Hide default cursor
  document.body.style.cursor = 'none';
  
  // Performance optimized cursor movement - uses direct style manipulation for speed
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Speed/smoothing factor - increased from 0.8 to 0.95 for near-instant response
  const speed = 0.95;
  
  // Use passive event listener for better performance
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });
  
  // Pre-calculate transform properties
  let transform = '';
  let isFrameScheduled = false;
  
  function updateCursor() {
    // Calculate position with improved performance
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    // Faster transform calculation - only update when values change significantly
    const newTransform = `translate3d(${Math.round(cursorX)}px, ${Math.round(cursorY)}px, 0) translate(-50%, -50%)`;
    if (transform !== newTransform) {
      transform = newTransform;
      cursor.style.transform = transform;
    }
    
    isFrameScheduled = false;
    requestAnimationFrame(updateCursor);
  }
  
  // Start the animation loop
  requestAnimationFrame(updateCursor);
  
  // Throttle mousemove updates for better performance
  document.addEventListener('mousemove', function() {
    if (!isFrameScheduled) {
      isFrameScheduled = true;
      requestAnimationFrame(updateCursor);
    }
  }, { passive: true });
  
  // Use event delegation for better performance with many elements
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest('a, button, .card, .project-card, .service-card, .download-cv')) {
      cursor.classList.add('hover');
    }
  }, { passive: true });
  
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest('a, button, .card, .project-card, .service-card, .download-cv')) {
      cursor.classList.remove('hover');
    }
  }, { passive: true });
  
  // Optimized click animation - directly manipulate transform for faster response
  document.addEventListener('mousedown', function() {
    cursor.style.transform = `translate3d(${Math.round(cursorX)}px, ${Math.round(cursorY)}px, 0) translate(-50%, -50%) scale(0.9)`;
  }, { passive: true });
  
  document.addEventListener('mouseup', function() {
    cursor.style.transform = `translate3d(${Math.round(cursorX)}px, ${Math.round(cursorY)}px, 0) translate(-50%, -50%)`;
  }, { passive: true });
  
  // Hide cursor when mouse leaves the window
  document.addEventListener('mouseleave', function() {
    cursor.classList.add('hidden');
  }, { passive: true });
  
  // Show cursor when mouse enters the window
  document.addEventListener('mouseenter', function() {
    cursor.classList.remove('hidden');
  }, { passive: true });
  
  // Handle touch devices - hide custom cursor on touch devices
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    
    // Reset cursor style for touch devices
    document.body.style.cursor = 'auto';
  }
});

// Enhance mobile navigation with active section highlighting
document.addEventListener("DOMContentLoaded", function() {
  // Get all sections that should be tracked
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link a");
  
  // Function to highlight active section in navigation
  function highlightActiveSection() {
    // Get current scroll position
    let scrollPosition = window.scrollY + 150; // Offset to trigger earlier
    
    // Check each section to see if it's in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // If the section is in view, highlight corresponding nav link
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  
  // Initial call to set active link on page load
  highlightActiveSection();
  
  // Update active link on scroll
  window.addEventListener("scroll", highlightActiveSection);
});

// Improve mobile menu behavior with touch events
document.addEventListener("DOMContentLoaded", function() {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  
  // Add touch event handlers for mobile
  if (menuBtn && navLinks) {
    // Add smooth transition when opening/closing menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Handle swipe to close menu
    document.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener("touchend", e => {
      touchEndX = e.changedTouches[0].screenX;
      
      // If menu is open and user swipes left, close it
      if (navLinks.classList.contains("active") && touchStartX - touchEndX > 50) {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    }, { passive: true });
  }
});

// Enhance mobile menu with scroll indicator
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelector(".nav-links");
  const menuBtn = document.querySelector(".menu-btn");
  
  // Add scroll indicator only when menu is opened
  if (menuBtn && navLinks) {
    // Create scroll indicator element
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('menu-scroll-indicator');
    scrollIndicator.innerHTML = '<span></span>';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .menu-scroll-indicator {
        position: fixed;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 36px;
        height: 18px;
        z-index: 1002;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .menu-scroll-indicator span {
        display: block;
        width: 36px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        animation: pulseIndicator 2s infinite;
      }
      
      @keyframes pulseIndicator {
        0% { opacity: 0.3; transform: scaleX(0.8); }
        50% { opacity: 0.8; transform: scaleX(1); }
        100% { opacity: 0.3; transform: scaleX(0.8); }
      }
      
      .menu-scroll-indicator.visible {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(scrollIndicator);
    
    // Toggle scroll indicator visibility when menu opens/closes
    menuBtn.addEventListener("click", function() {
      if (navLinks.classList.contains("active")) {
        // Check if menu content is scrollable
        setTimeout(() => {
          if (navLinks.scrollHeight > navLinks.clientHeight) {
            scrollIndicator.classList.add('visible');
          } else {
            scrollIndicator.classList.remove('visible');
          }
        }, 300);
      } else {
        scrollIndicator.classList.remove('visible');
      }
    });
    
    // Hide indicator when user starts scrolling
    navLinks.addEventListener("scroll", function() {
      if (navLinks.scrollTop > 20) {
        scrollIndicator.classList.remove('visible');
      }
    });
    
    // Fix body scroll issues
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        scrollIndicator.classList.remove('visible');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      });
    });
  }
});
