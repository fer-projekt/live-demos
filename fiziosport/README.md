# Poliklinika Fizio Sport — početna stranica

Statična stranica: HTML + Tailwind CSS + Alpine.js. Nema build koraka — otvori `index.html` u pregledniku.

## Struktura

    index.html            početna stranica
    css/styles.css        custom stilovi (fontovi, scroll reveal)
    js/tailwind.config.js Tailwind tema (boje, fontovi, easing)
    js/app.js             scroll reveal animacije
    images/               logo, hero, fotografije tima i sekcija
    README.md

## Interakcije (Alpine.js, inline u HTML-u)

- header: proziran na vrhu, tamni nakon 100px, skriva se pri scrollu dolje nakon 500px
- padajući meniji "Specijalističke djelatnosti" i "O nama" (hover)
- mobilni meni (gumb "Meni")
- swiper recenzija: strelice, točkice i swipe prstom (scroll-snap)

## Za produkciju

1. Tailwind CDN zamijeni lokalnim buildom:

       npm install -D tailwindcss
       npx tailwindcss -i ./css/styles.css -o ./css/tailwind.css --minify

   Sadržaj `js/tailwind.config.js` prebaci u `tailwind.config.js` (bez `tailwind.config =`),
   dodaj `content: ['./index.html']`, a u `index.html` ukloni CDN skriptu i linkaj `css/tailwind.css`.
2. Alpine skini lokalno (`js/alpine.min.js`) i zamijeni CDN putanju.
3. Fontove (Figtree, Manrope) po želji hostiraj lokalno preko `@font-face`.

## Fotografije

Fotografije u `images/` su privremene — zamijeni ih pravima klinike uz iste nazive datoteka.
Preporučene dimenzije: hero 2400×1400, sekcijske 1600×1200, tim 900×1200 (3:4).

## Sadržaj koji treba potvrditi

- link "Online naručivanje" trenutno vodi na `https://ezdravko.hr/` — zamijeni stvarnim eZdravko linkom
- blog objave (naslovi, datumi, slike) su primjeri
- stranice "Pravila privatnosti" i "Izjava o kolačićima" još ne postoje
