// Typing animation
document.addEventListener("DOMContentLoaded", function () {
  // Wait for DOM to fully load before manipulating elements
  setTimeout(() => {
    const typedTextSpan = document.querySelector(".typed-text");

    const textArray = [
      "responsive websites.",
      "interactive UIs.",
      "engaging experiences.",
      "scalable applications.",
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent +=
          textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
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
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    }

    // Start the typing animation
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Ensure hero content is properly positioned after all elements are loaded
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.opacity = "0";
      setTimeout(() => {
        heroContent.style.opacity = "1";
        heroContent.style.transition = "opacity 0.5s ease-in-out";
      }, 300);
    }

    // Fix for code snap image loading
    const codeSnapImage = document.querySelector(".code-snap-image");
    if (codeSnapImage) {
      codeSnapImage.addEventListener("load", function () {
        // Recalculate layout after image loads
        document.querySelector(".hero-stats").style.marginTop = "1rem";
      });
    }
  }, 100);

  // Add scroll animation for hero section
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

// Add animation for glitch text
document.addEventListener("DOMContentLoaded", function () {
  const glitchText = document.querySelector(".glitch-text");
  if (glitchText) {
    glitchText.setAttribute("data-text", glitchText.textContent);
  }
});

// Fix for hero background image
window.addEventListener("load", function () {
  const heroBackground = document.querySelector(".hero-background");
  const heroContent = document.querySelector(".hero-content");

  if (heroBackground && heroContent) {
    // Ensure background is properly sized
    heroBackground.style.height = "100%";

    // Ensure content is properly positioned
    heroContent.style.position = "relative";
    heroContent.style.zIndex = "2";
  }
});
