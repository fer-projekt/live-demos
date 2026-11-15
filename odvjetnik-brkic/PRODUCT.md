# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Statički HTML (14 stranica) + Tailwind CSS v4 (lokalni build) + Alpine.js + Leaflet. Alpine, Leaflet i Google Fonts i dalje idu s CDN-a. To je ono što se šalje uredu na pregled i to je izvor istine dok traje prijedlog.

Laravel je odabrano odredište ako ured prihvati prijedlog, ali prebacivanje se **još ne radi** — ne uvoditi Blade, pakete ni build alat dok ured ne potvrdi posao.

## Users

Tri potvrđena segmenta, svi s zadarskog područja:

- **Privatne osobe** — građani s konkretnim, često hitnim problemom: kazneni ili prekršajni postupak, razvod i skrb o djeci, ostavina, ovrha, radni spor. Dolaze pod stresom i bez pravnog predznanja.
- **Kupci i vlasnici nekretnina** — domaći i strani kupci, ulagači i vlasnici; podupire ih istaknuto područje nekretnina i zemljišnoknjižno pravo.
- **Tvrtke i poslodavci** — poduzetnici za ugovore, radne sporove, ovrhe i upravne postupke.

## Product Purpose

Web Odvjetničkog ureda mr. sc. Ive Brkić, Široka ulica 14, Zadar — redizajn postojeće prezentacije ureda.

Posjetitelj treba prepoznati da ured pokriva njegov problem, naći odgovarajuće područje prakse i javiti se — telefonom, e-mailom ili obrascem. Web ne prodaje uslugu tekstom nego skraćuje put od „imam ovaj problem" do kontakta.

Trenutna faza: **prijedlog uredu**. Uspjeh ove faze je da ured prihvati redizajn; sadržaj i fotografije još nisu potvrđeni.

## Positioning

Ured radi kao generalist — svih 11 pravnih područja pod jednim krovom, bez upućivanja klijenta drugdje — uz jednu istaknutu specijalnost: pravni aspekti poslovanja s nekretninama, uključujući savjetovanje o ulaganju u nekretnine. Ta kombinacija (puni opseg + dubina u nekretninama na zadarskom tržištu) je ono što susjedni ured ne bi mogao samo prepisati.

Vlastita formulacija ureda, preuzeta iz postojećeg sadržaja: „Pravni predmeti za nas nisu problem, već osobni i profesionalni izazov koji nastojimo brzo i uspješno riješiti."

## Operating Context

- Posjetitelj najčešće dolazi s jednim konkretnim, vremenski osjetljivim problemom, ne pregledava ured iz radoznalosti.
- Dolazak je pretežno s mobitela; prvi stvarni kontakt je u pravilu telefonski poziv, zato su oba broja stalno dostupna u zaglavlju i podnožju.
- Ured je u centru Zadra (Široka ulica 14); dolazak u ured je dio usluge, pa karta i adresa nisu ukras.
- Tekstove za područja prakse dostavlja sam ured — predložak ih na 11 stranica čeka pod oznakom `[DODATNI OPIS PODRUČJA — tekst dostavlja ured]`.

## Capabilities and Constraints

**Što web radi danas**

- 14 statičkih stranica: naslovnica, pregled područja prakse, 11 pojedinačnih područja, kontakt.
- Zaglavlje s kontakt trakom, padajući izbornik područja (Alpine), mobilni izbornik, poziv na broj iz zaglavlja na mobitelu.
- Leaflet karta na OSM tileovima s oznakom ureda (`js/map.js`).
- Obrazac za upit na kontaktu — **samo front-end**: Alpine provjerava ime i e-mail i prikaže poruku o uspjehu. Ništa se ne šalje; backend još ne postoji.

**Tehnička ograničenja**

- Tailwind se gradi lokalno: `npm run dev` (watch) ili `npm run build` (minify), `css/input.css` → `css/output.css`. Tema (boje, fontovi, sjene) živi u `@theme` bloku u `css/input.css`; `js/tailwind.config.js` se više ne čita.
- Vlastiti CSS (`.hero*`, `.pa-*`, `[x-cloak]`) živi na kraju `css/input.css`, izvan cascade layera, pa nadjačava i Tailwind utilityje i leaflet. Nakon izmjene treba pokrenuti build.
- Cascade layeri: Tailwind v4 je u `@layer`, a `leaflet.css` nije, pa leaflet pobjeđuje utility klase. Zato karte imaju `bg-navy-800!` / `bg-ivory-100!`.
- Alpine, Leaflet i Google Fonts učitavaju se s CDN-a.
- **Ikone moraju biti inline SVG.** CSS `mask` se u pregledniku kojim se demo pregledava ne prikazuje, pa maskirane ikone nestaju. Svih 150 ikona (Lucide 0.454.0) već je prebačeno na inline SVG — ne vraćati maske.
- `images/` je prazan; dizajn trenutno ne koristi nijednu sliku ni video.

**Otvoreno, ne izmišljati**

- Backend obrasca (slanje na mail ureda) — nije odlučeno.
- Radno vrijeme ureda — placeholder `[RADNO VRIJEME UREDA]` na kontaktu.
- Pravila privatnosti — placeholder `[POVEZNICA NA PRAVILA PRIVATNOSTI]` uz privolu u obrascu.
- Puni oblik imena i titule nositelja ureda. U predlošku stoji samo genitiv „mr. sc. Ive Brkić"; nominativ nije potvrđen i nije ga sigurno pretpostaviti.

## Brand Commitments

- Naziv: Odvjetnički ured mr. sc. Ive Brkić, Zadar.
- Wordmark je tipografski, složen u HTML-u: **BRKIĆ** (Cormorant Garamond) + okomita zlatna crta + `ODVJETNIČKI URED / ZADAR`. Nema isporučene datoteke logotipa.
- Ton: formalno persiranje s velikim početnim slovom (Vam, Vas, Vaš), suzdržano, bez marketinškog pretjerivanja. Odvjetnička struka — nema obećanja ishoda.
- Odricanje koje stoji uz popise situacija („Popis je informativan i ne predstavlja pravni savjet.") je svjesna obveza, ne ispuna.
- Ured nije dostavio logo, boje ni memorandum; postojeća paleta i tipografija su prijedlog, ne zatečeni identitet.

## Evidence on Hand

Jedini izvor stvarnog sadržaja je postojeći web ureda: <http://www.odvjetnik-brkic.hr/> (tri stranice, iz 2012., plus mobilna inačica na m.odvjetnik-brkic.hr s istim tekstom).

**Stvarno i provjereno** (doslovno s tog weba, smije se koristiti):

- Adresa: Široka ulica 14, 23000 Zadar, Hrvatska.
- Telefon +385 (0)23 250 573, mobitel +385 (0)98 831 582, e-mail ivebrkic@yahoo.com.
- Uvodna rečenica: „Odvjetnički ured mr. sc. Ive Brkić sa sjedištem u Zadru osposobljen je pružiti Vam najvišu razinu pravne zaštite i odvjetničku uslugu u svim pravnim područjima."
- Citat o pristupu predmetima: „Pravni predmeti za nas nisu problem, već osobni i profesionalni izazov koji nastojimo brzo i uspješno riješiti."
- Rečenica o nekretninama: „Ured ima bogato iskustvo u pružanju svih pravnih usluga vezanih za nekretnine kao i u pružanju savjeta vezanih za ulaganje u nekretnine."
- **Nazivi** 11 područja prakse. Na starom webu stoje kao goli popis, bez ijednog opisa.

**Napisano za prijedlog, ured to nije odobrio:**

- Kratki opisi područja na karticama („Obrana okrivljenika i zastupanje oštećenika u svim fazama kaznenog postupka." i ostalih deset).
- Svih 55 „tipičnih situacija" na podstranicama (5 po području).

Ti tekstovi su pravno uvjerljivi, ali ih nije napisao ured i nitko ih iz ureda nije potvrdio. Prije slanja klijentu to treba jasno reći, a prije puštanja online ured ih mora odobriti ili zamijeniti svojima.

**Ne postoji — ne izmišljati:**

- Fotografije ureda, grada ili nositelja ureda. Predložak ima dva mjesta: `[FOTOGRAFIJA UREDA]` na naslovnici i `[FOTOGRAFIJA — NEKRETNINE / ZADAR]` na naslovnici i pregledu područja.
- Životopis, godine prakse, broj riješenih predmeta, članstva.
- Reference, preporuke klijenata, studije slučaja, medijski istupi.
- Cijene, satnice i način naplate.

## Product Principles

1. **Kontakt je uvijek nadohvat.** Telefon, mobitel i e-mail dostupni su sa svake stranice, u zaglavlju i podnožju; posjetitelj u problemu ne smije tražiti kako se javiti.
2. **Posjetitelj ulazi kroz svoj problem, ne kroz pravnu granu.** Područja se opisuju situacijama u kojima se čovjek prepoznaje („Pozvani ste na ispitivanje…"), a ne nabrajanjem zakona.
3. **Ozbiljnost prije uvjeravanja.** Struka traži suzdržanost: nema obećanja ishoda, nema izmišljenih brojki, nema prodajnog tona.
4. **Puni opseg, s nekretninama u prvom planu.** Svih 11 područja ostaje ravnopravno dostupno, ali nekretnine se smiju istaknuti kao specijalnost ureda.
5. **Prazno mjesto se označava, ne popunjava.** Dok ured ne dostavi tekst, fotografiju ili radno vrijeme, na stranici stoji vidljiv placeholder — nikad izmišljen sadržaj.

## Accessibility & Inclusion

Nije dogovoren formalni standard. Potvrđena publika uključuje starije korisnike (nasljedno i ostavinsko pravo) i ljude pod stresom, pa čitljivost teksta, veličina ciljeva dodira na mobitelu i jasan kontrast nisu stvar ukusa nego upotrebljivosti.

Jezik: samo hrvatski. Višejezičnost nije u opsegu.
