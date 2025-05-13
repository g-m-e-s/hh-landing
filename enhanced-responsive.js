/* Enhanced responsiveness script for HEALTH/HEALTH landing page */

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll behavior for mobile adaptation
  const header = document.querySelector('.header');
  
  function handleHeaderScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Run on load and on scroll
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll);

  // Add touch swipe support for the carousel
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      // Detect swipe direction and minimum distance
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        const nextBtn = document.getElementById('carousel-next');
        if (nextBtn) nextBtn.click();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        const prevBtn = document.getElementById('carousel-prev');
        if (prevBtn) prevBtn.click();
      }
    }
  }

  // Improve responsiveness of comparison section
  const comparisonSection = document.getElementById('comparison');
  if (comparisonSection) {
    const updateComparisonVisibility = () => {
      // On small screens, make sure comparison cards are stacked properly
      if (window.innerWidth < 768) {
        const competitorsGrids = comparisonSection.querySelectorAll('.competitors-grid');
        competitorsGrids.forEach(grid => {
          grid.style.display = 'flex';
          grid.style.flexDirection = 'column';
        });
      }
    };
    
    // Run on load and resize
    updateComparisonVisibility();
    window.addEventListener('resize', updateComparisonVisibility);
  }
});
