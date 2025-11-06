// Page Load Animation
window.addEventListener('load', () => {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            // Animate hero content entrance
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 300);
            }
        }, 1500);
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// Navbar background on scroll with smooth transition
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    
    if (currentScroll > 50) {
        if (currentTheme === 'dark') {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        if (currentTheme === 'dark') {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.85)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
        }
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = `${progress}%`;
            observer.unobserve(progressBar);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-progress').forEach(bar => {
    observer.observe(bar);
});

// Animate elements on scroll with stagger effect
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(40px) scale(0.95)';
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                animateOnScroll.unobserve(entry.target);
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation with initial hidden state
document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.95)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    animateOnScroll.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name && email && subject && message) {
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Enhanced typing effect for hero title with cursor
const typingElement = document.querySelector('.name');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.borderRight = '3px solid';
    typingElement.style.animation = 'blink 1s infinite';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(() => {
        typeWriter();
    }, 800);
}

// Add blink animation for cursor
    const style = document.createElement('style');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const cursorColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
    style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: ${cursorColor}; }
    }
`;
document.head.appendChild(style);

// Enhanced parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (hero && heroContent) {
        // Subtle parallax for hero content
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
        
        // Parallax for hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px) scale(${Math.max(0.95, 1 - scrolled / 1000)})`;
        }
    }
});

// Initialize skill bars to 0 width
document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = '0%';
});

// Enhanced hover effects with smooth transitions
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease';
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.zIndex = '1';
    });
});

// Add hover effect to skill cards with rotation
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.03) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Enhanced smooth fade-in for sections with different directions
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add subtle animation class
                if (index % 2 === 0) {
                    entry.target.classList.add('slide-in-left');
                } else {
                    entry.target.classList.add('slide-in-right');
                }
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    sectionObserver.observe(section);
});

// Enhanced console welcome message
console.log('%c✨ Welcome to My Portfolio! ✨', 'background: #000; color: #fff; padding: 15px; font-size: 18px; font-weight: bold; border-radius: 8px;');
console.log('%c🎨 Feel free to explore the code!', 'color: #666; font-size: 14px; font-weight: 600;');
console.log('%c💡 Built with passion and attention to detail', 'color: #999; font-size: 12px;');

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const progressColor = currentTheme === 'dark' ? '#ffffff' : '#000000';
        progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: ${progressColor};
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Theme Toggle Functionality
const initThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateCursorTrailColors(newTheme);
        updateFloatingParticles(newTheme);
    });
};

const updateThemeIcon = (theme) => {
    const icon = document.querySelector('.theme-toggle-slider i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
};

// Cursor Trail Animation
const createCursorTrail = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const colors = currentTheme === 'dark' 
        ? ['#ffffff', '#cccccc', '#999999', '#666666']
        : ['#000000', '#333333', '#666666', '#999999'];
    const trail = [];
    const trailLength = 15;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Create trail particles
    for (let i = 0; i < trailLength; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        particle.style.cssText = `
            position: fixed;
            width: ${10 - i * 0.4}px;
            height: ${10 - i * 0.4}px;
            border-radius: 50%;
            background: ${colors[i % colors.length]};
            pointer-events: none;
            z-index: 9998;
            opacity: ${1 - i * 0.06};
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease-out;
            box-shadow: 0 0 ${5 + i * 2}px ${colors[i % colors.length]};
            filter: blur(${i * 0.3}px);
        `;
        document.body.appendChild(particle);
        trail.push({
            element: particle,
            x: 0,
            y: 0
        });
    }

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate trail particles
    const animateTrail = () => {
        // Move cursor towards mouse position
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        // Update each particle position
        trail.forEach((particle, index) => {
            if (index === 0) {
                particle.x = cursorX;
                particle.y = cursorY;
            } else {
                const prevParticle = trail[index - 1];
                particle.x += (prevParticle.x - particle.x) * 0.3;
                particle.y += (prevParticle.y - particle.y) * 0.3;
            }

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });

        requestAnimationFrame(animateTrail);
    };

    animateTrail();

    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        trail.forEach(p => p.element.style.opacity = '0');
    });

    document.addEventListener('mouseenter', () => {
        trail.forEach((p, i) => {
            p.element.style.opacity = `${1 - i * 0.06}`;
        });
    });
};

// Initialize theme toggle and cursor trail when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        createCursorTrail();
    });
} else {
    initThemeToggle();
    createCursorTrail();
}

// Update cursor trail colors when theme changes
const updateCursorTrailColors = (theme) => {
    const trailParticles = document.querySelectorAll('.cursor-trail');
    const colors = theme === 'dark' 
        ? ['#ffffff', '#cccccc', '#999999', '#666666']
        : ['#000000', '#333333', '#666666', '#999999'];
    
    trailParticles.forEach((particle, index) => {
        const color = colors[index % colors.length];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${5 + index * 2}px ${color}`;
    });
};

// Update floating particles when theme changes
const updateFloatingParticles = (theme) => {
    const particles = document.querySelectorAll('.floating-particle');
    const colors = theme === 'dark' 
        ? ['#ffffff', '#cccccc', '#999999']
        : ['#000000', '#333333', '#666666'];
    
    particles.forEach(particle => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${parseInt(particle.style.width)}px ${color}`;
    });
};

// Floating particles background
const createFloatingParticles = () => {
    const particleCount = 30;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const colors = currentTheme === 'dark' 
        ? ['#ffffff', '#cccccc', '#999999']
        : ['#000000', '#333333', '#666666'];
    
    // Add floating animation keyframes (shared animation)
    const style = document.createElement('style');
    style.textContent += `
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(30px, -40px) scale(1.2);
                opacity: 0.6;
            }
            50% {
                transform: translate(-25px, 35px) scale(0.8);
                opacity: 0.4;
            }
            75% {
                transform: translate(40px, 20px) scale(1.1);
                opacity: 0.5;
            }
        }
        
        @keyframes float-particle-2 {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(-35px, 30px) scale(1.1);
                opacity: 0.5;
            }
            50% {
                transform: translate(25px, -30px) scale(0.9);
                opacity: 0.6;
            }
            75% {
                transform: translate(-20px, -20px) scale(1.2);
                opacity: 0.4;
            }
        }
        
        @keyframes float-particle-3 {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(20px, 35px) scale(0.9);
                opacity: 0.5;
            }
            50% {
                transform: translate(-30px, -25px) scale(1.1);
                opacity: 0.4;
            }
            75% {
                transform: translate(35px, -15px) scale(0.8);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const animationType = ['float-particle', 'float-particle-2', 'float-particle-3'][Math.floor(Math.random() * 3)];
        
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${startX}px;
            top: ${startY}px;
            box-shadow: 0 0 ${size * 2}px ${color};
            animation: ${animationType} ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        
        document.body.appendChild(particle);
    }
};

// Initialize floating particles
createFloatingParticles();

// Interactive cursor effect on hoverable elements
document.querySelectorAll('a, button, .btn, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'none';
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});

