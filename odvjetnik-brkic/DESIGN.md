---
name: Odvjetnički ured Brkić
description: Suzdržan ivory-i-mjed sustav za odvjetnički ured u kamenoj jezgri Zadra
colors:
  navy-950: "#0B1422"
  navy-900: "#0F1B2D"
  navy-800: "#16263D"
  navy-700: "#1F3352"
  navy-200: "#C3CCD9"
  gold-700: "#7E6133"
  gold-600: "#9A7740"
  gold-500: "#B08D57"
  gold-400: "#C6A774"
  gold-200: "#E6D6BA"
  ivory-50: "#FBF9F5"
  ivory-100: "#F5F1E9"
  stone-200: "#E4DED3"
  stone-300: "#CFC7B8"
  stone-500: "#7D766A"
  ink-700: "#3B3A36"
  ink-900: "#1C1B19"
  success-600: "#3F6B4E"
  error-600: "#9B3B2E"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "38px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Source Sans 3, Helvetica Neue, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  sm: "2px"
spacing:
  gutter: "20px"
  gutter-lg: "32px"
  stack: "16px"
  grid-gap: "24px"
  card-pad: "36px 32px"
  section: "56px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.ivory-50}"
    rounded: "{rounded.sm}"
    padding: "0 32px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.navy-700}"
    textColor: "{colors.ivory-50}"
  button-gold:
    backgroundColor: "{colors.gold-500}"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.sm}"
    padding: "0 32px"
    height: "52px"
  button-gold-hover:
    backgroundColor: "{colors.gold-400}"
    textColor: "{colors.navy-900}"
  button-outline:
    textColor: "{colors.navy-900}"
    rounded: "{rounded.sm}"
    padding: "0 32px"
    height: "52px"
  button-outline-hover:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.ivory-50}"
  card-practice:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.sm}"
    padding: "{spacing.card-pad}"
  input-text:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
    typography: "{typography.body}"
  nav-link:
    textColor: "{colors.navy-900}"
    size: "13px"
  nav-link-hover:
    textColor: "{colors.gold-700}"
---

# Design System: Odvjetnički ured Brkić

## Overview

**Creative North Star: "Zadarski kabinet"**

Ured u kamenoj jezgri grada. Ivory zid kao podloga, duboko plavo kao težina i tišina, jedan mjedeni detalj koji hvata svjetlo. Sve je na mjestu jer je netko to tako posložio, a ne zato da bi impresioniralo. Ovo nije web koji viče; to je prostor u koji uđeš i odmah znaš gdje se stoji.

Sustav je namjerno dvoglasan. **Cormorant Garamond** nosi naslove — serif s dugim potezima koji struci daje staž i ozbiljnost, bez perika i stupova. **Source Sans 3** nosi sav radni tekst — neutralan, čitljiv, bez stava, jer čovjek koji čita opis kaznenog postupka ne treba tipografiju koja mu odvlači pažnju. Taj razmak između dva glasa je cijela hijerarhija: naslov je gesta, tekst je posao.

Dojam koji se cilja nije hladna korporativnost nego **pristupačnost i urednost**. Čovjek koji dolazi na ovaj web u pravilu ima problem i nije pravnik. Urednost ovdje radi kao dokaz — ako je stranica pedantno posložena, vjerojatno je i spis. Toplina dolazi iz ivory podloge i mjedi, nikad iz zaobljenih oblika ili razigranosti.

Sustav izričito odbija tri stvari: **generički odvjetnički kliše** (vage, čekići, stupovi, rukovanje u stocku), **startup/SaaS izgled** (jarki gradijenti, baloni, velike ilustracije, živahne animacije) i **pretjeranu raskoš** (previše zlata, sjaja i sjene, koja odaje skupoću umjesto ozbiljnosti).

**Key Characteristics:**

- Ivory podloga (#FBF9F5), ne bijela — papir, ne ekran
- Duboka mornarska kao jedina tamna ploha; zlato kao jedini naglasak
- Serif za naslove, sans za sve ostalo, bez trećeg glasa
- Oštri pravokutnici (2px radijus) — geometrija se ne omekšava
- Ravne plohe s tankim rubom; sjena je odgovor na stanje, ne ukras
- Velika tipografska skala (72px naslovnica prema 16px tekstu)
- Verzalne labele s rastegnutim razmakom kao sitni, stalni ritam

## Colors

Paleta je dvotonska s jednim naglaskom: hladna mornarska i topla mjed na ivory papiru. Zlato nikad ne nosi plohu — ono je linija, točka i rub.

### Primary

- **Duboka mornarska** (#0F1B2D): glavna tamna ploha — hero, podnožje, pozivi na kontakt, primarni gumb. Nosi težinu i daje stranici dva jasna registra: svijetli radni dio i tamni dio koji okvirjuje.
- **Mornarska dubina** (#0B1422): gornja kontakt traka u zaglavlju, tamnija od hera za pola tona kako bi traka sjela kao rub, a ne kao drugi blok.
- **Mornarska ploha** (#16263D) i **Mornarska svijetla** (#1F3352): unutarnje plohe na tamnom i hover primarnog gumba. Ne koriste se na svijetloj podlozi.
- **Maglena mornarska** (#C3CCD9): sav tekst na tamnoj podlozi osim naslova — uvodni odlomci, podnožje, kontakt traka. Nikad na ivory podlozi.

### Secondary

- **Prigušeno zlato** (#B08D57): jedini naglasak u sustavu. Tanke linije ispred labela, rub kartice na hover, okomita crta u logotipu, pozadina gold gumba. Prigušeno je namjerno — zasićenije zlato odmah sklizne u raskoš.
- **Svijetlo zlato** (#C6A774): zlato na tamnoj podlozi — labele u heru, točka iza naslova, hover stanja u podnožju. Na ivory podlozi je preslabo.
- **Tamno zlato** (#7E6133): zlato kao **tekst** na svijetloj podlozi — „Saznajte više →", brojevi područja, hover navigacije. Jedina varijanta zlata koja prolazi kontrast za tekst.
- **Zlatni sjaj** (#E6D6BA): isključivo fokusni prsten polja (3px). Nigdje drugdje.

### Neutral

- **Papir** (#FBF9F5): podloga cijelog weba. Topliji od bijele za jedan stupanj — bijela se koristi samo za kartice koje trebaju isplivati iz podloge.
- **Topli papir** (#F5F1E9): izmjenične sekcije koje trebaju odvajanje bez ruba.
- **Kamen** (#E4DED3): sve linije razdvajanja — rubovi kartica, crte između redaka popisa, rub zaglavlja. Nosi gotovo cijelu strukturu stranice.
- **Kamen tamniji** (#CFC7B8): rub polja obrasca u mirovanju, nešto jači od kamena da polje čita kao interaktivno.
- **Kamen tekst** (#7D766A): sekundarni tekst, nadnaslovi sekcija, napomene i odricanja.
- **Tinta** (#3B3A36): tekući tekst. Nije crna — crna na ivory podlozi reže.
- **Tinta puna** (#1C1B19): tekst unutar polja obrasca, gdje treba maksimalna oštrina.

### Tertiary

Jedina uloga treće skupine je stanje obrasca; sustav nema drugih „sistemskih" boja.

- **Zelena potvrde** (#3F6B4E): ikona i poruka nakon poslanog upita.
- **Crvena greške** (#9B3B2E): rub polja i poruka o grešci u obrascu.

Oba su prigušena do razine ostatka palete — sustav nema jarkih boja, pa ih ni greška ne uvodi.

### Named Rules

**Pravilo jedne mjedi.** Zlato se u jednom pogledu na stranicu pojavljuje kao linija, rub, broj ili jedan gumb — nikad kao velika ploha. Čim zlato počne nositi površinu, sustav sklizne u raskoš koju ovaj ured odbija.

**Pravilo dvaju registara.** Stranica ima samo dvije podloge: ivory (radni dio) i mornarsku (okvir — hero, poziv na kontakt, podnožje). Treća podloga se ne uvodi; kartica na ivory podlozi koristi čistu bijelu i to je jedina iznimka.

**Pravilo zlata kao teksta.** Zlato kao tekst na svijetloj podlozi uvijek je tamna varijanta (#7E6133). Svjetlije zlato je dekoracija, ne pismo.

## Typography

**Display Font:** Cormorant Garamond (fallback Georgia, serif) — težine 500, 600 i italic 500
**Body Font:** Source Sans 3 (fallback Helvetica Neue, Arial, sans-serif) — težine 400 i 600

**Character:** Cormorant je visok, uzak i svečan — daje naslovima staž bez historicizma. Source Sans je potpuno neutralan radni glas. Par radi jer se ne natječu: serif je nikad ne silazi ispod 26px, sans nikad ne ide iznad 19px. Nema preklapanja, nema dvojbe koji glas govori.

### Hierarchy

- **Display** (600, 40 → 56 → 72px, line-height 1.05, tracking -0.01em): samo naslov naslovnice. Jedna po webu.
- **Headline** (600, 28 → 38px, line-height 1.15, tracking -0.01em): naslovi sekcija i naslovi podstranica.
- **Title** (600, 26px, line-height 1.25): naslovi kartica područja i blokova u stupcu.
- **Quote** (italic 500, 26 → 34 → 42px, line-height 1.3): isključivo citat ureda na tamnoj podlozi. Jedina kurzivna tipografija u sustavu.
- **Lead** (400, 19px, line-height 1.6): uvodni odlomak ispod naslova, najviše jedan po sekciji.
- **Body** (400, 16px, line-height 1.65): tekući tekst. Mjera se drži na 680px (oko 70 znakova).
- **Body Small** (400, 15px, line-height 1.65): opisi u karticama i stavke popisa.
- **Label** (600, 12px, verzal, tracking 0.16em): nadnaslovi sekcija, labele polja, „Saznajte više →".
- **Label Wide** (600, 12px, verzal, tracking 0.2em): brojevi područja i nadnaslov hera — labela uz zlatnu crtu.
- **Micro** (600, 9 → 10px, verzal, tracking 0.16 → 0.22em, line-height 1.7): isključivo blok „ODVJETNIČKI URED / ZADAR" uz logotip.

### Named Rules

**Pravilo dva glasa.** Serif govori naslove, sans govori sve ostalo. Treći font se ne uvodi — ni za brojke, ni za citate, ni za navigaciju.

**Pravilo verzalne labele.** Svaka sekcija počinje verzalnom labelom s rastegnutim razmakom, najčešće uz tanku zlatnu crtu ispred. To je stalni ritam weba i jedina dekoracija koju si sustav dopušta.

**Pravilo mjere.** Tekući tekst nikad ne prelazi 680px širine, bez obzira koliko je kontejner širok. Pravni tekst bez mjere je zid.

## Layout

Kontejner je **1200px** s unutarnjim rubom od 20px na mobitelu i 32px od `lg` naviše. Tekstualni blokovi unutar njega dobivaju vlastitu užu mjeru: 680px za tekući tekst, 560px za uvodni odlomak hera, 540px za stupac obrasca.

Vertikalni ritam sekcija je **56px na mobitelu i 96px na desktopu** (`py-14 lg:py-24`), s 72px kao mekšom varijantom za uže blokove. Unutar sekcije: 24px između kartica u mreži, 16px između elemenata u stupcu kartice.

Mreže su jednostavne i predvidljive — kartice područja idu 1 → 2 → 3 stupca (`sm`, `lg`), hero je asimetričan `1.15fr / 0.85fr` samo od `lg` naviše i do tada se slaže u jedan stupac. Nema masonryja, nema preklapanja, nema pomaknutih stupaca.

Prijelomne točke su Tailwindove zadane: `sm` 640px, `md` 768px, `lg` 1024px. **`lg` je jedina stvarna granica** — na njoj se mijenja navigacija (hamburger → vodoravni izbornik s padajućim), pojavljuje se gornja kontakt traka i naraste tipografska skala. `sm` i `md` samo preslaguju mreže.

Zaglavlje je ljepljivo (`sticky top-0`) i visoko 68px na mobitelu, 88px na desktopu. Na mobitelu zaglavlje nosi gumb za poziv — telefon je prečac, ne stavka izbornika.

### Named Rules

**Pravilo jedne granice.** Dizajn se stvarno prelama samo na `lg`. Ako nešto traži treću verziju rasporeda, raspored je prekompliciran.

**Pravilo ciljeva dodira.** Svaka stavka mobilnog izbornika i svaki red popisa ima najmanje 44px visine. Publika uključuje starije korisnike i ljude pod stresom; sitni ciljevi su kvar, ne stil.

## Elevation & Depth

Sustav je **ravan po zadanom**. Plohe se razdvajaju tankim rubom u boji kamena (#E4DED3) i promjenom podloge, ne sjenom. Kartica u mirovanju nema sjenu — ima rub.

Sjena je **odgovor na stanje, ne svojstvo elementa**. Pojavljuje se na dva mjesta: kad korisnik pređe mišem preko kartice područja, i kad se otvori nešto što lebdi iznad stranice (padajući izbornik, mobilni izbornik). Obje sjene imaju negativni spread i mornarsku, ne crnu bazu — sjena je hladna i difuzna, nikad tvrda.

### Shadow Vocabulary

- **Kartica** (`box-shadow: 0 8px 24px -12px rgba(15,27,45,.22)`): isključivo hover stanje kartice područja, zajedno s podizanjem od 2px i promjenom ruba u zlatno.
- **Sloj** (`box-shadow: 0 24px 48px -24px rgba(15,27,45,.35)`): padajući izbornik područja i otvoreni mobilni izbornik. Označava da nešto stvarno lebdi iznad sadržaja.

### Named Rules

**Pravilo mirne plohe.** U mirovanju nijedan element nema sjenu. Ako nešto treba sjenu da bi se vidjelo, nedostaje mu rub ili kontrast podloge.

## Shapes

Forma je **pravokutna i oštra**. Jedini radijus u cijelom sustavu je 2px (`rounded-sm`), i to na svim elementima bez iznimke — gumbima, karticama, poljima, izbornicima. Toliko malen da čita kao omekšan brid tiskanog materijala, a ne kao zaobljenje.

Strukturu nose **linije, ne okviri**: 1px rub u boji kamena oko kartica i polja, 1px crta ispod stavki popisa, 1px okomita crta u logotipu. Zlatna crta od 1px visine i 24px širine stoji ispred labela sekcija i na hover se produžuje na 40px — to je jedina geometrijska animacija u sustavu.

Jedina neprakvokutna forma je **oznaka na karti**: kvadrat sa zaobljenjem `50% 50% 50% 0` rotiran za -45° — klasična kapljica. Ona je kartografska konvencija, ne dio forme sustava.

### Named Rules

**Pravilo oštrog brida.** 2px je jedini radijus. Pilule, zaobljeni baloni i krugovi (osim točke unutar oznake na karti) ne postoje.

## Components

### Buttons

Gumbi su **suzdržani i precizni**: puni pravokutnik, verzalni tekst s razmakom od 0.08em, promjena boje u 200ms i ništa više. Bez podizanja, bez sjene, bez skaliranja.

- **Shape:** oštri pravokutnik (2px radijus), nikad puna širina osim u uskom stupcu obrasca
- **Veličine:** velika 52px / 32px bočno / 14px tekst (glavni pozivi), srednja 44px / 24px / 13px (unutar sadržaja), mala 36px / 16px / 12px (zaglavlje)
- **Primary:** mornarska ploha (#0F1B2D) s ivory tekstom; hover posvijetli na #1F3352
- **Gold:** mjed (#B08D57) s mornarskim tekstom; hover posvijetli na #C6A774. Samo za glavni poziv na tamnoj podlozi — jedan po stranici
- **Outline:** 1px mornarski rub, mornarski tekst, prozirna podloga; hover **invertira** u punu mornarsku s ivory tekstom
- **Outline na tamnom:** rub `ivory-50/40`, ivory tekst; hover invertira u ivory plohu s mornarskim tekstom
- **Ghost:** samo tekst, bez bočnog razmaka; hover u tamno zlato
- **Disabled:** 40% prozirnosti i `cursor: not-allowed` (gumb obrasca dok privola nije označena)

### Cards

Kartica područja je **potpisni element sustava**.

- **Corner Style:** 2px radijus
- **Background:** čista bijela na ivory podlozi
- **Border:** 1px kamen (#E4DED3) u mirovanju → mjed (#B08D57) na hover
- **Shadow Strategy:** bez sjene u mirovanju; „Kartica" sjena na hover (vidi Elevation)
- **Internal Padding:** 32px bočno, 36px okomito
- **Sadržaj, uvijek istim redom:** zlatna crta + dvoznamenkasti broj područja (01–11) → serif naslov 26px → opis 15px → „Saznajte više →" u tamnom zlatu, pritisnut uz dno karticom `mt-auto`
- **Hover:** rub u zlatno, podizanje 2px, sjena, i zlatna crta se produži s 24px na 40px u 400ms

Numeracija nije ukras — ona drži 11 područja u stabilnom, pamtljivom redoslijedu kroz cijeli web.

### Popis situacija

Nosi glavninu sadržaja na podstranicama područja: popis životnih situacija u kojima se posjetitelj prepoznaje („Pozvani ste na ispitivanje…").

- **Struktura reda:** jednoznamenkasti broj u serifu (22px, 600, tamno zlato) u stupcu širine 28px, pa tekst situacije 17px u punoj tinti
- **Poravnanje:** po osnovnoj liniji (`items-baseline`), ne po sredini — broj i tekst sjedaju na istu crtu
- **Razmaci:** 22px između broja i teksta, 20px okomito po redu, 1px kamena crta ispod svakog reda
- **Tekst 17px**, ne 16px: ovo je sadržaj zbog kojeg je posjetitelj došao, pa je za stupanj veći od tekućeg teksta
- **Ispod popisa** stoji odricanje u 14px kamenoj boji („Popis je informativan i ne predstavlja pravni savjet.") — obvezno, nikad se ne izostavlja

Brojevi ovdje su jednoznamenkasti i broje situacije unutar stranice; dvoznamenkasti brojevi (01–11) rezervirani su za područja prakse.

### Citat

Pojavljuje se jednom, na naslovnici, kao mornarska sekcija između sadržaja.

- **Tipografija:** Cormorant italic 500, 26 → 34 → 42px, line-height 1.3, u boji papira — jedina kurzivna tipografija u sustavu
- **Navodnici:** hrvatski („…"), dio su teksta
- **Potpis:** 32px ispod citata, verzalno 12px s razmakom 0.2em, u svijetlom zlatu
- **Bez okvira, bez znaka navoda kao grafike, bez fotografije.** Citat stoji sam na praznoj mornarskoj plohi; prazan prostor oko njega je cijeli efekt

### Inputs

- **Style:** bijela podloga, 1px rub kamen-tamniji (#CFC7B8), 2px radijus, 14px bočno / 12px okomito, tekst 15px u punoj tinti
- **Focus:** rub prelazi u mornarsku i dobiva 3px prsten u zlatnom sjaju (#E6D6BA) — jedino mjesto gdje se ta boja koristi
- **Error:** rub u crvenoj greške (#9B3B2E) uz poruku ispod polja
- **Labele:** iznad polja, verzalne 12px s razmakom 0.12em; neobavezna polja označena riječju „Neobavezno" u sekundarnom tekstu
- **Checkbox privole:** 20px, `accent-color` mornarska, cijela oznaka je klikabilna i visoka najmanje 44px

### Stanje potvrde obrasca

Nakon poslanog upita obrazac se zamjenjuje potvrdom unutar iste bijele kartice — stranica se ne mijenja i ništa ne odskače.

- **Sadržaj, centrirano, 48px okomitog zraka:** ikona kvačice u krugu 40px u zelenoj potvrde (#3F6B4E) → naslov „Hvala na upitu." u headline skali → rečenica 17px s očekivanjem odgovora → outline gumb srednje veličine „Novi upit"
- **Jedino mjesto u sustavu gdje se koristi zelena potvrde.** Ne uvoditi je u druge poruke, značke ili ikone
- **Povratak** na prazan obrazac ide kroz gumb, ne kroz osvježavanje stranice

### Kontaktni blok

Tamni blok uz sadržaj na svakoj podstranici područja; od `lg` naviše je ljepljiv i prati skrol (`top: 160px`).

- **Ploha:** mornarska (#0F1B2D), 2px radijus, 28px unutarnjeg ruba na mobitelu / 40px na desktopu
- **Zaglavlje bloka:** verzalna labela „Kontakt" sa zlatnom crtom, pa naslov 28px u boji papira i rečenica u maglenoj mornarskoj
- **Kontaktni redci:** tri reda (telefon, mobitel, e-mail), svaki najmanje 52px visok, odvojeni 1px crtom u `ivory-50/20`, tekst 17px u boji papira, zlatna ikona 18px, hover u svijetlo zlato
- **Dno:** gold gumb pune širine „Pošaljite upit" — jedini gold gumb na podstranici

Blok je razlog zašto podstranica ne treba zasebnu sekciju poziva na kontakt: kontakt je stalno vidljiv dok se čita sadržaj.

### Navigation

- **Desktop:** verzalne stavke 13px s razmakom 0.14em, mornarske; hover u tamno zlato. Aktivna stavka nosi 1px zlatnu crtu ispod sebe — jedini pokazatelj aktivnosti.
- **Padajući izbornik područja:** otvara se na hover i klik, 620px širine, dva stupca od 11 područja odvojenih kamenom crtom, zatvara ga `Escape`. Dno nosi poveznicu „Pregled svih područja →" u tamnom zlatu.
- **Mobile:** hamburger otvara punu plohu ispod zaglavlja; stavke su visoke najmanje 52px i odvojene kamenom crtom. Uz hamburger stoji zaseban gumb za poziv.
- **Gornja kontakt traka** (samo `lg` naviše): mornarska dubina, 40px visine, adresa i e-mail lijevo, dva telefona desno, sve sa zlatnom ikonom od 14px.

### Ikone

Lucide, debljina poteza 2, veličine 14px (kontakt traka), 18px (popisi), 20–22px (mobilno zaglavlje), 40px (potvrda poslanog upita). Boja dolazi iz `currentColor`.

**Ikone su uvijek inline SVG.** CSS `mask` se ne koristi — u pregledniku kojim se ovaj web pregledava maskirane ikone nestaju. Ovo je tehnička obveza, ne stilska preferencija.

### Breadcrumbs

Samo na podstranicama područja, unutar tamnog zaglavlja stranice: 13px tekst u maglenoj mornarskoj (#C3CCD9), stavke razdvojene kosom crtom s razmakom od 10px, hover u svijetlo zlato. Zadnja stavka je trenutna stranica, u boji papira (#FBF9F5) i bez poveznice.

## Do's and Don'ts

### Do:

- **Do** svaku sekciju otvoriti verzalnom labelom (12px, tracking 0.16em) sa zlatnom crtom ispred — to je ritam koji drži cijeli web.
- **Do** držati tekući tekst na mjeri od 680px, i u širokim sekcijama.
- **Do** koristiti zlato kao liniju, broj, rub ili jedan gumb. Nikad kao plohu veću od gumba.
- **Do** razdvajati plohe rubom u boji kamena (#E4DED3), ne sjenom.
- **Do** držati sva interaktivna stanja na promjeni boje u 200ms; jedina iznimka je produženje zlatne crte u 400ms.
- **Do** numerirati područja prakse dvoznamenkasto (01–11) i držati taj redoslijed svugdje — na naslovnici, u pregledu i u srodnim područjima.
- **Do** davati svakom dodirnom cilju najmanje 44px.
- **Do** crtati ikone kao inline SVG.
- **Do** ostavljati vidljiv placeholder gdje sadržaj ureda još nije stigao, umjesto da se mjesto zatvori ili popuni izmišljenim tekstom.

### Don't:

- **Don't** uvoditi treći font. Cormorant nosi naslove, Source Sans sve ostalo.
- **Don't** koristiti radijus veći od 2px. Pilule i zaobljene kartice ne pripadaju ovom sustavu.
- **Don't** stavljati sjenu na element u mirovanju.
- **Don't** uvoditi treću podlogu uz ivory i mornarsku (bijela kartica je jedina iznimka).
- **Don't** koristiti svijetlo zlato (#C6A774 ili #B08D57) kao tekst na svijetloj podlozi — za tekst ide #7E6133.
- **Don't** posezati za odvjetničkim klišejem: vage, čekići, stupovi, rukovanje iz stock fotografije.
- **Don't** uvoditi gradijente, obojene sjene, staklaste plohe ili animacije ulaska pri skrolu — to je SaaS rječnik koji ovaj ured odbija.
- **Don't** pisati tekst na dekorativnom prugastom placeholderu; te plohe čekaju fotografiju i nisu podloga za sadržaj.
- **Don't** obraćati se posjetitelju neformalno. Persiranje s velikim početnim slovom (Vam, Vas, Vaš) je obveza, i ona oblikuje duljinu i ton svake labele i gumba.
