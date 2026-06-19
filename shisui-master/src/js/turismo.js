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

// Tabs functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + target).classList.add('active');
    });
});

// Calculadora de Viagem
const calcularBtn = document.getElementById('calcular-btn');
const resultadoContainer = document.getElementById('resultado');

if (calcularBtn && resultadoContainer) {
    calcularBtn.addEventListener('click', () => {
        const dias = parseInt(document.getElementById('dias').value);
        const pessoas = parseInt(document.getElementById('pessoas').value);
        const categoria = parseFloat(document.getElementById('categoria').value);
        
        // Taxa de câmbio aproximada
        const taxaCambio = 5.50;
        
        // Cálculo de custos
        const custoHospedagem = categoria * dias * pessoas;
        const custoAlimentacao = 50 * dias * pessoas;
        const custoTransporte = 15 * dias * pessoas;
        const custoPassagem = 800 * pessoas;
        const custoIngressos = 150 * pessoas;
        const custoSeguro = 80 * pessoas;
        const custoExtras = 200 * pessoas;
        
        const totalEuros = custoHospedagem + custoAlimentacao + custoTransporte + custoPassagem + custoIngressos + custoSeguro + custoExtras;
        const totalReais = totalEuros * taxaCambio;
        
        // Custo por pessoa
        const custoPorPessoaEuros = totalEuros / pessoas;
        const custoPorPessoaReais = custoPorPessoaEuros * taxaCambio;
        
        // Custo médio diário
        const custoMedioDiarioEuros = totalEuros / dias;
        const custoMedioDiarioReais = custoMedioDiarioEuros * taxaCambio;
        
        // Exibir resultado
        resultadoContainer.innerHTML = `
            <div class="resultado-detalhado">
                <h4>Resultado do Cálculo</h4>
                <p><strong>Dias:</strong> ${dias} dias</p>
                <p><strong>Pessoas:</strong> ${pessoas} pessoa(s)</p>
                <p><strong>Categoria:</strong> €${categoria}/dia</p>
                <hr style="border-color: rgba(255,255,255,0.2); margin: 15px 0;">
                <p><strong>Hospedagem:</strong> €${custoHospedagem.toFixed(2)} (R$${(custoHospedagem * taxaCambio).toFixed(2)})</p>
                <p><strong>Alimentação:</strong> €${custoAlimentacao.toFixed(2)} (R$${(custoAlimentacao * taxaCambio).toFixed(2)})</p>
                <p><strong>Transporte:</strong> €${custoTransporte.toFixed(2)} (R$${(custoTransporte * taxaCambio).toFixed(2)})</p>
                <p><strong>Passagem aérea:</strong> €${custoPassagem.toFixed(2)} (R$${(custoPassagem * taxaCambio).toFixed(2)})</p>
                <p><strong>Ingressos:</strong> €${custoIngressos.toFixed(2)} (R$${(custoIngressos * taxaCambio).toFixed(2)})</p>
                <p><strong>Seguro viagem:</strong> €${custoSeguro.toFixed(2)} (R$${(custoSeguro * taxaCambio).toFixed(2)})</p>
                <p><strong>Extras:</strong> €${custoExtras.toFixed(2)} (R$${(custoExtras * taxaCambio).toFixed(2)})</p>
                <hr style="border-color: rgba(255,255,255,0.2); margin: 15px 0;">
                <p style="font-size: 1.2rem; color: var(--color-french-blue);"><strong>TOTAL: €${totalEuros.toFixed(2)} (R$${totalReais.toFixed(2)})</strong></p>
                <p><strong>Custo por pessoa:</strong> €${custoPorPessoaEuros.toFixed(2)} (R$${custoPorPessoaReais.toFixed(2)})</p>
                <p><strong>Custo médio diário:</strong> €${custoMedioDiarioEuros.toFixed(2)} (R$${custoMedioDiarioReais.toFixed(2)})</p>
                <p style="font-size: 0.9rem; color: var(--color-gray-2); margin-top: 10px;">*Taxa de câmbio: €1 = R$${taxaCambio.toFixed(2)}</p>
            </div>
        `;
        
        // Adicionar animação ao resultado
        resultadoContainer.style.opacity = '0';
        resultadoContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultadoContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            resultadoContainer.style.opacity = '1';
            resultadoContainer.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animação para barras do gráfico
            if (entry.target.classList.contains('grafico-barra')) {
                const barras = entry.target.querySelectorAll('.barra-visual');
                barras.forEach((barra, index) => {
                    const width = barra.style.width;
                    barra.style.width = '0%';
                    setTimeout(() => {
                        barra.style.width = width;
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observar elementos para animação de scroll
const elementsToAnimate = document.querySelectorAll(
    '.turismo-paris, .turismo-provence, .turismo-riviera, .conceito-card, .funcao-card, .exemplo-card, .custos-tabela-container, .custos-dias-container, .pontos-turisticos-container, .grafico-container'
);

elementsToAnimate.forEach(el => observer.observe(el));

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

// Efeito hover nos cards de conceitos
const conceitoCards = document.querySelectorAll('.conceito-card');
conceitoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito hover nos cards de exemplos
const exemploCards = document.querySelectorAll('.exemplo-card');
exemploCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateX(10px)';
        card.style.borderColor = 'var(--color-french-blue)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateX(0)';
        card.style.borderColor = 'rgba(255,255,255,0.07)';
    });
});

// Animação das tabelas ao aparecer
const tabelas = document.querySelectorAll('.custos-table');
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
    const mainElements = document.querySelectorAll('.turismo-intro, .matematica-intro, .custos-intro, .exemplos-intro');
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