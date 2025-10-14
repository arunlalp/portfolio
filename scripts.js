// Set current year
document.addEventListener('DOMContentLoaded', function(){
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;

  // Nav toggle for small screens
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      nav.classList.toggle('show');
    });
  }

  // Sidebar toggle for mobile
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if(sidebarToggle && sidebar){
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
        if(nav) nav.classList.remove('show');
        if(sidebar) sidebar.classList.remove('open');
      }
    });
  });

  // Active section highlight
  const navLinks = document.querySelectorAll('.side-nav a');
  const sections = Array.from(navLinks).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  function onScroll(){
    const pos = window.scrollY + 120;
    let current = sections[0];
    for(const s of sections){
      if(s.offsetTop <= pos) current = s;
    }
    navLinks.forEach(l => l.classList.toggle('active', document.querySelector(l.getAttribute('href')) === current));
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});
