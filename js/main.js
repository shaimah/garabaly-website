/* ============================================
   GARABALY - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLocaleRouting();
  document.documentElement.classList.add('js-ready');
  initHeader();
  initThemeToggle();
  initMobileMenu();
  initScenariosMarquee();
  initListingsMarquee();
  initScrollReveal();
  initFaqAccordion();
  initFaqSingleOpen();
  initFaqSearch();
  initSmoothScroll();
  initCountUp();
  initCardGlow();
  initCategoryCarousel();
  initValueCards();
  initLangSwitcher();
  initFloatingMobileCta();
  initRevolutionQr();
  initLazyVideo();
  initDiasporaCorridor();
  initSearchTypewriter();
  initTracking();
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
        if (typeof track === 'function') track('faq_expand', { id: item.id || '' });
      }
    });
  });
}

/* --- FAQ redesign: single-open native <details> --- */
function initFaqSingleOpen() {
  const all = [...document.querySelectorAll('details.faq')];
  if (!all.length) return;
  all.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) {
      all.forEach(o => { if (o !== d) o.open = false; });
      if (typeof track === 'function') track('faq_expand', { id: d.id || '' });
    }
  }));
}

/* --- FAQ redesign: live on-page search (no backend) --- */
function initFaqSearch() {
  const input = document.getElementById('faqSearch');
  const results = document.getElementById('faqResults');
  if (!input || !results) return;

  const items = [...document.querySelectorAll('details.faq')].map(el => ({
    el,
    id: el.id,
    title: (el.querySelector('summary')?.textContent || '').trim(),
    text: (el.querySelector('.ans')?.textContent || '').trim()
  }));
  const nomatch = results.getAttribute('data-nomatch') || 'No matching question — message us on WhatsApp';
  const wa = 'https://wa.me/22362778871';
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const esc = s => { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; };

  function highlight(title, q) {
    const i = title.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return esc(title);
    return esc(title.slice(0, i)) + '<mark>' + esc(title.slice(i, i + q.length)) + '</mark>' + esc(title.slice(i + q.length));
  }
  function openAndScroll(el) {
    el.open = true;
    const headerH = document.querySelector('.header')?.offsetHeight || 72;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH - 10;
    window.scrollTo({ top, behavior: 'smooth' });
    if (typeof track === 'function') track('faq_search_jump', { id: el.id });
  }
  function render(q) {
    const nq = norm(q.trim());
    if (!nq) { results.hidden = true; results.innerHTML = ''; return; }
    const matches = items.filter(it => norm(it.title).includes(nq) || norm(it.text).includes(nq)).slice(0, 8);
    results.innerHTML = '';
    if (!matches.length) {
      const li = document.createElement('li');
      li.className = 'faq-search__empty';
      li.innerHTML = nomatch.replace(/WhatsApp|واتساب/, m => `<a href="${wa}" target="_blank" rel="noopener noreferrer">${m}</a>`);
      results.appendChild(li);
    } else {
      matches.forEach(it => {
        const li = document.createElement('li');
        li.setAttribute('role', 'option');
        const a = document.createElement('a');
        a.className = 'faq-search__result';
        a.href = '#' + it.id;
        a.innerHTML = highlight(it.title, q.trim());
        a.addEventListener('click', (e) => { e.preventDefault(); openAndScroll(it.el); results.hidden = true; });
        li.appendChild(a);
        results.appendChild(li);
      });
    }
    results.hidden = false;
  }

  input.addEventListener('input', () => render(input.value));
  input.addEventListener('focus', () => { if (input.value) render(input.value); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { input.value = ''; results.hidden = true; } });
  document.addEventListener('click', (e) => {
    if (!results.contains(e.target) && e.target !== input) results.hidden = true;
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

  // Format a number with K / M / B contractions
  function formatNumber(n) {
    if (n >= 1e9) {
      var v = n / 1e9;
      return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '')) + 'B';
    }
    if (n >= 1e6) {
      var v = n / 1e6;
      return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '')) + 'M';
    }
    if (n >= 1e3) {
      var v = n / 1e3;
      return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, '')) + 'K';
    }
    return Math.floor(n).toLocaleString();
  }

  function animateCount(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = 'true';

    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 4500;

    // For target 0, just display immediately
    if (target === 0) {
      el.textContent = prefix + '0' + suffix;
      return;
    }

    // Show zero first
    el.textContent = prefix + '0' + suffix;

    // Brief pause so "0" is visible
    setTimeout(function() {
      var animStart = performance.now();

      function updateCount(currentTime) {
        var elapsed = currentTime - animStart;
        var progress = Math.min(elapsed / duration, 1);
        // Ease out cubic for smooth deceleration
        var easeOut = 1 - Math.pow(1 - progress, 3);
        var current = easeOut * target;

        el.textContent = prefix + formatNumber(current) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          // Final exact value
          el.textContent = prefix + formatNumber(target) + suffix;
        }
      }

      requestAnimationFrame(updateCount);
    }, 300);
  }

  // Single IntersectionObserver for all stat values
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var revealParent = el.closest('.reveal');

          if (revealParent && !revealParent.classList.contains('visible')) {
            var check = setInterval(function() {
              if (revealParent.classList.contains('visible')) {
                clearInterval(check);
                setTimeout(function() { animateCount(el); }, 500);
              }
            }, 50);
          } else {
            animateCount(el);
          }

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 }
  );

  statValues.forEach(function(el) { observer.observe(el); });
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

/* --- Homepage: infinite auto-scrolling scenario marquee --- */
function initScenariosMarquee() {
  const root = document.querySelector('.scenarios-carousel');
  if (!root || root.dataset.marqueeReady === 'true') return;

  const cards = Array.from(root.querySelectorAll(':scope > .scenario-card'));
  if (cards.length < 2) return;

  root.dataset.marqueeReady = 'true';

  const marquee = document.createElement('div');
  marquee.className = 'scenarios-carousel__marquee';
  const track = document.createElement('div');
  track.className = 'scenarios-carousel__track';

  cards.forEach((c) => track.appendChild(c));

  const firstSet = Array.from(track.children);
  firstSet.forEach((card) => {
    const copy = card.cloneNode(true);
    copy.classList.remove('reveal');
    copy.classList.add('visible');
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
  });

  marquee.appendChild(track);
  root.appendChild(marquee);
  root.classList.add('scenarios-carousel--marquee');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    root.classList.add('scenarios-carousel--reduced-motion');
    return;
  }

  const updateMarqueeDuration = () => {
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    const pxPerSecond = 42;
    root.style.setProperty('--scenarios-marquee-duration', `${half / pxPerSecond}s`);
  };

  const scheduleDuration = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(updateMarqueeDuration);
    });
  };

  scheduleDuration();
  window.addEventListener('resize', updateMarqueeDuration);
  window.addEventListener('load', scheduleDuration, { once: true });
}

/* --- §3.11 real-listings carousel: same infinite auto-marquee as the scenarios (reuses .scenarios-carousel--marquee CSS) --- */
function initListingsMarquee() {
  const root = document.querySelector('.gb-listings-carousel');
  if (!root || root.dataset.marqueeReady === 'true') return;

  const cards = Array.from(root.querySelectorAll(':scope > .gb-listing'));
  if (cards.length < 2) return;

  root.dataset.marqueeReady = 'true';

  const marquee = document.createElement('div');
  marquee.className = 'scenarios-carousel__marquee';
  const track = document.createElement('div');
  track.className = 'scenarios-carousel__track';

  cards.forEach((c) => track.appendChild(c));

  Array.from(track.children).forEach((card) => {
    const copy = card.cloneNode(true);
    copy.classList.remove('reveal');
    copy.classList.add('visible');
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
  });

  marquee.appendChild(track);
  root.appendChild(marquee);
  root.classList.add('scenarios-carousel--marquee');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('scenarios-carousel--reduced-motion');
    return;
  }

  const update = () => {
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    root.style.setProperty('--scenarios-marquee-duration', `${half / 42}s`);
  };
  const schedule = () => requestAnimationFrame(() => requestAnimationFrame(update));
  schedule();
  window.addEventListener('resize', update);
  window.addEventListener('load', schedule, { once: true });
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

  const options = switcher.querySelectorAll('.lang-switcher__option');
  options.forEach((option) => {
    option.addEventListener('click', () => {
      const href = option.getAttribute('href') || '';
      let locale = 'en';
      if (href.includes('/fr/')) locale = 'fr';
      if (href.includes('/ar/')) locale = 'ar';
      // Pack 2 Task 2: persist the manual choice so auto-detect never overrides it.
      localStorage.setItem('garabaly_lang_pref', locale);
      localStorage.setItem('garabaly-locale', locale);
      track('lang_switch', { to: locale });
    });
  });
}

function initLocaleRouting() {
  // First-visit language routing is handled by the inline <head> script on the
  // root index.html (Pack 2, Task 2): it browser-detects FR/AR (EN fallback) and
  // respects a manual choice stored under 'garabaly_lang_pref'. No automatic
  // redirect happens here anymore, so the two never conflict.
}

/* --- Pack 3 Task 6: sticky mobile "Get the App" bar (dismissible) --- */
function initFloatingMobileCta() {
  if (window.matchMedia('(min-width: 769px)').matches) return;
  try { if (sessionStorage.getItem('garabaly-appbar-dismissed')) return; } catch (e) {}
  const path = window.location.pathname;
  const L = path.includes('/fr/') ? { t: "L'appli Garabaly, séquestre inclus", c: "Télécharger l'appli" }
          : path.includes('/ar/') ? { t: 'تطبيق غرابالي مع الضمان', c: 'حمّل التطبيق' }
          : { t: 'Get Garabaly — escrow built in', c: 'Get the App' };
  const bar = document.createElement('div');
  bar.className = 'app-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', L.c);
  bar.innerHTML = '<span class="app-bar__text">' + L.t + '</span>'
    + '<a class="btn btn--primary app-bar__cta" href="get-the-app.html">' + L.c + '</a>'
    + '<button class="app-bar__close" type="button" aria-label="Dismiss">&times;</button>';
  document.body.appendChild(bar);
  const hero = document.querySelector('.hero');
  function onScroll() {
    const threshold = hero ? hero.offsetHeight * 0.5 : 240;
    bar.classList.toggle('visible', window.scrollY > threshold);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  bar.querySelector('.app-bar__cta').addEventListener('click', function () { track('get_app_click', { source: 'app_bar' }); });
  bar.querySelector('.app-bar__close').addEventListener('click', function () {
    bar.classList.remove('visible');
    try { sessionStorage.setItem('garabaly-appbar-dismissed', '1'); } catch (e) {}
  });
}

/* --- Pack 3 Task 9: privacy-first, provider-agnostic event tracking (Plausible / Cloudflare / gtag-ready) --- */
function track(name, props) {
  try {
    if (window.plausible) window.plausible(name, { props: props || {} });
    if (window.gtag) window.gtag('event', name, props || {});
    if (window.dataLayer) window.dataLayer.push(Object.assign({ event: name }, props || {}));
  } catch (e) {}
}
function initTracking() {
  document.addEventListener('click', function (e) {
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.indexOf('get-the-app') !== -1) track('get_app_click', { source: 'link' });
    else if (a.classList.contains('qr-revolution') || a.closest('.qr-showcase')) track('qr_scan');
  }, true);
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'contactForm') track('contact_submit');
  }, true);
}

function toggleValueCard(btn) {
  const desc = btn.parentElement.querySelector('.value-card__desc');
  if (!desc) return;

  const isExpanded = desc.classList.contains('expanded');
  desc.classList.toggle('expanded');
  btn.textContent = isExpanded ? 'Read more' : 'Show less';
}

/* --- Pack 2 Task 6: "the revolution, scannable" QR — scan-reveal on scroll-in --- */
function initRevolutionQr() {
  const el = document.querySelector('.qr-revolution');
  if (!el) return;
  if (!('IntersectionObserver' in window)) { el.classList.add('in-view'); return; }
  const io = new IntersectionObserver(function (entries, o) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); o.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  io.observe(el);
}

/* --- §4.1 Lazy inline demo video: load the file + play on first tap --- */
function initLazyVideo() {
  document.querySelectorAll('.gb-video').forEach(function (box) {
    box.addEventListener('click', function () {
      if (box.classList.contains('is-playing')) return;
      const video = box.querySelector('video');
      if (!video) return;
      const src = video.getAttribute('data-src');
      if (src && !video.getAttribute('src')) video.setAttribute('src', src);
      box.classList.add('is-playing');
      video.setAttribute('controls', '');
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(function () {});
      track('demo_video_play', { id: box.getAttribute('data-video') || '' });
    });
  });
}

/* --- R2-3: rotating diaspora corridor (fade, ~2.8s). Static fallback if reduced-motion --- */
function initDiasporaCorridor() {
  const el = document.querySelector('.gb-endpoints[data-corridor]');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let data;
  try { data = JSON.parse(el.getAttribute('data-corridors')); } catch (e) { return; }
  if (!Array.isArray(data) || data.length < 2) return;
  const cities = el.querySelectorAll('.gb-endpoint__city');
  const labels = el.querySelectorAll('.gb-endpoint small');
  if (cities.length < 2 || labels.length < 2) return;
  let i = 0;
  setInterval(function () {
    i = (i + 1) % data.length;
    el.classList.add('is-fading');
    setTimeout(function () {
      const c = data[i];
      cities[0].textContent = c.from; labels[0].textContent = c.fl;
      cities[1].textContent = c.to;   labels[1].textContent = c.tl;
      el.classList.remove('is-fading');
    }, 350);
  }, 2800);
}

/* --- R2-4: illustrative typewriter placeholder for the (app-only) search. Static fallback if reduced-motion --- */
function initSearchTypewriter() {
  const box = document.querySelector('.gb-search[data-typewriter]');
  if (!box) return;
  const ph = box.querySelector('.gb-search__ph');
  if (!ph) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let phrases;
  try { phrases = JSON.parse(box.getAttribute('data-typewriter')); } catch (e) { return; }
  if (!Array.isArray(phrases) || phrases.length < 2) return;
  let pi = 0, ci = 0, deleting = false;
  function tick() {
    const full = phrases[pi];
    ci += deleting ? -1 : 1;
    ph.textContent = full.slice(0, ci);
    let delay = deleting ? 35 : 70;
    if (!deleting && ci === full.length) { deleting = false; delay = 1800; setTimeout(function () { deleting = true; setTimeout(tick, 35); }, delay); return; }
    if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 1500);
}
