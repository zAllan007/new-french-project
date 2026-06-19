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

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger animation for list items
            if (entry.target.classList.contains('france-photo-list')) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animation
const elementsToAnimate = document.querySelectorAll(
    '.knowing-intro-text, .knowing-culture-text, .knowing-story-text, .knowing-scenery-text, .knowing-actually-text, .france-photo-list'
);

elementsToAnimate.forEach(el => observer.observe(el));

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const mainImage = document.querySelector('.france-main-image img');
    
    if (mainImage) {
        mainImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Smooth scroll for navigation links
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

// Add hover effect enhancement for photo cards
const photoCards = document.querySelectorAll('.france-photo-list li');
photoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// Typing effect for main text (optional enhancement)
const mainText = document.querySelector('.france-main-text h1');
if (mainText) {
    const text = mainText.textContent;
    mainText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            mainText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});