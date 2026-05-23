// ===== NAV: SCROLL GLASS EFFECT =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveSection();
});

// ===== MOBILE MENU TOGGLE =====
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ===== ANIMATED NUMBER COUNTERS =====
function animateCounter(el, target) {
    const duration = 2000;
    const start    = performance.now();

    const tick = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.floor(eased * target);

        el.textContent = current.toLocaleString();

        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
    };

    requestAnimationFrame(tick);
}

// Trigger counters when the stats section enters the viewport
const statsSection   = document.querySelector('.hero__stats');
let countersStarted  = false;

const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                document.querySelectorAll('.stat__number').forEach(el => {
                    const target = parseInt(el.dataset.target, 10);
                    animateCounter(el, target);
                });
            }
        });
    },
    { threshold: 0.5 }
);

if (statsSection) statsObserver.observe(statsSection);

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__links a');

function highlightActiveSection() {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });

    navLinkEls.forEach(link => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.style.color = isActive ? 'var(--text-primary)' : '';
        link.style.fontWeight = isActive ? '600' : '';
    });
}

// ===== CONTACT FORM SUBMISSION =====
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Joining the list...';
    btn.disabled    = true;
    btn.style.opacity = '0.7';

    // Simulate async submission (replace with real API call when ready)
    setTimeout(() => {
        contactForm.style.display  = 'none';
        formSuccess.style.display  = 'flex';

        // Scroll the success message into view
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1400);
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
// (CSS scroll-behavior handles it, but this adds easing for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
