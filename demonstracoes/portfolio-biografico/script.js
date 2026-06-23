/* ============================================================
   script.js — Jornada de Programador
   Animações, interações e efeitos de scroll
============================================================ */

// ──────────────────────────────────────────────
// 1. NAVBAR — adiciona classe ao rolar
// ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ──────────────────────────────────────────────
// 2. REVEAL ON SCROLL — IntersectionObserver
// ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Delay escalonado para grupos de elementos
        const delay = (entry.target.dataset.delay || 0) * 120;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Adiciona delay escalonado para cards em grid
function addDelays(selector, container) {
  const parent = container || document;
  parent.querySelectorAll(selector).forEach((el, i) => {
    el.dataset.delay = i;
  });
}

addDelays('.tech-card');
addDelays('.project-card');
addDelays('.lesson-card');
addDelays('.timeline-item');

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ──────────────────────────────────────────────
// 3. TECH BARS — anima ao entrar na tela
// ──────────────────────────────────────────────
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.dataset.width;
        // Pequeno delay para esperar o card aparecer
        setTimeout(() => {
          bar.style.width = targetWidth + '%';
        }, 300);
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.tech-bar').forEach(bar => barObserver.observe(bar));

// ──────────────────────────────────────────────
// 4. COUNTER ANIMATION — números no hero
// ──────────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.stat-num[data-target]');
        nums.forEach(num => {
          const target = parseInt(num.dataset.target);
          animateCounter(num, target);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ──────────────────────────────────────────────
// 5. SMOOTH SCROLL para links internos
// ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    const navHeight = navbar.offsetHeight;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});

// ──────────────────────────────────────────────
// 6. PARALLAX SUAVE no hero glow
// ──────────────────────────────────────────────
const heroGlows = document.querySelectorAll('.hero-glow');

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  heroGlows.forEach((glow, i) => {
    const factor = (i === 0) ? 1 : -1;
    const moveX = x * 24 * factor;
    const moveY = y * 16 * factor;
    glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}, { passive: true });

// ──────────────────────────────────────────────
// 7. TIMELINE — efeito de highlight ao scrollar
// ──────────────────────────────────────────────
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const icon = entry.target.querySelector('.timeline-icon');
      if (entry.isIntersecting) {
        icon?.classList.add('active');
      }
    });
  },
  { threshold: 0.5 }
);

timelineItems.forEach(item => timelineObserver.observe(item));

// ──────────────────────────────────────────────
// 8. CHIP HOVER — efeito de partícula leve
// ──────────────────────────────────────────────
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.transform = 'scale(1.08)';
    chip.style.transition = 'transform .15s ease';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.transform = 'scale(1)';
  });
});

// ──────────────────────────────────────────────
// 9. PROJECT CARDS — efeito tilt 3D sutil
// ──────────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

// ──────────────────────────────────────────────
// 10. ACTIVE NAV LINK ao scrollar
// ──────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// CSS para nav link active
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--text) !important; }
.nav-links a.active::after { width: 100% !important; }
.timeline-icon.active {
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 4px var(--bg), 0 0 20px var(--neon-glow) !important;
  transform: scale(1.1);
  transition: all .3s ease;
}`;
document.head.appendChild(style);

// ──────────────────────────────────────────────
// 11. TYPING EFFECT no terminal (loop)
// ──────────────────────────────────────────────
const phrases = [
  "'em andamento...'",
  "'aprendendo todo dia'",
  "'sem parar de crescer'",
  "'mais forte a cada bug'",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const outputEl = document.querySelector('.t-output .t-str');

if (outputEl) {
  function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      outputEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      outputEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = isDeleting ? 45 : 75;
    setTimeout(type, speed);
  }

  setTimeout(type, 1500);
}

// ──────────────────────────────────────────────
// 12. FOOTER CODE — cursor no final
// ──────────────────────────────────────────────
// Já tem cursor no terminal — sem redundância

console.log('%c🚀 Jornada de programador carregada!', 'color: #6366f1; font-weight: bold; font-size: 14px;');
console.log('%cCurioso? O código fonte está organizado em index.html, style.css e script.js', 'color: #7c8ca8; font-size: 12px;');
