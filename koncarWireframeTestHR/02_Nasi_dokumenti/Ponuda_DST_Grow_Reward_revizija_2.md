# Ponuda – D&ST Grow & Reward (revizija 2)

Sep 28, 2026 · @Matej Hanzlić

## 1. Sažetak predloženog rješenja i stupanj funkcionalne pokrivenosti

Nudimo namjenski razvijenu web aplikaciju na Laravelu, s prijavom postojećim Microsoft 365 računima, isporučenu u četiri faze koje poštuju sve zadane rokove, za 114.300,00 EUR bez PDV-a (254 čovjek-dana).

Za Končar D&ST već razvijamo i održavamo intranet na istoj tehnologiji (Laravel, MySQL), s obavijestima preko Microsoft 365 i dnevnim uvozom HR exporta zaposlenika s organizacijskom strukturom i nadređenima. To znanje o organizaciji i sustavima Naručitelja skraćuje analizu i smanjuje rizik prvog, najkraćeg roka.

Opseg rješenja:

- **Četiri modula:** godišnje nagrađivanje, godišnje napredovanje (horizontalno, Junior → Standardna, Standardna → Napredna), mjesečne stimulacije i kvartalne nagrade.
- **Digitalni obrasci** OB-0493, OB-0494, OB-0495 i Obrazac za procjenu – godišnja nagrada: automatsko povlačenje master podataka, DA/NE provjere, eliminacijski kriteriji, obvezni primjeri iz prakse i blokada slanja nepotpunog prijedloga.
- **Linije odobravanja prema dijagramima toka Naručitelja**: dodatni odobravatelji za određene odjele (u proizvodnji SET dvije razine), HR u liniji napredovanja i nagrađivanja, odobravatelj najviše razine na kraju; svako odbijanje vraća prijedlog rukovoditelju na doradu uz e-mail obavijest.
- **Zajedničke cjeline:** master podaci s poviješću važenja, administracija rukovoditelja i linija odobravanja (do 4 razine), ciklusi i zaključavanje razdoblja, budžeti (dodijeljeno / rezervirano / iskorišteno / raspoloživo) i preraspodjele, e-mail obavijesti i podsjetnici, izvještaji i dashboardi s izvozom u Excel, izvozi za HRNET, audit trail.
- **Prava pristupa** prema ulozi i organizacijskoj nadležnosti, uključujući vidljivost bruto plaća i disciplinskih mjera.
- **Okruženja:** zasebno testno i produkcijsko, za oko 120 korisnika i do 40 istovremenih.

Nova aplikacija zamjenjuje postojeće rješenje za stimulacije i kvartalnice; raspored ekrana i nazivi radnji (Spremi, Predaj na odobrenje, Odobri, Odbaci) zadržavaju se gdje je moguće.

| Kategorija | Udio u opsegu rada (procjena) | Što obuhvaća |
| --- | --- | --- |
| Standardno | oko 15 % | prijava Microsoft računom, okruženja, Excel/CSV uvoz i izvoz, redovi poruka, tehnički audit |
| Konfiguracija | oko 25 % | parametri koje HR mijenja sam: postoci, apoeni, faktori, limiti, pravila 50 % / 75 %, predlošci obavijesti, linije odobravanja |
| Prilagodba | oko 15 % | logika postojeće aplikacije za stimulacije i kvartalnice, prenesena i proširena |
| Razvoj | oko 45 % | obrasci, napredovanje, nagrađivanje, budžeti i preraspodjele, izvještaji za Upravu |

Zahtjeve koje ne nudimo navodimo u tč. 3 i 10; pitanja i alternative u tč. 11.

## 2. Arhitektura, tehnološki stog, model hostinga, autentikacije i licenciranja

Rješenje je jedna Laravel web aplikacija s modularnom poslovnom logikom i jednom MySQL bazom, u odvojenom testnom i produkcijskom okruženju.

*(Dijagram arhitekture nalazi se u PDF verziji ponude.)*

Korisnik se prijavljuje Microsoft računom; aplikacija zatim iz administracije rukovoditelja sama određuje ulogu i nadležnost, pa se prava ne održavaju na dva mjesta.

| Područje | Ponuđeno rješenje |
| --- | --- |
| Arhitektura | Troslojna web aplikacija: sučelje, servisni sloj poslovnih pravila (izračuni, workflow, budžeti), sloj podataka. Pravila i dozvole provjeravaju se na poslužitelju za svaki zahtjev, ne samo u sučelju. |
| Tehnološki stog | Laravel 13 (PHP 8.3+), Blade i Livewire, Eloquent ORM, MySQL 8, Laravel Excel / PhpSpreadsheet (.xlsx, .csv), Laravel Queues i Scheduler za obavijesti i podsjetnike, Microsoft Graph za e-mail. |
| Hosting (preporuka) | Azure pretplata Naručitelja, EU regija: Azure App Service za Linux (PHP), Azure Database for MySQL – Flexible Server, Blob Storage, Key Vault, Azure Monitor. Naručitelj je vlasnik okruženja i podataka. |
| Hosting (alternativa A) | Hosting kod Ponuditelja na upravljanoj Linux infrastrukturi, na kojoj radi i intranet Končar D&ST, na zasebnom poslužitelju i bazi, uz mjesečnu naknadu. |
| Hosting (alternativa B) | On-premise: Linux poslužitelj (Ubuntu LTS) s Nginxom, PHP-FPM-om i MySQL-om u podatkovnom centru Naručitelja; instalaciju provodi Ponuditelj uz IT Naručitelja. |
| Autentikacija | Single sign-on s Microsoft Entra ID (OpenID Connect) postojećim poslovnim Microsoft 365 računima; MFA i uvjetni pristup prema politikama Naručitelja; aplikacija nema vlastite lozinke. |
| Autorizacija | Uloge (HR administrator, rukovoditelj, direktor, član Uprave, predsjednik Uprave) i organizacijska nadležnost iz master podataka i linija odobravanja; HR administratori po potrebi preko Entra grupe. |
| Licenciranje | Nema licenci po korisniku. Naručitelj dobiva trajno, neisključivo pravo korištenja za neograničen broj korisnika te izvorni kod i dokumentaciju na kraju projekta (prijenos isključivih prava kao opcija, tč. 8). Laravel i korištene komponente su open-source (MIT). |

## 3. Matrica usklađenosti

Sve funkcionalne zahtjeve specifikacije pokrivamo; izvan opsega je samo pet stavki koje specifikacija ne traži ili izričito isključuje. Kategorije: standardno – gotova mogućnost platforme; konfiguracija – HR postavlja sam; prilagodba – postojeća logika ili komponenta koja se proširuje; razvoj – namjenski razvoj; nije podržano – izvan opsega. Konačna matrica po svakoj stavci specifikacije isporučuje se na kraju analize (tč. 4).

| Zahtjev / područje | Kategorija | Napomena |
| --- | --- | --- |
| Prijava Microsoft računom (SSO), MFA | Standardno | Entra ID, politike Naručitelja |
| Zasebno testno i produkcijsko okruženje | Standardno | isti kod, odvojene baze i postavke |
| Audit trail – tehnički okvir | Standardno | bilježenje svake izmjene na razini modela |
| Uvoz i izvoz Excel / CSV | Standardno | s validacijom po retku |
| Uloge i prava po organizacijskoj nadležnosti | Prilagodba | uloge + filtriranje po hijerarhiji na poslužitelju |
| Administracija rukovoditelja i linija odobravanja | Prilagodba | postojeća funkcija, proširena na dodatne odobravatelje po odjelu (do 4 razine, linija SET) i zamjenske odobravatelje |
| Početni uvoz org. strukture i nadređenih iz HR exporta | Prilagodba | isti export koji već puni imenik na intranetu |
| Master podaci s poviješću važenja | Razvoj | novi atributi: pozicija, stupanj složenosti, platni razred, sektor, profitni centar |
| Masovno ažuriranje bruto plaća (Excel) | Razvoj | pregled i validacija prije potvrde |
| Ciklusi, zaključavanje i otključavanje razdoblja | Razvoj | jedinstveno za sve module |
| Parametri: postoci, apoeni, faktori, limiti, ključna ekspertna mjesta, pravilo 50 % / 75 % | Konfiguracija | HR mijenja po ciklusu, bez programiranja |
| Predlošci i pravila e-mail obavijesti i podsjetnika | Konfiguracija | slanje preko Microsoft 365 |
| Stimulacije: unos, izračun, godišnji fond, korekcija za pripravnike | Prilagodba | logika postojeće aplikacije |
| Kvartalnice: uvoz prisutnosti, pragovi, ponderi, disciplinska mjera | Prilagodba | logika postojeće aplikacije, s prikazom doprinosa kriterija |
| Izvoz za HR i za Upravu (stimulacije, kvartalnice) | Prilagodba | kao u postojećoj aplikaciji, uz format za HRNET |
| Godišnje napredovanje: tri obrasca, DA/NE provjere, HR provjera i dorada | Razvoj | prema OB-0493, OB-0494, OB-0495 |
| Blokada Pripravnika i Juniora 12 mjeseci, praćenje roka za prefiks Senior | Razvoj | vizualna oznaka, podsjetnik HR-u |
| Primjena nove bruto plaće u master podatke nakon HR potvrde | Razvoj | poluautomatski, s datumom primjene |
| Godišnje nagrađivanje: obrazac, razine, faktori, limiti, HR provjera, obavijest za razine 1–2 | Razvoj | iznos iznad limita samo HR, uz audit |
| Budžeti: rezervirano / iskorišteno / raspoloživo, preraspodjele, pregled Uprave | Razvoj | po Društvu, profitnom centru, sektoru, odjelu |
| Masovno i pojedinačno odobravanje, odbijanje s napomenom i vraćanjem na doradu na svakoj razini | Konfiguracija | pravilo po modulu |
| Izvještaji i dashboardi, izvoz u Excel | Razvoj | presjeci iz tč. 7 specifikacije |
| Automatska (API) integracija s HRNET-om ili SAP-om | Nije podržano | opcija u tč. 8 |
| Automatska raspodjela iznosa pri promjeni odjela | Nije podržano | specifikacija je ne traži; HR uređuje ručno |
| Automatski upis nove plaće bez HR potvrde | Nije podržano | specifikacija ga izričito isključuje |
| Elektronički potpis obrazaca | Nije podržano | odobrenje u workflowu s audit zapisom zamjenjuje potpis |
| Nativna mobilna aplikacija | Nije podržano | responzivno web sučelje radi na tabletu i mobitelu |

## 4. Plan faza, ključne aktivnosti, rokovi, preduvjeti i ovisnosti o Naručitelju

Rokovi su izvedivi uz početak rada Oct 5, 2026: svaka faza ide u produkciju zadnji radni dan prije roka, a iza svakog puštanja slijede 4 tjedna stabilizacije (tč. 6).

*(Dijagram plana faza nalazi se u PDF verziji ponude.)*

Prva faza ima najkraći rok (20 radnih dana), pa u njoj radi prošireni tim (tč. 7), a dashboardi za Upravu mogu se isporučiti tijekom stabilizacije ako analiza pokaže potrebu.

| Faza | Ključne aktivnosti | U produkciji |
| --- | --- | --- |
| F1 | analiza i dizajn (prvi tjedan, zamrzavanje opsega F1), Entra ID i okruženja, master podaci i uvoz org. strukture, uloge i konfigurabilne linije odobravanja (dodatni odobravatelji po odjelu, linija SET), audit, obavijesti, modul godišnjeg nagrađivanja s obrascem, HR provjerom, izvještajima i Excel izvozom, UAT, edukacija | 30. 10. 2026. |
| F2 | tri obrasca napredovanja, HR provjera i dorada, budžeti po razinama i preraspodjele, pravilo 50 % / 75 %, primjena nove plaće u master podatke, izvoz za HRNET, izvještaji, UAT | 29. 1. 2027. |
| F3 | stimulacije, migracija iz postojeće aplikacije (probna pa konačna), izvozi za HR i Upravu, izvještaji, UAT, isključenje starog modula | 26. 2. 2027. |
| F4 | kvartalne nagrade, CSV uvoz prisutnosti s validacijom, migracija povijesnih kvartala, izvještaji, UAT, gašenje postojeće aplikacije | 31. 3. 2027. |

Preduvjeti i ovisnosti o Naručitelju:

- Potpisan ugovor ili narudžbenica do Oct 2, 2026.
- Imenovan vlasnik proizvoda iz HR-a s ovlaštenjem za odluke i najmanje 2 sata dnevno u F1, od prve radionice prvog dana rada.
- Odluka o modelu hostinga i otvorena Azure pretplata (ili poslužitelj) do Oct 7, 2026.
- Administratorska suglasnost za registraciju aplikacije u Entra ID-u i zajednički sandučić za obavijesti do Oct 9, 2026.
- Master podaci za F1 (stupanj složenosti, ugovorena bruto plaća, pozicija, OIB, SAP šifra) u našem Excel predlošku do 12. 10. 2026.; organizacijsku strukturu i nadređene preuzimamo iz postojećeg HR exporta.
- Pristup bazi ili izvoz podataka postojeće aplikacije za stimulacije i kvartalnice do početka F3.
- Potvrđeni formati uvoza u HRNET po modulu, s primjerom datoteke.
- Testni korisnici i UAT u dogovorenom roku (u F1 najviše 5 radnih dana).
- Odgovori na pitanja iz tč. 11 do kraja analize u F1.

## 5. Pristup migraciji, integracijama, sigurnosti, audit trailu i zaštiti podataka

Svi uvozi rade po istom načelu – učitavanje, prikaz validacije po retku, potvrda HR-a i zapis u povijest izmjena – a do zaključavanja razdoblja mogu se ponoviti tako da novi uvoz zamijeni prethodni.

### 5.1 Migracija i uvozi

| Vrsta uvoza | Izvor i format | Učestalost |
| --- | --- | --- |
| Inicijalna migracija | baza postojeće aplikacije: zaposlenici, rukovoditelji, linije odobravanja, budžeti, povijest stimulacija i kvartalnica; probna migracija u testno okruženje, zatim konačna uz usporedbu kontrolnih zbrojeva | jednokratno, u F3 i F4 |
| Organizacijska struktura | HR export koji Končar već svaki dan šalje intranetu (odjel, profitni centar, radno mjesto, status, nadređeni) | jednokratno; dnevno kao opcija (tč. 8) |
| Dopuna master podataka | Excel predložak Ponuditelja: OIB, SAP šifra, pozicija, stupanj složenosti, platni razred, grupa radnih mjesta, ugovorena bruto plaća, datum zadnje promjene plaće | jednokratno, zatim po potrebi |
| Masovno ažuriranje plaća i atributa | Excel s datumom važenja; primjena samo na buduće obračune | po potrebi |
| Prisutnost za kvartalnice | CSV (OIB, SAP šifra, prezime i ime, prisutnost, fond sati) uz odabir godine i kvartala; status retka: ok / ne postoji u bazi / ne postoji u CSV-u | kvartalno |

OIB i SAP šifra su ključevi uparivanja; duplikati OIB-a se odbijaju. Migracija povijesnih napredovanja i nagrada iz Word obrazaca nije u opsegu.

### 5.2 Integracije

- **HRNET / obračun plaće:** izvoz odobrenih iznosa po modulu u Excel ili CSV s obveznim stupcima iz specifikacije; nakon izvoza status „izvezeno za obračun“. Zadržava se i izvoz za Upravu iz postojeće aplikacije.
- **Microsoft Entra ID:** prijava i, po želji, Entra grupa za HR administratore.
- **Microsoft 365:** obavijesti i podsjetnici preko Microsoft Graph-a sa zajedničkog sandučića Naručitelja, uz evidenciju poslanih poruka – isti način koji već koristimo na intranetu Končar D&ST.

### 5.3 Prijava

Korisnik se prijavljuje poslovnim Microsoft 365 računom (isti kao za Outlook i Teams), bez zasebne lozinke. MFA i uvjetni pristup nasljeđuju se iz politika Naručitelja. Pristup ima samo korisnik kojeg je HR dodao u aplikaciju; račun se uparuje po e-mail adresi, a deaktivacija u Entra ID-u odmah onemogućuje prijavu. Bilježe se uspješne i neuspješne prijave.

### 5.4 Audit trail

- Za svaku izmjenu bilježi se korisnik, datum i vrijeme, radnja, objekt (zaposlenik, prijedlog, budžet, ciklus) te stara i nova vrijednost.
- Obuhvaćeni su prijedlozi, statusi, odobrenja i odbijanja s napomenama, HR administrativne izmjene, korekcije i preraspodjele budžeta, uvozi i ponovni uvozi, izvozi, zaključavanje razdoblja i promjene master podataka.
- Zapisi se samo dodaju i ne mogu se mijenjati ni brisati kroz aplikaciju.
- Cjelovitu povijest vide samo HR administratori, s pretragom i izvozom u Excel; odobravatelji vide povijest statusa prijedloga koji odobravaju.
- HR administrativne izmjene ne šalju obavijesti drugim korisnicima.

### 5.5 Backup i oporavak

- **Azure Database for MySQL:** automatski dnevni snapshot i backup transakcijskog loga svakih 5 minuta, povrat na bilo koju točku u zadnjih 35 dana, geo-redundantna pohrana unutar EU.
- **Dugoročno čuvanje:** tjedni, mjesečni i godišnji logički backup baze u Blob Storage s nepromjenjivom (immutable) politikom, do 10 godina.
- Prije zaključavanja ciklusa i izvoza za obračun aplikacija sprema zasebnu snimku podataka ciklusa.
- Ciljevi oporavka: RPO do 15 minuta, RTO do 4 radna sata; test povrata jednom godišnje, sa zapisnikom.
- Kod hostinga kod Ponuditelja i on-premise vrijede isti ciljevi (dnevni puni backup, binarni log svakih 15 minuta, kopija izvan poslužitelja).

### 5.6 Sigurnost i zaštita osobnih podataka

- Autorizacija na poslužitelju za svaki zahtjev prema ulozi i nadležnosti; bruto plaće, procjene i disciplinske mjere vidljivi su samo u okviru nadležnosti, a disciplinsku mjeru unosi samo HR.
- Enkripcija u prijenosu (TLS 1.2+) i u mirovanju (AES-256); tajne i ključevi u Key Vaultu.
- Razvoj prema OWASP ASVS, provjera ranjivosti paketa (composer audit, npm audit) pri svakom izdanju.
- GDPR: ugovor o obradi osobnih podataka, obrada u EU, minimalan skup podataka, rok čuvanja prema odluci Naručitelja.
- Pristup Ponuditelja produkcijskim podacima samo po zahtjevu podrške, imenovanim osobama i uz zapis u audit; testno okruženje koristi pseudonimizirane podatke.

## 6. Pristup testiranju, edukaciji, produkcijskom puštanju i stabilizaciji

Svaka faza prolazi interno testiranje, UAT u testnom okruženju i zapisničko prihvaćanje, a nakon puštanja 4 tjedna pojačane podrške.

### 6.1 Testiranje

- **Automatski testovi izračuna:** svi primjeri iz specifikacije (kvartalnice, primjeri 1–5; razine učinka i faktori; limiti po stupnju složenosti; pragovi prisutnosti; pravilo 2,5 % za pripravnike; pravila 50 % / 75 %) izvode se pri svakoj izmjeni koda.
- **Interno QA testiranje** svake faze: funkcionalno, prava pristupa po ulogama i nadležnosti, uvozi i izvozi, obavijesti.
- **UAT** u testnom okruženju prema scenarijima iz tč. 4, 5 i 15 specifikacije; scenarije priprema Ponuditelj, a HR ih provodi uz našu podršku.
- **Test opterećenja** s 40 istovremenih korisnika; cilj je odziv ekrana ispod 2 sekunde.
- **Kriterij prihvaćanja:** svi UAT scenariji izvedeni, bez otvorenih kritičnih i visokih nedostataka; srednji i niski imaju dogovoren rok ispravka.

### 6.2 Edukacija

| Ciljna skupina | Oblik | Trajanje |
| --- | --- | --- |
| HR administratori | uživo, u testnom okruženju, po modulu | 4 sata po fazi |
| Rukovoditelji (oko 80) | online (Teams), 3 termina po fazi, sa snimkom | 60–90 minuta |
| Direktori i članovi Uprave | kratka prezentacija odobravanja i izvještaja | 45 minuta |

Isporučujemo korisničke upute na hrvatskom po ulozi, kratke video upute za unos i odobravanje te administratorski priručnik za HR.

### 6.3 Produkcijsko puštanje

- Plan prelaska s odgovornima i terminima, dogovoren tjedan dana prije puštanja.
- Konačna migracija i usporedba kontrolnih zbrojeva sa starim sustavom, uz potvrdu HR-a.
- Provjera nakon puštanja (prijava, prava, ključni tijekovi) i odluka HR-a o početku korištenja.
- Za stimulacije i kvartalnice paralelni rad starog i novog sustava jedno obračunsko razdoblje.
- Plan povratka na prethodno stanje u slučaju kritičnog problema.

### 6.4 Stabilizacija

Nakon svakog puštanja 4 tjedna pojačane podrške: dnevna provjera u prvom tjednu, prioritetno rješavanje prijava, prisutnost tima u prvim danima ciklusa i tjedni izvještaj HR-u. Zatim projekt prelazi na redovno održavanje (tč. 9).

## 7. Projektni tim, uloge i relevantne reference

Na projektu radi tim od 8 osoba; u F1 je angažman veći zbog roka od 20 radnih dana, a od F2 se smanjuje.

| Uloga | Odgovornost | Angažman F1 | Angažman F2–F4 | Ime |
| --- | --- | --- | --- | --- |
| Voditelj projekta | plan, rokovi, rizici, statusni sastanci s vlasnikom proizvoda | 50 % | 25 % | \[upisati\] |
| Poslovni analitičar | pravila, validacije, UAT scenariji, upute, edukacija | 100 % | 50 % | \[upisati\] |
| Tehnički voditelj (Laravel) | arhitektura, sigurnost, Entra ID, pregled koda, migracija | 100 % | 50 % | \[upisati\] |
| Laravel/PHP full-stack razvojni inženjer (3) | moduli, obrasci, izvještaji, uvozi i izvozi | 3 × 100 % | 2 × 100 % | \[upisati\] |
| QA inženjer | testni planovi, automatski testovi izračuna, regresija | 100 % | 50 % | \[upisati\] |
| DevOps inženjer | okruženja, CI/CD, backup, nadzor | 20 % | 10 % | \[upisati\] |

Reference:

| Naručitelj | Rješenje | Razdoblje | Kontakt |
| --- | --- | --- | --- |
| Končar D&ST | Intranet (Laravel, MySQL): dnevna sinkronizacija HR exporta s organizacijskom strukturom i nadređenima (oko 940 zaposlenika) preko API-ja, obavijesti preko Microsoft 365, workflow inicijativa s rokovima i podsjetnicima, prijava nepravilnosti, push obavijesti | od 2024., u radu i održavanju | \[upisati\] |
| \[upisati\] | \[HR / workflow odobravanja / obračun varijabilnih primanja\] | \[upisati\] | \[upisati\] |
| \[upisati\] | \[upisati\] | \[upisati\] | \[upisati\] |

## 8. Komercijalni model (svi iznosi bez PDV-a)

Jednokratna cijena implementacije je 114.300,00 EUR za 254 čovjek-dana po jedinstvenoj dnevnoj cijeni od 450,00 EUR; periodično održavanje je 1.200,00 EUR mjesečno, uz infrastrukturu koju Naručitelj plaća izravno ili kod Ponuditelja.

### 8.1 Jednokratni troškovi po modulu i zajedničkim komponentama

| Stavka | Čovjek-dana | Iznos (EUR) |
| --- | --- | --- |
| **Zajedničke komponente** | **88** | **39.600,00** |
| Analiza i dizajn (radionice, pravila, prototip ekrana) | 12 | 5.400,00 |
| Platforma: prijava, uloge i nadležnost, audit, razdoblja, okruženja | 18 | 8.100,00 |
| Master podaci, uvozi, org. struktura iz HR exporta | 14 | 6.300,00 |
| Administracija rukovoditelja i linija odobravanja | 8 | 3.600,00 |
| Workflow s konfigurabilnim linijama odobravanja (do 4 razine), budžeti i preraspodjele | 19 | 8.550,00 |
| Obavijesti i podsjetnici | 7 | 3.150,00 |
| Okvir izvještaja i dashboarda, Excel izvozi | 10 | 4.500,00 |
| **Poslovni moduli** | **92** | **41.400,00** |
| Godišnje nagrađivanje | 24 | 10.800,00 |
| Godišnje napredovanje (3 obrasca) | 34 | 15.300,00 |
| Mjesečne stimulacije | 16 | 7.200,00 |
| Kvartalne nagrade | 18 | 8.100,00 |
| **Provedba** | **74** | **33.300,00** |
| Migracija iz postojeće aplikacije | 8 | 3.600,00 |
| Testiranje i osiguranje kvalitete | 22 | 9.900,00 |
| UAT podrška, edukacija, dokumentacija | 14 | 6.300,00 |
| Puštanja i stabilizacija (4 faze) | 12 | 5.400,00 |
| Upravljanje projektom | 18 | 8.100,00 |
| **Ukupno** | **254** | **114.300,00** |

Po fazama:

| Faza | Opseg | Čovjek-dana | Iznos (EUR) |
| --- | --- | --- | --- |
| F1 | platforma i zajedničke komponente, godišnje nagrađivanje | 115 | 51.750,00 |
| F2 | godišnje napredovanje, budžeti po razinama i preraspodjele | 64 | 28.800,00 |
| F3 | mjesečne stimulacije, migracija | 36 | 16.200,00 |
| F4 | kvartalne nagrade, uvoz prisutnosti, migracija | 39 | 17.550,00 |
| Ukupno |  | 254 | 114.300,00 |

Cijena uključuje upravljanje projektom, testiranje, dokumentaciju, edukaciju iz tč. 6 i jamstvo od 6 mjeseci od puštanja svake faze (besplatan ispravak nedostataka u odnosu na prihvaćenu specifikaciju). Plaćanje: 20 % po potpisu ugovora, ostatak po zapisničkom prihvaćanju svake faze, razmjerno iznosu faze.

### 8.2 Periodični troškovi

| Stavka | Iznos (EUR) | Napomena |
| --- | --- | --- |
| Održavanje i podrška (SLA Standard, tč. 9) | 1.200,00 mjesečno | od 1. 12. 2026.; uključuje do 8 sati podrške i manjih izmjena mjesečno, sigurnosne zakrpe i nadogradnje |
| Azure infrastruktura (test + produkcija) | procjena 150–300 mjesečno | Naručitelj plaća Microsoftu prema potrošnji |
| Alternativa A: hosting kod Ponuditelja | 450,00 mjesečno | uključuje poslužitelje i backup; zamjenjuje prethodnu stavku |

Nema licenci po korisniku ni godišnjih licencnih naknada.

### 8.3 Opcionalni troškovi

| Stavka | Iznos (EUR) |
| --- | --- |
| Dnevna automatska sinkronizacija org. strukture i nadređenih iz HR exporta | 1.350,00 |
| SLA Premium (pojačana podrška u rokovima ciklusa, do 16 sati mjesečno) | +600,00 mjesečno |
| Dodatni razvoj i izmjene izvan opsega | 60,00 po satu |
| Automatska integracija s HRNET-om / SAP-om | procjena 3.600,00–6.750,00, nakon analize |
| Vanjski penetracijski test prije produkcije | 4.000,00 |
| Instalacija u on-premise okruženju (alternativa B) | 2.250,00 |
| Dodatni termin edukacije (do 4 sata) | 450,00 |
| Prijenos isključivih imovinskih autorskih prava na izvorni kod | 17.145,00 |

### 8.4 Valjanost i početak

Ponuda vrijedi 60 dana, do Nov 27, 2026. Pretpostavljeni početak projekta je Oct 5, 2026; svi ciljni rokovi iz zahtjeva su izvedivi uz preduvjete iz tč. 4. Svaki tjedan kašnjenja početka pomiče F1 za tjedan i ugrožava rok od 1. 11. 2026.

## 9. SLA, održavanje, podrška, nadogradnje i sigurnosne zakrpe

Podrška radi radnim danom od 8 do 16 sati (portal i e-mail, za kritične incidente i telefon), uz ciljanu dostupnost produkcije od 99,5 % mjesečno, izvan najavljenih održavanja i ispada pružatelja infrastrukture.

| Prioritet | Opis | Vrijeme reakcije | Rješenje ili zaobilazno rješenje |
| --- | --- | --- | --- |
| P1 – kritično | aplikacija nedostupna ili onemogućen ključni proces (unos, odobravanje, izvoz) u roku ciklusa | 2 radna sata | 8 radnih sati |
| P2 – visoko | bitna funkcija ne radi, postoji zaobilazni način | 4 radna sata | 2 radna dana |
| P3 – srednje | nedostatak bez utjecaja na rokove ciklusa | 1 radni dan | 10 radnih dana |
| P4 – nisko / upit | pitanje, kozmetički nedostatak, prijedlog | 2 radna dana | u sljedećem izdanju |

Eskalacija: P1 odmah voditelju projekta, a ako nije riješen u 4 sata, tehničkom voditelju i vlasniku proizvoda kod Naručitelja.

Održavanje obuhvaća:

- **Sigurnosne zakrpe:** zakrpe PHP-a, Laravela i paketa mjesečno; kritične ranjivosti u 3 radna dana, visoke u 10 radnih dana.
- **Nadogradnje:** prelazak na novu glavnu verziju Laravela i podržanu verziju PHP-a prije isteka sigurnosne podrške (Laravel daje 2 godine sigurnosnih zakrpa po verziji); funkcionalna izdanja do jednom kvartalno.
- **Proces izdanja:** svako izdanje prvo u testno okruženje, u produkciju uz odobrenje HR-a, izvan radnog vremena i uz najavu 3 radna dana ranije; nikad u zadnjim danima ciklusa.
- **Nadzor:** dostupnost, greške i uspješnost backupa, s mjesečnim izvještajem o prijavama i dostupnosti.
- **Godišnja priprema ciklusa:** podrška HR-u pri otvaranju ciklusa napredovanja i nagrađivanja, unutar uključenih sati.

## 10. Pretpostavke, ograničenja, isključenja iz opsega i rizici

Cijena i rokovi vrijede uz pretpostavke niže; najveći rizik je kratak rok F1, koji smanjujemo proširenim timom i zamrzavanjem opsega F1 nakon prvog tjedna.

### 10.1 Odgovori na teme iz tč. 9 zahtjeva

| Tema | Pretpostavka i predloženo rješenje |
| --- | --- |
| Linije odobravanja | Prema dijagramima toka Naručitelja: rukovoditelj → dodatni odobravatelj(i) za određene odjele (u proizvodnji SET dvije razine) → HR (samo napredovanje i nagrađivanje, formalna provjera) → odobravatelj najviše razine. HR postavlja razine i dodatne odobravatelje po odjelu. Odbijanje na bilo kojoj razini vraća prijedlog rukovoditelju na doradu, uz e-mail rukovoditelju i prethodnim odobravateljima, a kod najviše razine i HR administratorima. Zamjenski odobravatelj ili HR iznimno odobrenje uz audit. |
| Godišnje nagrađivanje | Podržavamo i strogo pojedinačno i masovno odobravanje; uključuje se po modulu, zadano pojedinačno kako traži specifikacija. |
| HRNET | Datotečni izvoz (Excel ili CSV) po modulu s obveznim stupcima iz specifikacije, validacijom prije izvoza (nedostaje OIB ili SAP šifra, iznos nije odobren) i zapisom izvoza; točan format, kodnu stranicu i razdjelnik potvrđuje Naručitelj primjerom datoteke. |
| Autentikacija i hosting | Entra ID SSO s MFA-om; preporuka Azure pretplata Naručitelja u EU regiji, uz alternative hostinga kod Ponuditelja ili on-premise (tč. 2). Mrežni preduvjeti: HTTPS pristup aplikaciji i izlaz prema Microsoft 365. |
| Sigurnost | Backup 35 dana + dugoročno do 10 godina, RPO 15 minuta, RTO 4 radna sata; logovi prijava i audit; privilegirani pristup samo imenovanim osobama, s MFA-om i zapisom. |
| Migracija | Zaposlenici, rukovoditelji, linije, budžeti i povijest stimulacija i kvartalnica iz postojeće baze; probna migracija, usporedba kontrolnih zbrojeva, potvrda HR-a. |
| SLA | Radnim danom 8–16 h, četiri prioriteta i eskalacija iz tč. 9; pojačana podrška u rokovima ciklusa kao opcija. |

### 10.2 Pretpostavke

- Ugovor se potpisuje do 2. 10. 2026., rad počinje 5. 10. 2026., a preduvjeti iz tč. 4 ispunjavaju se u navedenim rokovima.
- Osnova opsega su specifikacija „Software\_final“ (23. 9. 2026.), obrasci OB-0493, OB-0494, OB-0495 (13. 3. 2026.), Obrazac za godišnju nagradu (10. 2. 2026.) i dijagrami toka odobravanja od 1. 10. 2026.; izmjene nakon analize u F1 rješavaju se zahtjevom za izmjenom. Manje korekcije koje Naručitelj najavi tijekom izrade (do 3 čovjek-dana po fazi) uključene su u cijenu.
- Svi korisnici imaju poslovni Microsoft 365 račun u Entra ID-u Naručitelja.
- Do 150 korisnika i 40 istovremenih; do 2.000 zaposlenika izvršitelja u master podacima.
- Sučelje je na hrvatskom jeziku; iznosi su u EUR bruto, zaokruženi na cente (npr. 1.040,625 → 1.040,63).
- Za proturječja u dokumentaciji primjenjujemo pretpostavke iz tč. 11.

### 10.3 Ograničenja

- Integracija s HRNET-om je datotečna; automatski prijenos nije u osnovnom opsegu.
- Obavijesti ovise o dostupnosti Microsoft 365 i pravilima filtriranja pošte Naručitelja.
- Dostupnost u Azure modelu ograničena je SLA-om Microsofta za korištene servise.

### 10.4 Isključenja iz opsega

- Izmjene na HRNET-u, SAP-u i drugim sustavima Naručitelja.
- Čišćenje i ručna dopuna podataka (radi HR, uz naše predloške i provjere).
- Migracija povijesnih napredovanja i godišnjih nagrada iz Word obrazaca.
- Troškovi Azurea, poslužitelja i licenci Microsoft 365.
- Stavke „nije podržano“ iz tč. 3 i opcije iz tč. 8.3 ako nisu naručene.

### 10.5 Rizici

| Rizik | Utjecaj | Mjera |
| --- | --- | --- |
| Kratak rok F1 (20 radnih dana) | kašnjenje prvog ciklusa nagrađivanja | prošireni tim, zamrzavanje opsega nakon 1. tjedna, dnevna dostupnost vlasnika proizvoda, dashboardi za Upravu u stabilizaciji |
| Kašnjenje potpisa, Entra ID suglasnosti ili pretplate | nema okruženja za UAT | zahtjevi odmah po potpisu; privremeno testno okruženje kod Ponuditelja |
| Nepotpuni master podaci (složenost, pozicija, plaća) | pogrešni izračuni i prava | org. struktura iz HR exporta, validacija pri uvozu, potvrda HR-a prije puštanja |
| Neusuglašena pravila u dokumentaciji | dorada nakon UAT-a | odluke o pitanjima iz tč. 11 do kraja analize F1, parametrizacija pravila |
| Preklapanje UAT-a s aktivnim ciklusima HR-a | spor ili nepotpun UAT | unaprijed dogovoreni termini i pripremljeni scenariji |
| Promjena pravilnika tijekom projekta | dodatni rad, pomak rokova | parametri koje HR mijenja sam; veće izmjene kroz zahtjev za izmjenom |

## 11. Pitanja, odstupanja i alternativna rješenja

Dostavljeni dokumenti razilaze se u nekoliko pravila; za svako navodimo pretpostavku na kojoj se temelji cijena, a sva su pravila u rješenju parametri, pa drugačija odluka Naručitelja ne mijenja cijenu.

### 11.1 Pitanja i pretpostavke

| # | Pitanje | Pretpostavka u ponudi |
| --- | --- | --- |
| 1 | Stimulacije i kvartalnice: dijagram vraća odbijeni prijedlog na doradu, a specifikacija (tč. 2.4 i 3.8) doradu u tim modulima isključuje. Vraća se samo odbijeni zaposlenik ili cijeli prijedlog odjela? | samo odbijeni zaposlenici; ostali ostaju odobreni |
| 2 | Nakon dorade prolazi li prijedlog ponovno cijelu liniju ili samo od razine koja ga je odbila? | ponovno cijelu liniju; prethodni odobravatelji dobivaju obavijest |
| 3 | Tko je odobravatelj najviše razine po modulu i odjelu (direktor ili član Uprave)? | određuje se po rukovoditelju; u napredovanju uvijek član Uprave |
| 4 | Koji odjeli osim proizvodnje SET imaju dodatnog odobravatelja i tko su? | HR postavlja po odjelu u administraciji |
| 5 | Masovno odobravanje godišnje nagrade: tč. 5.3 ga isključuje, scenarij testiranja ga traži. | podržano, zadano isključeno |
| 6 | Član Uprave predlaže za direktno podređene – tko odobrava takav prijedlog? | predsjednik Uprave ili HR iznimno odobrenje |
| 7 | Obrazac godišnje nagrade nudi ocjene 1–4, specifikacija 2–4 (doprinos timu 3–4). | prema specifikaciji |
| 8 | Disciplinsku mjeru u kvartalnicama unosi samo HR (tč. 3.5 i 13) ili i rukovoditelj (tč. 3.10)? | samo HR |
| 9 | Obrazloženje stimulacije: za svakog zaposlenika (tč. 2.3) ili samo iznad 0 % (tč. 2.6)? | samo iznad 0 % |
| 10 | Kako se primjenjuje „pravilo 3 %“ iz scenarija testiranja napredovanja? | parametar ciklusa (postotak budžeta) |
| 11 | Granica za Junior napredovanje je 12–24 mjeseca – postavlja li je HR po ciklusu? | da, parametar |
| 12 | Računa li se blokada Pripravnika i Juniora od datuma zaposlenja ili početka pozicije? | od datuma zaposlenja |
| 13 | Na koji dan i za koji skup zaposlenika vrijede ograničenja 50 % / 75 %? | aktivni izvršitelji na dan otvaranja ciklusa |
| 14 | Konačni format uvoza u HRNET po modulu (stupci, tip datoteke, kodna stranica) i postoji li API? | Excel ili CSV prema primjeru |
| 15 | Koliko dugo se čuvaju podaci i audit zapisi, i vrijedi li isti rok za deaktivirane zaposlenike? | 10 godina, isti rok |
| 16 | Zamjenski odobravatelji: automatska delegacija ili samo HR iznimno odobrenje? | zamjenik po rukovoditelju + HR iznimka |
| 17 | Naziv OB-0495: „Standardna → Napredna“ (obrazac) ili „→ Senior“ (naziv datoteke)? | Napredna; Senior je naziv nakon 12 mjeseci |

### 11.2 Odstupanja od zahtjeva

- **Potpisi i suglasnosti na obrascima** (rukovoditelj, direktor sektora, HR, Uprava) zamjenjuju se odobrenjima u workflowu s audit zapisom; elektronički potpis nije u ponudi.
- **Istovremena isporuka svih modula** do 1. 11. 2026. nije izvediva; nudimo faznu isporuku prema prioritetima Naručitelja, a svi rokovi po modulu se poštuju.

### 11.3 Alternativna rješenja

- **Automatska organizacijska struktura:** umjesto ručnog održavanja rukovoditelja i hijerarhije, dnevno preuzimanje iz HR exporta koji Končar već šalje intranetu; HR i dalje ručno određuje linije odobravanja i iznimke (opcija u tč. 8.3).
- **Hosting kod Ponuditelja** na infrastrukturi na kojoj radi intranet Končar D&ST, ako Naručitelj ne želi otvarati Azure pretplatu (tč. 2 i 8.2).
- **Automatska integracija s HRNET-om**, ako HRNET nudi API ili uvoz iz dogovorene mape (opcija u tč. 8.3).
