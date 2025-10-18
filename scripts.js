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
});
