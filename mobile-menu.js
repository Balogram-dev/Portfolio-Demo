// Mobile menu handler - dedicated file
window.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');
  
  // Check if we're on mobile or desktop
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Initialize based on screen size
  function initializeMenu() {
    // Only handle mobile menu logic if we're on mobile
    if (isMobile()) {
      if (navLinks) navLinks.style.display = 'none';
      if (menuBtn) menuBtn.style.display = 'flex';
      
      // Reset menu state
      if (navLinks) navLinks.classList.remove('active');
      if (menuBtn) menuBtn.classList.remove('active');
      document.body.classList.remove('no-scroll');
      if (navbar) navbar.classList.remove('menu-open');
    } else {
      // On desktop, always show nav and hide button
      if (navLinks) {
        navLinks.style.display = 'flex';
        navLinks.classList.remove('active'); // Ensure no mobile active state
      }
      if (menuBtn) menuBtn.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  }
  
  // Initialize on page load
  initializeMenu();
  
  // Add click listener to menu button only on mobile
  if (menuBtn && navLinks) {
    // Menu button click handler
    menuBtn.addEventListener('click', function(e) {
      // Only process if we're on mobile
      if (!isMobile()) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle active classes
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Apply proper display style first
      if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        document.body.classList.add('no-scroll');
        navbar.classList.add('menu-open');
      } else {
        setTimeout(function() {
          if (isMobile()) { // Double-check we're still on mobile
            navLinks.style.display = 'none';
          }
        }, 300); // Wait for animation to complete
        document.body.classList.remove('no-scroll');
        navbar.classList.remove('menu-open');
      }
    });
    
    // Close menu when clicking on links
    const links = document.querySelectorAll('.nav-link a, .download-cv');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        // Only process if we're on mobile and menu is active
        if (!isMobile() || !navLinks.classList.contains('active')) return;
        
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
        navbar.classList.remove('menu-open');
        
        setTimeout(function() {
          if (isMobile()) { // Double-check we're still on mobile
            navLinks.style.display = 'none';
          }
        }, 300);
      });
    });
  }
  
  // Handle window resize properly
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      initializeMenu();
    }, 250); // Debounce resize events
  });
}); 