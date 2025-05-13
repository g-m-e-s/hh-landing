// DOM Elements
const introAnimation = document.getElementById('intro-animation');
const micContainer = document.querySelector('.mic-container');
const audioWaves = document.querySelectorAll('.audio-wave');
const typedText = document.querySelector('.typed-text');
const typedContent = document.getElementById('typed-content');
const cursor = document.querySelector('.cursor');
const header = document.querySelector('.header');
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
      audioWaves.forEach((wave, index) => {
        setTimeout(() => {
          wave.classList.add('active');
        }, index * 200);
      });

      setTimeout(() => {
        // Start typing animation
        typedText.classList.add('active');
        typeText("HEALTH / HEALTH");

        setTimeout(() => {
          // Complete animation and show main content
          completeIntroAnimation();
        }, 2500);
      }, 1500);
    }, 800);
  }, 500);
}

// Type text character by character with improved timing
function typeText(text) {
  let i = 0;
  typedContent.textContent = '';
  
  // Variable timing makes typing feel more natural
  const getTypeDelay = () => {
    // Add slight randomness to typing speed
    const baseDelay = 80;
    const variance = 30;
    return baseDelay + Math.floor(Math.random() * variance);
  };
  
  // Special delay for spacing
  const getCharDelay = (char) => {
    if (char === ' ' || char === '/') return 180; // Pause slightly on spaces and slashes
    return getTypeDelay();
  };
  
  const typeNextChar = () => {
    if (i < text.length) {
      const char = text.charAt(i);
      typedContent.textContent += char;
      i++;
      setTimeout(typeNextChar, getCharDelay(char));
    }
  };
  
  typeNextChar();
}

// Complete intro animation and show main content
function completeIntroAnimation() {
  setTimeout(() => {
    introAnimation.style.opacity = '0';
    introAnimation.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
      introAnimation.style.display = 'none';
      document.body.style.overflow = '';
      initElements();
    }, 800);
  }, 800);
}

// Initialize all elements that need animation or interaction
function initElements() {
  // Animate metric bars when they come into view
  animateMetricBars();
  
  // Initialize other interactive elements
  initCarousel();
  initTabs();
  initScrollEffects();
  initFeatureCards();
}

// Animate metric bars with enhanced animations
function animateMetricBars() {
  // First reset all bars to zero width
  metricBars.forEach(bar => {
    bar.style.width = '0%';
    bar.style.transition = 'none';
  });
  
  // Force reflow to ensure reset takes effect
  void document.body.offsetHeight;
  
  setTimeout(() => {
    metricBars.forEach((bar, index) => {
      // Set transition back on with staggered delays
      bar.style.transition = `width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)`;
      
      // Staggered animation starting points
      setTimeout(() => {
        // Add shimmer effect as the bar fills
        bar.classList.add('animated');
        
        // Set the correct width based on the metric value
        const metricValue = bar.closest('.metric').querySelector('.metric-value');
        const targetValue = parseInt(metricValue.textContent);
        
        if (index === 0) bar.style.width = '22%';
        if (index === 1) bar.style.width = '94%';
        if (index === 2) bar.style.width = '87%';
        
        // Update the value counter alongside the bar
        animateCounter(metricValue, 0, targetValue, 1500);
      }, index * 300);
    });
  }, 300);
}

// Animate counter from start to end value
function animateCounter(element, start, end, duration) {
  // Check if we're animating value with % or not
  const isPercentage = element.textContent.indexOf('%') !== -1;
  let startTimestamp = null;
  
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const value = Math.floor(easedProgress * (end - start) + start);
    element.textContent = isPercentage ? `${value}%` : value.toString();
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  
  window.requestAnimationFrame(step);
}

// Easing function for smoother animations
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

// Handle scroll effects
function initScrollEffects() {
  window.addEventListener('scroll', () => {
    // Header shrink effect
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
    
    // Check if metrics are in view to animate them
    const metricsColumn = document.querySelector('.metrics-column');
    if (metricsColumn) {
      const rect = metricsColumn.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
        animateMetricBars();
      }
    }
  });
}

// Initialize feature cards with staggered animations
function initFeatureCards() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Initialize carousel
function initCarousel() {
  // Create slides
  createCarouselSlides();
  
  // Create indicators
  createCarouselIndicators();
  
  // Set initial slide
  updateCarousel();
  
  // Add event listeners
  carouselPrev.addEventListener('click', goToPrevSlide);
  carouselNext.addEventListener('click', goToNextSlide);
  
  // Auto advance carousel
  startCarouselAutoPlay();
}

// Create carousel slides from data
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
      
      // Add content to the value indicator based on status
      if (competitor.value === 'true') {
        competitorValue.textContent = '✓';
      } else if (competitor.value === 'false') {
        competitorValue.textContent = '×';
      } else {
        competitorValue.textContent = '~';
      }
      
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

// Go to the previous slide
function goToPrevSlide() {
  if (isAnimating) return;
  
  isAnimating = true;
  currentSlide = currentSlide === 0 ? comparisonData.length - 1 : currentSlide - 1;
  
  carouselTrack.style.opacity = '0';
  
  setTimeout(() => {
    updateCarousel();
    setTimeout(() => {
      carouselTrack.style.opacity = '1';
      isAnimating = false;
    }, 100);
  }, 300);
}

// Go to the next slide
function goToNextSlide() {
  if (isAnimating) return;
  
  isAnimating = true;
  currentSlide = currentSlide === comparisonData.length - 1 ? 0 : currentSlide + 1;
  
  carouselTrack.style.opacity = '0';
  
  setTimeout(() => {
    updateCarousel();
    setTimeout(() => {
      carouselTrack.style.opacity = '1';
      isAnimating = false;
    }, 100);
  }, 300);
}

// Go to a specific slide
function goToSlide(index) {
  if (isAnimating || index === currentSlide) return;
  
  isAnimating = true;
  currentSlide = index;
  
  carouselTrack.style.opacity = '0';
  
  setTimeout(() => {
    updateCarousel();
    setTimeout(() => {
      carouselTrack.style.opacity = '1';
      isAnimating = false;
    }, 100);
  }, 300);
}

// Auto advance the carousel
function startCarouselAutoPlay() {
  setInterval(() => {
    if (!isAnimating && !document.querySelector('.carousel-container:hover')) {
      goToNextSlide();
    }
  }, 8000);
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
          
          // If the tab with metrics is shown, animate the bars
          if (tabId === 'investors') {
            setTimeout(animateMetricBars, 300);
          }
        }
      });
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', playIntroAnimation);
