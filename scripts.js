document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const y = new Date().getFullYear();
    const el = document.getElementById('year');
    if(el) el.textContent = y;

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const header = document.querySelector('.site-header');
    
    if(navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            header.classList.toggle('show');
        });
    }

    // Close mobile nav when clicking on a link
    const navLinks = document.querySelectorAll('.side-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                header.classList.remove('show');
            }
            // Smooth scroll
            const href = link.getAttribute('href');
            if(href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
            }
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !header.contains(e.target) && 
            e.target !== navToggle) {
            header.classList.remove('show');
        }
    });
});
