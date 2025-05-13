// Elements
const introAnimation = document.getElementById('intro-animation');
const micContainer = document.querySelector('.mic-container');
const audioWaves = document.querySelectorAll('.audio-wave');
const typedText = document.querySelector('.typed-text');
const typedContent = document.getElementById('typed-content');
const cursor = document.querySelector('.cursor');
const mainHeader = document.getElementById('main-header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const carouselTrack = document.getElementById('carousel-track');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselIndicators = document.getElementById('carousel-indicators');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const metricBars = document.querySelectorAll('.metric-progress');

// Comparison data for carousel
const comparisonData = [
  {
    feature: "Documentação clínica dimensional",
    description: "Documentação baseada em vetores dimensionais quantificando precisamente estados mentais em múltiplos eixos, substituindo a abordagem categorial tradicional.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Mapeamento vetorial completo em 10 dimensões com visualização trajetorial" },
      { name: "Dragon Medical", value: "false", note: "Transcrição apenas, sem estruturação dimensional" },
      { name: "Google Meet", value: "false", note: "Transcrição básica sem contexto clínico" },
    ],
  },
  {
    feature: "Análise linguística fenomenológica",
    description: "Captura e análise de padrões linguísticos, marcadores prosódicos e temporais que revelam o estado mental subjacente do paciente.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Análise sintática, semântica e pragmática com extração de biomarcadores linguísticos" },
      { name: "Dragon Medical", value: "parcial", note: "Reconhecimento de termos médicos sem análise fenomenológica" },
      { name: "Google Meet", value: "false", note: "Sem capacidade de interpretação contextual clínica" },
    ],
  },
  {
    feature: "Visualização trajetorial",
    description: "Representação gráfica da evolução do paciente ao longo do tempo, identificando padrões, pontos críticos e trajetórias terapêuticas.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Visualização 3D com análise de sistemas e identificação de atratores" },
      { name: "Dragon Medical", value: "false", note: "Sem visualização dimensional ou capacidade trajetorial" },
      { name: "Google Meet", value: "false", note: "Sem capacidade de análise longitudinal" },
    ],
  },
  {
    feature: "Intervenção baseada em vetores",
    description: "Planejamento terapêutico orientado por alvos dimensionais específicos, com monitoramento contínuo e adaptação da trajetória.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Sequenciamento de intervenções com predição de trajetórias" },
      { name: "Dragon Medical", value: "false", note: "Apenas documentação sem recursos de intervenção" },
      { name: "Google Meet", value: "false", note: "Sem capacidade de intervenção clínica" },
    ],
  },
  {
    feature: "Documentação SOAP adaptada",
    description: "Versão dimensional do formato SOAP tradicional, enriquecida com análise vetorial e posicionamento quantificado nas dimensões fundamentais.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "SOAP-VINTRA com narrativa ipsissima e posicionamento dimensional" },
      { name: "Dragon Medical", value: "parcial", note: "SOAP tradicional com campos predefinidos" },
      { name: "Google Meet", value: "false", note: "Sem estruturação SOAP ou clínica" },
    ],
  },
];

// Global variables
let currentSlide = 0;
let isAnimating = false;

// Intro Animation Sequence
function playIntroAnimation() {
  // Prevent scrolling during animation
  document.body.style.overflow = 'hidden';

  // Start animation sequence
  setTimeout(() => {
    // Show microphone
    micContainer.classList.add('active');

    setTimeout(() => {
      // Show audio waves
      audioWaves.forEach(wave => wave.classList.add('active'));

      setTimeout(() => {
        // Start typing animation
        typedText.classList.add('active');
        typeText("HEALTH / HEALTH");

        setTimeout(() => {
          // Complete animation and show main content
          completeIntroAnimation();
        }, 2500);
      }, 2000);
    }, 800);
  }, 800);
}

// Type text character by character
function typeText(text) {
  let i = 0;
  typedContent.textContent = '';
  const typingInterval = setInterval(() => {
    if (i < text.length) {
      typedContent.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100);
}

// Complete intro animation and show main content
function completeIntroAnimation() {
  setTimeout(() => {
    introAnimation.style.opacity = '0';
    introAnimation.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
      introAnimation.style.display = 'none';
      document.body.style.overflow = '';
      animateMetricBars();
    }, 800);
  }, 800);
}

// Animate metric bars when they come into view
function animateMetricBars() {
  setTimeout(() => {
    metricBars.forEach((bar, index) => {
      setTimeout(() => {
        if (index === 0) bar.style.width = '22%';
        if (index === 1) bar.style.width = '94%';
        if (index === 2) bar.style.width = '87%';
      }, index * 500);
    });
  }, 300);
}

// Handle scroll events for header styling and animations
function handleScroll() {
  if (window.scrollY > 50) {
    mainHeader.classList.add('scrolled');
  } else {
    mainHeader.classList.remove('scrolled');
  }

  // Check if metrics are in view to animate them
  const metricsColumn = document.querySelector('.metrics-column');
  if (metricsColumn) {
    const rect = metricsColumn.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animateMetricBars();
    }
  }

  // Animate feature cards when they come into view
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
}

// Header shrink on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('.refined-fixed-header');
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Handle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');

  if (mobileMenu.classList.contains('active')) {
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
}

// Close mobile menu when clicking on a link
    function closeMobileMenuOnClick() {
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          menuIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        });
      });
    }

    // Initialize comparison carousel
    function initCarousel() {
      // Create slides
      createCarouselSlides();

      // Create indicators
      createCarouselIndicators();

      // Initial slide
      updateCarousel();

      // Event listeners
      carouselPrev.addEventListener('click', goToPrevSlide);
      carouselNext.addEventListener('click', goToNextSlide);

      // Auto play carousel
      startCarouselAutoPlay();
    }

    // Auto play carousel function
    function startCarouselAutoPlay() {
      setInterval(() => {
        if (!isAnimating && !document.querySelector('.carousel-container:hover')) {
          goToNextSlide();
        }
      }, 8000);
    }

    // Create carousel slides
    function createCarouselSlides() {
      carouselTrack.innerHTML = '';
      comparisonData.forEach((data, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.setAttribute('data-index', index);

        const slideHeader = document.createElement('div');
        slideHeader.className = 'carousel-slide-header';

        const slideTitle = document.createElement('h3');
        slideTitle.textContent = data.feature;

        const slideDescription = document.createElement('p');
        slideDescription.textContent = data.description;

        slideHeader.appendChild(slideTitle);
        slideHeader.appendChild(slideDescription);

        const competitorsGrid = document.createElement('div');
        competitorsGrid.className = 'competitors-grid';

        data.competitors.forEach(competitor => {
          const competitorCard = document.createElement('div');
          competitorCard.className = 'competitor-card';
          if (competitor.name === 'HEALTH/HEALTH') {
            competitorCard.classList.add('featured');
          }

          const competitorHeader = document.createElement('div');
          competitorHeader.className = 'competitor-header';

          const competitorLogo = document.createElement('div');
          competitorLogo.className = 'competitor-logo';

          const logoBox = document.createElement('div');
          logoBox.className = 'competitor-logo-box';

          const competitorName = document.createElement('span');
          competitorName.className = 'competitor-name';
          if (competitor.name === 'HEALTH/HEALTH') {
            competitorName.classList.add('featured');
          }
          competitorName.textContent = competitor.name;

          competitorLogo.appendChild(logoBox);
          competitorLogo.appendChild(competitorName);

          const competitorValue = document.createElement('div');
          competitorValue.className = `competitor-value ${competitor.value}`;

          competitorHeader.appendChild(competitorLogo);
          competitorHeader.appendChild(competitorValue);

          const competitorNote = document.createElement('p');
          competitorNote.className = 'competitor-note';
          competitorNote.textContent = competitor.note;

          competitorCard.appendChild(competitorHeader);
          competitorCard.appendChild(competitorNote);

          competitorsGrid.appendChild(competitorCard);
        });

        slide.appendChild(slideHeader);
        slide.appendChild(competitorsGrid);

        carouselTrack.appendChild(slide);
      });
    }

    // Create carousel indicators
    function createCarouselIndicators() {
      carouselIndicators.innerHTML = '';
      comparisonData.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('data-index', index);
        indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);

        indicator.addEventListener('click', () => {
          goToSlide(index);
        });

        carouselIndicators.appendChild(indicator);
      });
    }

    // Update carousel display
    function updateCarousel() {
      // Update slide position
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update indicators
      const indicators = document.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }

    // Go to previous slide
    function goToPrevSlide() {
      if (isAnimating) return;

      isAnimating = true;
      currentSlide = currentSlide === 0 ? comparisonData.length - 1 : currentSlide - 1;
      
      carouselTrack.style.opacity = '0';
      carouselTrack.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
      
      setTimeout(() => {
        updateCarousel();
        setTimeout(() => {
          carouselTrack.style.opacity = '1';
          isAnimating = false;
        }, 100);
      }, 400);
    }

    // Go to next slide
    function goToNextSlide() {
      if (isAnimating) return;

      isAnimating = true;
      currentSlide = currentSlide === comparisonData.length - 1 ? 0 : currentSlide + 1;
      
      carouselTrack.style.opacity = '0';
      carouselTrack.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
      
      setTimeout(() => {
        updateCarousel();
        setTimeout(() => {
          carouselTrack.style.opacity = '1';
          isAnimating = false;
        }, 100);
      }, 400);
    }

    // Go to specific slide
    function goToSlide(index) {
      if (isAnimating || index === currentSlide) return;

      isAnimating = true;
      currentSlide = index;
      
      carouselTrack.style.opacity = '0';
      carouselTrack.style.transition = 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out';
      
      setTimeout(() => {
        updateCarousel();
        setTimeout(() => {
          carouselTrack.style.opacity = '1';
          isAnimating = false;
        }, 100);
      }, 400);
    }

    // Handle tab switching
    function initTabs() {
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-tab');

          // Update active tab button
          tabButtons.forEach(btn => {
            btn.classList.remove('active');
          });
          button.classList.add('active');

          // Show active tab content
          tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `tab-content-${tabId}`) {
              content.classList.add('active');
              
              // If the metrics tab is shown, animate the bars
              if (tabId === 'investors') {
                setTimeout(animateMetricBars, 300);
              }
            }
          });
        });
      });
    }

    // Add smooth scroll behavior to navigation links
    function initSmoothScroll() {
      const allLinks = document.querySelectorAll('a[href^="#"]');
      
      allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
              mobileMenu.classList.remove('active');
              menuIcon.classList.remove('hidden');
              closeIcon.classList.add('hidden');
            }
            
            // Calculate header height for offset
            const headerHeight = mainHeader.offsetHeight + document.querySelector('.ms-startups-header').offsetHeight;
            
            // Scroll to target with offset
            window.scrollTo({
              top: targetElement.offsetTop - headerHeight - 20,
              behavior: 'smooth'
            });
          }
        });
      });
    }

    // Add animation to feature cards
    function initFeatureEffects() {
      const featureCards = document.querySelectorAll('.feature-card');
      
      // Set initial state
      featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });
      
      // Add hover effects
      featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-5px)';
          card.style.boxShadow = '0 12px 30px rgba(10, 37, 64, 0.12)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '';
        });
      });
    }

    // Initialize all functionality
    function init() {
      // Play intro animation
      playIntroAnimation();

      // Set up scroll event listener
      window.addEventListener('scroll', handleScroll);

      // Set up mobile menu toggle
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
      closeMobileMenuOnClick();

      // Initialize carousel
      initCarousel();

      // Initialize tabs
      initTabs();
      
      // Initialize smooth scrolling
      initSmoothScroll();
      
      // Initialize feature card effects
      initFeatureEffects();
    }

    // Start everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', init);
