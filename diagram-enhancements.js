/* HEALTH/HEALTH Diagram Enhancement Script */

document.addEventListener('DOMContentLoaded', function() {
  // Add loading class to all image containers
  const imageContainers = document.querySelectorAll('.section-image-container');
  imageContainers.forEach(container => {
    container.classList.add('loading');
    
    // Find the image in the container
    const image = container.querySelector('img');
    if (image) {
      // When image loads, remove the loading class
      image.onload = function() {
        container.classList.remove('loading');
        
        // Add a subtle fade-in effect
        image.style.opacity = 0;
        setTimeout(() => {
          image.style.transition = 'opacity 0.5s ease-in-out';
          image.style.opacity = 1;
        }, 50);
      };
      
      // If image failed to load or is already cached
      image.onerror = function() {
        container.classList.remove('loading');
      };
      
      // For already loaded/cached images
      if (image.complete) {
        container.classList.remove('loading');
      }
    }
  });
  
  // Add zoom effect for diagrams on click
  const diagrams = document.querySelectorAll('.section-image-container img');
  diagrams.forEach(diagram => {
    diagram.addEventListener('click', function() {
      // Create modal with zoomed image
      const modal = document.createElement('div');
      modal.classList.add('diagram-modal');
      
      const modalContent = document.createElement('div');
      modalContent.classList.add('diagram-modal-content');
      
      const modalImage = document.createElement('img');
      modalImage.src = this.src;
      modalImage.alt = this.alt;
      
      const closeButton = document.createElement('button');
      closeButton.classList.add('modal-close');
      closeButton.innerHTML = '&times;';
      closeButton.setAttribute('aria-label', 'Close');
      
      modalContent.appendChild(closeButton);
      modalContent.appendChild(modalImage);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
      
      // Prevent scrolling while modal is open
      document.body.style.overflow = 'hidden';
      
      // Add animation class after a short delay
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
      
      // Close modal function
      const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(modal);
          document.body.style.overflow = '';
        }, 300);
      };
      
      // Event listeners for closing
      closeButton.addEventListener('click', closeModal);
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
      
      // Close on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeModal();
        }
      }, { once: true });
    });
    
    // Add cursor pointer to indicate clickability
    diagram.style.cursor = 'pointer';
    
    // Add title attribute for tooltip
    if (!diagram.title) {
      diagram.title = 'Click to enlarge';
    }
  });
  
  // Set up progressive image loading
  setupProgressiveImages();
});

// Progressive image loading
function setupProgressiveImages() {
  const images = document.querySelectorAll('.feature-image');
  
  images.forEach(img => {
    // Skip if already processed
    if (img.parentNode.classList.contains('progressive-image-container')) {
      return;
    }
    
    // Create container
    const container = document.createElement('div');
    container.className = 'progressive-image-container';
    container.style.width = '100%';
    container.style.height = '0';
    container.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
    
    // Create low-quality placeholder (blur-up technique)
    const placeholder = document.createElement('img');
    placeholder.className = 'progressive-image-placeholder';
    placeholder.src = img.src;
    placeholder.alt = '';
    placeholder.style.width = '100%';
    placeholder.style.height = 'auto';
    
    // Set up main image
    img.classList.add('progressive-image-main');
    
    // Replace the original image with the container
    img.parentNode.insertBefore(container, img);
    container.appendChild(placeholder);
    container.appendChild(img);
    
    // When main image loads
    img.onload = function() {
      img.classList.add('loaded');
      setTimeout(() => {
        placeholder.classList.add('loaded');
      }, 100);
    };
    
    // If image is already loaded
    if (img.complete) {
      img.onload();
    }
  });
}
