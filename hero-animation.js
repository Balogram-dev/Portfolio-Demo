// Hero section animations
document.addEventListener("DOMContentLoaded", function() {
  // Typing effect for "I'm a..."
  const typedEl = document.getElementById("typed");
  
  if (typedEl) {
    const roles = ["Web Developer", "UI/UX Designer", "Frontend Engineer", "Digital Craftsman"];
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
      const role = roles[currentRole];
      
      if (isDeleting) {
        // Remove character
        typedEl.textContent = role.substring(0, currentChar - 1);
        currentChar--;
        typingSpeed = 50;
      } else {
        // Add character
        typedEl.textContent = role.substring(0, currentChar + 1);
        currentChar++;
        typingSpeed = 100;
      }
      
      // Handle typing complete or deleted
      if (!isDeleting && currentChar === role.length) {
        // Pause at end of typing
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentRole = (currentRole + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next
      }
      
      setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);
  }
  
  // Stats counter animation
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length) {
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'));
      let count = 0;
      const increment = Math.ceil(target / 40);
      const counter = setInterval(() => {
        if (count >= target) {
          clearInterval(counter);
          el.textContent = target + '+';
        } else {
          count += increment;
          if (count > target) count = target;
          el.textContent = count + '+';
        }
      }, 50);
    }
    
    // Start counter animations when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statsParent = entry.target;
          const statEls = statsParent.querySelectorAll('.stat-number[data-target]');
          statEls.forEach(el => animateCounter(el));
          observer.unobserve(statsParent);
        }
      });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }
  
  // Enhanced parallax effect for hero background
  const hero = document.querySelector(".hero");
  const heroBackground = document.querySelector(".hero-bg-image");
  
  if (hero && heroBackground) {
    document.addEventListener("mousemove", function(e) {
      const heroRect = hero.getBoundingClientRect();
      
      if (
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right &&
        e.clientY >= heroRect.top &&
        e.clientY <= heroRect.bottom
      ) {
        // Subtle parallax effect
        const xAxis = (window.innerWidth / 2 - e.pageX) / 75;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 75;
        
        heroBackground.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
      }
    });
  }
  
  // Glitch effect enhancement
  const glitchText = document.querySelector(".glitch-text");
  if (glitchText) {
    setInterval(() => {
      glitchText.classList.add("active-glitch");
      
      setTimeout(() => {
        glitchText.classList.remove("active-glitch");
      }, 200);
    }, 3000);
  }
  
  // Add active-glitch class styles dynamically
  const style = document.createElement('style');
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
  `;
  document.head.appendChild(style);

  // Enhanced function to adjust hero layout based on screen size
  function adjustHeroLayout() {
    const hero = document.querySelector('.hero');
    const heroContainer = document.querySelector('.hero-container');
    const heroContent = document.querySelector('.hero-content');
    const codeSnap = document.querySelector('.code-snap-container');
    const heroStats = document.querySelector('.hero-stats');
    const navbar = document.querySelector('.navbar');
    
    if (!hero || !heroContainer || !heroContent || !heroStats) return;
    
    // Check viewport width and height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const aspectRatio = viewportWidth / viewportHeight;
    
    // Calculate main content height
    const contentHeight = heroContent.offsetHeight;
    const statsHeight = heroStats.offsetHeight;
    const totalHeight = contentHeight + statsHeight + 80; // Adding space for padding
    
    // Adjust container height based on content
    if (totalHeight > viewportHeight - 100) {
      hero.style.height = 'auto';
      heroContainer.style.minHeight = 'auto';
      heroContainer.style.paddingTop = '4rem';
      heroContainer.style.paddingBottom = '2rem';
    } else {
      hero.style.height = '';
      heroContainer.style.minHeight = '85vh';
    }
    
    // Adjustments for mobile devices
    if (viewportWidth <= 480) {
      // Account for navbar height on small screens
      const safeMarginTop = navbarHeight + 20;
      heroContent.style.marginTop = safeMarginTop + 'px';
      heroStats.style.paddingTop = '1rem';
      heroStats.style.paddingBottom = '2rem';
      
      // Extra adjustments for very small screens
      if (viewportHeight < 700) {
        heroContainer.style.paddingTop = '2rem';
        heroContainer.style.paddingBottom = '1rem';
        heroContent.style.gap = '1.5rem';
      }
    } else if (viewportWidth <= 768) {
      // Tablet adjustments
      const safeMarginTop = navbarHeight + 20;
      heroContent.style.marginTop = safeMarginTop + 'px';
      heroStats.style.paddingTop = '1.5rem';
      heroStats.style.paddingBottom = '3rem';
      
      // Landscape mode for tablets
      if (aspectRatio > 1.2) {
        heroContainer.style.paddingTop = '2rem';
        heroContainer.style.paddingBottom = '2rem';
        heroContent.style.marginBottom = '2rem';
      }
    } else if (viewportWidth <= 992) {
      // Small desktops
      heroContent.style.marginTop = '6rem';
      heroStats.style.paddingTop = '2rem';
      heroStats.style.paddingBottom = '3rem';
    } else {
      // Larger desktops
      heroContent.style.marginTop = '';
      heroStats.style.paddingTop = '2rem';
      heroStats.style.paddingBottom = '';
    }
    
    // Prevent code snap and stats from overlapping on larger screens
    if (viewportWidth > 992 && codeSnap) {
      const codeSnapRect = codeSnap.getBoundingClientRect();
      const heroStatsRect = heroStats.getBoundingClientRect();
      
      if (codeSnapRect.bottom > heroStatsRect.top) {
        const additionalSpace = codeSnapRect.bottom - heroStatsRect.top + 30;
        heroContent.style.marginBottom = `${additionalSpace}px`;
      }
    }
    
    // Very tall screens adjustment
    if (viewportHeight > 900 && viewportWidth > 992) {
      heroContainer.style.justifyContent = 'space-evenly';
      heroContainer.style.paddingTop = '6rem';
      heroContainer.style.paddingBottom = '4rem';
    }
    
    // Very wide screens adjustment
    if (viewportWidth > 1800) {
      heroContainer.style.maxWidth = '1800px';
      heroContent.style.maxWidth = '1600px';
      heroStats.style.maxWidth = '1200px';
    }
    
    // Landscape mode on mobile (very short height)
    if (viewportHeight < 500) {
      heroContainer.style.minHeight = 'auto';
      heroContainer.style.paddingTop = '1rem';
      heroContainer.style.paddingBottom = '1rem';
      heroContent.style.marginBottom = '1rem';
      heroContent.style.gap = '1rem';
      heroStats.style.flexWrap = 'wrap';
      heroStats.style.gap = '1rem 2rem';
      heroStats.style.paddingTop = '1rem';
      heroStats.style.paddingBottom = '1rem';
    }
  }
  
  // Run layout adjustment on page load
  adjustHeroLayout();
  setTimeout(adjustHeroLayout, 1000); // Additional call to handle late-loading content
  
  // Add resize listener for responsive adjustments
  window.addEventListener('resize', adjustHeroLayout);
  
  // Also adjust on image load to handle dynamic content
  const codeSnapImage = document.querySelector('.code-snap-image');
  if (codeSnapImage) {
    codeSnapImage.addEventListener('load', adjustHeroLayout);
  }
  
  // Adjust after animations complete
  document.addEventListener('aos:in', function() {
    setTimeout(adjustHeroLayout, 500);
  });
  
  // Adjust periodically for reliability
  setInterval(adjustHeroLayout, 2000);
}); 