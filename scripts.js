document.addEventListener('DOMContentLoaded', () => {
    // Update current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const sideNav = document.getElementById('side-nav');

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sideNav.classList.toggle('show');
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.side-nav') && !e.target.closest('.nav-toggle')) {
            sideNav.classList.remove('show');
        }
    });

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.side-nav a');

    function updateActiveLink() {
        const fromTop = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (fromTop >= sectionTop && fromTop <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile nav after clicking
                    sideNav.classList.remove('show');
                }
            }
        });
    });

    // Animate stats counter
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const isPercentage = finalValue.includes('%');
                    const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
                    
                    let current = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            current = numericValue;
                            clearInterval(timer);
                        }
                        
                        if (isPercentage) {
                            target.textContent = current.toFixed(1) + '%';
                        } else if (finalValue.includes('+')) {
                            target.textContent = Math.floor(current) + '+';
                        } else {
                            target.textContent = current.toFixed(1);
                        }
                    }, 50);
                    
                    observer.unobserve(target);
                }
            });
        });
        
        stats.forEach(stat => observer.observe(stat));
    }

    // Initialize animations
    animateStats();
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    setTimeout(() => {
                        skillBar.style.width = width + '%';
                    }, 200);
                    observer.unobserve(skillBar);
                }
            });
        });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    // Initialize skill bar animations
    animateSkillBars();

    // Add hover effects to skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.setProperty('--index', index);
        
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to tagline
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero tagline
    const tagline = document.querySelector('.hero .tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        setTimeout(() => {
            typeWriter(tagline, originalText, 150);
        }, 1000);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.project-card, .architecture-card, .cert-card, .blog-card, .skill-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add click tracking for project links (for analytics)
    document.querySelectorAll('.project-link, .blog-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default for demo links
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Show a modal or notification that this is a demo
                const notification = document.createElement('div');
                notification.textContent = 'This is a demo link. In a real portfolio, this would link to the actual project or article.';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--accent);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    z-index: 10000;
                    max-width: 300px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
        });
    });
});
