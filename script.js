// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.textContent = isOpen ? '✕' : '☰';
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.textContent = '☰';
        document.body.style.overflow = '';
    });
});

// ===== FADE IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// ===== STAGGER grid children =====
document.querySelectorAll('.feature-grid, .pricing-cards').forEach(grid => {
    grid.querySelectorAll('.fade').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.08}s`;
    });
});

// ===== CONTACT FORM =====
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Joining...';
    btn.disabled = true;

    setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
    }, 1200);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
