/* ═══ PRELOADER ═══ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) pre.classList.add('hidden');
  }, 1800);
});

/* ═══ NAVBAR SCROLL ═══ */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ═══ HAMBURGER / MOBILE MENU ═══ */
const ham = document.getElementById('navHam');
const mob = document.getElementById('mobMenu');
if (ham && mob) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
  mob.querySelectorAll('.ml').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('open');
      mob.classList.remove('open');
    });
  });
}

/* ═══ HERO SLIDER ═══ */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.hero-dot');
if (slides.length) {
  let current = 0;
  function goTo(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));
  setInterval(() => goTo(current + 1), 5500);
}

/* ═══ SCROLL REVEAL ═══ */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

/* ═══ COUNTER ANIMATION ═══ */
const counters = document.querySelectorAll('.stat-num');
if (counters.length) {
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.t;
      const suffix = el.dataset.s || '';
      let start = 0;
      const duration = 1800;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start) + suffix;
        if (start >= target) clearInterval(timer);
      }, 16);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cio.observe(c));
}

/* ═══ CONTACT FORM ═══ */
const form = document.getElementById('bookForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = document.getElementById('formOk');
    if (ok) { ok.style.display = 'block'; form.reset(); }
  });
}
