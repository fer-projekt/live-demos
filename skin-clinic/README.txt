Fidelia — statična web stranica
================================

Struktura:
  index.html            glavna stranica
  css/styles.css        svi custom stilovi
  js/tailwind.config.js Tailwind konfiguracija (boje, fontovi) — mora se uceitati PRIJE Tailwind CDN-a
  js/main.js            sva interaktivnost (parallax, scroll-reveal, pinned carousel, showcase)
  images/               sve slike
  video/                hero video

Vanjske ovisnosti (preko CDN-a, potreban internet):
  - Tailwind CSS (cdn.tailwindcss.com) — za produkciju preporuceno buildati lokalni CSS
  - Alpine.js + Alpine collapse plugin (cdn.jsdelivr.net)
  - Google Fonts: Cormorant Garamond, Jost

Pokretanje: otvorite index.html u pregledniku (ili posluzite mapu preko web servera).
