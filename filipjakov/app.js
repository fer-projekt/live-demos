/* ──────────────── Sv. Filip i Jakov ── interactivity ──────────────── */

/* Hamburger dropdown menu */
(function navMenu(){
  const btn  = document.getElementById('navMenuBtn');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;
  function setOpen(open){
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
})();

/* Boot overlay */
const boot = document.getElementById('boot');
function dismissBoot() {
  if (!boot) return;
  setTimeout(() => boot.classList.add('gone'), 250);
  setTimeout(() => boot.remove(), 1400);
}
if (document.readyState === 'complete') {
  dismissBoot();
} else {
  window.addEventListener('load', dismissBoot);
  // safety net: never let the overlay trap the page
  setTimeout(dismissBoot, 3000);
}

/* Scroll progress bar */
const progress = document.getElementById('scroll-progress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* Nav style on scroll */
const nav = document.getElementById('nav');
const hero = document.querySelector('.hero');

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* Hero info dock — collapse to a persistent reminder button on scroll */
const heroDock = document.getElementById('heroDock');
const heroDockFab = document.getElementById('heroDockFab');
const navSun = document.getElementById('navSun');
if (heroDock) {
  function syncSunState() {
    const open = heroDock.classList.contains('open');
    if (navSun) navSun.setAttribute('aria-expanded', open ? 'true' : 'false');
    heroDock.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  function updateDock() {
    const collapsed = window.scrollY > 140;
    heroDock.classList.toggle('collapsed', collapsed);
    if (heroDockFab) heroDockFab.classList.toggle('shown', collapsed);
    // don't auto-close if the user popped it open from the nav sun
    if (!collapsed && !heroDock.classList.contains('pinned')) heroDock.classList.remove('open');
    syncSunState();
  }
  if (heroDockFab) heroDockFab.addEventListener('click', (e) => {
    e.stopPropagation();
    heroDock.classList.remove('pinned');
    heroDock.classList.toggle('open');
    syncSunState();
  });
  // nav sun → pop the info panel open above all content, anywhere on the page
  if (navSun) {
    navSun.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = heroDock.classList.toggle('open');
      heroDock.classList.toggle('pinned', open);
      syncSunState();
    });
  }
  // tapping/clicking outside closes the popped panel
  document.addEventListener('click', (e) => {
    if (
      heroDock.classList.contains('open') &&
      !heroDock.contains(e.target) &&
      e.target !== heroDockFab &&
      !(navSun && navSun.contains(e.target))
    ) {
      heroDock.classList.remove('open', 'pinned');
      syncSunState();
    }
  });
  // Esc closes it too
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && heroDock.classList.contains('open')) {
      heroDock.classList.remove('open', 'pinned');
      syncSunState();
    }
  });
  window.addEventListener('scroll', updateDock, { passive: true });
  updateDock();
}

/* Hero zoom-in on load */
requestAnimationFrame(() => hero.classList.add('in'));

/* Reveal-on-scroll */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // count-up children
      e.target.querySelectorAll('.count-up').forEach(animateCount);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Handwriting reveal — start drawing when it scrolls into view */
const hwIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      // small beat so it reads as "now being written"
      setTimeout(() => e.target.classList.add('writing'), 250);
      hwIO.unobserve(e.target);
    }
  });
}, { threshold: 0.9 });
document.querySelectorAll('.script.handwrite').forEach(el => hwIO.observe(el));

/* Count-up animation */
function animateCount(el) {
  if (el.dataset.done) return;
  el.dataset.done = '1';
  const to = parseInt(el.dataset.to, 10);
  const suffix = el.dataset.suffix || '';
  const dur = 1400;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(to * eased);
    el.textContent = val.toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* Trigger hero counts after entry */
setTimeout(() => {
  document.querySelectorAll('.hero .count-up').forEach(animateCount);
}, 1300);

/* Heritage zoom on view */
const heritage = document.querySelector('.heritage');
const heritageIO = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) heritage.classList.add('in');
}, { threshold: 0.3 });
heritageIO.observe(heritage);

/* ──────────────── Mood filter ──────────────── */
const moodControls = document.getElementById('mood-controls');
const moodCards = document.querySelectorAll('#mood-grid .mood-card');

moodControls && moodControls.addEventListener('click', e => {
  const btn = e.target.closest('.mood-chip');
  if (!btn) return;
  moodControls.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const mood = btn.dataset.mood;
  moodCards.forEach((card, i) => {
    const tags = (card.dataset.tags || '').split(',');
    const dim = mood !== 'all' && !tags.includes(mood);
    card.style.transitionDelay = (i * 0.05) + 's';
    card.classList.toggle('dim', dim);
    if (!dim) {
      card.animate(
        [{ transform: 'translateY(8px) scale(0.98)' }, { transform: 'none' }],
        { duration: 500, delay: i * 50, easing: 'cubic-bezier(.2,.7,.2,1)' }
      );
    }
  });
});

/* ──────────────── Events calendar ──────────────── */
const EVENTS = {
  MAY: [
    { d: 18, m: 'MAY', name: 'Opening of the bathing season', sub: 'Riva · 11:00 · free', cat: 'culture' },
    { d: 24, m: 'MAY', name: 'Klapa under the stars', sub: 'Borelli garden · 21:00', cat: 'music' },
    { d: 29, m: 'MAY', name: 'Asparagus &amp; spring feast', sub: 'Old market square · all day', cat: 'food' },
  ],
  JUN: [
    { d: 14, m: 'JUN', name: 'Festival of Flowers', sub: 'Town centre · 10:00–22:00 · since 2001', cat: 'culture' },
    { d: 21, m: 'JUN', name: 'Yoga on the riva (free)', sub: 'Every Saturday · 07:00 · bring a towel', cat: 'sport' },
    { d: 24, m: 'JUN', name: "Sv. Ivan's bonfire night", sub: 'Beach · from sundown · feast at 21:30', cat: 'culture' },
    { d: 28, m: 'JUN', name: 'Konoba Open Doors', sub: 'Six family tables, one ticket', cat: 'food' },
  ],
  JUL: [
    { d: 5,  m: 'JUL', name: 'Sailing regatta · Pašman cup', sub: 'Mainland to island and back', cat: 'sport' },
    { d: 12, m: 'JUL', name: 'Olive oil dinner under the bell', sub: 'Hilltop konoba · 6 courses', cat: 'food' },
    { d: 19, m: 'JUL', name: 'Klapa nights · every Friday', sub: 'Borelli garden · 21:00 · €0', cat: 'music' },
    { d: 22, m: 'JUL', name: "Fishermen's evening", sub: 'Riva · grilled sardines &amp; folk music', cat: 'food' },
    { d: 27, m: 'JUL', name: 'Open-air cinema · Dalmatian shorts', sub: 'Town beach · 21:30 · EN subtitles', cat: 'culture' },
  ],
  AUG: [
    { d: 2,  m: 'AUG', name: 'Vela Gospa procession', sub: 'Parish church · 17:00 · 400 years running', cat: 'culture' },
    { d: 9,  m: 'AUG', name: 'Babac island swim race', sub: '2.4km open water · medals &amp; brudet', cat: 'sport' },
    { d: 15, m: 'AUG', name: 'Assumption feast &amp; fair', sub: 'All day · live music until 02:00', cat: 'culture' },
    { d: 22, m: 'AUG', name: 'Wine night · Pašman whites', sub: 'Seven cellars · one walking tour', cat: 'food' },
  ],
  SEP: [
    { d: 6,  m: 'SEP', name: 'End-of-season klapa marathon', sub: 'Four choirs · one harbour', cat: 'music' },
    { d: 14, m: 'SEP', name: 'Olive harvest weekend', sub: 'Pick &amp; press your own bottle', cat: 'food' },
    { d: 21, m: 'SEP', name: 'Riviera half-marathon', sub: 'Flat seaside loop · medals', cat: 'sport' },
  ],
  OCT: [
    { d: 4,  m: 'OCT', name: 'St. Francis blessing of the boats', sub: 'Harbour · 10:00', cat: 'culture' },
    { d: 12, m: 'OCT', name: 'Truffle &amp; wild herbs Sunday', sub: 'Hinterland konoba lunch', cat: 'food' },
    { d: 25, m: 'OCT', name: 'Lantern walk through the old town', sub: 'After dark · 75 lanterns · all welcome', cat: 'culture' },
  ],
};

const eventListEl = document.getElementById('event-list');

function renderAllEvents() {
  const order = ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'];
  const all = order.flatMap(m => EVENTS[m] || []).slice(0, 4);
  eventListEl.innerHTML = all.map((ev, i) => `
    <div class="event-row" style="animation: rise .6s ${0.05 + i * 0.05}s cubic-bezier(.2,.7,.2,1) backwards">
      <div class="date">
        <span class="d">${String(ev.d).padStart(2, '0')}</span>
        <span class="m">${ev.m}</span>
      </div>
      <div class="name">${ev.name}<small>${ev.sub}</small></div>
      <span class="cat ${ev.cat}">${ev.cat}</span>
      <div class="more">→</div>
    </div>
  `).join('');
}
renderAllEvents();

/* ──────────────── Stay type selector + estimate ──────────────── */
const stayTypes = document.getElementById('stay-types');
const estTotal = document.getElementById('est-total');
const bType = document.getElementById('b-type');

const PRICE_MAP = {
  all: 48, hotels: 92, apt: 62, camp: 28, boutique: 145,
};
const COUNT_MAP = {
  hotels: '8 hotels', apt: '96 apartments', camp: '5 campsites', all: '142 stays', boutique: '4 guesthouses',
};

function setEstimate(type) {
  const nightly = PRICE_MAP[type] || 60;
  if (estTotal) {
    estTotal.textContent = '€' + (nightly * 7).toLocaleString();
    estTotal.classList.remove('bump');
    void estTotal.offsetWidth;            // restart animation
    estTotal.classList.add('bump');
  }
  const nightlyEl = document.getElementById('est-nightly');
  const countEl = document.getElementById('est-count');
  if (nightlyEl) nightlyEl.textContent = '€' + nightly;
  if (countEl) countEl.textContent = COUNT_MAP[type] || '';
}

if (stayTypes) stayTypes.addEventListener('click', e => {
  const btn = e.target.closest('.stay-type');
  if (!btn) return;
  stayTypes.querySelectorAll('.stay-type').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const type = btn.dataset.type;
  setEstimate(type);

  // sync the booking dropdown
  const map = { hotels: 'Hotel', apt: 'Apartment', camp: 'Campsite', boutique: 'Boutique guesthouse' };
  if (map[type] && bType) {
    [...bType.options].forEach((o, i) => {
      if (o.text === map[type]) bType.selectedIndex = i;
    });
  }
});

// initialise from the default-active chip
if (stayTypes) {
  const active = stayTypes.querySelector('.stay-type.active');
  setEstimate(active ? active.dataset.type : 'hotels');
}

/* ──────────────── Subtle parallax on hero bg ──────────────── */
const heroBg = document.querySelector('.hero .bg');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 800);
      if (heroBg) heroBg.style.transform = `scale(1) translate3d(0, ${y * 0.18}px, 0)`;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ──────────────── Map info panel ──────────────── */
const MAP_PLACES = {
  town: {
    name: 'Sv. Filip i Jakov', dist: 'CENTRE',
    desc: 'The tourist heart of the municipality — a kilometre-long riva, a baroque parish church, and the marina you\'ll keep coming back to.',
    s1: '3,000+', l1: 'Years lived in', s2: '11 km', l2: 'Coastline', photo: 'assets/std/hero.jpg',
  },
  zadar: {
    name: 'Zadar', dist: '30 KM BY ROAD',
    desc: 'The regional capital — Roman forum, the Sea Organ, and the nearest airport. An easy half-day trip up the coast.',
    s1: '3,000', l1: 'Years old', s2: '35 min', l2: 'By car', photo: 'assets/zadar.jpg',
  },
  biograd: {
    name: 'Biograd na Moru', dist: '8 KM BY ROAD',
    desc: 'A former Croatian royal capital, now a buzzing marina town with ferries to Pašman and a lively summer promenade.',
    s1: '8 km', l1: 'Down the coast', s2: '2', l2: 'Marinas', photo: 'assets/biograd.jpg',
  },
  turanj: {
    name: 'Turanj', dist: '7 MIN BY BIKE',
    desc: 'The neighbouring fishing village, home to a 16th-century watchtower and some of the quietest pebble coves in the bay.',
    s1: '1,200', l1: 'Inhabitants', s2: '1', l2: 'Watchtower', photo: 'assets/turanj.jpg',
  },
  petar: {
    name: 'Sv. Petar na Moru', dist: '22 MIN BY BIKE',
    desc: 'A laid-back resort village with shallow family beaches and the salt flats that have flavoured this coast for centuries.',
    s1: '2.5 km', l1: 'Of beaches', s2: 'Shallow', l2: 'Safe for kids', photo: 'assets/sv-petar.jpg',
  },
  babac: {
    name: 'Babac islet', dist: '3 MIN BY BOAT',
    desc: 'An uninhabited green islet in the middle of the channel — bring a picnic, swim off the rocks, and have it almost to yourself.',
    s1: '0', l1: 'Residents', s2: '12 ha', l2: 'Of pine', photo: 'assets/babac-islet.jpg',
  },
  pasman: {
    name: 'Pašman island', dist: 'FERRY · 35 MIN',
    desc: 'The big island across the channel — a Benedictine monastery, olive groves, and the cleanest sea in the Adriatic by official count.',
    s1: '63 km²', l1: 'Island size', s2: '#1', l2: 'Cleanest sea', photo: 'assets/pasman-island.jpg',
  },
};

const pins = document.querySelectorAll('.map-pin');
const mi = {
  name: document.getElementById('mi-name'),
  desc: document.getElementById('mi-desc'),
  dist: document.getElementById('mi-dist'),
  s1: document.getElementById('mi-stat1'),
  l1: document.getElementById('mi-lab1'),
  s2: document.getElementById('mi-stat2'),
  l2: document.getElementById('mi-lab2'),
  photo: document.getElementById('mi-photo'),
};
const mapInfo = document.getElementById('map-info');

/* map a place key → its lifted resource id (see ext-resource-dependency meta tags) */
const MAP_PHOTO_RES = {
  town: 'mapTown', zadar: 'mapZadar', biograd: 'mapBiograd', turanj: 'mapTuranj',
  petar: 'mapPetar', babac: 'mapBabac', pasman: 'mapPasman',
};

function selectPlace(key) {
  const p = MAP_PLACES[key];
  if (!p || !mi.name) return;
  pins.forEach(pin => pin.classList.toggle('active', pin.dataset.key === key));
  mi.name.textContent = p.name;
  mi.desc.innerHTML = p.desc;
  mi.dist.textContent = p.dist;
  mi.s1.textContent = p.s1;
  mi.l1.textContent = p.l1;
  mi.s2.textContent = p.s2;
  mi.l2.textContent = p.l2;
  // prefer the inlined blob URL (standalone build), fall back to the path (dev)
  const resId = MAP_PHOTO_RES[key];
  const photoSrc = (window.__resources && resId && window.__resources[resId]) || p.photo;
  if (mi.photo && photoSrc) {
    mi.photo.classList.add('swap');
    setTimeout(() => {
      mi.photo.src = photoSrc;
      mi.photo.classList.remove('swap');
    }, 220);
  }
  if (mapInfo) {
    mapInfo.animate(
      [{ opacity: 0.4, transform: 'translateX(6px)' }, { opacity: 1, transform: 'none' }],
      { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' }
    );
  }
}

pins.forEach(pin => {
  pin.addEventListener('click', () => {
    selectPlace(pin.dataset.key);
    pin.querySelector('.pin-dot').animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1.3)' }],
      { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }
    );
  });
});
selectPlace('town');

/* ──────────────── Places grid — scroll parallax ──────────────── */
(function placesParallax() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const places = [...document.querySelectorAll('.places-grid .place')];
  if (!places.length) return;

  // Move each tile's background image onto a dedicated parallax layer
  const layers = places.map(place => {
    const url = place.style.backgroundImage;
    const bg = document.createElement('div');
    bg.className = 'place-bg';
    const img = document.createElement('div');
    img.className = 'place-bg-img';
    img.style.backgroundImage = url;
    bg.appendChild(img);
    place.style.backgroundImage = 'none';
    place.insertBefore(bg, place.firstChild);
    return { place, bg };
  });

  if (reduce) return; // static — layer just sits centered

  const RANGE = 42; // px of vertical drift across the full travel
  let ticking = false;

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    for (const { place, bg } of layers) {
      const r = place.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      // progress: -1 (entering bottom) → 0 (centered) → 1 (leaving top)
      const center = r.top + r.height / 2;
      const p = (center - vh / 2) / (vh / 2 + r.height / 2);
      const y = Math.max(-1, Math.min(1, p)) * RANGE;
      bg.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();

/* ──────────────── Things to do · drag slider ──────────────── */
(function thingsSlider(){
  const vp = document.getElementById('things-viewport');
  const track = document.getElementById('things-track');
  if (!vp || !track) return;
  const arrows = [...document.querySelectorAll('.things-arrow')];

  function cardStep(){
    const card = track.querySelector('.thing-card');
    if (!card) return vp.clientWidth * 0.8;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }
  function updateArrows(){
    const max = vp.scrollWidth - vp.clientWidth - 2;
    arrows.forEach(a => {
      const dir = +a.dataset.dir;
      a.disabled = dir < 0 ? vp.scrollLeft <= 2 : vp.scrollLeft >= max;
    });
  }
  let tween = null;
  function tweenTo(target){
    const max = vp.scrollWidth - vp.clientWidth;
    target = Math.max(0, Math.min(max, target));
    const start = vp.scrollLeft, dist = target - start, dur = 480, t0 = performance.now();
    if (tween) cancelAnimationFrame(tween);
    const ease = t => 1 - Math.pow(1 - t, 3);
    (function step(now){
      const t = Math.min(1, (now - t0) / dur);
      vp.scrollLeft = start + dist * ease(t);
      if (t < 1) tween = requestAnimationFrame(step);
    })(t0);
  }
  arrows.forEach(a => a.addEventListener('click', () => {
    tweenTo(vp.scrollLeft + (+a.dataset.dir) * cardStep());
  }));
  vp.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows, { passive: true });

  /* pointer drag */
  let down = false, startX = 0, startScroll = 0, moved = 0;
  vp.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    down = true; moved = 0;
    startX = e.clientX; startScroll = vp.scrollLeft;
    vp.classList.add('dragging');
    vp.setPointerCapture(e.pointerId);
  });
  vp.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    vp.scrollLeft = startScroll - dx;
  });
  function endDrag(e){
    if (!down) return;
    down = false;
    vp.classList.remove('dragging');
    try { vp.releasePointerCapture(e.pointerId); } catch (_) {}
  }
  vp.addEventListener('pointerup', endDrag);
  vp.addEventListener('pointercancel', endDrag);
  /* suppress click if it was a drag */
  vp.addEventListener('click', e => {
    if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  updateArrows();
})();

/* ──────────── Things to do · scroll-linked horizontal advance ────────────
   When the section reaches the centre of the screen, downward scrolling is
   converted into rightward movement of the cards. Once the last card is
   reached the page resumes its normal vertical scroll (and vice-versa). */
(function thingsScrollLink(){
  const section = document.getElementById('activities');
  const vp = document.getElementById('things-viewport');
  if (!section || !vp) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const maxX = () => vp.scrollWidth - vp.clientWidth;

  // The vertical scroll position at which the carousel becomes "framed" — its
  // bottom meets the viewport bottom, so the heritage section sits just below
  // the fold. We pin the page here while the cards travel sideways.
  function anchorY(){
    const r = section.getBoundingClientRect();
    return Math.max(0, r.top + window.scrollY + r.height - window.innerHeight);
  }

  // Latch: once we start converting vertical scroll into horizontal card
  // travel we STAY engaged until the carousel hits its start/end, then hand
  // scrolling cleanly back to the page. This is what makes a fast flick
  // unable to "escape" past the section with cards still hidden.
  let engaged = false;

  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey) return;                       // let pinch-zoom through
    const m = maxX();
    if (m <= 2) { engaged = false; return; }     // nothing to scroll

    const dy = (e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY);
    if (Math.abs(dy) <= Math.abs(e.deltaX)) return; // honour real horizontal intent

    const aY = anchorY();
    const y  = window.scrollY;
    const left = vp.scrollLeft;
    const atStart = left <= 0.5;
    const atEnd   = left >= m - 0.5;

    // Engage when the frame line is reached/crossed in the travel direction.
    // Guarded by from-above / from-below so we never yank the reader back up
    // when they are already deep inside the heritage section below.
    if (!engaged) {
      const fromAbove = y <= aY + 4;
      const fromBelow = y >= aY - 4;
      const reachDown = dy > 0 && !atEnd  && fromAbove && (y + dy >= aY - 1);
      const reachUp   = dy < 0 && !atStart && fromBelow && (y + dy <= aY + 1);
      if (reachDown || reachUp) engaged = true;
    }
    if (!engaged) return;

    // Hand scrolling back to the page once the carousel runs out in the
    // direction the reader is pushing — this tick falls through to native
    // vertical scroll, so the transition into/out of the section is seamless.
    if (dy > 0 && atEnd)  { engaged = false; return; }
    if (dy < 0 && atStart){ engaged = false; return; }

    e.preventDefault();
    window.scrollTo(0, aY);                       // hold the frame steady
    vp.scrollLeft = Math.max(0, Math.min(m, left + dy));
  }, { passive: false });
})();

/* ──────────── Heritage pin · fade text as Events scrolls up over it ────────────
   Heritage is sticky (position:sticky, top:0) inside .pin-wrap; the Events
   section that follows has a solid background and a higher z-index, so it
   slides up and covers the pinned photo. As Events rises, we fade the
   heritage copy out so the still-visible portion above the Events edge
   dissolves softly rather than getting abruptly clipped. */
(function heritagePinFade(){
  const events  = document.getElementById('events');
  const content = document.querySelector('.heritage-content');
  if (!events || !content) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  content.style.willChange = 'opacity, transform';
  let ticking = false;

  function update(){
    ticking = false;
    const vh  = window.innerHeight;
    const top = events.getBoundingClientRect().top; // distance from viewport top

    // Begin fading once Events has risen into the lower ~80% of the viewport,
    // finish just before it fully covers the pinned photo. Eased for a slow,
    // soft dissolve rather than a linear wipe.
    const start = vh * 0.80;   // events top here → opacity 1
    const end   = vh * 0.05;   // events top here → opacity 0
    let p = (start - top) / (start - end);
    p = Math.max(0, Math.min(1, p));
    const eased = p * p * (3 - 2 * p);            // smoothstep
    content.style.opacity = String(1 - eased);
    content.style.transform = 'translateY(' + (-eased * 24) + 'px)';
  }

  window.addEventListener('scroll', () => {
    if (!ticking){ ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* ──────────── Gallery · horizontal-scroll filmstrip (detroit-style) ────────────
   The .gallery section is tall (360vh); inside, a sticky 100vh stage holds a
   horizontal track. Vertical scroll progress through the section drives the
   track sideways. Movement is lerp-smoothed for momentum; each frame gets a
   subtle per-image parallax and a clip/scale reveal as it enters from the
   right — the soft, inertial feel of detroit.paris. */
(function galleryStrip(){
  const section = document.getElementById('gallery');
  const track   = document.getElementById('gallery-track');
  if (!section || !track) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items  = Array.from(track.querySelectorAll('.g-item'));
  const mobile = () => window.matchMedia('(max-width: 760px)').matches;

  let curX = 0, active = false;

  const maxTranslate = () => Math.max(0, track.scrollWidth - window.innerWidth);

  function progress(){
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    const passed = -section.getBoundingClientRect().top;
    return Math.min(1, Math.max(0, passed / total));
  }

  function update(){
    if (mobile()) { track.style.transform = ''; return; }
    const tarX = -progress() * maxTranslate();
    curX += (tarX - curX) * 0.12;                       // momentum lerp
    if (Math.abs(tarX - curX) < 0.08) curX = tarX;
    track.style.transform = 'translate3d(' + curX.toFixed(2) + 'px,0,0)';

    const vw = window.innerWidth;
    const cx = vw / 2;
    for (const it of items){
      const r = it.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const speed = parseFloat(it.dataset.speed) || 0.15;
      const px = -(center - cx) * speed;               // parallax drift
      it.style.transform = 'translate3d(' + px.toFixed(2) + 'px,0,0)';
      // reveal: 0 while off to the right, 1 once its centre reaches ~72% width
      let rv = (vw * 1.02 - center) / (vw * 1.02 - vw * 0.72);
      rv = Math.min(1, Math.max(0, rv));
      it.style.setProperty('--rv', rv.toFixed(3));
    }
  }

  function loop(){
    if (!active) return;
    update();
    requestAnimationFrame(loop);
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries){
      if (e.isIntersecting && !active){ active = true; requestAnimationFrame(loop); }
      else if (!e.isIntersecting){ active = false; }
    }
  }, { rootMargin: '120px 0px' });
  io.observe(section);

  window.addEventListener('resize', update);
  update();
})();

/* ──────────── Postcard share buttons ──────────── */
(function postcardShare(){
  const track = document.getElementById('gallery-track');
  if (!track) return;
  track.addEventListener('click', async (e) => {
    const btn = e.target.closest('.g-share');
    if (!btn) return;
    e.preventDefault();
    const title = btn.dataset.title || 'A view of the bay';
    const shareData = {
      title: 'A postcard from Sv. Filip i Jakov',
      text: title + ' — a postcard from Sv. Filip i Jakov 🌊',
      url: location.href.split('#')[0],
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.text + ' ' + shareData.url);
      }
      const original = btn.innerHTML;
      btn.classList.add('sent');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
      setTimeout(() => { btn.classList.remove('sent'); btn.innerHTML = original; }, 1600);
    } catch (_) { /* share cancelled — no-op */ }
  });
})();
