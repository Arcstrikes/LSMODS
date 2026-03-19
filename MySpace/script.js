// =============================================
// LSMODS – script.js
// =============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Service cards — scroll-triggered reveal with stagger
const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.index) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(card => observer.observe(card));
}

// Animate stat numbers (count-up)
function animateCounter(el, target, duration = 1500) {
  const isPercent = el.textContent.includes('%');
  const isPlus = el.textContent.includes('+');
  const isSlash = el.textContent.includes('/');
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    const value = Math.floor(ease * target);
    if (isPercent) el.textContent = value + '%';
    else if (isPlus) el.textContent = value + '+';
    else if (isSlash) el.textContent = '24/7';
    else el.textContent = value;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
if (statNums.length > 0) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        if (text.includes('500')) animateCounter(el, 500);
        else if (text.includes('100')) animateCounter(el, 100);
        else if (text.includes('24/7')) { /* keep as is */ }
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));
}

// Subtle parallax on hero grid
window.addEventListener('mousemove', (e) => {
  const gridOverlay = document.querySelector('.hero-grid-overlay');
  if (!gridOverlay) return;
  const xPct = (e.clientX / window.innerWidth - 0.5) * 15;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 10;
  gridOverlay.style.transform = `translate(${xPct}px, ${yPct}px)`;
});

// Price cards — subtle entrance animation
const priceCards = document.querySelectorAll('.price-card');
if (priceCards.length > 0) {
  const priceObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        priceObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  priceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    priceObs.observe(card);
  });
}

// TOS blocks entrance
const tosBlocks = document.querySelectorAll('.tos-block');
if (tosBlocks.length > 0) {
  const tosObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        tosObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  tosBlocks.forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateX(-12px)';
    tosObs.observe(block);
  });
}

// Console signature
console.log('%c◆ LSMods', 'font-size:20px; font-weight:bold; color:#f5c518;');
console.log('%cGTA V Modding Service — lsmods.gg', 'color:#8080a0;');