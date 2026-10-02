# Wireframe – D&ST Grow & Reward

Interni, crno-bijeli, prezentacijski wireframe. Statični HTML + Tailwind + malo JS-a samo za prikaz (izbornik, kartice, stanja ekrana, dijalozi). Nema baze, pohrane ni stvarne logike.

**Otvaranje:** dvoklik na `index.html`. Radi i bez interneta (Tailwind je u `assets/tailwind.js`).

## Struktura

```
03_Wireframe/
├─ index.html           popis svih ekrana, legenda i popis pitanja (P1–P31, N#)
├─ README.md            ova pravila
├─ _podaci.md           izmišljeni podaci – jedini izvor brojki
├─ assets/
│  ├─ wf.css            komponente (wf-*) – crno, bijelo, sivo
│  ├─ wf.js             popis ekrana, izbornik po ulozi, ljuska, interakcije, tekst pitanja za oblačiće
│  └─ tailwind.js       Tailwind 4 (browser build), lokalno
└─ A01-….html … F4-06-….html   jedan ekran = jedna datoteka (nazivi datoteka su u wf.js)
```

## Pravila sadržaja

1. **Izvor istine** je `../02_Nasi_dokumenti/Specifikacija_DST_Grow_Reward.md`. Detalji polja i tekstovi obrazaca su u `../01_Od_Narucitelja/_tekst/`. Raspored postojećih ekrana je u `../01_Od_Narucitelja/Snimke_postojece_aplikacije/`.
2. **Ne izmišljati.** Sve što klijent nije napisao označi oznakom pitanja: `<span class="wf-p">P11</span>`. Ako pitanje nije među P1–P31, upiši ga kao novo pitanje (N#) i javi ga. Sadržaj koji je naš prijedlog označi `<span class="wf-p">prijedlog</span>`.
3. **Ne izostavljati.** Svako polje, stupac, pravilo, upozorenje i blokadu koje Specifikacija navodi za ekran mora biti vidljivo na ekranu ili u bilješci.
4. **Jezik:** hrvatski. Pojmovi su iz Specifikacije: rukovoditelj, zaposlenik, kvartalna nagrada, odobravatelj, dodatni odobravatelj, odobravatelj najviše razine, član Uprave, HR administrator. Ne „Voditelj“, „Djelatnik“, „Kvartalnica“, osim kad se citira postojeća aplikacija.
5. **Podaci:** samo iz `_podaci.md`. Ako ti treba nešto čega tamo nema, izmisli u istom duhu i navedi u izvještaju.
6. **Zapis brojeva:** `3.200,00 €`, `9,38 %`, datumi `2. 11. 2026.` Iznosi su bruto.
7. **Bez boja.** Samo crna, bijela i sive nijanse (Tailwind `neutral-*`, `black`, `white`). Bez slika, ikona i emojija.

## Nazivi radnji (gumbi)

| Tko | Radnje |
| --- | --- |
| Rukovoditelj | **Spremi**, **Predaj na odobrenje**, **Osvježi** (kao u postojećoj aplikaciji) |
| Odobravatelj | **Odobri**, **Odbaci** (Odbaci uvijek traži obrazloženje) |
| HR u liniji | **Potvrdi provjeru** (N4), **Vrati na doradu** (razlozi + obavezna napomena) |
| HR općenito | Uvezi, Potvrdi uvoz, Izvezi u Excel, Izvezi u CSV, Zaključaj, Otključaj, Dodaj, Uredi, Deaktiviraj, Reaktiviraj |

## Statusi (točan tekst i klasa)

| Status | Oznaka |
| --- | --- |
| Spremljeno | `<span class="wf-status is-draft">Spremljeno</span>` |
| Poslano na odobrenje · Poslano HR-u · HR provjereno | `<span class="wf-status">…</span>` |
| Vraćeno na doradu · Odbijeno | `<span class="wf-status is-back">…</span>` |
| Odobreno · Izvezeno za obračun · Primijenjeno u master podacima | `<span class="wf-status is-done">…</span>` |
| Zaključano | `<span class="wf-status is-closed">Zaključano</span>` |

Uz status se može dodati tko je na redu: `<span class="wf-at">kod: Marko Kovačević</span>`. Status dok prijedlog čeka dodatnog odobravatelja je otvoren (P10).

## Kostur stranice

```html
<!doctype html>
<html lang="hr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>F1.3 Obrazac za procjenu – D&amp;ST Grow &amp; Reward (wireframe)</title>
<link rel="stylesheet" href="assets/wf.css">
<script src="assets/tailwind.js"></script>
<script src="assets/wf.js" defer></script>
</head>
<body data-screen="F1.3">
<main>
  <h1 class="wf-h1">Naslov ekrana</h1>
  <p class="wf-sub">Kratki kontekst: ciklus, odjel, rok.</p>

  <section class="wf-note">
    <dl>
      <dt>Tko</dt><dd>…</dd>
      <dt>Čemu služi</dt><dd>…</dd>
      <dt>Pravila</dt><dd><ul><li>…</li></ul></dd>
      <dt>Pretpostavke</dt><dd><ul><li><span class="wf-p">P11</span> …</li></ul></dd>
    </dl>
  </section>

  … sadržaj ekrana …
</main>
</body>
</html>
```

- `data-screen` mora odgovarati `id` u `assets/wf.js`. Ljusku (traka wireframea, lijevi izbornik, zaglavlje s korisnikom) dodaje `wf.js`; u stranicu se piše samo `<main>`.
- `data-role="hr"` na `<body>` mijenja zadanu ulogu ekrana (inače se uzima iz `wf.js`).
- `data-shell="none"` za ekrane bez izbornika (prijava).
- Bilješka ide na vrh sadržaja, ispod naslova. Pretpostavke s oznakom pitanja mogu stajati i uz sam element.

## Komponente (`assets/wf.css`)

| Klasa | Za što |
| --- | --- |
| `wf-h1`, `wf-h2`, `wf-h3`, `wf-sub`, `wf-section-title` | naslovi |
| `wf-card`, `wf-grid` + Tailwind `grid-cols-*`, `wf-kpi` (`wf-kpi-label`, `wf-kpi-value`, `wf-kpi-sub`) | kartice i brojke |
| `wf-meter` > `span.used` / `span.res` / `span.over` + `wf-legend` | traka budžeta (širine u `style="width:..%"`) |
| `wf-table-wrap` > `table.wf-table`, `td.num`, `td.wf-name` | tablice; brojevi desno; ime zaposlenika podebljano u jednom retku |
| `tr.wf-disabled-row` | zaposlenik koji se ne može predložiti (sivo, šrafirano) |
| `tr.is-error`, `tr.is-selected` | redak s greškom, odabrani redak |
| `wf-label`, `wf-req`, `wf-input`, `wf-select`, `wf-textarea`, `wf-check`, `wf-field`, `wf-help`, `wf-error`, `is-error` | obrasci |
| `wf-calc` | polje koje sustav računa (zaključano, isprekidano, oznaka „izračunato“) |
| `wf-locked` | podatak koji se puni sam ili ga ova uloga ne smije mijenjati |
| `wf-kv` (`dl` > `dt`/`dd`) | parovi naziv – vrijednost (zaglavlja obrazaca) |
| `wf-btn-primary`, `wf-btn`, `wf-btn-sm`, `disabled`, `wf-actions` | gumbi |
| `wf-alert` | upozorenje (sam dodaje „UPOZORENJE“) |
| `wf-block` | blokada (crno; sam dodaje „BLOKADA“) |
| `wf-info` | obavijest |
| `wf-status` (+ `is-draft`, `is-back`, `is-done`, `is-closed`), `wf-at` | statusi |
| `wf-tabs`, `wf-steps`, `wf-timeline` (`li.is-done`, `is-current`, `is-next`) | kartice, koraci, vremenska crta |
| `wf-levels` | opisi razina 1–4 iz obrazaca |
| `wf-drop`, `wf-ph` | učitavanje datoteke, rezervirano mjesto (npr. graf) |
| `wf-note`, `wf-p` | bilješka za wireframe, oznaka pitanja (skrivaju se gumbom u traci) |
| `wf-states` | prekidač stanja ekrana (wireframe kontrola) |
| `wf-mono`, `wf-muted`, `num` | sitnice |

Tailwind utility klase slobodno koristiti za raspored (`grid`, `flex`, `gap-*`, `mt-*`, `md:grid-cols-2`…). Ne pisati vlastite `<style>` blokove; ako nešto bitno nedostaje, javi.

## Interakcije (`assets/wf.js`)

- **Kartice i stanja ekrana:** gumbi `[data-wf-tab="kljuc"]` unutar `[data-wf-tabs="grupa"]` prikazuju elemente `[data-wf-panel="grupa:kljuc"]` (može ih biti više na stranici, bilo gdje, i tablični retci). Kartice: `<div class="wf-tabs" data-wf-tabs="…">`. Stanja ekrana (normalno / upozorenje / blokada / zaključano): `<div class="wf-states" data-wf-tabs="stanje">`; `data-label="Uloga"` mijenja natpis okvira. Aktivna ploča dobiva klasu `wf-on` (vlastite skripte koriste istu klasu); gumbi kartica dobivaju `is-active`.
- **Dijalog:** `<button data-wf-open="dlg-odbaci">` otvara `<dialog id="dlg-odbaci" class="wf-dialog">`; unutra `wf-dialog-head`, `wf-dialog-body`, `wf-dialog-foot`, a gumb `data-wf-close` zatvara.
- **Poruka nakon klika:** `data-wf-toast="Prijedlog je spremljen."` na gumbu.
- **Izračun uživo:** samo gdje Specifikacija traži prikaz izračuna (obrasci, unos stimulacija i kvartalnih). Kratka skripta na dnu stranice, `WF.fmt(broj)` za zapis iznosa.
- Oznaka `wf-p` sama dobiva oblačić s tekstom pitanja iz `wf.js`.

## Prijenos u Blade

Svaka datoteka odgovara jednom Blade pogledu. Ljuska iz `wf.js` postaje layout (`layouts/app.blade.php`), a izbornik iz `MENU` postaje izbornik prema ulozi.
