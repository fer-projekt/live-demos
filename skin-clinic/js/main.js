/* ===========================================================
   Fidelia — interactions & scroll effects
   Requires Alpine.js (loaded via CDN in index.html)
   =========================================================== */

/* Alpine component: "Istaknute usluge" scroll-driven showcase */
function uslugeShowcase() {
  return {
    active: 0,
    _raf: null,
    onScroll() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        if (window.innerWidth < 1024) return;
        const el = document.getElementById('usluge-showcase');
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(Math.max(-el.getBoundingClientRect().top / total, 0), 1);
        const n = this.items.length;
        // even bands with a centred mapping — no jitter at band edges
        const idx = Math.min(Math.max(Math.round(p * (n - 1)), 0), n - 1);
        if (idx !== this.active) this.active = idx;
      });
    },
    items: [
      { t: 'Longevity', d: 'Dijagnostika, genetika, hormoni i prevencija — temelj dugovječnosti.', img: 'images/usluga-longevity.jpg' },
      { t: 'Specijalističke djelatnosti', d: 'Od dermatovenerologije do vaskularne i plastične kirurgije.', img: 'images/usluga-specijalisticke.jpg' },
      { t: 'Regenerativna medicina', d: 'Matične stanice, Miracell® i vitaminski boosteri.', img: 'images/usluga-regenerativna.jpg' },
      { t: 'Laserski tretmani', d: 'Napredne laserske tehnologije za kožu i tijelo.', img: 'images/usluga-laseri.jpg' },
      { t: 'Estetska medicina', d: 'Suptilni, prirodni rezultati — bez pretjerivanja.', img: 'images/usluga-estetska.jpg' },
      { t: 'Skin Clinic', d: 'Kozmetologija i njega kože vođena medicinom.', img: 'images/usluga-skin-clinic.jpg' }
    ]
  };
}

/* --- unified rAF-smoothed scroll effects (parallax + horizontal carousel) --- */
(function () {
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const lerp = (a, b, t) => a + (b - a) * t;
  let parCur = null, trackCur = null, lastT = null;

  const frame = (now) => {
    const dt = lastT === null ? 16 : Math.min(now - lastT, 50);
    lastT = now;
    // frame-rate independent smoothing factor
    const k = 1 - Math.exp(-dt / 110);
    // parallax on the pristup photo
    const img = document.getElementById('pristup-img');
    if (img) {
      const sec = img.closest('section');
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      const target = (p - 0.5) * 170;
      parCur = parCur === null ? target : lerp(parCur, target, k);
      if (Math.abs(parCur - target) < 0.1) parCur = target;
      img.style.transform = `translate3d(0, ${parCur.toFixed(2)}px, 0)`;
    }

    // pin programs section + scroll-driven horizontal carousel
    const wrap = document.getElementById('programi-wrap');
    const sec2 = document.getElementById('programi-sec');
    if (wrap && sec2) {
      const track = sec2.querySelector('[x-ref="track"]');
      const dist = track ? Math.max(track.scrollWidth - track.clientWidth, 0) : 0;
      const topOffset = Math.min(0, window.innerHeight - sec2.offsetHeight);
      sec2.style.top = topOffset + 'px';
      const wantH = (sec2.offsetHeight + dist) + 'px';
      if (wrap.style.height !== wantH) wrap.style.height = wantH;
      if (dist && track) {
        const r2 = wrap.getBoundingClientRect();
        const target2 = clamp((topOffset - r2.top) / dist, 0, 1) * dist;
        if (target2 > 1 && !track.__allShown) {
          track.__allShown = true;
          track.querySelectorAll('.card-pop').forEach((c) => { c.style.transitionDelay = '0s'; c.classList.add('is-visible'); });
        }
        trackCur = trackCur === null ? target2 : lerp(trackCur, target2, k);
        if (Math.abs(trackCur - target2) < 0.3) trackCur = target2;
        if (Math.abs(track.scrollLeft - trackCur) >= 0.25) track.scrollLeft = trackCur;
      }
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
})();

/* scroll-reveal for .reveal elements */
document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.25 });
  window.revealIO = io;
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
});

/* dispatch hero-progress so utility bar / header keep their scroll behavior */
(function () {
  const update = () => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const p = Math.min(Math.max(window.scrollY / Math.max(hero.offsetHeight - 100, 1), 0), 1);
    window.dispatchEvent(new CustomEvent('hero-progress', { detail: p }));
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  document.addEventListener('DOMContentLoaded', update);
})();
