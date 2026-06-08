/* ============================================================
   Digital Twins Laboratory — UCF
   Shared JavaScript
   ============================================================ */

/* ── Navbar scroll effect ── */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* Mobile toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  /* Active link */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
})();

/* ── Scroll-reveal (lightweight AOS-like) ── */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('revealed'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ── Particle canvas (used on home hero) ── */
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const GOLD = 'rgba(255, 199, 44,';

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.r  = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.a  = Math.random() * 0.5 + 0.1;
  };

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) p.reset();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + p.a + ')';
      ctx.fill();
    });
    /* Lines between nearby particles */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = GOLD + (0.06 * (1 - d / 100)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── Counter animation ── */
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter, 10);
    const dur    = 1600;
    const step   = 16;
    const inc    = target / (dur / step);
    let cur      = 0;
    const tick   = () => {
      cur = Math.min(cur + inc, target);
      el.textContent = Math.floor(cur) + (el.dataset.suffix || '');
      if (cur < target) setTimeout(tick, step);
    };
    tick();
  });
}

/* ── Typed text effect ── */
function typeText(el, texts, speed = 80, pause = 2200) {
  if (!el) return;
  let ti = 0, ci = 0, deleting = false;
  function tick() {
    const full = texts[ti];
    el.textContent = deleting ? full.slice(0, ci--) : full.slice(0, ci++);
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && ci > full.length) { deleting = true; delay = pause; }
    else if (deleting && ci < 0)       { deleting = false; ti = (ti + 1) % texts.length; ci = 0; delay = 400; }
    setTimeout(tick, delay);
  }
  tick();
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles('hero-canvas');

  /* Counter trigger on scroll */
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { animateCounters(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(statsSection);
  }

  /* Typed text — each page controls its own via inline script.
     Call typeText(el, texts) from the page if needed. */
  if (typeof pageTypedTexts !== 'undefined') {
    typeText(document.getElementById('typed-text'), pageTypedTexts);
  }
});
