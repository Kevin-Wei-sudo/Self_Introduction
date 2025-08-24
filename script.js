// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeSmoothScrolling();
});

// Loading Animation
function initializeLoading() {
    const loading = document.getElementById('loading');
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            // Remove loading element after animation
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    });
}

// Mobile Navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    hamburger.addEventListener('click', mobileMenu);

    function mobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animationElements = [
        { selector: '.hero-content', animation: 'fade-in' },
        { selector: '.profile-card', animation: 'scale-in' },
        { selector: '.about-text', animation: 'fade-in' },
        { selector: '.highlight-item', animation: 'fade-in' },
        { selector: '.timeline-item', animation: 'slide-in-left' },
        { selector: '.project-card', animation: 'fade-in' },
        { selector: '.skill-category', animation: 'fade-in' },
        { selector: '.education-item', animation: 'fade-in' },
        { selector: '.contact-content', animation: 'fade-in' }
    ];

    animationElements.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(animation);
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillLevel = skillBar.getAttribute('data-skill');
                
                setTimeout(() => {
                    skillBar.style.width = `${skillLevel}%`;
                }, 500);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(skillBar => {
        skillObserver.observe(skillBar);
    });
}

// Typing Effect for Hero Title
function initializeTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const originalText = titleElement.innerHTML;
    titleElement.innerHTML = '';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    function typeText() {
        if (charIndex < originalText.length) {
            titleElement.innerHTML += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start typing effect after loading
    setTimeout(typeText, 1500);
}

// Parallax Effect for Hero Section
function initializeParallax() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    });
}

// Dynamic Greeting Based on Time
function initializeDynamicGreeting() {
    const greetingElement = document.querySelector('.hero-subtitle');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
        greeting = '早上好！';
    } else if (hour < 18) {
        greeting = '下午好！';
    } else {
        greeting = '晚上好！';
    }
    
    // Add greeting to subtitle
    const originalText = greetingElement.textContent;
    greetingElement.textContent = `${greeting} ${originalText}`;
}

// Scroll to Top Button
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features
window.addEventListener('load', () => {
    initializeScrollToTop();
    initializeDynamicGreeting();
    
    // Optional: Enable parallax on desktop only
    if (window.innerWidth > 768) {
        initializeParallax();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// CSS animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.log('Image failed to load:', e.target.src);
    }
}, true);

// Console message for developers
console.log(`
%c🚀 欢迎查看我的个人网站源码！
%c如果您对我的技术能力感兴趣，欢迎联系我。
%c✉️ Email: your.email@example.com
`, 
'color: #2563eb; font-size: 16px; font-weight: bold;',
'color: #6b7280; font-size: 14px;',
'color: #059669; font-size: 14px;'
);