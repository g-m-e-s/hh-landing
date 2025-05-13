// script.js
// HEALTH/HEALTH - Premium Release JavaScript

/* -----------------------------------------------------------------------------
TABLE OF CONTENTS:
--------------------------------------------------------------------------------
1.  DOM Element Selectors
2.  Global State & Configuration
3.  Utility Functions
4.  Initialization Function (DOMContentLoaded)
5.  Header Logic
    - Shrink on Scroll
    - Mobile Navigation Toggle
6.  Intro Animation Logic
    - Typewriter Effect
    - Animation Sequence
7.  Smooth Scrolling & Active Navigation Highlighting
8.  Intersection Observer for Animations
    - Feature Cards (and similar elements)
    - Metric Bars Animation (Se a seção de Oportunidades for mantida)
9.  Carousel Logic (Comparison Section)
    - Slide Creation & Management
    - Navigation (Prev/Next, Indicators)
    - Autoplay
10. Tabs Logic (Opportunities Section) - LÓGICA REMOVIDA/COMENTADA
11. Footer Logic
    - Current Year
12. Hero Background Animation (Placeholder/Initialization)
----------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    
    // -----------------------------------------------------
    // 1. DOM Element Selectors
    // -----------------------------------------------------
    const header = document.querySelector('.header');
    const nav = document.querySelector('.navigation');
    const mobileNavToggle = document.createElement('button'); 
    
    const introAnimationElement = document.getElementById('intro-animation');
    const micContainer = document.querySelector('.mic-container');
    const audioWaves = document.querySelectorAll('.audio-wave');
    const typedTextElement = document.querySelector('.typed-text');
    const typedContentSpan = document.getElementById('typed-content');
    
    // Carousel elements (ainda necessários para desktop)
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrevBtn = document.getElementById('carousel-prev');
    const carouselNextBtn = document.getElementById('carousel-next');
    const carouselIndicatorsContainer = document.getElementById('carousel-indicators');
    
    // Tab elements - A seção foi removida, mas mantemos as variáveis caso o JS seja reaproveitado
    // const tabButtons = document.querySelectorAll('.tab-button'); 
    // const tabContents = document.querySelectorAll('.tab-content');
    
    // const metricBars = document.querySelectorAll('.metric-progress'); // Associado às abas, pode ser removido se não houver outras métricas
    const currentYearSpan = document.getElementById('currentYear');
    const navLinks = document.querySelectorAll('.navigation .nav-link, .footer .footer-link'); // Inclui links do footer para smooth scroll

    // -----------------------------------------------------
    // 2. Global State & Configuration
    // -----------------------------------------------------
    let currentSlide = 0;
    let carouselIsAnimating = false;
    let carouselAutoPlayInterval;
    const CAROUSEL_AUTOPLAY_DELAY = 8000; // ms

    // Dados para o Carrossel de Comparação (mantidos)
    const comparisonData = [
      {
        feature: "Documentação clínica dimensional",
        description: "Documentação baseada em vetores dimensionais quantificando precisamente estados mentais em múltiplos eixos, substituindo a abordagem categorial tradicional.",
        competitors: [
          { name: "HEALTH/HEALTH", value: "true", note: "Mapeamento vetorial completo em 10 dimensões com visualização trajetorial e integração VINTRA." },
          { name: "Dragon Medical", value: "false", note: "Foco em transcrição de voz para texto, sem análise dimensional ou estruturação clínica profunda." },
          { name: "Sistemas Prontuário Eletrônico (Tradicionais)", value: "parcial", note: "Estruturação de dados limitada, geralmente categorial, sem captura de nuances dimensionais." },
        ],
      },
      {
        feature: "Análise linguística e fenomenológica",
        description: "Captura e análise avançada de padrões linguísticos, marcadores prosódicos e temporais que revelam o estado mental subjacente e a experiência do paciente.",
        competitors: [
          { name: "HEALTH/HEALTH", value: "true", note: "Análise sintática, semântica, pragmática e fenomenológica com extração de biomarcadores linguísticos via IREAJE.CLOUD." },
          { name: "Ferramentas de Transcrição com IA (e.g., Otter.ai, Google)", value: "parcial", note: "Transcrição com alguma identificação de termos, mas sem interpretação clínica ou fenomenológica." },
          { name: "Plataformas de Análise de Sentimento Genéricas", value: "false", note: "Análise de sentimento superficial, não adaptada à complexidade do discurso clínico." },
        ],
      },
      {
        feature: "Visualização trajetorial e prognóstica",
        description: "Representação gráfica da evolução do estado mental do paciente ao longo do tempo, identificando padrões, pontos críticos, atratores e projeções terapêuticas.",
        competitors: [
          { name: "HEALTH/HEALTH", value: "true", note: "Visualização vetorial multidimensional interativa com análise de sistemas dinâmicos e projeção de trajetórias." },
          { name: "Dashboards de BI em Saúde", value: "parcial", note: "Visualização de dados agregados, mas sem análise trajetorial individualizada ou dimensional." },
          { name: "Prontuários Eletrônicos (Tradicionais)", value: "false", note: "Representação textual ou tabular de dados, sem capacidade de visualização dinâmica ou prognóstica." },
        ],
      },
      {
        feature: "Runtime proprietário e DSLs (.aje .ire .e)",
        description: "Infraestrutura tecnológica de alta performance com runtime euleriano (IREAJE.CLOUD) e linguagens de domínio específico para flexibilidade e poder analítico.",
        competitors: [
          { name: "HEALTH/HEALTH", value: "true", note: "Controle total sobre o stack tecnológico, otimizado para psiquiatria dimensional e processamento intensivo." },
          { name: "Soluções baseadas em APIs de LLMs Genéricos", value: "false", note: "Dependência de modelos de terceiros, menos customização e controle sobre a lógica clínica profunda." },
          { name: "Plataformas Low-code/No-code em Saúde", value: "false", note: "Flexibilidade limitada, não adequadas para a complexidade da análise dimensional e simbólica proprietária." },
        ],
      },
    ];

    // -----------------------------------------------------
    // 3. Utility Functions
    // -----------------------------------------------------
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    const debounce = (func, delay) => {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    };
    
    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

    // -----------------------------------------------------
    // 4. Initialization Function
    // -----------------------------------------------------
    function initializePage() {
        console.log("HEALTH/HEALTH :: Initializing Premium JavaScript UX (v2)...");

        if (introAnimationElement && typedContentSpan) { 
            playIntroAnimation();
        } else {
            document.body.style.opacity = 1; 
        }
        
        setupHeader();
        setupSmoothScrollAndActiveNav();
        setupIntersectionObservers();
        
        // Inicializa o carrossel apenas se os elementos existirem (para desktop)
        if (document.getElementById('comparison') && carouselTrack && carouselPrevBtn && carouselNextBtn && carouselIndicatorsContainer) {
            // Verifica se a seção de comparação está visível (não é mobile)
            const comparisonSection = document.getElementById('comparison');
            if (comparisonSection && getComputedStyle(comparisonSection).display !== 'none') {
                 initCarousel();
            }
        }
        
        // Lógica das Abas foi removida, então initTabs() não é mais chamado
        // if (tabButtons.length > 0 && tabContents.length > 0) {
        //     initTabs(); 
        // }
        
        updateFooterYear();
        
        console.log("HEALTH/HEALTH :: Premium JavaScript UX Initialized (v2).");
    }

    // -----------------------------------------------------
    // 5. Header Logic
    // -----------------------------------------------------
    function setupHeader() {
        if (!header) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', throttle(handleScroll, 100));

        if (nav) {
            mobileNavToggle.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
                <span class="visually-hidden">Abrir menu</span>`;
            mobileNavToggle.className = 'mobile-nav-toggle';
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.setAttribute('aria-controls', 'navigation-menu');
            
            if (!nav.id) nav.id = 'navigation-menu';

            // Adiciona o botão de toggle ao header-wrapper, antes dos actions
            const headerActions = header.querySelector('.header-actions');
            if (headerActions) {
                header.querySelector('.header-wrapper').insertBefore(mobileNavToggle, headerActions);
            } else {
                 header.querySelector('.header-wrapper').appendChild(mobileNavToggle);
            }
            

            mobileNavToggle.addEventListener('click', () => {
                const isExpanded = nav.classList.toggle('active');
                mobileNavToggle.setAttribute('aria-expanded', isExpanded);
                mobileNavToggle.querySelector('.visually-hidden').textContent = isExpanded ? 'Fechar menu' : 'Abrir menu';
                document.body.classList.toggle('no-scroll', isExpanded); 
            });
            
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileNavToggle.setAttribute('aria-expanded', 'false');
                        mobileNavToggle.querySelector('.visually-hidden').textContent = 'Abrir menu';
                        document.body.classList.remove('no-scroll');
                    }
                });
            });
        }
    }

    // -----------------------------------------------------
    // 6. Intro Animation Logic
    // -----------------------------------------------------
    function playIntroAnimation() {
        if (!introAnimationElement || !micContainer || !typedContentSpan) return;

        document.body.style.overflow = 'hidden'; 
        document.body.style.opacity = 0; 

        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = 1; 

            micContainer.classList.add('active');
            setTimeout(() => {
                audioWaves.forEach((wave, index) => {
                    setTimeout(() => wave.classList.add('active'), index * 250);
                });
                setTimeout(() => {
                    if (typedTextElement) typedTextElement.classList.add('active');
                    typeTextEffect("HEALTH / HEALTH", typedContentSpan, () => { 
                        setTimeout(completeIntroAnimation, 1200); 
                    });
                }, 1200); 
            }, 800); 
        }, 300); 
    }

    function typeTextEffect(text, targetElement, onComplete) {
        if (!targetElement) return;
        let i = 0;
        targetElement.innerHTML = ''; 
        const typingSpeed = 120; 

        function type() {
            if (i < text.length) {
                targetElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            } else if (onComplete && typeof onComplete === 'function') {
                onComplete();
            }
        }
        type();
    }

    function completeIntroAnimation() {
        if (!introAnimationElement) return;
        introAnimationElement.style.opacity = '0';
        setTimeout(() => {
            introAnimationElement.style.display = 'none';
            document.body.style.overflow = ''; 
        }, 800); 
    }

    // -----------------------------------------------------
    // 7. Smooth Scrolling & Active Navigation Highlighting
    // -----------------------------------------------------
    function setupSmoothScrollAndActiveNav() {
        const headerMainHeight = header ? header.querySelector('.header-wrapper').offsetHeight : 70;
        const msBadge = document.querySelector('.ms-badge');
        const msBadgeHeight = msBadge ? msBadge.offsetHeight : 0;
        const totalHeaderHeight = headerMainHeight + msBadgeHeight;
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Ajuste para considerar o header fixo + badge
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalHeaderHeight - 20; /* 20px extra offset */
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        const sections = document.querySelectorAll('main section[id]');
        const updateActiveNav = () => {
            let currentSectionId = '';
            sections.forEach(section => {
                // Verifica se a seção está visível antes de considerá-la para navegação ativa
                if (section.offsetParent !== null) { // offsetParent é null para elementos com display:none
                    const sectionTop = section.offsetTop - totalHeaderHeight - 50; 
                    if (window.pageYOffset >= sectionTop) {
                        currentSectionId = section.id;
                    }
                }
            });
            
            // Atualiza apenas os links da navegação principal (não do footer) para o estado ativo
            const mainNavLinks = document.querySelectorAll('.navigation .nav-link');
            mainNavLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');
                if (linkHref && linkHref.includes(currentSectionId) && currentSectionId !== '') {
                    link.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', throttle(updateActiveNav, 150));
        updateActiveNav(); 
    }

    // -----------------------------------------------------
    // 8. Intersection Observer for Animations
    // -----------------------------------------------------
    function setupIntersectionObservers() {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.15 // Reduzido para disparar um pouco antes
        };

        const animateOnScroll = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.animationDelay ? parseInt(entry.target.dataset.animationDelay) : index * 50; // Reduzido delay base
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, delay);
                    
                    // A lógica de animateMetricBarsInView foi removida pois a seção de Oportunidades não existe mais
                    // if (entry.target.classList.contains('metrics-column') || entry.target.classList.contains('metric')) {
                    //     animateMetricBarsInView(entry.target);
                    // }
                    
                    observer.unobserve(entry.target); 
                }
            });
        };

        const observer = new IntersectionObserver(animateOnScroll, observerOptions);
        
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .audience-card, .credential-item, .competitor-card' // Removido .job-card, .tech-item, etc.
        );
        elementsToAnimate.forEach((el, index) => {
            el.dataset.animationDelay = index * 50; 
            observer.observe(el);
        });
    }

    // A função animateMetricBarsInView e animateCounter não são mais necessárias se a seção de oportunidades foi removida.
    // Se houver outras barras de métrica ou contadores, elas podem ser mantidas/adaptadas.
    /*
    function animateMetricBarsInView(container) {
        // ... (código anterior)
    }
    function animateCounter(element, start, end, duration) {
        // ... (código anterior)
    }
    */


    // -----------------------------------------------------
    // 9. Carousel Logic (Comparison Section)
    // -----------------------------------------------------
    function initCarousel() {
        if (!carouselTrack || comparisonData.length === 0) return;

        // Verifica novamente se a seção de comparação está visível antes de prosseguir
        const comparisonSection = document.getElementById('comparison');
        if (!comparisonSection || getComputedStyle(comparisonSection).display === 'none') {
            console.log("Carousel initialization skipped: comparison section is hidden.");
            return;
        }
        console.log("Initializing carousel...");

        createCarouselSlides();
        createCarouselIndicators();
        updateCarouselVisuals();
        
        carouselPrevBtn?.addEventListener('click', () => navigateCarousel(-1));
        carouselNextBtn?.addEventListener('click', () => navigateCarousel(1));
        
        startCarouselAutoPlay();
        carouselTrack.closest('.comparison-carousel')?.addEventListener('mouseenter', stopCarouselAutoPlay);
        carouselTrack.closest('.comparison-carousel')?.addEventListener('mouseleave', startCarouselAutoPlay);
    }

    function createCarouselSlides() {
        carouselTrack.innerHTML = ''; 
        comparisonData.forEach((data, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.setAttribute('data-index', index);
            slide.setAttribute('role', 'tabpanel');
            slide.id = `carousel-slide-${index}`;
            
            let competitorsHTML = '<div class="competitors-grid">';
            data.competitors.forEach(comp => {
                competitorsHTML += `
                    <div class="competitor-card ${comp.name === 'HEALTH/HEALTH' ? 'featured' : ''}">
                        <div class="competitor-header">
                             <div class="competitor-logo" style="display: flex; align-items: center; gap: 8px;">
                                <div class="competitor-logo-box"></div>
                                <span class="competitor-name ${comp.name === 'HEALTH/HEALTH' ? 'featured' : ''}">${comp.name}</span>
                            </div>
                            <div class="competitor-value ${comp.value}" aria-label="${comp.value === 'true' ? 'Sim' : comp.value === 'false' ? 'Não' : 'Parcial'}">
                                ${comp.value === 'true' ? '✓' : comp.value === 'false' ? '×' : '~'}
                            </div>
                        </div>
                        <p class="competitor-note">${comp.note}</p>
                    </div>`;
            });
            competitorsHTML += '</div>';

            slide.innerHTML = `
                <div class="carousel-slide-header">
                    <h3>${data.feature}</h3>
                    <p>${data.description}</p>
                </div>
                ${competitorsHTML}
            `;
            carouselTrack.appendChild(slide);
        });
    }

    function createCarouselIndicators() {
        if (!carouselIndicatorsContainer) return;
        carouselIndicatorsContainer.innerHTML = '';
        comparisonData.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('data-index', index);
            indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            indicator.setAttribute('role', 'tab');
            indicator.setAttribute('aria-controls', `carousel-slide-${index}`);
            indicator.addEventListener('click', () => goToCarouselSlide(index));
            carouselIndicatorsContainer.appendChild(indicator);
        });
    }

    function updateCarouselVisuals() {
        if (!carouselTrack) return;
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        if (carouselIndicatorsContainer) {
            const indicators = carouselIndicatorsContainer.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
                indicator.setAttribute('aria-selected', index === currentSlide);
            });
        }

        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        slides.forEach((slide,index) => {
            slide.setAttribute('aria-hidden', index !== currentSlide);
            slide.style.visibility = index === currentSlide ? 'visible' : 'hidden';
        });
    }

    function navigateCarousel(direction) {
        if (carouselIsAnimating || !carouselTrack) return; // Adicionada verificação de carouselTrack
        carouselIsAnimating = true;
        
        const numSlides = comparisonData.length;
        currentSlide = (currentSlide + direction + numSlides) % numSlides;
        
        updateCarouselVisuals();
        
        setTimeout(() => { carouselIsAnimating = false; }, 500); 
    }

    function goToCarouselSlide(index) {
        if (carouselIsAnimating || index === currentSlide || !carouselTrack) return; // Adicionada verificação de carouselTrack
        carouselIsAnimating = true;
        currentSlide = index;
        updateCarouselVisuals();
        setTimeout(() => { carouselIsAnimating = false; }, 500);
    }

    function startCarouselAutoPlay() {
        if (!carouselTrack) return; // Adicionada verificação
        stopCarouselAutoPlay(); 
        carouselAutoPlayInterval = setInterval(() => navigateCarousel(1), CAROUSEL_AUTOPLAY_DELAY);
    }
    function stopCarouselAutoPlay() {
        clearInterval(carouselAutoPlayInterval);
    }

    // -----------------------------------------------------
    // 10. Tabs Logic (Opportunities Section) - REMOVIDA
    // -----------------------------------------------------
    /*
    function initTabs() {
        // ... (código anterior das abas, agora comentado ou removido)
    }
    */

    // -----------------------------------------------------
    // 11. Footer Logic
    // -----------------------------------------------------
    function updateFooterYear() {
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    // -----------------------------------------------------
    // 12. Hero Background Animation (Placeholder)
    // -----------------------------------------------------
    // function initHeroBackgroundAnimation() { ... } // Mantido como placeholder

    // Inicia tudo!
    initializePage();

    // Adiciona um listener para redimensionamento para reinicializar o carrossel se necessário
    // (ex: se a janela for redimensionada de mobile para desktop)
    window.addEventListener('resize', debounce(() => {
        const comparisonSection = document.getElementById('comparison');
        if (comparisonSection && carouselTrack) { // Verifica se carouselTrack existe
            if (getComputedStyle(comparisonSection).display !== 'none') {
                // Se a seção de comparação está visível e o carrossel não foi inicializado ou precisa ser refeito
                if (!carouselTrack.children.length || currentSlide < 0) { // Condição simples para verificar se precisa reinicializar
                    currentSlide = 0; // Reseta o slide
                    initCarousel();
                }
            } else {
                // Se a seção de comparação está oculta, para o autoplay
                stopCarouselAutoPlay();
                // Poderia também limpar o track: carouselTrack.innerHTML = ''; currentSlide = -1;
            }
        }
    }, 250));

});
