/* ============================================================
   Customer Purchase Value Prediction – Showcase JS
   Scroll animations, counter, navigation, smooth UX
   ============================================================ */

(function () {
  'use strict';

  // ── Constants ─────────────────────────────────────────
  // Fallback matches --nav-height in styles.css
  var NAV_HEIGHT_FALLBACK = 68;

  // ── Navbar scroll effect ────────────────────────────────
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Hamburger menu ──────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // ── Smooth scroll for anchor links ─────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || NAV_HEIGHT_FALLBACK,
          10
        );
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Intersection Observer – scroll reveal ──────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Animated counters ───────────────────────────────────
  function animateCounter(el, target, duration) {
    const start     = performance.now();
    const startVal  = 0;

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease     = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(startVal + (target - startVal) * ease);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statValues = entry.target.querySelectorAll('[data-target]');
          statValues.forEach(el => {
            const target   = parseInt(el.getAttribute('data-target'), 10);
            const duration = target >= 1000 ? 2400 : 1600;
            animateCounter(el, target, duration);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero__stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ── Parallax orbs on mouse move ─────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', throttle((e) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx;
      const dy = (clientY - cy) / cy;

      document.querySelectorAll('.orb').forEach((orb, i) => {
        const factor = (i + 1) * 8;
        orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      });
    }, 40));
  }

  // ── Active nav link on scroll ───────────────────────────
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems  = document.querySelectorAll('.nav__links a[href^="#"]');

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(a => a.classList.remove('active'));
          const match = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    },
    { rootMargin: `-${nav ? nav.offsetHeight : NAV_HEIGHT_FALLBACK}px 0px -60% 0px` }
  );

  sections.forEach(s => activeObserver.observe(s));

  // ── Utility: throttle ───────────────────────────────────
  function throttle(fn, delay) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  // ── Typing effect for hero title accent ─────────────────
  // Subtle typing cursor on first load
  const gradientText = document.querySelector('.hero__title .gradient-text');
  if (gradientText) {
    const original = gradientText.textContent;
    gradientText.textContent = '';
    let i = 0;
    const typeTimer = setInterval(() => {
      gradientText.textContent += original[i];
      i++;
      if (i >= original.length) clearInterval(typeTimer);
    }, 60);
  }

  // ── Feature cards tilt effect ───────────────────────────
  document.querySelectorAll('.feature-card, .stack-card, .about__card').forEach(card => {
    card.addEventListener('mousemove', throttle((e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) *  5;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }, 20));

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

})();
