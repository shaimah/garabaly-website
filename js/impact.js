/* ============================================
   GARABALY — Impact page (impact.html, fr/impact.html, ar/impact.html)
   Loaded with `defer`, after main.js, on the three Impact pages only.
   - Every visible string comes from the page (<script id="impact-copy">),
     so the three languages share this file.
   - Indicator results come from <script id="impact-data"> (all null until
     the first impact report).
   - Each motion block is built when its section approaches the viewport.
   - Counters use data-icount (never data-count: main.js owns that one).
   ============================================ */
(function () {
  'use strict';

  var root = document.querySelector('main.imp');
  var copyEl = document.getElementById('impact-copy');
  var dataEl = document.getElementById('impact-data');
  if (!root || !copyEl || !dataEl) return;

  var H = document.documentElement;
  var NS = 'http://www.w3.org/2000/svg';
  var T = JSON.parse(copyEl.textContent);
  var DATA = JSON.parse(dataEl.textContent);
  var RTL = H.dir === 'rtl';
  var SCRIPT_SRC = document.currentScript ? document.currentScript.src : '';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) H.classList.add('nomotion');
  function mo() { return !H.classList.contains('nomotion'); }

  function $(id) { return document.getElementById(id); }
  function all(sel, ctx) { return [].slice.call((ctx || root).querySelectorAll(sel)); }
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function once(fn) {
    var done = false;
    return function () { if (done) return; done = true; fn(); };
  }
  /* Run fn once, when node comes within 200px of the viewport. */
  function near(node, fn) {
    if (!node) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var o = new IntersectionObserver(function (entries) {
      if (entries.some(function (x) { return x.isIntersecting; })) { o.disconnect(); fn(); }
    }, { rootMargin: '200px 0px' });
    o.observe(node);
  }
  function toast(text) {
    var x = $('toast');
    x.textContent = text;
    x.classList.add('on');
    clearTimeout(x._t);
    x._t = setTimeout(function () { x.classList.remove('on'); }, 1800);
  }

  /* ===== Counters: same behaviour as the homepage (js/main.js initCountUp) =====
     2.8 s ease-out cubic, "0" shown first, 120 ms pause, threshold 0.3, staged band.
     Two extensions: data-dec (decimals, "1,5 ×") and data-format="full" (exact sample sizes, "3 225"). */
  var isFr = /^fr/i.test(H.lang || '');
  function unit(v, en, fr) { return isFr ? v.replace('.', ',') + ' ' + fr : v + en; }
  function formatNumber(n, node) {
    if (node && node.dataset.dec) return n.toFixed(+node.dataset.dec).replace('.', isFr ? ',' : '.');
    if (node && node.dataset.format === 'full') return Math.floor(n).toLocaleString(isFr ? 'fr-FR' : undefined);
    var v;
    if (n >= 1e9) { v = n / 1e9; return unit(v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, ''), 'B', 'Md'); }
    if (n >= 1e6) { v = n / 1e6; return unit(v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, ''), 'M', 'M'); }
    if (n >= 1e3) { v = n / 1e3; return unit(v % 1 === 0 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, ''), 'K', 'k'); }
    return Math.floor(n).toLocaleString(isFr ? 'fr-FR' : undefined);
  }
  function finalTxt(node) {
    return (node.getAttribute('data-prefix') || '') + formatNumber(parseFloat(node.getAttribute('data-icount')), node) + (node.getAttribute('data-suffix') || '');
  }
  function animateCount(node, force) {
    if (node.dataset.counted && !force) return;
    node.dataset.counted = 'true';
    var target = parseFloat(node.getAttribute('data-icount'));
    var suffix = node.getAttribute('data-suffix') || '';
    var prefix = node.getAttribute('data-prefix') || '';
    var duration = 2800;
    if (!mo()) { node.textContent = finalTxt(node); return; }
    node.textContent = prefix + '0' + suffix;
    if (target === 0) return;
    setTimeout(function () {
      var start = performance.now();
      function update(now) {
        var p = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = prefix + formatNumber(eased * target, node) + suffix;
        if (p < 1) requestAnimationFrame(update);
        else node.textContent = finalTxt(node);
      }
      requestAnimationFrame(update);
    }, 120);
  }
  function initCounters() {
    var counters = all('[data-icount]');
    var band = $('band');
    counters.forEach(function (c) { c.textContent = finalTxt(c); });
    var bandCells = all('.band__c');
    bandCells.forEach(function (c, i) { c.style.transitionDelay = (i * 110) + 'ms'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (!x.isIntersecting) return;
        var node = x.target;
        io.unobserve(node);
        var cell = node.closest('.band__c');
        if (cell) {
          /* Band: each figure appears and counts in turn, 2 s apart. */
          if (!mo()) { cell.classList.add('imp-is-in'); node.textContent = finalTxt(node); return; }
          var idx = all('[data-icount]', band).indexOf(node);
          node.textContent = (node.getAttribute('data-prefix') || '') + '0' + (node.getAttribute('data-suffix') || '');
          setTimeout(function () { cell.classList.add('imp-is-in'); animateCount(node); }, idx * 2000);
          return;
        }
        var parent = node.closest('.rv');
        if (parent && !parent.classList.contains('in')) {
          var check = setInterval(function () {
            if (parent.classList.contains('in')) { clearInterval(check); setTimeout(function () { animateCount(node); }, 150); }
          }, 50);
        } else {
          animateCount(node);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(function (c) { if (!c.closest('.imp-hero')) io.observe(c); });
  }

  /* ===== Hero: the network of sellers and buyers ===== */
  function initHero() {
    var hero = $('hero'), F = $('field'), W = 1600, Hh = 900, timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function rnd(a) { var x = Math.sin(a * 99.13) * 43758.5453; return x - Math.floor(x); }

    /* Headline: one span per word, revealed in turn. */
    (function () {
      var h = $('h1'), frag = document.createDocumentFragment(), i = 0;
      function word(w, parent) {
        var outer = document.createElement('span'), inner = document.createElement('span');
        outer.className = 'w';
        inner.textContent = w;
        inner.style.transitionDelay = (i++ * 70) + 'ms';
        outer.appendChild(inner);
        parent.appendChild(outer);
      }
      function fill(text, parent) {
        text.split(/( +)/).forEach(function (w) {
          if (!w) return;
          if (/^ +$/.test(w)) parent.appendChild(document.createTextNode(w));
          else word(w, parent);
        });
      }
      [].slice.call(h.childNodes).forEach(function (n) {
        if (n.nodeType === 3) { fill(n.textContent, frag); return; }
        var em = document.createElement('em');
        fill(n.textContent, em);
        frag.appendChild(em);
      });
      h.textContent = '';
      h.appendChild(frag);
    })();

    var captions = all('#hcap span');
    function caption(i) { captions.forEach(function (s) { s.classList.toggle('on', +s.dataset.c === i); }); }
    var heroCounters = all('[data-icount]', hero);

    function play() {
      timers.forEach(clearTimeout); timers = [];
      F.textContent = '';
      F.setAttribute('viewBox', '0 0 ' + W + ' ' + Hh);
      var defs = el('defs', {}, F);
      var hg = el('linearGradient', { id: 'hg', x1: 0, x2: 1 }, defs);
      el('stop', { offset: 0, 'stop-color': '#C87941' }, hg);
      el('stop', { offset: 1, 'stop-color': '#E8B854' }, hg);
      var glow = el('radialGradient', { id: 'glow' }, defs);
      el('stop', { offset: 0, 'stop-color': '#E8B854', 'stop-opacity': '.55' }, glow);
      el('stop', { offset: 1, 'stop-color': '#E8B854', 'stop-opacity': 0 }, glow);

      var market = el('circle', { cx: 1120, cy: 450, r: 150, fill: 'rgba(232,184,84,.05)', stroke: 'rgba(232,184,84,.4)', 'stroke-width': 1.5, 'stroke-dasharray': '5 8' }, F);
      market.style.transition = 'opacity 1.2s';
      var gThreads = el('g', {}, F), gPoints = el('g', {}, F), pts = [];
      /* The point field starts at y = 215: nothing sits under the fixed header. */
      for (var i = 0; i < 46; i++) {
        var ex = 860 + rnd(i + 1) * 700, ey = 215 + rnd(i + 7) * 620, ang = rnd(i + 3) * 6.283, rr = rnd(i + 5) * 130;
        var sx = 1120 + Math.cos(ang) * rr, sy = 450 + Math.sin(ang) * rr * 0.9, seller = i % 3 === 0;
        var c = el('circle', { cx: ex, cy: ey, r: seller ? 6 : 4, fill: seller ? '#E8B854' : 'rgba(249,246,242,.75)' }, gPoints);
        c.style.transform = 'translate(' + (sx - ex) + 'px,' + (sy - ey) + 'px)';
        c.style.transition = 'none';
        pts.push({ c: c, x: ex, y: ey, s: seller });
      }
      var sellers = pts.filter(function (p) { return p.s; }), buyers = pts.filter(function (p) { return !p.s; }), pairs = [];
      sellers.forEach(function (s, k) {
        var best = null, bd = 1e9;
        buyers.forEach(function (b) {
          var d = Math.hypot(b.x - s.x, b.y - s.y) + rnd(k * 3 + b.x) * 240;
          if (d > 140 && d < 420 && d < bd) { bd = d; best = b; }
        });
        if (best) pairs.push([s, best]);
      });
      pairs = pairs.slice(0, 11);
      /* The diaspora thread leaves at the right edge at y = 150; its label sits at x = W-30, y = 182. */
      var east = sellers.reduce(function (m, s) { return s.x > m.x ? s : m; }, sellers[0]);
      pairs.push([east, { x: W + 40, y: 150, dia: 1 }]);
      var paths = pairs.map(function (pr, k) {
        var a = pr[0], b = pr[1], dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), sg = k % 2 ? 1 : -1;
        var mx = (a.x + b.x) / 2 - dy / L * 0.14 * L * sg, my = (a.y + b.y) / 2 + dx / L * 0.14 * L * sg;
        var p = el('path', { d: 'M' + a.x + ' ' + a.y + ' Q' + mx + ' ' + my + ' ' + b.x + ' ' + b.y, fill: 'none', stroke: 'url(#hg)', 'stroke-width': b.dia ? 2.5 : 1.8, 'stroke-linecap': 'round' }, gThreads);
        var len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p._end = b;
        return p;
      });
      var label = el('text', { x: W - 30, y: 182, 'text-anchor': 'end', 'font-size': 14, 'font-weight': 700, 'letter-spacing': 3, fill: 'rgba(249,246,242,.6)', 'font-family': 'Inter' }, F);
      label.textContent = T.hero.diaspora;
      label.style.opacity = 0;
      label.style.transition = 'opacity .8s';

      function mark(p, instant) {
        if (p._end.dia) return;
        var e = p._end, m = el('g', {}, gThreads);
        el('circle', { cx: e.x, cy: e.y, r: 26, fill: 'url(#glow)' }, m);
        el('circle', { cx: e.x, cy: e.y, r: 10, fill: '#2C1810', stroke: '#E8B854', 'stroke-width': 1.6 }, m);
        el('path', { d: 'M' + (e.x - 4.5) + ' ' + e.y + ' l3.2 3.2 l5.5 -6.5', fill: 'none', stroke: '#E8B854', 'stroke-width': 2, 'stroke-linecap': 'round' }, m);
        m.style.transformBox = 'fill-box';
        m.style.transformOrigin = 'center';
        if (instant) return;
        m.style.opacity = 0;
        m.style.transform = 'scale(.4)';
        m.style.transition = 'opacity .35s,transform .5s cubic-bezier(.3,1.5,.5,1)';
        requestAnimationFrame(function () { requestAnimationFrame(function () { m.style.opacity = 1; m.style.transform = 'none'; }); });
      }

      if (!mo()) {
        market.style.opacity = 0;
        pts.forEach(function (p) { p.c.style.transform = 'none'; });
        paths.forEach(function (p) { p.style.strokeDashoffset = 0; mark(p, true); });
        label.style.opacity = 1;
        caption(3);
        hero.classList.add('go');
        heroCounters.forEach(function (c) { c.textContent = finalTxt(c); });
        return;
      }
      hero.classList.remove('go');
      void hero.offsetWidth;
      later(function () { hero.classList.add('go'); }, 150);
      later(function () { heroCounters.forEach(function (c) { animateCount(c, true); }); }, 1300);
      caption(0);
      market.style.opacity = 1;
      later(function () {
        caption(1);
        market.style.opacity = 0;
        pts.forEach(function (p, i) {
          p.c.style.transition = 'transform 2.2s cubic-bezier(.3,.7,.2,1) ' + (i * 25) + 'ms';
          p.c.style.transform = 'none';
        });
      }, 2200);
      later(function () {
        caption(2);
        paths.forEach(function (p, i) {
          later(function () {
            p.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1)';
            p.style.strokeDashoffset = 0;
            if (p._end.dia) label.style.opacity = 1;
            later(function () { mark(p); }, 1250);
          }, i * 330);
        });
      }, 5200);
      later(function () { caption(3); }, 5200 + paths.length * 330 + 1400);
    }
    play();
  }

  /* ===== 01 · Country tabs ===== */
  function initCountryTabs() {
    var tabs = all('.ctabs button'), slider = $('ctabi'), panels = all('.cpanel');
    tabs.forEach(function (b) {
      b.addEventListener('click', function () {
        var c = +b.dataset.c;
        tabs.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
        slider.style.transform = 'translateX(' + (RTL ? -c : c) * 100 + '%)';
        panels.forEach(function (p) { p.classList.toggle('on', +p.dataset.p === c); });
      });
    });
  }

  /* ===== 01 · Ecosystem diagram (before / after the move / with Garabaly) ===== */
  var ecoStart = function () {};
  var initEco = once(function () {
    var actors = [[T.eco.actors[0], 72, 62], [T.eco.actors[1], 348, 62], [T.eco.actors[2], 72, 262], [T.eco.actors[3], 348, 262]];
    var gLines = $('ecoL'), gActors = $('ecoA'), gPackets = $('ecoP'), lines = [], packets = [];
    var state = 0, raf = null, byUser = false;
    var buttons = all('.seg button'), slider = $('segi'), cap = $('ecoCap');
    actors.forEach(function (a, i) {
      lines.push(el('line', { x1: a[1], y1: a[2], x2: 210, y2: 160, 'class': 'ln', 'stroke-width': 2.5 }, gLines));
      for (var k = 0; k < 2; k++) packets.push({ c: el('circle', { r: 4, 'class': 'pk' }, gPackets), a: a, o: k * 0.5 + i * 0.13 });
      var g = el('g', {}, gActors);
      var ring = el('circle', { cx: a[1], cy: a[2], r: 27, stroke: '#C87941', 'stroke-width': 2 }, g);
      ring.style.fill = 'var(--surface)';
      el('circle', { cx: a[1], cy: a[2] - 6, r: 6.5, fill: '#C87941' }, g);
      el('path', { d: 'M' + (a[1] - 11) + ' ' + (a[2] + 13) + ' q11 -13 22 0', fill: '#C87941' }, g);
      var t = el('text', { x: a[1], y: a[2] + 46, 'text-anchor': 'middle', 'font-size': 10.5, 'font-weight': 800, 'letter-spacing': 1, fill: 'currentColor', 'font-family': 'Inter' }, g);
      t.textContent = a[0];
    });
    function flow(t) {
      packets.forEach(function (p) {
        var u = ((t / 2600) + p.o) % 1;
        p.c.setAttribute('cx', p.a[1] + (210 - p.a[1]) * u);
        p.c.setAttribute('cy', p.a[2] + (160 - p.a[2]) * u);
        p.c.style.opacity = state === 1 ? 0 : Math.sin(u * Math.PI) * 0.95;
      });
      raf = requestAnimationFrame(flow);
    }
    function show(s) {
      state = s;
      buttons.forEach(function (b) { b.classList.toggle('on', +b.dataset.s === s); b.setAttribute('aria-pressed', +b.dataset.s === s); });
      slider.style.transform = 'translateX(' + (RTL ? -s : s) * 100 + '%)';
      lines.forEach(function (l) {
        if (s === 0) { l.setAttribute('stroke', '#C87941'); l.setAttribute('stroke-dasharray', ''); l.style.opacity = 0.9; }
        else if (s === 1) { l.setAttribute('stroke', '#9A8A7C'); l.setAttribute('stroke-dasharray', '4 7'); l.style.opacity = 0.5; }
        else { l.setAttribute('stroke', 'url(#g2)'); l.setAttribute('stroke-dasharray', ''); l.style.opacity = 1; }
      });
      $('hubM').style.opacity = s === 0 ? 1 : (s === 1 ? 0.15 : 0);
      $('hubA').style.opacity = s === 2 ? 1 : 0;
      cap.style.opacity = 0;
      setTimeout(function () { cap.textContent = T.eco.captions[s]; cap.style.opacity = 1; }, mo() ? 220 : 0);
      if (!mo()) { cancelAnimationFrame(raf); packets.forEach(function (p) { p.c.style.opacity = 0; }); }
    }
    buttons.forEach(function (b) { b.addEventListener('click', function () { byUser = true; show(+b.dataset.s); }); });
    show(0);
    ecoStart = function () {
      if (!mo()) { show(2); return; }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(flow);
      show(0);
      setTimeout(function () { if (!byUser) show(1); }, 3200);
      setTimeout(function () { if (!byUser) show(2); }, 6600);
    };
  });

  /* ===== 01 · Cross-border bars ===== */
  function drawBorderBars() {
    all('.bv').forEach(function (p, i) {
      var L = p.getTotalLength();
      p.style.strokeDasharray = L;
      if (!mo()) { p.style.strokeDashoffset = 0; return; }
      p.style.strokeDashoffset = L;
      setTimeout(function () { p.style.transition = 'stroke-dashoffset 1.1s ease'; p.style.strokeDashoffset = 0; }, 250 + i * 380);
    });
  }

  /* ===== 01 · Price squeeze ===== */
  function playSqueeze() {
    var links = all('.link'), up = $('aUp'), dn = $('aDn');
    [up, dn].forEach(function (p) { var L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = mo() ? L : 0; });
    function show(id) { var e = $(id); e.style.transition = 'opacity .6s'; e.setAttribute('opacity', 1); }
    if (!mo()) { links.forEach(function (l) { l.classList.add('on'); }); ['tUp', 'tDn', 'gap', 'bridge'].forEach(show); return; }
    links.forEach(function (l, i) { setTimeout(function () { l.classList.add('on'); }, 300 + i * 900); });
    setTimeout(function () {
      [up, dn].forEach(function (p) { p.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)'; p.style.strokeDashoffset = 0; });
    }, 1200);
    setTimeout(function () { show('tUp'); show('tDn'); }, 2700);
    setTimeout(function () { show('gap'); }, 3200);
    setTimeout(function () { show('bridge'); }, 4200);
  }

  /* ===== 02 · People stage (follows the role cards on scroll) ===== */
  var roleScroll = function () {};
  var initPeople = once(function () {
    var svg = $('pst'), roles = all('.role'), nodes = [], current = -1;
    var pos = [0, 1, 2, 3, 4, 5].map(function (i) { var a = -Math.PI / 2 + i * Math.PI / 3; return [210 + Math.cos(a) * 140, 235 + Math.sin(a) * 140]; });
    var defs = el('defs', {}, svg), pg = el('linearGradient', { id: 'pg', x1: 0, x2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': '#C87941' }, pg);
    el('stop', { offset: 1, 'stop-color': '#E8B854' }, pg);
    var gl = el('g', {}, svg);
    pos.forEach(function (a, i) {
      pos.forEach(function (b, j) {
        if (j > i) el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: 'rgba(249,246,242,.08)', 'stroke-width': 1, 'data-a': i, 'data-b': j, 'class': 'pl' }, gl);
      });
    });
    el('circle', { cx: 210, cy: 235, r: 38, fill: 'rgba(232,184,84,.08)', stroke: 'rgba(232,184,84,.35)', 'stroke-width': 1.2 }, svg);
    var brand = el('text', { x: 210, y: 239, 'text-anchor': 'middle', 'font-size': 10, 'font-weight': 800, 'letter-spacing': 1.5, fill: '#E8B854', 'font-family': 'Inter' }, svg);
    brand.textContent = 'GARABALY';
    pos.forEach(function (p, i) {
      var g = el('g', {}, svg);
      var ring = el('circle', { cx: p[0], cy: p[1], r: 46, fill: 'none', stroke: 'url(#pg)', 'stroke-width': 2, 'class': 'ring', opacity: 0 }, g);
      el('circle', { cx: p[0], cy: p[1], r: 26, fill: '#2C1810', stroke: 'rgba(249,246,242,.25)', 'stroke-width': 1.5 }, g);
      var tx = el('text', { x: p[0], y: p[1] + 5, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 800, fill: 'rgba(249,246,242,.75)', 'font-family': 'Inter' }, g);
      tx.textContent = '0' + (i + 1);
      nodes.push({ r: ring, tx: tx });
    });
    var lines = all('.pl', svg), counter = $('pstN'), title = $('pstT');
    function setRole(i) {
      if (i === current) return;
      current = i;
      roles.forEach(function (r) { r.classList.toggle('act', +r.dataset.r === i); });
      nodes.forEach(function (n, k) {
        var on = k === i;
        n.r.setAttribute('opacity', on ? 1 : 0);
        n.r.style.transform = on ? 'scale(1)' : 'scale(.7)';
        n.tx.setAttribute('fill', on ? '#E8B854' : 'rgba(249,246,242,.55)');
      });
      lines.forEach(function (l) {
        var on = +l.dataset.a === i || +l.dataset.b === i;
        l.setAttribute('stroke', on ? 'rgba(232,184,84,.55)' : 'rgba(249,246,242,.07)');
        l.setAttribute('stroke-width', on ? 1.6 : 1);
      });
      counter.textContent = '0' + (i + 1) + ' / 06';
      title.style.opacity = 0;
      setTimeout(function () { title.textContent = T.roles[i]; title.style.opacity = 1; }, mo() ? 160 : 0);
    }
    roleScroll = function () {
      var y = window.innerHeight * 0.45, best = 0;
      roles.forEach(function (r, i) { if (r.getBoundingClientRect().top < y) best = i; });
      setRole(best);
    };
    setRole(0);
    roleScroll();
  });

  /* ===== 03 · Sale story (sticky phone, spotlight, two tracks) ===== */
  var saleScroll = function () {};
  var initSale = once(function () {
    /* Spotlight boxes, in % of the screen: [left, top, width, height]. Phone screens are never mirrored. */
    var SPOTS = [[2, 59, 62, 9], [3, 44.5, 94, 14.5], [3, 28, 94, 41], [3, 60.5, 94, 7], [3, 60, 94, 8.5]];
    var ANIMAL = [20, 40, 60, 80, 100], MONEY = [0, 0, 0, 60, 100];
    var steps = all('.sstep'), imgs = all('#scr img'), spot = $('spot'), current = -1;
    function setSale(i) {
      if (i === current) return;
      current = i;
      steps.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      imgs.forEach(function (m, k) { m.classList.toggle('on', k === i); });
      var s = SPOTS[i];
      spot.classList.remove('on');
      setTimeout(function () {
        spot.style.left = s[0] + '%'; spot.style.top = s[1] + '%'; spot.style.width = s[2] + '%'; spot.style.height = s[3] + '%';
        spot.classList.add('on');
      }, mo() ? 380 : 0);
      $('tA').textContent = T.sale.animal[i];
      $('bA').style.width = ANIMAL[i] + '%';
      $('tM').textContent = T.sale.money[i];
      $('bM').style.width = MONEY[i] + '%';
    }
    saleScroll = function () {
      var y = window.innerHeight * 0.55, best = 0;
      steps.forEach(function (s, i) { if (s.getBoundingClientRect().top < y) best = i; });
      setSale(best);
    };
    setSale(0);
    saleScroll();
  });

  /* ===== 04 · Theory of change (click a pill: its path lights up) ===== */
  var layoutToc = function () {};
  var initToc = once(function () {
    var LINKS = { P1: ['A4', 'A1', 'A8'], P2: ['A5', 'A4'], P3: ['A2'], P4: ['A2'], P5: ['A6'], P6: ['A3', 'A7', 'A8'], A1: ['O1', 'O2'], A2: ['O2', 'O5'], A3: ['O6'], A7: ['O6', 'O1'], A8: ['O4', 'O6'], A4: ['O1'], A5: ['O3'], A6: ['O4'], O1: ['I7', 'I3'], O2: ['I1', 'I2'], O3: ['I8'], O4: ['I6'], O5: ['I1', 'I4'], O6: ['I9', 'I5'] };
    var svg = $('tocsvg'), wrap = $('tocw'), toc = $('toc'), pills = all('.pill', toc), edges = [], focused = null;
    function pill(id) { return toc.querySelector('[data-id="' + id + '"]'); }
    layoutToc = function () {
      edges.forEach(function (e) { e.p.remove(); });
      edges = [];
      var R = wrap.getBoundingClientRect();
      Object.keys(LINKS).forEach(function (a) {
        LINKS[a].forEach(function (b) {
          /* Each path runs from the reading-direction end of one pill to the start of the next (computed from the DOM, so it holds in RTL). */
          var A = pill(a).getBoundingClientRect(), B = pill(b).getBoundingClientRect();
          var x1 = (RTL ? A.left : A.right) - R.left, y1 = A.top + A.height / 2 - R.top;
          var x2 = (RTL ? B.right : B.left) - R.left, y2 = B.top + B.height / 2 - R.top, mx = (x1 + x2) / 2;
          var p = el('path', { d: 'M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2 }, svg);
          edges.push({ a: a, b: b, p: p });
          if (mo()) {
            var L = p.getTotalLength();
            p.style.strokeDasharray = L;
            p.style.strokeDashoffset = L;
            p.getBoundingClientRect();
            p.style.transition = 'stroke-dashoffset 1.2s ease ' + (Math.random() * 0.6) + 's';
            p.style.strokeDashoffset = 0;
            setTimeout(function () { p.style.strokeDasharray = ''; }, 2000);
          }
        });
      });
    };
    function down(id, s) { s[id] = 1; (LINKS[id] || []).forEach(function (n) { down(n, s); }); }
    function up(id, s) { s[id] = 1; Object.keys(LINKS).forEach(function (k) { if (LINKS[k].indexOf(id) >= 0) up(k, s); }); }
    function clear() {
      focused = null;
      toc.classList.remove('focus');
      svg.classList.remove('focus');
      pills.forEach(function (x) { x.classList.remove('hl'); x.setAttribute('aria-pressed', 'false'); });
      edges.forEach(function (e) { e.p.classList.remove('hl'); });
    }
    pills.forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.dataset.id;
        if (focused === id) { clear(); return; }
        focused = id;
        var s = {};
        down(id, s); up(id, s);
        toc.classList.add('focus');
        svg.classList.add('focus');
        pills.forEach(function (x) { x.classList.toggle('hl', !!s[x.dataset.id]); x.setAttribute('aria-pressed', x === b); });
        edges.forEach(function (e) { e.p.classList.toggle('hl', !!(s[e.a] && s[e.b])); });
      });
    });
    window.addEventListener('resize', function () {
      if (!edges.length) return;
      layoutToc();
      if (focused) { var f = focused; focused = null; pill(f).click(); }
    });
  });

  /* ===== 06 · Indicator explorer (reads #impact-data; empty until the first report) ===== */
  var initIndicators = once(function () {
    var IND = T.indicators, list = $('ilist'), filters = all('#ifil button'), fade = $('ipf');
    $('stampT').textContent = DATA.lastUpdated ? T.stamp.updated + DATA.lastUpdated : T.stamp.none;
    function axes() {
      var c = $('ipC');
      c.textContent = '';
      var a = el('path', { d: 'M30 20 V125 H385', fill: 'none', stroke: 'rgba(249,246,242,.35)', 'stroke-width': 1.2 }, c);
      for (var k = 1; k < 4; k++) el('line', { x1: 30, x2: 385, y1: 125 - k * 26, y2: 125 - k * 26, stroke: 'rgba(249,246,242,.07)' }, c);
      el('circle', { cx: 30, cy: 125, r: 5, fill: '#E8B854' }, c);
      var t = el('text', { x: 38, y: 140, 'font-size': 10, fill: 'rgba(249,246,242,.6)', 'font-family': 'Inter', 'font-weight': 700 }, c);
      t.textContent = T.chartStart;
      if (mo()) {
        var L = a.getTotalLength();
        a.style.strokeDasharray = L;
        a.style.strokeDashoffset = L;
        a.getBoundingClientRect();
        a.style.transition = 'stroke-dashoffset 1s ease';
        a.style.strokeDashoffset = 0;
      }
    }
    var rows = IND.map(function (d, i) {
      var b = document.createElement('button');
      b.className = 'irow';
      b.type = 'button';
      b.dataset.a = d.filter;
      [['k', '0' + (i + 1)], ['t', d.title], ['ar', d.area]].forEach(function (x) {
        var s = document.createElement('span');
        s.className = x[0];
        s.textContent = x[1];
        b.appendChild(s);
      });
      b.addEventListener('click', function () { show(i); });
      list.appendChild(b);
      return b;
    });
    function show(i) {
      var d = IND[i];
      rows.forEach(function (r, k) { r.classList.toggle('on', k === i); r.setAttribute('aria-pressed', k === i); });
      fade.style.opacity = 0;
      setTimeout(function () {
        $('ipA').textContent = d.area;
        $('ipT').textContent = d.title;
        $('ipW').textContent = d.what;
        $('ipH').textContent = d.how;
        $('ipP').textContent = d.publication;
        $('ipE').style.display = DATA.indicators[d.id] ? 'none' : '';
        axes();
        fade.style.opacity = 1;
      }, mo() ? 200 : 0);
    }
    filters.forEach(function (b) {
      b.addEventListener('click', function () {
        filters.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
        var a = b.dataset.a, first = -1;
        rows.forEach(function (r, k) {
          var ok = a === 'all' || r.dataset.a === a;
          r.classList.toggle('dim', !ok);
          if (ok && first < 0) first = k;
        });
        if (first >= 0) show(first);
      });
    });
    show(0);
  });

  /* ===== 07 · Roadmap and dot map (the dot data is fetched here, not before) ===== */
  var roadStart = function () {};
  var initRoad = once(function () {
    var LIT = [['ML', 'BF', 'NE'], ['ML'], ['ML', 'BF', 'NE'], ['ML', 'BF', 'NE'], ['SN', 'CI', 'MR', 'TG', 'BJ'], ['ML', 'BF', 'NE', 'SN', 'CI', 'MR', 'TG', 'BJ']];
    var STEPS = T.road.steps;
    var COL = { live: '#E8B854', next: '#C87941', later: '#6B5444', none: 'rgba(249,246,242,.13)' };
    var STATE = { ML: 'live', BF: 'live', NE: 'live', SN: 'next', CI: 'next', MR: 'next', TG: 'later', BJ: 'later' };
    /* Maps are geography: label positions are fixed and never mirrored. */
    var CENT = { TG: [544, 500], SN: [146, 346], NE: [760, 264], MR: [252, 188], ML: [427, 267], CI: [376, 523], BF: [474, 401], BJ: [579, 471] };
    var LOFF = { TG: [0, 40], BJ: [34, 10], SN: [-16, 4], CI: [0, 0], MR: [10, 0], ML: [0, 0], NE: [0, 0], BF: [0, 0] };
    var map = $('map'), dotLayer = el('g', {}, map), dots = [], labels = {};
    var track = $('rtrack'), bar = $('rbar'), swap = $('rsw'), autoBtn = $('rAuto');
    var buttons = [], index = 0, auto = null, introDone = false, introWanted = false, dotsReady = false;

    Object.keys(CENT).forEach(function (k) {
      var t = el('text', { x: CENT[k][0] + LOFF[k][0], y: CENT[k][1] + LOFF[k][1], 'text-anchor': 'middle', 'class': 'mlbl' }, map);
      t.textContent = T.road.countries[k];
      labels[k] = t;
    });
    function mapState(lit) {
      dots.forEach(function (d) {
        if (!d._c) return;
        var on = lit.indexOf(d._c) >= 0;
        d.setAttribute('fill', COL[STATE[d._c]]);
        d.style.opacity = on ? 1 : 0.4;
        d.setAttribute('r', on ? 3.4 : 2.9);
      });
      Object.keys(labels).forEach(function (k) { labels[k].classList.toggle('dim', lit.indexOf(k) < 0); });
    }
    function mapIntro() {
      if (!mo()) { mapState(LIT[index]); return; }
      dots.forEach(function (d) { d.style.opacity = 0; d.style.transition = 'opacity .5s ease ' + (d._d / 900).toFixed(2) + 's'; });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          mapState(LIT[index]);
          dots.forEach(function (d) { if (!d._c) d.style.opacity = 1; });
        });
      });
      setTimeout(function () {
        dots.forEach(function (d) { d.style.transition = 'opacity .5s ease, r .4s ease'; });
        mapState(LIT[index]);
      }, 1700);
    }
    function buildDots(text) {
      text.split(';').forEach(function (t) {
        var p = t.split(','), c = p[2] || '';
        var d = el('circle', { cx: p[0], cy: p[1], r: c ? 3.1 : 2.4, fill: c ? COL[STATE[c]] : COL.none }, dotLayer);
        d._c = c;
        d._d = Math.hypot(p[0] - 480, p[1] - 330);
        dots.push(d);
      });
      dotsReady = true;
      mapState(LIT[index]);
      if (introWanted && !introDone) { introDone = true; mapIntro(); }
    }
    if (SCRIPT_SRC && window.fetch) {
      fetch(new URL('../assets/data/impact-map-dots.json?v=1', SCRIPT_SRC))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { if (j && j.dots) buildDots(j.dots); })
        .catch(function () { /* the map keeps its labels; the roadmap still works */ });
    }

    function fill(i) {
      var s = STEPS[i];
      $('rPh').textContent = s.phase;
      $('rT').textContent = s.title;
      $('rW').textContent = s.what;
      $('rM').textContent = s.measure;
      $('rP').textContent = s.partner;
    }
    function go(i) {
      index = i;
      buttons.forEach(function (b, k) {
        b.classList.toggle('on', k === i);
        b.classList.toggle('done', k < i);
        if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      bar.style.transform = 'scaleX(' + (i / (STEPS.length - 1)) + ')';
      swap.classList.add('out');
      setTimeout(function () { fill(i); swap.classList.remove('out'); }, mo() ? 220 : 0);
      mapState(LIT[i]);
    }
    function stopAuto() {
      if (!auto) return;
      clearInterval(auto);
      auto = null;
      autoBtn.textContent = T.road.play;
    }
    STEPS.forEach(function (s, i) {
      var b = document.createElement('button');
      b.className = 'rstep' + (i === 0 ? ' here' : '');
      b.type = 'button';
      var pt = document.createElement('div'), h = document.createElement('h3'), sm = document.createElement('small');
      pt.className = 'pt';
      pt.textContent = i + 1;
      h.textContent = s.title;
      sm.textContent = s.status;
      b.appendChild(pt); b.appendChild(h); b.appendChild(sm);
      b.addEventListener('click', function () { stopAuto(); go(i); });
      track.appendChild(b);
      buttons.push(b);
    });
    $('rPrev').addEventListener('click', function () { stopAuto(); go(Math.max(0, index - 1)); });
    $('rNext').addEventListener('click', function () { stopAuto(); go(Math.min(STEPS.length - 1, index + 1)); });
    autoBtn.addEventListener('click', function () {
      if (auto) { stopAuto(); return; }
      autoBtn.textContent = T.road.pause;
      go(0);
      auto = setInterval(function () { if (index >= STEPS.length - 1) { stopAuto(); return; } go(index + 1); }, 3600);
    });
    fill(0);
    go(0);
    /* Called when the roadmap is revealed: step 1, and the map draws itself once. */
    roadStart = function () {
      go(0);
      if (introDone) return;
      if (dotsReady) { introDone = true; mapIntro(); } else introWanted = true;
    };
  });

  /* ===== 08 · Frameworks matrix (each point shows the passage and its source) ===== */
  var initMatrix = once(function () {
    var COLS = ['ML', 'BF', 'NE', 'AES', 'CILSS', 'UA', 'ONU'];
    var body = $('mxb'), quote = $('mq'), Q = T.matrix.quotes, points = [];
    T.matrix.rows.forEach(function (rowName, r) {
      var tr = document.createElement('tr'), th = document.createElement('th');
      th.scope = 'row';
      th.textContent = rowName;
      tr.appendChild(th);
      COLS.forEach(function (c, ci) {
        var td = document.createElement('td'), q = Q[c + '|' + r];
        if (q) {
          var b = document.createElement('button');
          b.className = 'md';
          b.type = 'button';
          b.style.transitionDelay = (r * 60 + ci * 40) + 'ms';
          b.setAttribute('aria-label', q[0] + ' — ' + rowName);
          b.addEventListener('click', function () {
            points.forEach(function (x) { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
            b.classList.add('sel');
            b.setAttribute('aria-pressed', 'true');
            quote.textContent = '';
            /* EN/AR quote our own translation of a French text: the page says so under the quote. */
            var lines = [['b', '', q[0]], ['span', 'qt', q[1]]];
            if (T.matrix.translationNote) lines.push(['small', 'mtr', T.matrix.translationNote]);
            lines.push(['small', '', q[2]]);
            lines.forEach(function (x) {
              var n = document.createElement(x[0]);
              if (x[1]) n.className = x[1];
              n.textContent = x[2];
              quote.appendChild(n);
            });
          });
          points.push(b);
          td.appendChild(b);
        }
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  });

  /* ===== Reveal on scroll (.rv -> .in), with the block each reveal starts ===== */
  function initReveal() {
    var starts = {
      eco: function () { initEco(); ecoStart(); },
      r1: drawBorderBars,
      squeeze: playSqueeze,
      tocw: function () { initToc(); layoutToc(); },
      road: function () { initRoad(); roadStart(); }
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (!x.isIntersecting) return;
        var t = x.target;
        t.classList.add('in');
        if (starts[t.id]) starts[t.id]();
        io.unobserve(t);
      });
    }, { threshold: 0.14 });
    all('.rv').forEach(function (e) { io.observe(e); });
    all('.cards .card').forEach(function (c, i) { c.style.transitionDelay = (i % 3 * 90) + 'ms'; });
  }

  /* ===== Share buttons: copy the chapter link ===== */
  function initShare() {
    all('[data-share]').forEach(function (b) {
      b.addEventListener('click', function () {
        var url = location.href.split('#')[0] + '#' + b.dataset.share;
        try {
          var p = navigator.clipboard && navigator.clipboard.writeText(url);
          if (p && p.catch) p.catch(function () {});
        } catch (e) { /* clipboard unavailable: the toast still shows the anchor */ }
        toast(T.linkCopied + '#' + b.dataset.share);
      });
    });
  }

  /* ===== In-page jumps that flash their target (main.js does the scrolling) ===== */
  function initJumps() {
    all('[data-j]').forEach(function (a) {
      a.addEventListener('click', function () {
        var t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        setTimeout(function () { t.classList.remove('flash'); void t.offsetWidth; t.classList.add('flash'); }, mo() ? 550 : 0);
      });
    });
  }

  /* ===== Progress bar and chapter rail ===== */
  function initRail() {
    var prog = $('prog'), rail = $('rail'), hero = $('hero'), links = all('a', rail);
    var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    function onScroll() {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      prog.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
      var y = window.innerHeight * 0.4, cur = -1;
      secs.forEach(function (s, i) { if (s.getBoundingClientRect().top < y) cur = i; });
      links.forEach(function (a, i) {
        a.classList.toggle('on', i === cur);
        if (i === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      rail.classList.toggle('dark', (cur >= 0 && secs[cur].classList.contains('imp-section--night')) || hero.getBoundingClientRect().bottom > y);
      roleScroll();
      saleScroll();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    /* The rail hides once the standard download card and the footer come into view. */
    var download = $('download');
    if (download) {
      new IntersectionObserver(function (e) {
        rail.classList.toggle('off', e[0].isIntersecting || e[0].boundingClientRect.top < 0);
      }).observe(download);
    }
  }

  /* ===== Start ===== */
  if (!('IntersectionObserver' in window)) {
    /* Very old browsers: build everything at once, in its final state, with no motion. */
    H.classList.add('nomotion');
    all('[data-icount]').forEach(function (c) { c.textContent = finalTxt(c); });
    all('.band__c').forEach(function (c) { c.classList.add('imp-is-in'); });
    initHero(); initCountryTabs(); initShare(); initJumps();
    initEco(); ecoStart(); drawBorderBars(); playSqueeze(); initPeople(); initSale();
    initToc(); layoutToc(); initIndicators(); initRoad(); roadStart(); initMatrix();
    return;
  }
  initCounters();
  initHero();
  initCountryTabs();
  initShare();
  initJumps();
  near($('eco'), initEco);
  near($('personnes'), initPeople);
  near($('vente'), initSale);
  near($('changement'), initToc);
  near($('prouver'), initIndicators);
  near($('route'), initRoad);
  near($('cadres'), initMatrix);
  initReveal();
  initRail();
})();
