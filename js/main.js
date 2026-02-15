/* ============================================
   GARABALY - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
  initHeader();
  initThemeToggle();
  initMobileMenu();
  initScrollReveal();
  initFaqAccordion();
  initSmoothScroll();
  initCountUp();
  initCardGlow();
  initCategoryCarousel();
  initValueCards();
  initLangSwitcher();
});

/* --- Sticky Header --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
      header.classList.remove('header--transparent');
    } else {
      header.classList.remove('header--scrolled');
      header.classList.add('header--transparent');
    }
  };

  // Check if page has a hero (landing page)
  const hasHero = document.querySelector('.hero');
  if (hasHero) {
    header.classList.add('header--transparent');
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  } else {
    // Inner pages - always scrolled style
    header.classList.add('header--scrolled');
  }
}

/* --- Dark Mode Toggle --- */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('garabaly-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('garabaly-theme', newTheme);
  });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* --- Scroll Reveal Animation --- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px',
    }
  );

  elements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
  });
}

/* --- FAQ Accordion --- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      items.forEach(i => i.classList.remove('active'));

      // Open clicked one (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --- Smooth Scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- Count Up Animation for Stats --- */
function initCountUp() {
  const statValues = document.querySelectorAll('[data-count]');
  if (!statValues.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
          const duration = 2000;
          const startTime = performance.now();

          // For target 0, just display immediately with a subtle fade
          if (target === 0) {
            el.textContent = prefix + '0' + suffix;
            observer.unobserve(el);
            return;
          }

          // Show zero first
          if (decimals > 0) {
            el.textContent = prefix + (0).toFixed(decimals) + suffix;
          } else {
            el.textContent = prefix + '0' + suffix;
          }

          // Use a multiplied range for small targets so the animation is smooth
          const multiplier = target <= 10 ? 100 : target <= 100 ? 10 : 1;
          const scaledTarget = target * multiplier;

          // Small delay so "0" is visible before counting starts
          setTimeout(() => {
            const animStart = performance.now();

            function updateCount(currentTime) {
              const elapsed = currentTime - animStart;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const scaledCurrent = easeOut * scaledTarget;
              const current = scaledCurrent / multiplier;

              if (decimals > 0) {
                el.textContent = prefix + current.toFixed(decimals) + suffix;
              } else {
                el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                if (decimals > 0) {
                  el.textContent = prefix + target.toFixed(decimals) + suffix;
                } else {
                  el.textContent = prefix + target.toLocaleString() + suffix;
                }
              }
            }

            requestAnimationFrame(updateCount);
          }, 200);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );

  statValues.forEach(el => observer.observe(el));
}

/* --- Card Glow Effect (mouse-tracking radial highlight) --- */
function initCardGlow() {
  const cards = document.querySelectorAll('.feature-card');
  if (!cards.length) return;

  // Only on non-touch / desktop
  if (window.matchMedia('(hover: hover)').matches) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }
}

/* --- Category Carousel (left/right arrow scrolling) --- */
function initCategoryCarousel() {
  const wrapper = document.querySelector('.carousel-wrapper');
  if (!wrapper) return;

  const grid = wrapper.querySelector('.categories-grid');
  const leftBtn = wrapper.querySelector('.carousel-arrow--left');
  const rightBtn = wrapper.querySelector('.carousel-arrow--right');
  if (!grid || !leftBtn || !rightBtn) return;

  function getScrollAmount() {
    // Scroll by roughly one card width + gap
    const card = grid.querySelector('.category-card');
    if (!card) return 200;
    const style = getComputedStyle(grid);
    const gap = parseFloat(style.gap) || 16;
    return card.offsetWidth + gap;
  }

  function updateArrows() {
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    leftBtn.disabled = grid.scrollLeft <= 2;
    rightBtn.disabled = grid.scrollLeft >= maxScroll - 2;
  }

  leftBtn.addEventListener('click', () => {
    grid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    grid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  grid.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);

  // Initial state
  updateArrows();
}

/* --- Value Cards: show "Read more" only if text is truncated --- */
function initValueCards() {
  const descs = document.querySelectorAll('.value-card__desc');
  if (!descs.length) return;

  descs.forEach(desc => {
    const btn = desc.parentElement.querySelector('.value-card__read-more');
    if (!btn) return;
    // Show button only if content overflows
    if (desc.scrollHeight > desc.clientHeight + 2) {
      btn.classList.add('visible');
    }
  });
}

/* --- Toggle value card expansion (global for onclick) --- */
/* --- Language Switcher Dropdown --- */
function initLangSwitcher() {
  const switcher = document.getElementById('langSwitcher');
  if (!switcher) return;

  const btn = switcher.querySelector('.lang-switcher__btn');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    switcher.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    switcher.classList.remove('open');
  });

  switcher.querySelector('.lang-switcher__dropdown').addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

function toggleValueCard(btn) {
  const desc = btn.parentElement.querySelector('.value-card__desc');
  if (!desc) return;

  const isExpanded = desc.classList.contains('expanded');
  desc.classList.toggle('expanded');
  btn.textContent = isExpanded ? 'Read more' : 'Show less';
}
