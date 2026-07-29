# Build skripte — Dental Vidović

Denart template hardkodira svaku boju (~540 hex vrijednosti, nula CSS varijabli), a klijentovi
logo SVG-ovi nisu pravi vektori. Zato je prilagodba skriptirana, ne ručna — svaka se izmjena
brenda može ponoviti bez ponovnog kopanja po 140 KB CSS-a.

Sve skripte koriste apsolutne putove, pa je radni direktorij nevažan. Primjeri ispod su
pisani iz korijena projekta (`live-demos/dental-vidovic/`).

## 1. `rebrand-css.js` — paleta i tipografija

```bash
node _build/rebrand-css.js
```

Transformira `css/style.css.denart-orig` (nedirnuta kopija originala) u `css/style.css`.
**Idempotentna je** — uvijek čita backup, pa je ponovno pokretanje sigurno.

Što radi:
- ubaci `:root` blok s brand tokenima (boje, fontovi);
- mapira hex vrijednosti u tokene **ovisno o CSS propertyju** — ista boja ne znači isto
  kao tekst i kao površina;
- svaki bijeli tekst na zlatnoj površini pretvori u `--on-gold` (brand zlatna ima samo
  2.1:1 kontrasta prema bijelom);
- doda blok override-a na kraj datoteke.

Za promjenu palete: uredi `TOKENS` na vrhu skripte i pokreni ponovno.

## 2. `build-logo.js` + `shrink-logo-rasters.ps1` — logo

```bash
node _build/build-logo.js
powershell -File _build/shrink-logo-rasters.ps1
```

Prvi sastavlja `img/logo.svg` (tamni tekst) i `img/logo-light.svg` (krem tekst) iz
`Downloads/vidovic/logotip/DENTAL VIDOVIĆ (2).svg`. Izvorni SVG embedira raster i ima
zapečenu pozadinu, a transparentnost dolazi iz SVG **maske** — ne iz alpha kanala.
Geometrija u skripti (`MARK`, `WORD`) izmjerena je u browseru; ako se izvorni logo
promijeni, treba je izmjeriti ponovno.

Drugi smanjuje embedirane rastere na 320 px (logo se prikazuje na ~34 px). Mora ići
**nakon** `build-logo.js`, inače ga taj prepiše. Idempotentan.

## 3. `optimize-images.ps1` — fotografije

```bash
powershell -File _build/optimize-images.ps1
```

Smanji i re-enkodira klijentove fotografije (11,1 MB → 1,0 MB). Originali ostaju u
`Downloads/vidovic`. PNG fotografije postaju JPEG, pa nakon prvog pokretanja treba
provjeriti reference u `index.html`.

Na ovom stroju **nema** ImageMagick, Pythona ni ffmpega — skripta koristi .NET
`System.Drawing`, koji je dio Windowsa.
