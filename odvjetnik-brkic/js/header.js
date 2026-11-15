// Zaglavlje je prozirno dok je stranica na vrhu; čim se krene scrollati dobiva podlogu.
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var ticking = false;
  function sync() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(sync);
  }

  sync();
  window.addEventListener('scroll', onScroll, { passive: true });
  // povratak na stranicu iz bfcachea zna vratiti stari scroll položaj
  window.addEventListener('pageshow', sync);
})();
