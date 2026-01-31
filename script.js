// ====================================
// TYPING ANIMATION
// ====================================
const typingText = document.querySelector('.typing');
const words = [
    "a Full Stack Developer.",
    "a Data Analyst.",
    "a Creative Problem Solver.",
    "an Innovation Enthusiast."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;
let deletingSpeed = 60;
let pauseDuration = 2000;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        speed = pauseDuration;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = typingSpeed;
    }

    setTimeout(type, speed);
}

// ====================================
// NAVBAR FUNCTIONALITY
// ====================================
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLink = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
navLink.forEach(link => {
    link.addEventListener('click', (e) => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Update active state
        navLink.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLink.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ====================================
// SCROLL REVEAL ANIMATION
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const reveals = document.querySelectorAll('.reveal');
reveals.forEach(el => observer.observe(el));

// ====================================
// PROGRESS BAR ANIMATION
// ====================================
const progressFills = document.querySelectorAll('.progress-fill');
let progressAnimated = false;

window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && !progressAnimated) {
            progressAnimated = true;
            animateProgressBars();
        }
    }
});

function animateProgressBars() {
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });
}

// ====================================
// SMOOTH SCROLL WITH ACTIVE STATE
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// PARALLAX EFFECT FOR HERO IMAGE
// ====================================
const heroImage = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
    if (heroImage && window.scrollY < window.innerHeight) {
        const scrollPosition = window.scrollY;
        heroImage.style.backgroundPosition = `center ${scrollPosition * 0.3}px`;
    }
});

// ====================================
// FLOATING ANIMATION FOR HERO ELEMENTS
// ====================================
const heroStats = document.querySelector('.hero-stats');
window.addEventListener('scroll', () => {
    if (heroStats) {
        const scrollPosition = window.scrollY;
        const parallaxValue = scrollPosition * 0.5;
        if (scrollPosition < window.innerHeight) {
            heroStats.style.transform = `translateY(${parallaxValue}px)`;
        }
    }
});

// ====================================
// CARD HOVER EFFECT
// ====================================
const projectCards = document.querySelectorAll('.project-card');
const educationItems = document.querySelectorAll('.education-item');
const contactItems = document.querySelectorAll('.contact-item');
const skillCategories = document.querySelectorAll('.skill-category');

[...projectCards, ...educationItems, ...contactItems, ...skillCategories].forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// ====================================
// COUNTER ANIMATION (STATS)
// ====================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;

        const updateCount = () => {
            const increment = target / speed;
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCount, 20);
            } else {
                counter.textContent = target + '+';
            }
        };

        if (!counter.hasAttribute('data-animated')) {
            counter.setAttribute('data-animated', 'true');
            updateCount();
        }
    });
}

// Trigger counter animation when in view
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ====================================
// PAGE INITIALIZATION
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    type();
    updateActiveNavLink();

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease';
        });
    });

    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Initialize scroll reveal on load
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// ====================================
// UTILITY: Add scroll-to-top button
// ====================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            createScrollToTopButton();
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) scrollBtn.remove();
    }
});

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.classList.add('scroll-to-top');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 55px;
        height: 55px;
        background: linear-gradient(135deg, #D4A574, #C99B8E);
        color: #1A1D23;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.3rem;
        z-index: 999;
        animation: slideUp 0.3s ease;
        box-shadow: 0 8px 25px rgba(212, 165, 116, 0.3);
        transition: all 0.3s ease;
        font-weight: 700;
    `;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) translateY(-5px)';
        this.style.boxShadow = '0 12px 35px rgba(212, 165, 116, 0.5)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(212, 165, 116, 0.3)';
    });

    document.body.appendChild(button);
}

// ====================================
// PERFORMANCE OPTIMIZATION
// ====================================
// Lazy load non-critical elements
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                lazyObserver.unobserve(entry.target);
            }
        });
    });

    lazyElements.forEach(element => {
        element.style.opacity = '0';
        lazyObserver.observe(element);
    });
}

// ====================================
// KEYBOARD NAVIGATION
// ====================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ====================================
// ACCESSIBILITY IMPROVEMENTS
// ====================================
// Ensure all interactive elements are keyboard accessible
const interactiveElements = document.querySelectorAll('a, button, .contact-item, .project-card, .education-item');
interactiveElements.forEach(element => {
    if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
    }
});

// ====================================
// THEME DETECTION
// ====================================
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
    document.documentElement.style.colorScheme = 'dark';
}

// ====================================
// SMOOTH SCROLL INDICATOR ANIMATION
// ====================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ====================================
// SMOOTH MOUSE TRACKING FOR HERO CONTENT
// ====================================
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    document.addEventListener('mousemove', (e) => {
        if (window.scrollY < window.innerHeight) {
            const x = (window.innerWidth - e.clientX) / 50;
            const y = (window.innerHeight - e.clientY) / 50;
            
            heroContent.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
            heroContent.style.transition = 'transform 0.1s ease-out';
        }
    });

    document.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        heroContent.style.transition = 'transform 0.5s ease-out';
    });
}
