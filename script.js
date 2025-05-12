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
    feature: "Prontuário médico completo",
    description: "Gera documentação clínica estruturada com todos os elementos necessários para um prontuário completo, incluindo anamnese, exame físico, diagnósticos e plano terapêutico.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Prontuário completo com estrutura SOAP e integração com sistema VINTRA" },
      { name: "Dragon Copilot", value: "parcial", note: "Apenas transcrição, sem estruturação clínica adequada" },
      { name: "Read.AI", value: "parcial", note: "Resumo básico, foco em reuniões corporativas, não médicas" },
      { name: "Google Meet/Zoom", value: "false", note: "Apenas transcrição básica sem contexto médico" },
    ],
  },
  {
    feature: "Estrutura clínica",
    description: "Interpreta e organiza a informação em formatos clínicos padrão como SOAP, CID-10, e outros protocolos médicos reconhecidos internacionalmente.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Reconhece automaticamente a estrutura SOAP e codificação CID-10" },
      { name: "Dragon Copilot", value: "false", note: "Sem estruturação clínica ou codificação diagnóstica" },
      { name: "Read.AI", value: "false", note: "Sem conhecimento médico especializado" },
      { name: "Google Meet/Zoom", value: "false", note: "Sem estruturação ou interpretação contextual" },
    ],
  },
  {
    feature: "Conversa natural",
    description: "Funciona com diálogo natural entre médico e paciente, sem necessidade de comandos específicos ou interrupções no fluxo da consulta.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "100% natural, sem comandos, adaptação ao estilo do médico" },
      { name: "Dragon Copilot", value: "parcial", note: "Requer comandos específicos e treinamento de voz" },
      { name: "Read.AI", value: "true", note: "Captura conversa natural, mas sem contexto médico" },
      { name: "Google Meet/Zoom", value: "true", note: "Transcrição automática sem interpretação contextual" },
    ],
  },
  {
    feature: "Diagnóstico e plano",
    description: "Identifica e estrutura diagnósticos e planos de tratamento a partir da conversa, com sugestões baseadas em diretrizes clínicas atualizadas.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Extrai diagnósticos e organiza planos terapêuticos automaticamente" },
      { name: "Dragon Copilot", value: "parcial", note: "Identificação básica de termos, sem interpretação clínica" },
      { name: "Read.AI", value: "false", note: "Sem capacidade de análise médica" },
      { name: "Google Meet/Zoom", value: "false", note: "Sem capacidade de análise ou organização clínica" },
    ],
  },
  {
    feature: "Sem configuração",
    description: "Pronto para uso imediato, sem necessidade de treinamento ou configuração técnica complexa. Funciona desde a primeira consulta.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Uso imediato sem configuração, adaptação automática" },
      { name: "Dragon Copilot", value: "false", note: "Requer treinamento de voz e configurações extensas" },
      { name: "Read.AI", value: "true", note: "Configuração simples, mas sem foco médico" },
      { name: "Google Meet/Zoom", value: "true", note: "Ativação com um clique, funcionalidade limitada" },
    ],
  },
  {
    feature: "Criado por médicos",
    description: "Desenvolvido por profissionais médicos com experiência clínica real, garantindo relevância prática e funcionalidade alinhada às necessidades reais.",
    competitors: [
      { name: "HEALTH/HEALTH", value: "true", note: "Criado e testado por médicos em ambiente clínico real" },
      { name: "Dragon Copilot", value: "false", note: "Criado por engenheiros de software sem foco específico" },
      { name: "Read.AI", value: "false", note: "Foco em reuniões corporativas, sem expertise médica" },
      { name: "Google Meet/Zoom", value: "false", note: "Foco em videoconferência geral, sem contexto de saúde" },
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
        typeText("HH / HEALTH");

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
