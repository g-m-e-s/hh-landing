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
    - Metric Bars Animation
9.  Carousel Logic (Comparison Section)
    - Slide Creation & Management
    - Navigation (Prev/Next, Indicators)
    - Autoplay
10. Tabs Logic (Opportunities Section)
11. Footer Logic
    - Current Year
12. Hero Background Animation (Placeholder/Initialization)
----------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    
    // -----------------------------------------------------
    // 1. DOM Element Selectors
    // -----------------------------------------------------
    const header = document.querySelector('.header');
    const nav = document.querySelector('.navigation'); // For mobile menu
    const mobileNavToggle = document.createElement('button'); // Create mobile toggle
    
    const introAnimationElement = document.getElementById('intro-animation');
    const micContainer = document.querySelector('.mic-container');
    const audioWaves = document.querySelectorAll('.audio-wave');
    const typedTextElement = document.querySelector('.typed-text'); // Container for typed content
    const typedContentSpan = document.getElementById('typed-content'); // Span where text is typed
    
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrevBtn = document.getElementById('carousel-prev');
    const carouselNextBtn = document.getElementById('carousel-next');
    const carouselIndicatorsContainer = document.getElementById('carousel-indicators');
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    const metricBars = document.querySelectorAll('.metric-progress');
    const currentYearSpan = document.getElementById('currentYear');
    const navLinks = document.querySelectorAll('.navigation .nav-link'); // For active state and smooth scroll

    // -----------------------------------------------------
    // 2. Global State & Configuration
    // -----------------------------------------------------
    let currentSlide = 0;
    let carouselIsAnimating = false;
    let carouselAutoPlayInterval;
    const CAROUSEL_AUTOPLAY_DELAY = 8000; // ms

    // Dados para o Carrossel de Comparação (mantidos do script original)
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
    
    // Easing function (mantida do original)
    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

    // -----------------------------------------------------
    // 4. Initialization Function
    // -----------------------------------------------------
    function initializePage() {
        console.log("HEALTH/HEALTH :: Initializing Premium JavaScript UX...");

        if (introAnimationElement && typedContentSpan) { // Só executa se os elementos da intro existirem
            playIntroAnimation();
        } else {
            // Se a intro for removida do HTML, permite que o resto da página apareça imediatamente
            document.body.style.opacity = 1; 
        }
        
        setupHeader();
        setupSmoothScrollAndActiveNav();
        setupIntersectionObservers();
        
        if (carouselTrack && carouselPrevBtn && carouselNextBtn && carouselIndicatorsContainer) {
            initCarousel();
        }
        
        if (tabButtons.length > 0 && tabContents.length > 0) {
            initTabs();
        }
        
        updateFooterYear();
        // initHeroBackgroundAnimation(); // Placeholder call
        
        console.log("HEALTH/HEALTH :: Premium JavaScript UX Initialized.");
    }

    // -----------------------------------------------------
    // 5. Header Logic
    // -----------------------------------------------------
    function setupHeader() {
        if (!header) return;

        // Shrink on Scroll
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', throttle(handleScroll, 100));

        // Mobile Navigation Toggle
        if (nav) {
            mobileNavToggle.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
                <span class="visually-hidden">Abrir menu</span>`;
            mobileNavToggle.className = 'mobile-nav-toggle';
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.setAttribute('aria-controls', 'navigation-menu'); // Assumindo que o nav tem id="navigation-menu"
            
            // Adicionar id ao nav se não tiver
            if (!nav.id) nav.id = 'navigation-menu';

            header.querySelector('.header-wrapper').appendChild(mobileNavToggle); // Adiciona antes das actions ou no final do wrapper

            mobileNavToggle.addEventListener('click', () => {
                const isExpanded = nav.classList.toggle('active');
                mobileNavToggle.setAttribute('aria-expanded', isExpanded);
                mobileNavToggle.querySelector('.visually-hidden').textContent = isExpanded ? 'Fechar menu' : 'Abrir menu';
                document.body.classList.toggle('no-scroll', isExpanded); // Prevenir scroll do body quando menu aberto
            });
            
            // Fechar menu mobile ao clicar em um link
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
    // 6. Intro Animation Logic (Mantida e Refinada)
    // -----------------------------------------------------
    function playIntroAnimation() {
        if (!introAnimationElement || !micContainer || !typedContentSpan) return;

        document.body.style.overflow = 'hidden'; // Previne scroll durante a intro
        document.body.style.opacity = 0; // Esconde o corpo da página inicialmente

        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            document.body.style.opacity = 1; // Mostra o corpo (que contém a intro)

            micContainer.classList.add('active');
            setTimeout(() => {
                audioWaves.forEach((wave, index) => {
                    setTimeout(() => wave.classList.add('active'), index * 250);
                });
                setTimeout(() => {
                    if (typedTextElement) typedTextElement.classList.add('active');
                    typeTextEffect("HEALTH / HEALTH", typedContentSpan, () => { // Callback para quando a digitação terminar
                        setTimeout(completeIntroAnimation, 1200); // Delay após digitar antes de sumir a intro
                    });
                }, 1200); // Delay antes de começar a digitar
            }, 800); // Delay após o microfone aparecer
        }, 300); // Pequeno delay para garantir que o CSS da intro seja carregado
    }

    function typeTextEffect(text, targetElement, onComplete) {
        if (!targetElement) return;
        let i = 0;
        targetElement.innerHTML = ''; // Limpa antes de começar
        const typingSpeed = 120; // Velocidade de digitação (ms)

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
            document.body.style.overflow = ''; // Restaura scroll
        }, 800); // Tempo da transição de opacidade da intro
    }

    // -----------------------------------------------------
    // 7. Smooth Scrolling & Active Navigation Highlighting
    // -----------------------------------------------------
    function setupSmoothScrollAndActiveNav() {
        const headerHeight = header ? header.offsetHeight + (document.querySelector('.ms-badge')?.offsetHeight || 0) : 70;
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20; /* 20px extra offset */
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
                const sectionTop = section.offsetTop - headerHeight - 50; // 50px threshold
                if (window.pageYOffset >= sectionTop) {
                    currentSectionId = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const linkHref = link.getAttribute('href');
                if (linkHref && linkHref.includes(currentSectionId) && currentSectionId !== '') {
                    link.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', throttle(updateActiveNav, 150));
        updateActiveNav(); // Initial call
    }

    // -----------------------------------------------------
    // 8. Intersection Observer for Animations
    // -----------------------------------------------------
    function setupIntersectionObservers() {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.2 // 20% do elemento visível
        };

        const animateOnScroll = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Adiciona um delay escalonado para elementos em um grid, por exemplo
                    const delay = entry.target.dataset.animationDelay ? parseInt(entry.target.dataset.animationDelay) : index * 100;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, delay);
                    
                    // Anima barras de métrica se for a seção de métricas
                    if (entry.target.classList.contains('metrics-column') || entry.target.classList.contains('metric')) {
                        animateMetricBarsInView(entry.target);
                    }
                    
                    observer.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        };

        const observer = new IntersectionObserver(animateOnScroll, observerOptions);
        
        // Elementos que devem animar ao entrar na viewport
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .audience-card, .credential-item, .job-card, .tech-item, .investment-points li, .metrics-column .metric, .competitor-card'
        );
        elementsToAnimate.forEach((el, index) => {
            // Adicionar uma classe base para o estado inicial (ex: opacity 0, transform Y) no CSS
            // E a classe 'is-visible' para o estado final.
            // O CSS fará a transição.
            // Ex: el.classList.add('animate-on-scroll-item');
            el.dataset.animationDelay = index * 50; // Pequeno delay base
            observer.observe(el);
        });
    }

    function animateMetricBarsInView(container) {
        const barsToAnimate = container.classList.contains('metric') ? [container.querySelector('.metric-progress')] : container.querySelectorAll('.metric-progress');
        
        barsToAnimate.forEach(bar => {
            if (bar && !bar.classList.contains('animated-once')) { // Evita re-animar
                const targetWidth = bar.dataset.targetWidth || bar.style.width || '0%'; // Pega do data-attr ou do style inline
                const metricValueElement = bar.closest('.metric')?.querySelector('.metric-value');
                const targetValue = metricValueElement ? parseInt(metricValueElement.textContent.replace('%', '')) : 0;

                bar.style.width = '0%'; // Reset para animar do início
                bar.classList.add('animated-once'); // Marca como animado

                setTimeout(() => { // Força reflow
                    bar.style.width = targetWidth;
                    bar.classList.add('animated'); // Adiciona classe para efeito de brilho se houver no CSS
                    if (metricValueElement) {
                        animateCounter(metricValueElement, 0, targetValue, 1800); // Duração da animação da barra
                    }
                }, 100);
            }
        });
    }
    
    // Animate counter (mantido do original, levemente adaptado)
    function animateCounter(element, start, end, duration) {
        const isPercentage = element.textContent.includes('%');
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutQuart(progress); // Usa a função de easing
            const value = Math.floor(easedProgress * (end - start) + start);
            element.textContent = isPercentage ? `${value}%` : value.toString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }


    // -----------------------------------------------------
    // 9. Carousel Logic (Comparison Section - Mantido e Refinado)
    // -----------------------------------------------------
    function initCarousel() {
        if (!carouselTrack || comparisonData.length === 0) return;

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
        carouselTrack.innerHTML = ''; // Limpa slides existentes
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
                            <div class="competitor-logo">
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
        
        // Atualiza indicadores
        const indicators = carouselIndicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
            indicator.setAttribute('aria-selected', index === currentSlide);
        });

        // Atualiza slides (para acessibilidade)
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        slides.forEach((slide,index) => {
            slide.setAttribute('aria-hidden', index !== currentSlide);
            slide.style.visibility = index === currentSlide ? 'visible' : 'hidden';
        });

        // Foco no slide ativo (opcional, para melhor acessibilidade com teclado)
        // slides[currentSlide]?.focus(); 
    }

    function navigateCarousel(direction) {
        if (carouselIsAnimating) return;
        carouselIsAnimating = true;
        
        const numSlides = comparisonData.length;
        currentSlide = (currentSlide + direction + numSlides) % numSlides;
        
        // Usar transição CSS para o efeito visual, JS apenas atualiza o estado
        updateCarouselVisuals();
        
        // Permitir nova navegação após a transição do CSS
        // A duração da transição é definida em --transition-duration-slow no CSS (500ms)
        setTimeout(() => { carouselIsAnimating = false; }, 500); 
    }

    function goToCarouselSlide(index) {
        if (carouselIsAnimating || index === currentSlide) return;
        carouselIsAnimating = true;
        currentSlide = index;
        updateCarouselVisuals();
        setTimeout(() => { carouselIsAnimating = false; }, 500);
    }

    function startCarouselAutoPlay() {
        stopCarouselAutoPlay(); // Limpa intervalo anterior, se houver
        carouselAutoPlayInterval = setInterval(() => navigateCarousel(1), CAROUSEL_AUTOPLAY_DELAY);
    }
    function stopCarouselAutoPlay() {
        clearInterval(carouselAutoPlayInterval);
    }

    // -----------------------------------------------------
    // 10. Tabs Logic (Opportunities Section - Mantido e Refinado)
    // -----------------------------------------------------
    function initTabs() {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('active')) return;

                const targetTabId = button.dataset.tab; // Ex: "developers"
                
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.setAttribute('hidden', true); // Para acessibilidade
                    if (content.id === `tab-content-${targetTabId}`) {
                        content.classList.add('active');
                        content.removeAttribute('hidden');
                        
                        // Se a aba de investidores for ativada, re-anime as barras de métrica
                        if (targetTabId === 'investors') {
                           const metricsCol = content.querySelector('.metrics-column');
                           if(metricsCol) animateMetricBarsInView(metricsCol);
                        }
                    }
                });
            });
        });

        // Ativa a primeira aba por padrão, se nenhuma estiver ativa
        if (document.querySelector('.tab-button.active') === null && tabButtons.length > 0) {
            tabButtons[0].click();
        }
    }

    // -----------------------------------------------------
    // 11. Footer Logic
    // -----------------------------------------------------
    function updateFooterYear() {
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    // -----------------------------------------------------
    // 12. Hero Background Animation (Placeholder/Initialization)
    // -----------------------------------------------------
    function initHeroBackgroundAnimation() {
        // const heroCanvas = document.getElementById('hero-vector-animation');
        // if (heroCanvas && heroCanvas.getContext) {
        //     const ctx = heroCanvas.getContext('2d');
        //     // Lógica da sua animação vetorial aqui
        //     // Ex: partículas, ondas, formas geométricas se movendo sutilmente
        //     console.log("Hero Canvas Animation Initialized (Placeholder)");
        //
        //     function resizeCanvas() {
        //         heroCanvas.width = heroCanvas.offsetWidth;
        //         heroCanvas.height = heroCanvas.offsetHeight;
        //         // Redesenhar animação se necessário
        //     }
        //     window.addEventListener('resize', debounce(resizeCanvas, 250));
        //     resizeCanvas(); // Initial size
        //
        //     function animate() {
        //         // ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        //         // ... sua lógica de desenho ...
        //         requestAnimationFrame(animate);
        //     }
        //     // animate(); // Começa a animação
        // }
    }

    // Inicia tudo!
    initializePage();
});