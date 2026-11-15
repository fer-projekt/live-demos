// Vodoravni niz područja prakse: strelice, potezanje mišem, glatko doklizavanje
document.querySelectorAll('[data-slider]').forEach(function (root) {
  var track = root.querySelector('[data-slider-track]');
  if (!track) return;

  var anim = null;

  function step() {
    var panel = track.querySelector('[data-slider-panel]');
    return panel ? panel.offsetWidth + 1 : 320;
  }

  function maxScroll() {
    return track.scrollWidth - track.clientWidth;
  }

  function clamp(v) {
    return Math.max(0, Math.min(maxScroll(), v));
  }

  // Doklizavanje s usporavanjem. CSS scroll-snap zalijepi naglo; ovo ne.
  function glide(to, ms) {
    if (anim) cancelAnimationFrame(anim);
    var from = track.scrollLeft;
    var dist = clamp(to) - from;
    if (Math.abs(dist) < 1) return;
    var dur = ms || Math.min(820, 320 + Math.abs(dist) * 0.42);
    var t0 = performance.now();
    (function frame(now) {
      var p = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3); // ease-out kubno
      track.scrollLeft = from + dist * e;
      if (p < 1) anim = requestAnimationFrame(frame);
      else anim = null;
    })(t0);
  }

  // Najbliži panel, uz projekciju po brzini povlačenja
  function settle(velocity) {
    var w = step();
    var projected = track.scrollLeft - velocity * 180;
    glide(Math.round(projected / w) * w);
  }

  root.querySelectorAll('[data-slider-go]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      glide(track.scrollLeft + Number(btn.dataset.sliderGo) * step());
    });
  });

  var down = false, startX = 0, startLeft = 0, moved = false;
  var lastX = 0, lastT = 0, vel = 0;

  track.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    if (anim) { cancelAnimationFrame(anim); anim = null; }
    down = true; moved = false; vel = 0;
    startX = lastX = e.clientX;
    lastT = performance.now();
    startLeft = track.scrollLeft;
    track.classList.add('is-drag');
  });

  track.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 4) {
      moved = true;
      if (!track.hasPointerCapture(e.pointerId)) track.setPointerCapture(e.pointerId);
    }
    if (!moved) return;
    e.preventDefault();
    var now = performance.now(), dt = now - lastT;
    if (dt > 0) vel = 0.8 * vel + 0.2 * ((e.clientX - lastX) / dt); // px/ms, izglađeno
    lastX = e.clientX; lastT = now;
    track.scrollLeft = startLeft - dx;
  });

  function end(e) {
    if (!down) return;
    down = false;
    track.classList.remove('is-drag');
    if (e && e.pointerId != null && track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    if (moved) settle(vel);
  }
  track.addEventListener('pointerup', end);
  track.addEventListener('pointercancel', end);

  // Povlačenje ne smije otvoriti poveznicu preko koje je miš prošao
  track.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  track.addEventListener('dragstart', function (e) { e.preventDefault(); });

  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); glide(track.scrollLeft + step()); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); glide(track.scrollLeft - step()); }
  });

  // Nakon kotačića/trackpada također dovedi na panel, ali tek kad se smiri
  var wheelTimer = null;
  track.addEventListener('scroll', function () {
    if (down || anim) return;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () { if (!down && !anim) settle(0); }, 140);
  }, { passive: true });
});
