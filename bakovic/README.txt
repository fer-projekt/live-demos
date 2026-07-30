Klesarstvo Baković — naslovnica

Struktura
  index.html            markup (Tailwind utility klase + Alpine direktive)
  css/style.css         minimalne iznimke (font-face / x-cloak / ::selection)
  js/tailwind.config.js tema (boje, fontovi, easing) — prenesi u tailwind.config.js pri buildu
  js/app.js             Alpine counter komponenta
  images/               sve slike

Napomena za produkciju
  Tailwind i Alpine se učitavaju s CDN-a. Za produkciju instaliraj Tailwind
  (CLI ili PostCSS) i sadržaj js/tailwind.config.js prenesi u tailwind.config.js.
