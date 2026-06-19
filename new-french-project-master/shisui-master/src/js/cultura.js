// Menu Hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        });
    });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animação para barras dos gráficos
            if (entry.target.classList.contains('grafico-barras')) {
                const barras = entry.target.querySelectorAll('.barra-visual');
                barras.forEach((barra, index) => {
                    const width = barra.style.width;
                    barra.style.width = '0%';
                    setTimeout(() => {
                        barra.style.width = width;
                    }, index * 200);
                });
            }
            
            // Animação para timeline
            if (entry.target.classList.contains('timeline')) {
                const items = entry.target.querySelectorAll('.timeline-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-30px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 300);
                });
            }
        }
    });
}, observerOptions);

// Observar elementos para animação de scroll
const elementsToAnimate = document.querySelectorAll(
    '.intro-card, .arte-card, .matematica-card, .gastronomia-card, .moda-card, .literatura-card, .mc-card, .estatistica-box, .curiosidade-card, .conclusao-point, .grafico-barras, .timeline'
);

elementsToAnimate.forEach(el => observer.observe(el));

// Efeito hover nos cards
const cards = document.querySelectorAll('.intro-card, .arte-card, .matematica-card, .gastronomia-card, .mc-card, .estatistica-box, .conclusao-point');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animação das tabelas ao aparecer
const tabelas = document.querySelectorAll('.stats-table, .dados-table');
tabelas.forEach(tabela => {
    tabela.style.opacity = '0';
    tabela.style.transform = 'translateY(30px)';
    
    const tabelaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                tabelaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    tabelaObserver.observe(tabela);
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animar entrada dos elementos principais
    const mainElements = document.querySelectorAll('.intro-container, .arte-container, .matematica-arte-container, .gastronomia-container, .moda-container, .literatura-container, .musica-cinema-container, .estatistica-container, .dados-container, .curiosidades-container, .conclusao-container');
    mainElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
});

// Parallax effect no hero section
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Animação dos pontos do gráfico de linha
const pontosGrafico = document.querySelectorAll('.ponto');
pontosGrafico.forEach((ponto, index) => {
    ponto.style.opacity = '0';
    ponto.style.transform = 'translate(-50%, -50%) scale(0)';
    
    const pontoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(-50%, -50%) scale(1)';
                }, index * 200);
                pontoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    pontoObserver.observe(ponto);
});

// Efeito de typing no hero content
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Animação da linha do tempo
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 300);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineObserver.observe(item);
});

// Contador animado para estatísticas
const resultados = document.querySelectorAll('.resultado');
resultados.forEach(resultado => {
    const finalValue = resultado.textContent;
    const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    
    const resultadoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let current = 0;
                const increment = numericValue / 50;
                const duration = 1000;
                const stepTime = duration / 50;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        entry.target.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = current.toFixed(1) + ' milhões';
                    }
                }, stepTime);
                
                resultadoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    resultadoObserver.observe(resultado);
});