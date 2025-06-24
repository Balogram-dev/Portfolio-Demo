// Navbar functionality and mobile menu
document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  
  console.log("Navbar initialization started"); // Debug log
  
  // Check if we're on mobile or desktop
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Handle navbar scroll effect
  if (navbar) {
    function handleNavbarScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
    
    // Initial check
    handleNavbarScroll();
    
    // Listen for scroll
    window.addEventListener("scroll", handleNavbarScroll);
  }
  
  // Handle mobile menu toggle - improved and simplified
  if (menuBtn && navLinks) {
    console.log("Menu button and nav links found"); // Debug log
    
    // Menu toggle should only work on mobile
    menuBtn.addEventListener("click", function(e) {
      // Skip if on desktop
      if (!isMobile()) return;
      
      e.stopPropagation(); // Prevent click from bubbling to document
      e.preventDefault(); // Prevent default button behavior
      
      console.log("Menu button clicked"); // Debug log
      
      // Toggle menu with a slight delay
      setTimeout(() => {
        menuBtn.classList.toggle("active");
        navLinks.classList.toggle("active");
        navbar.classList.toggle("menu-open");
        document.body.classList.toggle("no-scroll");
        
        console.log("Menu state:", navLinks.classList.contains("active") ? "open" : "closed"); // Debug log
      }, 10);
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", function(e) {
      // Skip if on desktop
      if (!isMobile()) return;
      
      if (navLinks.classList.contains("active") && 
          !e.target.closest(".navbar") && 
          !e.target.closest(".nav-links")) {
        navbar.classList.remove("menu-open");
        menuBtn.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
    
    // Close menu when escape key is pressed
    document.addEventListener("keydown", function(e) {
      // Skip if on desktop
      if (!isMobile()) return;
      
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        navbar.classList.remove("menu-open");
        menuBtn.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
    
    // Ensure menu closes when a link is clicked
    const allLinks = document.querySelectorAll(".nav-link a, .download-cv");
    allLinks.forEach(link => {
      link.addEventListener("click", function() {
        // Skip if on desktop
        if (!isMobile()) return;
        
        navbar.classList.remove("menu-open");
        menuBtn.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
    
    // Add scroll position check for active menu items (works on both mobile and desktop)
    const sections = document.querySelectorAll("section[id]");
    const navLinkItems = document.querySelectorAll(".nav-link a");
    
    function highlightActiveSection() {
      // Get current scroll position with offset for navbar height
      let scrollPosition = window.scrollY + 100;
      
      // Loop through each section
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        
        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Highlight the matching nav item
          navLinkItems.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }
    
    // Initial call on page load
    highlightActiveSection();
    
    // Check active section on scroll
    window.addEventListener("scroll", highlightActiveSection);
  } else {
    console.warn("Menu button or nav links not found"); // Debug warning
  }
  
  // Fix for iOS 100vh issue (viewport units don't work correctly on iOS)
  function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log("Viewport height set:", vh * 100); // Debug log
  }
  
  // Set the height on page load
  setViewportHeight();
  
  // Update on window resize
  window.addEventListener('resize', setViewportHeight);
  
  // Add a touch event handler for better mobile support
  if (menuBtn) {
    menuBtn.addEventListener('touchend', function(e) {
      // Skip if on desktop
      if (!isMobile()) return;
      
      e.preventDefault(); // Prevent default touch behavior
      this.click(); // Trigger the click event
    }, { passive: false });
  }
  
  console.log("Navbar initialization completed"); // Debug log
}); 