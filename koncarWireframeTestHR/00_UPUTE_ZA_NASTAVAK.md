# D&ST Grow & Reward – upute za nastavak (izrada wireframea)

Stanje na dan 2. 10. 2026. Ovo je predaja posla iz prethodne Claude sesije s Matejem Hanzlićem (Fer Projekt). Novoj sesiji treba da brzo uhvati kontekst i krene na wireframe.

## 1. Ukratko

- **Naručitelj:** KONČAR D&ST. Vlasnik procesa je HR, a materijale šalje Monika iz HR-a.
- **Mi:** Fer Projekt; ponudu i projekt vodi Matej Hanzlić.
- **Što se gradi:** jedna web aplikacija „D&ST Grow & Reward“ za četiri HR procesa: godišnje nagrađivanje, godišnje napredovanje, mjesečne stimulacije i kvartalne nagrade.
- **Tehnologija:** Laravel + MySQL, nikako .NET. Prijava ide Microsoft računom (Entra ID).
- **Dokle smo stigli:**
  - Specifikacija je napisana i usklađena s klijentovim dijagramima od 1. 10. 2026.
  - Ponuda revizija 2 postoji, ali Matej će je još revidirati.
  - **Sljedeći korak su brzi wireframei.**
- **Izvor istine:** `02_Nasi_dokumenti/Specifikacija_DST_Grow_Reward.md`, a za print isti dokument u PDF-u.
- **Što je u mapi:** samo najnovije verzije naših dokumenata i materijali Naručitelja. Starije verzije namjerno su izbačene da ne stvaraju šum, pa ih ne treba tražiti.

## 2. Što pročitati i kojim redom

| # | Datoteka | Zašto |
| --- | --- | --- |
| 1 | `02_Nasi_dokumenti/Specifikacija_DST_Grow_Reward.md` | Sadrži sve: uloge, tok prijedloga, četiri faze, polja, izračune, statuse i 31 otvoreno pitanje s pretpostavkama „Radimo:“. |
| 2 | `01_Od_Narucitelja/Dijagrami_toka_2026-10-01/` i `Email_Narucitelja_2026-10-01.md` | Najnoviji klijentovi tokovi odobravanja: stimulacije i kvartalne, napredovanje i nagrađivanje, te proizvodnja SET. |
| 3 | `01_Od_Narucitelja/Snimke_postojece_aplikacije/` | Postojeća aplikacija za stimulacije i kvartalne. Njezin raspored ekrana i nazive radnji zadržavamo. |
| 4 | `01_Od_Narucitelja/_tekst/` (OB-0493, OB-0494, OB-0495, Prilog 2) | Točna polja, opisi razina i tekstovi obrazaca za napredovanje i godišnju nagradu. Docx originali su u nadmapi. |
| 5 | `02_Nasi_dokumenti/Ponuda_DST_Grow_Reward_revizija_2.*` | Opseg, faze, tim i stack. Za wireframe nije potrebna. |
| 6 | `_tekst/Software_final.txt`, `_tekst/DST_Grow_Reward_Zahtjev_za_informativnu_ponudu.txt` | Izvorna specifikacija i zahtjev za ponudu. Čitaju se samo za detalj koji nedostaje u Specifikaciji. |

Kad se dokumenti međusobno razilaze, prednost se daje ovim redom:

1. dijagrami i Monikin e-mail od 1. 10. 2026.
2. Software_final
3. obrasci
4. zahtjev za ponudu

Specifikacija je te razlike već razriješila, pa vrijedi ono što piše u njoj, uključujući njezine pretpostavke „Radimo:“.

## 3. Pravila koja je postavio Matej

- **Ne izmišljati i ne izostavljati.**
  - Ono što klijent nije napisao ne prikazuje se kao činjenica. U wireframeu se takvo mjesto označi kao pretpostavka, uz broj otvorenog pitanja iz Specifikacije (npr. „P11“).
  - Ništa što je klijent tražio ne smije nestati.
- **Pisati čitljivo i ljudski.**
  - Bez referenci tipa „t. 3.2“.
  - Bez „ovaj dokument / onaj dokument“, jer se radi po najnovijoj verziji i podacima.
- **Postojeće dokumente ne mijenjati.** Nova verzija je nova datoteka.
- **Stack je Laravel.**
- **Tajne se ne diraju.** Mapa `E:\Web_Work\fer\koncar` je naš raniji intranet za KONČAR D&ST. Njezin `README.md`, `private.pem`, `.env` i slične datoteke sadrže lozinke i ključeve; nikad ih ne kopirati ni citirati.
- **Povjerljivost.** Zahtjev za ponudu nosi oznaku „POVJERLJIVO | Za dostavu potencijalnim dobavljačima“ i ne dijeli se izvan tima.
- **Komunikacija s Matejem je na hrvatskom.**

## 4. Domena u pet minuta

### Moduli i rokovi

![Rokovi](02_Nasi_dokumenti/Dijagrami/01_Rokovi_po_modulu.png)

| Faza | Modul | Mora biti spreman do | Napomena |
| --- | --- | --- | --- |
| 1 | Godišnje nagrađivanje | 1. 11. 2026. | prioritet, ide prvi |
| 2 | Godišnje napredovanje | 1. 2. 2027. | tri vrste napredovanja, tri obrasca |
| 3 | Mjesečne stimulacije | 1. 3. 2027. | postojeća aplikacija radi do 1. 4. 2027. |
| 4 | Kvartalne nagrade | 1. 4. 2027. | postojeća aplikacija radi do 1. 4. 2027. |

Temelj aplikacije mora biti spreman zajedno s Fazom 1. Čine ga zaposlenici, organizacijska struktura, uloge, linije odobravanja, obavijesti i trag izmjena.

### Uloge

| Uloga | Ukratko |
| --- | --- |
| Rukovoditelj (oko 80) | predlaže za svoje ljude; vidi njihove plaće, budžet i statuse odjela |
| Dodatni odobravatelj | postoji samo u određenim odjelima; proizvodnja SET ima dvije takve razine |
| Direktor | odobrava ili odbija, ne predlaže; vidi sve odjele kojima je nadređen |
| Član Uprave | odobrava ili odbija; može predložiti za svoje direktno podređene; vidi zbirno i po zaposleniku |
| Predsjednik Uprave | ima pregled cijele tvrtke |
| HR administrator | vodi cijelu aplikaciju; formalno provjerava prijedloge napredovanja i nagrađivanja; iznimno završno odobrava; jedini vidi trag izmjena |

- Nagrade se odnose samo na zaposlenike izvršitelje. Rukovoditelji, direktori i Uprava u aplikaciji su samo korisnici koji predlažu i odobravaju.
- Aplikaciju u isto vrijeme koristi do oko 40 ljudi.

### Kako prijedlog putuje

![Tijek odobravanja](02_Nasi_dokumenti/Dijagrami/02_Tijek_odobravanja_po_modulima.png)

![Linija SET](02_Nasi_dokumenti/Dijagrami/03_Linija_odobravanja_proizvodnja_SET.png)

- **Redoslijed:** rukovoditelj → dodatni odobravatelj (ako ga odjel ima; SET ima dvije razine) → HR (samo napredovanje i nagrađivanje) → odobravatelj najviše razine. Najviša razina je direktor ili član Uprave, a u napredovanju uvijek član Uprave.
- **Odbijanje:**
  - Tko god odbije, prijedlog se vraća rukovoditelju na doradu.
  - Razlog je obavezan i šalje se e-mail. Tko ga sve dobiva piše u tablici u Specifikaciji.
  - Odbija se pojedinačno, po zaposleniku.
- **Masovno ili pojedinačno:** stimulacije i kvartalne odobravaju se masovno, za cijeli prikazani popis. Napredovanje i godišnja nagrada odobravaju se pojedinačno.
- **Nakon zadnjeg odobrenja** prijedlog je zaključan za sve osim HR-a.

### Statusi prijedloga

Spremljeno · Poslano na odobrenje · Poslano HR-u · Vraćeno na doradu · HR provjereno · Odbijeno · Odobreno · Zaključano · Izvezeno za obračun · Primijenjeno u master podacima

Status dok prijedlog čeka dodatnog odobravatelja još je otvoreno pitanje (P10).

### Opća pravila

- Svi iznosi su bruto, u eurima.
- Sustav sam računa i ne dopušta slanje dok pravilo nije zadovoljeno, npr. kod prekoračenja budžeta ili kad nedostaje obrazloženje.
- Izračunata polja zaključana su i jasno označena.
- Razdoblja se zaključavaju i otključavaju.
- Svaka važna izmjena ostaje zapisana: tko, kada i što.
- Sučelje je responzivno.

## 5. Postojeća aplikacija – što zadržati

Snimke su u `01_Od_Narucitelja/Snimke_postojece_aplikacije/`; imena zaposlenika na njima su zamućena.

- **Izbornik (01):** lijeva navigacija s ovim stavkama:
  - Home, Djelatnici
  - Izvoz Stimulacije, Izvoz Kvartalnice
  - Izvještaji Stimulacije, Izvještaji Kvartalnice
  - Import prisutnosti, Faktor uspjeha
  - Kvartalnice, Stimulacije
  - Odobrenje Stimulacije, Odobrenje Kvartalnice
  - Administracija Voditelja
- **Stimulacije, unos (03):**
  - Na vrhu je izbor godine i tablica po mjesecima: zbroj stimulacija, zbroj bruta i broj djelatnika sa stimulacijom.
  - Ispod su odobravatelji, status, ukupni i trenutno potrošeni budžet odjela te izbor mjeseca.
  - Gumbi su **Spremi**, **Predaj na odobrenje** i **Osvježi**.
  - Tablica zaposlenika ima stupce: Naziv, Dolazak, Odlazak, Bruto plaća (€), Stimulacija (%) kao padajući izbornik, Bruto od stimulacije (€), Napomena, Napomena odobravatelja, Modificirano od, Modificirano.
- **Odobrenje stimulacije (04):**
  - Bira se mjesec; po voditelju se prikazuju status, zbrojevi, broj djelatnika sa stimulacijom te potrošeni i ukupni budžet odjela.
  - Postoji polje „Obrazloženje odbijanja“ i gumbi **Odobri** i **Odbaci**.
  - Tablica ima i stupce Odobreno od i Odobreno.
- **Kvartalnice, unos (06):**
  - Bira se kvartal; gumbi su **Spremi**, **Predaj na odobrenje** i **Osvježi**.
  - Tablica ima stupce: Disciplinska mjera, četiri kriterija (Kvaliteta, Količina, Urednost/Pridržavanje, Suradnja) kao padajuće izbornike 100/75/50/25/0, Prisustvo/Fond sati i Kvartalnica (%).
  - U novoj aplikaciji disciplinsku mjeru unosi samo HR (P27), pa je rukovoditelju samo za čitanje.
- **Ostale snimke:** Dodaj djelatnika (02), Izvoz stimulacije (05), Odobrenje kvartalnice (07), Izvoz kvartalnice (08), Import prisutnosti (09).

**Nazivi:**

- Nazivi radnji ostaju kao u postojećoj aplikaciji: Spremi, Predaj na odobrenje, Osvježi, Odobri, Odbaci.
- Za pojmove se koristi rječnik Specifikacije: rukovoditelj, zaposlenik, kvartalna nagrada. Postojeća aplikacija kaže Voditelj, Djelatnik, Kvartalnica.
- Ako je izbor rječnika bitan, pitati Mateja.

## 6. Popis ekrana za wireframe (prijedlog)

Redoslijed izrade: **A + Faza 1**, zatim **Faza 2**, zatim **Faze 3 i 4**. Faze 3 i 4 uglavnom preuzimaju postojeće ekrane uz dopune iz Specifikacije.

### A. Temelj (dijele ga svi moduli)

| # | Ekran | Ključni sadržaj |
| --- | --- | --- |
| A1 | Prijava | Prijava Microsoft računom, bez lozinke u aplikaciji. |
| A2 | Okvir aplikacije | Lijevi izbornik prema ulozi i modulima, podaci o korisniku i ulozi. |
| A3 | Početna po ulozi | Što čeka moju radnju, aktivni ciklusi i rokovi, stanje budžeta. Sadržaj je naš prijedlog; Specifikacija traži preglede statusa i budžeta. |
| A4 | Zaposlenici – popis | Filtri po odjelu, sektoru, rukovoditelju i statusu (aktivni/neaktivni). |
| A5 | Zaposlenik – detalj | Polja: osobni podaci (OIB, SAP šifra), zaposlenje, organizacija, radno mjesto (pozicija, stupanj složenosti, platni razred), bruto plaća. Povijest promjena s „vrijedi od–do“, tko i kada. Deaktivacija i reaktivacija. |
| A6 | Masovni uvoz zaposlenika | Excel: učitavanje → pregled po retku s greškama → potvrda; vrijedi samo za buduće obračune. |
| A7 | Rukovoditelji i linije odobravanja | Pregled po godini: rukovoditelj, organizacijska jedinica, broj zaposlenika, budžet stimulacija, 1., 2. i 3. odobravatelj. Dodatni odobravatelji po odjelu; SET ima dvije razine. |
| A8 | Ciklusi i razdoblja | Otvaranje, rokovi, zaključavanje i otključavanje mjeseca, kvartala i ciklusa. |
| A9 | Budžeti | Dodijeljeno, rezervirano, iskorišteno i raspoloživo; preraspodjela uz evidenciju. |
| A10 | Obavijesti | Predlošci i pravila slanja po modulu; dnevnik poslanih poruka. |
| A11 | Trag izmjena | Vidi ga samo HR; uz njega popis uvoza i izvoza. |
| A12 | Korisnici, uloge, šifrarnici | Administracija za HR. |

### Faza 1 – Godišnje nagrađivanje

| # | Ekran | Ključni sadržaj |
| --- | --- | --- |
| F1.1 | HR – postavke ciklusa | Budžet: isto pravilo za sve ili korekcije po sektoru, profitnom centru ili odjelu. Faktori za razine 1–6. Limiti po stupnju složenosti: I8 i I7 4.500 EUR, I6 6.000 EUR, I5 i I4 12.000 EUR. Razdoblje unosa. |
| F1.2 | Rukovoditelj – moji zaposlenici | Budžet odjela (dodijeljeno, rezervirano, iskorišteno, raspoloživo) i status po zaposleniku. Zaposlenik bez unesene razine nije predložen. |
| F1.3 | Obrazac za procjenu | Detaljno opisan ispod tablice. |
| F1.4 | Odobravatelj – na čekanju | Popis prijedloga → detalj (cijeli obrazac, obrazloženja, iznos, HR napomene, povijest statusa) → Odobri ili Odbij uz razlog; pojedinačno. |
| F1.5 | HR provjera | Isto kao F1.4, plus vraćanje na doradu s razlozima (višestruki izbor i obavezna napomena). Iznimke: prekoračenje uz odluku Uprave i ručni iznos iznad limita, oboje ostaje u tragu izmjena. |
| F1.6 | Član Uprave / direktor – budžet | Profitni centar i odjeli: tko je koliko iskoristio i za koga, usporedba jedinica, neiskorišteno, preraspodjele. Kalibracija nakon završnog odobrenja; korekcije unosi HR. |
| F1.7 | Izvještaji i izvoz | Nagrađeni zaposlenici; raspodjela po jedinicama; po odjelu broj i postotak nagrađenih. Izvoz u Excel i za HRNET. |

Sadržaj obrasca za procjenu (F1.3):

- **Zaglavlje se puni samo:** odjel, rukovoditelj, broj zaposlenih, budžet (iznos i %), datum, ime, radno mjesto ili grupa radnih mjesta.
- **Tri kriterija:** Kvaliteta rada 2–4, Radna učinkovitost 2–4, Doprinos timu 3–4. Uz svaki kriterij ide opisna procjena i 2–3 primjera iz prakse, a na kraju obrazloženje prijedloga.
- **Izračun uživo:** prosjek → razina → faktor → iznos u EUR, uz primjenu limita.
- **Upozorenja i blokade:** upozorenje kod razine 1 ili 2; blokada kod prekoračenja budžeta ili kad nedostaje obavezni podatak.
- **Radnje:** Spremi i Predaj na odobrenje.

### Faza 2 – Godišnje napredovanje

| # | Ekran | Ključni sadržaj |
| --- | --- | --- |
| F2.1 | HR – postavke ciklusa | Budžet i postotak; apoeni 100–450 EUR uz mogućnost drugih iznosa; pravilo 50 % / 75 % (uključi ili isključi); pravilo 3 % (P15); granica mjeseci za Junior (P16); popis ključnih ekspertnih radnih mjesta. |
| F2.2 | Rukovoditelj – moji zaposlenici | Aktivni zaposlenici. Pripravnici i Juniori u prvih 12 mjeseci prikazani su sivo i ne mogu se predložiti. Izbor vrste napredovanja. |
| F2.3–F2.5 | Tri obrasca | Horizontalno, Junior → Standardna i Standardna → Napredna. Detaljno opisani ispod tablice. |
| F2.6 | HR provjera | Vraćanje na doradu s razlozima. Napomena „ne smije biti predložen“, nakon koje sustav onemogućuje slanje. |
| F2.7 | Odobravanje | Pojedinačno, uz vremensku crtu statusa (statusi su u tablici u Specifikaciji). |
| F2.8 | HR – primjena nove plaće | Pregled izračuna (postojeća plaća + povećanje) → potvrda → upis s datumom primjene 1. 4. → izvoz za HRNET. Nema automatskog upisa bez HR potvrde. |
| F2.9 | Izvještaj napredovanja po odjelu | Izvoz u Excel. |

Sadržaj tri obrasca (F2.3–F2.5):

- **Zaglavlje** s postojećom plaćom i datumom njezine zadnje promjene.
- **DA/NE uvjeti:** svaki NE zaustavlja postupak.
- **Eliminacijski kriterij:** sigurnost i radna disciplina.
- **Kriteriji** s ocjenom 1–4, opisom razina i 2–3 mjerljiva primjera.
- **Prijedlog povećanja:** apoen, iz kojeg se računaju postotak i nova bruto plaća.
- **Kod vertikalnih napredovanja** još postojeći i predloženi platni razred.

### Faza 3 – Mjesečne stimulacije

| # | Ekran | Ključni sadržaj |
| --- | --- | --- |
| F3.1 | Unos stimulacija | Preuzima ekran 03. Dodaje se preostali godišnji fond, obavezno obrazloženje za svaku stimulaciju iznad 0 % i blokada prekoračenja fonda s jasnim razlogom. Šalje se cijeli mjesečni prijedlog odjela odjednom. |
| F3.2 | Odobrenje stimulacija | Preuzima ekran 04: masovno Odobri, pojedinačno Odbaci uz napomenu. Odbijeni iznos vraća se u fond. |
| F3.3 | HR – fondovi | Godišnji fond po odjelu za razdoblje 1. 4. – 31. 3.; korekcija kod prestanka pripravničkog statusa (2,5 % mjesečno, razmjerno). |
| F3.4 | Izvoz i izvještaji | Izvoz za HRNET (OIB, SAP šifra, prezime, ime, bruto iznos, postotak, OIB nadređenog) i izvještaji. |

### Faza 4 – Kvartalne nagrade

| # | Ekran | Ključni sadržaj |
| --- | --- | --- |
| F4.1 | HR – postotak Uprave | Postotak po kvartalu, isti za sve zaposlenike. |
| F4.2 | Uvoz prisutnosti (CSV) | Preuzima ekran 09. Statusi retka: ok, ne postoji u bazi, ne postoji u CSV-u; greške su jasno označene. Ponovni uvoz moguć do zaključavanja kvartala. |
| F4.3 | HR – disciplinske mjere | Unos po zaposleniku i kvartalu. |
| F4.4 | Unos kvartalnih nagrada | Preuzima ekran 06. Kriteriji su zadano na 100 %; za svaki se vide ponder i doprinos ukupnoj procjeni. Obrazloženje je obavezno ako je bilo koji kriterij ispod 100 %. Iznosi su zaključani. |
| F4.5 | Odobrenje kvartalnih | Preuzima ekran 07: masovno Odobri, pojedinačno Odbaci. |
| F4.6 | Izvoz i izvještaji | Izvoz za HRNET i izvještaji u Excel. |

## 7. Brojke za realne primjere u wireframeima

- **Godišnja nagrada:**
  - Nagrada = ugovorena mjesečna bruto plaća × faktor razine učinka.
  - Tablica razina i ocjena je u Specifikaciji (Faza 1 → Izračun). Faktori 0 / 0 / 0,6 / 0,9 / 1,7 / 2,8 samo su primjer.
  - Limiti po stupnju složenosti su u F1.1.
- **Kvartalna nagrada:**
  - Nagrada = bruto plaća × % Uprave × (0,40 K + 0,30 Q + 0,15 U + 0,15 S) × prisutnost.
  - Primjer 1: plaća 2.000 EUR, Uprava 75 %, sve 100 % → 1.500,00 EUR.
  - Primjer 4: kao primjer 2, uz prisutnost 75 % → 1.040,63 EUR.
  - Pragovi prisutnosti: do 30 % → 0 %, do 50 % → 50 %, do 75 % → 75 %, iznad 75 % → 100 %.
- **Stimulacija:** 0, 5, 10, 15 ili 20 % bruto plaće.
- **Napredovanje:** povećanje od 100, 150, 200, 250, 300, 350, 400 ili 450 EUR bruto.
- **Podaci u primjerima:** koristiti izmišljena imena i OIB-ove, nikad stvarne.

## 8. Otvorena pitanja koja utječu na ekrane

Cijeli popis je na kraju Specifikacije. Za wireframe su važna ova pitanja; dok se ne dogovore, vrijedi pretpostavka „Radimo“.

| P | Pitanje | Radimo |
| --- | --- | --- |
| 1 | Odbijanje kod stimulacija i kvartalnih | vraća se samo odbijeni zaposlenik |
| 2 | Nakon dorade | prijedlog ponovno prolazi cijelu liniju |
| 6 | Masovno odobravanje godišnje nagrade | pojedinačno, uz mogućnost da se masovno uključi |
| 7 | Član Uprave kao predlagatelj – tko mu odobrava | otvoreno |
| 10 | Status dok čeka dodatnog odobravatelja | otvoreno |
| 11 | Prekoračenje budžeta kod nagrade | blokada, uz HR iznimku nakon odluke Uprave |
| 12 | Ocjene kod nagrade | 2–4, a doprinos timu 3–4 |
| 13 | Limit za I4 i I5 bez iznimnog učinka | otvoreno, utječe na izračun |
| 14 | Bira li rukovoditelj posebno „razinu nagrade“ | ne, razina se računa |
| 19 | Postotak povećanja u obrascima | sustav računa postotak iz iznosa |
| 20 | Uvjet za Standardna → Napredna | barem dvije ocjene 3 i dvije 4 |
| 26 | Obrazloženje stimulacije | samo za stimulaciju iznad 0 % |
| 27 | Disciplinska mjera | unosi je samo HR |
| 28 | Neispravan OIB pri uvozu prisutnosti | prikazuje se kao greška retka |
| 29 | Format izvoza za HRNET | Excel i CSV |

## 9. Kako predlažem raditi wireframe

Format još nije dogovoren, pa ga na početku sesije treba potvrditi s Matejem.

- **Prijedlog formata:** low-fi klikabilni HTML.
  - Sivi tonovi i Bootstrap 5, kao u našem intranetu.
  - Jedna stranica po ekranu i `index.html` s popisom ekrana.
  - Tekst na hrvatskom, podaci izmišljeni.
  - Prednost je što se kasnije lako prenosi u Blade.
- **Alternativa:** Figma, ako je u sesiji spojena.
- **Pitati Mateja:**
  - koji format;
  - koliko detalja;
  - samo Faza 1 ili sve;
  - je li wireframe interni ili ide klijentu uz ponudu.
- **Bilješka na svakom ekranu:** kratko tko ga koristi, čemu služi i koja pravila vrijede. Pretpostavke se označe brojem pitanja (P#).
- **Gdje spremati:** u `03_Wireframe/`. Mapa još ne postoji; napravi je.

## 10. Tehnički kontekst

- **Iz ponude:**
  - Laravel 13 (PHP 8.3+) i MySQL 8.
  - Blade + Livewire. Livewire je pretpostavka koju Matej još nije potvrdio.
  - Laravel Excel, Queues i Scheduler.
  - Microsoft Graph za e-mail i Entra ID za prijavu.
  - Hosting: preporuka je Azure pretplata Naručitelja u EU; alternative su hosting kod nas ili on-premise.
- **Raniji projekt za istog klijenta:** `E:\Web_Work\fer\koncar` (intranet KONČAR D&ST).
  - Laravel 9, Blade, Bootstrap 5 + SCSS (laravel-mix), jQuery.
  - Naš paket `fer/admin`, Microsoft OAuth (`stevenmaguire/oauth2-microsoft`), `maatwebsite/excel`.
  - Koristan je kao vizualna i strukturna referenca (layout, admin).
  - **Tajne iz njega se ne kopiraju** (README.md, ključevi, .env).

## 11. Živi dokumenti (Claude Docs)

Datoteke u ovoj mapi su snimke od 2. 10. 2026. Ako Matej nešto promijeni u živim dokumentima, treba ih ponovno izvesti.

- Specifikacija: https://claude.ai/code/artifact/d57fec5a-4b34-4c30-8036-3fc2ca26df42
- Ponuda revizija 2: https://claude.ai/code/artifact/c5df372a-d5c3-4678-a0b6-aab8bc3cc32d

## 12. Kratka povijest

- **28. 9.:** Matej je poslao zahtjev za ponudu, Software_final, obrasce i snimke postojeće aplikacije te zatražio reviziju ponude. Ispravak: radimo Laravel, ne .NET.
- **Nakon toga:** napravljena je Ponuda revizija 2 (254 čovjek-dana, 114.300 EUR bez PDV-a).
- **1. 10.:** klijent je poslao tri nova dijagrama i Monikin e-mail.
  - HR ulazi u liniju odobravanja napredovanja i nagrađivanja, uz formalnu provjeru.
  - Proizvodnja SET ima dodatnu razinu odobravanja.
  - Naši dijagrami usklađeni su s klijentovima.
- **1. 10.:** na Matejev zahtjev napisana je nova, čitljiva Specifikacija: uvod, plan, uloge, temelj, tok, faze 1–4, zajedničko, sigurnost, završetak i otvorena pitanja. U njoj nema referenci na izvore, a PDF je za print.
- **2. 10.:** pripremljena je ova mapa za wireframe.

## 13. Što je još otvoreno izvan wireframea

- **Ponuda se revidira naknadno.** Otvoreno je:
  - cijena od 254 čovjek-dana;
  - redoslijed varijanti hostinga;
  - pretpostavka Livewire;
  - polja „[upisati]“ (imena članova tima, reference);
  - klauzula o manjim korekcijama do 3 čovjek-dana po fazi.
- **Pitanja prema Naručitelju:** 31 otvoreno pitanje, popisano u zadnjem poglavlju Specifikacije.

## 14. Sadržaj mape

```
koncarWireframeTestHR/
├─ CLAUDE.md                         kratke upute za Claude (čita se automatski)
├─ 00_UPUTE_ZA_NASTAVAK.md           ovaj dokument
├─ 01_Od_Narucitelja/                sve što je klijent poslao (ne mijenjati)
│  ├─ DST_Grow_Reward_Zahtjev_za_informativnu_ponudu.docx   (POVJERLJIVO)
│  ├─ Software_final.docx
│  ├─ OB-0493 … horizontalno napredovanje.docx
│  ├─ OB-0494 … Junior → Standardna.docx
│  ├─ OB-0495 … Standardna → Senior/Napredna.docx
│  ├─ Prilog_2._Obrazac_GODISNJA_nagrada_10_2_2026_FINAL.docx
│  ├─ Dijagram_i_snipovi_postojece_aplikacije.docx
│  ├─ Email_Narucitelja_2026-10-01.md
│  ├─ Dijagrami_toka_2026-10-01/     3 najnovija dijagrama
│  ├─ Snimke_postojece_aplikacije/   9 ekrana postojeće aplikacije
│  └─ _tekst/                        isti docx kao čisti tekst (za brzo čitanje)
└─ 02_Nasi_dokumenti/
   ├─ Specifikacija_DST_Grow_Reward.md / .pdf      ← IZVOR ISTINE
   ├─ Ponuda_DST_Grow_Reward_revizija_2.md / .pdf
   └─ Dijagrami/                     rokovi, tijek odobravanja, linija SET
```
