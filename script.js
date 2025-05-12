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

// Comparison data for carousel
const comparisonData = [
  {
    feature: "Prontuário médico completo",
    description: "Gera documentação clínica estruturada com todos os elementos necessários para um prontuário completo.",
    competitors: [
      { name: "HEALTH/HEALTH", value: true, note: "Prontuário completo com estrutura SOAP" },
      { name: "Dragon Copilot", value: "parcial", note: "Apenas transcrição, sem estruturação" },
      { name: "Read.AI", value: "parcial", note: "Resumo básico, foco em reuniões" },
      { name: "Google Meet/Zoom", value: false, note: "Apenas transcrição básica" },
    ],
  },
  {
    feature: "Estrutura clínica",
    description: "Interpreta e organiza a informação em formatos clínicos padrão como SOAP, CID-10, etc.",
    competitors: [
      { name: "HEALTH/HEALTH", value: true, note: "Reconhece automaticamente a estrutura SOAP" },
      { name: "Dragon Copilot", value: false, note: "Sem estruturação clínica" },
      { name: "Read.AI", value: false, note: "Sem conhecimento médico" },
      { name: "Google Meet/Zoom", value: false, note: "Sem estruturação" },
    ],
  },
  {
    feature: "Conversa natural",
    description: "Funciona com diálogo natural entre médico e paciente, sem necessidade de comandos.",
    competitors: [
      { name: "HEALTH/HEALTH", value: true, note: "100% natural, sem comandos" },
      { name: "Dragon Copilot", value: "parcial", note: "Requer comandos específicos" },
      { name: "Read.AI", value: true, note: "Captura conversa natural" },
      { name: "Google Meet/Zoom", value: true, note: "Transcrição automática" },
    ],
  },
  {
    feature: "Diagnóstico e plano",
    description: "Identifica e estrutura diagnósticos e planos de tratamento a partir da conversa.",
    competitors: [
      { name: "HEALTH/HEALTH", value: true, note: "Extrai e organiza automaticamente" },
      { name: "Dragon Copilot", value: "parcial", note: "Identificação básica, pouco precisa" },
      { name: "Read.AI", value: false, note: "Sem capacidade médica" },
      { name: "Google Meet/Zoom", value: false, note: "Sem capacidade de análise" },
    ],
  },
  {
    feature: "Sem configuração",
    description: "Pronto para uso imediato, sem necessidade de treinamento ou configuração.",
    competitors: [
      { name: "HEALTH/HEALTH", value: true, note: "Uso imediato sem configuração" },
      { name: "Dragon Copilot", value: false, note: "Requer treinamento de voz" },
      { name: "Read.AI", value: true, note: "Configuração simples" },
      { name: "Google Meet/Zoom", value: true, note: "Ativação com um clique" },
    ],
  },
  {
    feature: "Criado por médicos",
    description: "Desenvolvido por profissionais médicos com experiência clínica real.",
    competitors: [
      { name: "HEALTH/HEALTH", value: true, note: "Criado e testado em consultório real" },
      { name: "Dragon Copilot", value: false, note: "Criado por engenheiros de software" },
      { name: "Read.AI", value: false, note: "Foco em reuniões corporativas" },
      { name: "Google Meet/Zoom", value: false, note: "Foco em videoconferência" },
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
        typeText("HH/IO");

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

    setTimeout(() => {
      introAnimation.style.display = 'none';
      document.body.style.overflow = '';
    }, 500);
  }, 500);
}

// Handle scroll events for header styling
function handleScroll() {
  if (window.scrollY > 50) {
    mainHeader.classList.add('scrolled');
  } else {
    mainHeader.classList.remove('scrolled');
  }
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
  carouselTrack.style.transition = 'transform 0.3s ease-in-out';
  carouselTrack.style.transform = `translateX(-${(currentSlide - 0.05) * 100}%)`;
  carouselTrack.style.opacity = '0';

  setTimeout(() => {
    currentSlide = currentSlide === 0 ? comparisonData.length - 1 : currentSlide - 1;
    carouselTrack.style.transition = 'none';
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    carouselTrack.style.opacity = '1';

    setTimeout(() => {
      carouselTrack.style.transition = 'transform 0.3s ease-in-out';
      isAnimating = false;
      updateCarousel();
    }, 50);
  }, 300);
}

// Go to next slide
function goToNextSlide() {
  if (isAnimating) return;

  isAnimating = true;
  carouselTrack.style.transition = 'transform 0.3s ease-in-out';
  carouselTrack.style.transform = `translateX(-${(currentSlide + 0.05) * 100}%)`;
  carouselTrack.style.opacity = '0';

  setTimeout(() => {
    currentSlide = currentSlide === comparisonData.length - 1 ? 0 : currentSlide + 1;
    carouselTrack.style.transition = 'none';
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    carouselTrack.style.opacity = '1';

    setTimeout(() => {
      carouselTrack.style.transition = 'transform 0.3s ease-in-out';
      isAnimating = false;
      updateCarousel();
    }, 50);
  }, 300);
}

// Go to specific slide
function goToSlide(index) {
  if (isAnimating || index === currentSlide) return;

  isAnimating = true;
  const direction = index > currentSlide ? 0.05 : -0.05;
  carouselTrack.style.transition = 'transform 0.3s ease-in-out';
  carouselTrack.style.transform = `translateX(-${(currentSlide + direction) * 100}%)`;
  carouselTrack.style.opacity = '0';

  setTimeout(() => {
    currentSlide = index;
    carouselTrack.style.transition = 'none';
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    carouselTrack.style.opacity = '1';

    setTimeout(() => {
      carouselTrack.style.transition = 'transform 0.3s ease-in-out';
      isAnimating = false;
      updateCarousel();
    }, 50);
  }, 300);
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
        }
      });
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
}

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
