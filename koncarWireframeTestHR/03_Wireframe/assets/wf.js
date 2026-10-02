/* D&ST Grow & Reward – wireframe: ljuska aplikacije i osnovne interakcije za prezentaciju.
   Nema logike ni pohrane podataka. Jedino mjesto za popis ekrana, izbornik i uloge. */
(function () {
  'use strict';

  // ---------- popis ekrana (redoslijed = redoslijed listanja) ----------
  var PHASES = {
    A: 'A. Temelj aplikacije (spreman s Fazom 1, do 1. 11. 2026.)',
    F1: 'Faza 1 – Godišnje nagrađivanje (rok 1. 11. 2026.)',
    F2: 'Faza 2 – Godišnje napredovanje (rok 1. 2. 2027.)',
    F3: 'Faza 3 – Mjesečne stimulacije (rok 1. 3. 2027.)',
    F4: 'Faza 4 – Kvartalne nagrade (rok 1. 4. 2027.)'
  };
  var MODULES = {
    A: '', F1: 'Godišnje nagrađivanje', F2: 'Godišnje napredovanje', F3: 'Mjesečne stimulacije', F4: 'Kvartalne nagrade'
  };

  var SCREENS = [
    { id: 'A1', phase: 'A', file: 'A01-prijava.html', title: 'Prijava', role: null, desc: 'Prijava Microsoft računom, bez lozinke u aplikaciji.' },
    { id: 'A2', phase: 'A', file: 'A02-okvir-aplikacije.html', title: 'Okvir aplikacije i izbornik po ulozi', role: 'rukovoditelj', desc: 'Lijevi izbornik prema ulozi i modulima, podaci o korisniku i ulozi; tko vidi koju stavku.' },
    { id: 'A3', phase: 'A', file: 'A03-pocetna.html', title: 'Početna', role: 'rukovoditelj', desc: 'Po ulozi: što čeka moju radnju, aktivni ciklusi i rokovi, stanje budžeta.' },
    { id: 'A4', phase: 'A', file: 'A04-zaposlenici.html', title: 'Zaposlenici', role: 'hr', desc: 'Popis s filtrima po odjelu, sektoru, rukovoditelju i statusu.' },
    { id: 'A5', phase: 'A', file: 'A05-zaposlenik-detalj.html', title: 'Zaposlenik – detalj', role: 'hr', menu: 'A4', desc: 'Osobni podaci, zaposlenje, organizacija, radno mjesto, plaća; povijest promjena; deaktivacija.' },
    { id: 'A6', phase: 'A', file: 'A06-masovni-uvoz.html', title: 'Masovni uvoz zaposlenika', role: 'hr', desc: 'Excel: učitavanje → pregled po retku s greškama → potvrda; samo za buduće obračune.' },
    { id: 'A7', phase: 'A', file: 'A07-linije-odobravanja.html', title: 'Rukovoditelji i linije odobravanja', role: 'hr', desc: 'Po godini: rukovoditelj, jedinica, broj zaposlenika, budžet stimulacija, 1.–3. odobravatelj, dodatni odobravatelji.' },
    { id: 'A8', phase: 'A', file: 'A08-ciklusi-razdoblja.html', title: 'Ciklusi i razdoblja', role: 'hr', desc: 'Otvaranje, rokovi, zaključavanje i otključavanje mjeseca, kvartala i ciklusa.' },
    { id: 'A9', phase: 'A', file: 'A09-budzeti.html', title: 'Budžeti', role: 'hr', desc: 'Dodijeljeno, rezervirano, iskorišteno, raspoloživo; preraspodjela uz evidenciju.' },
    { id: 'A10', phase: 'A', file: 'A10-obavijesti.html', title: 'Obavijesti', role: 'hr', desc: 'Predlošci i pravila slanja po modulu; dnevnik poslanih poruka.' },
    { id: 'A11', phase: 'A', file: 'A11-trag-izmjena.html', title: 'Trag izmjena', role: 'hr', desc: 'Tko, kada, što; vidi ga samo HR; popis uvoza i izvoza.' },
    { id: 'A12', phase: 'A', file: 'A12-korisnici-uloge-sifrarnici.html', title: 'Korisnici, uloge i šifrarnici', role: 'hr', desc: 'Administracija korisnika, uloga i šifrarnika.' },

    { id: 'F1.1', phase: 'F1', file: 'F1-01-postavke-ciklusa.html', title: 'Postavke ciklusa', role: 'hr', desc: 'Budžeti (isto pravilo ili korekcije), faktori razina 1–6, limiti po stupnju složenosti, razdoblje unosa.' },
    { id: 'F1.2', phase: 'F1', file: 'F1-02-moji-zaposlenici.html', title: 'Moji zaposlenici', role: 'rukovoditelj', desc: 'Budžet odjela i status po zaposleniku; bez unesene razine zaposlenik nije predložen.' },
    { id: 'F1.3', phase: 'F1', file: 'F1-03-obrazac-procjene.html', title: 'Obrazac za procjenu – godišnja nagrada', role: 'rukovoditelj', menu: 'F1.2', desc: 'Zaglavlje se puni samo, tri kriterija, primjeri, izračun uživo, upozorenja i blokade.' },
    { id: 'F1.4', phase: 'F1', file: 'F1-04-na-odobrenju.html', title: 'Na odobrenju', role: 'direktor', desc: 'Popis prijedloga koji čekaju moju odluku.' },
    { id: 'F1.4b', phase: 'F1', file: 'F1-04b-detalj-prijedloga.html', title: 'Detalj prijedloga', role: 'direktor', menu: 'F1.4', desc: 'Cijeli obrazac, obrazloženja, iznos, HR napomene, povijest statusa; Odobri ili Odbaci uz razlog.' },
    { id: 'F1.5', phase: 'F1', file: 'F1-05-hr-provjera.html', title: 'HR provjera', role: 'hr', desc: 'Kao detalj odobravatelja, plus vraćanje na doradu s razlozima i HR iznimke.' },
    { id: 'F1.6', phase: 'F1', file: 'F1-06-budzet-pregled.html', title: 'Budžet i pregled', role: 'clan', desc: 'Profitni centar i odjeli: tko je koliko iskoristio i za koga, usporedba, neiskorišteno, preraspodjele, kalibracija.' },
    { id: 'F1.7', phase: 'F1', file: 'F1-07-izvjestaji-izvoz.html', title: 'Izvještaji i izvoz', role: 'hr', desc: 'Nagrađeni zaposlenici, raspodjela po jedinicama, po odjelu broj i % nagrađenih; Excel i HRNET.' },

    { id: 'F2.1', phase: 'F2', file: 'F2-01-postavke-ciklusa.html', title: 'Postavke ciklusa', role: 'hr', desc: 'Budžet i postotak, apoeni, pravilo 50 %/75 %, pravilo 3 %, granica za Junior, ključna ekspertna mjesta.' },
    { id: 'F2.2', phase: 'F2', file: 'F2-02-moji-zaposlenici.html', title: 'Moji zaposlenici', role: 'rukovoditelj', desc: 'Aktivni zaposlenici; pripravnici i Juniori u prvih 12 mjeseci sivo; izbor vrste napredovanja.' },
    { id: 'F2.3', phase: 'F2', file: 'F2-03-obrazac-horizontalno.html', title: 'Obrazac – horizontalno napredovanje', role: 'rukovoditelj', menu: 'F2.2', desc: 'Povećanje unutar platnog razreda: DA/NE uvjeti, 4 kriterija 1–4, eliminacija, primjeri, apoen.' },
    { id: 'F2.4', phase: 'F2', file: 'F2-04-obrazac-junior-standardna.html', title: 'Obrazac – Junior → Standardna', role: 'rukovoditelj', menu: 'F2.2', desc: 'Prelazak iz Početne u Standardnu poziciju; uz to postojeći i predloženi platni razred.' },
    { id: 'F2.5', phase: 'F2', file: 'F2-05-obrazac-standardna-napredna.html', title: 'Obrazac – Standardna → Napredna', role: 'rukovoditelj', menu: 'F2.2', desc: 'Samo ključna ekspertna mjesta; stručne razine; pravilo Senior.' },
    { id: 'F2.6', phase: 'F2', file: 'F2-06-hr-provjera.html', title: 'HR provjera', role: 'hr', desc: 'Vraćanje na doradu s razlozima; oznaka „ne smije biti predložen“.' },
    { id: 'F2.7', phase: 'F2', file: 'F2-07-odobravanje.html', title: 'Na odobrenju', role: 'clan', desc: 'Pojedinačno odobravanje uz vremensku crtu statusa; član Uprave je zadnja razina.' },
    { id: 'F2.8', phase: 'F2', file: 'F2-08-primjena-nove-place.html', title: 'Primjena nove plaće', role: 'hr', desc: 'Pregled izračuna → HR potvrda → upis s datumom 1. 4. → izvoz za HRNET.' },
    { id: 'F2.9', phase: 'F2', file: 'F2-09-izvjestaj.html', title: 'Izvještaj napredovanja po odjelu', role: 'hr', desc: 'Pokazatelji po odjelu; izvoz u Excel.' },
    { id: 'F2.10', phase: 'F2', file: 'F2-10-budzet-pregled.html', title: 'Budžet napredovanja', role: 'clan', desc: 'Član Uprave: dodijeljeno, rezervirano, iskorišteno, raspoloživo po jedinicama; tko je iskoristio i za koga.' },

    { id: 'F3.1', phase: 'F3', file: 'F3-01-unos-stimulacija.html', title: 'Unos stimulacija', role: 'rukovoditelj', desc: 'Preuzima postojeći ekran; preostali godišnji fond, obrazloženje iznad 0 %, blokada prekoračenja.' },
    { id: 'F3.2', phase: 'F3', file: 'F3-02-odobrenje-stimulacija.html', title: 'Odobrenje stimulacija', role: 'direktor', desc: 'Masovno Odobri, pojedinačno Odbaci uz napomenu; odbijeni iznos vraća se u fond.' },
    { id: 'F3.3', phase: 'F3', file: 'F3-03-fondovi.html', title: 'Fondovi stimulacija', role: 'hr', desc: 'Godišnji fond po odjelu 1. 4. – 31. 3.; korekcija kod prestanka pripravničkog statusa.' },
    { id: 'F3.4', phase: 'F3', file: 'F3-04-izvoz-izvjestaji.html', title: 'Izvoz i izvještaji', role: 'hr', desc: 'Izvoz za HRNET po mjesecu; izvještaji po odobravatelju, rukovoditelju, zaposleniku, razdoblju.' },

    { id: 'F4.1', phase: 'F4', file: 'F4-01-postotak-uprave.html', title: 'Postotak Uprave', role: 'hr', desc: 'Postotak bruto plaće po kvartalu, isti za sve zaposlenike.' },
    { id: 'F4.2', phase: 'F4', file: 'F4-02-uvoz-prisutnosti.html', title: 'Uvoz prisutnosti', role: 'hr', desc: 'CSV po godini i kvartalu; status retka; ponovni uvoz do zaključavanja.' },
    { id: 'F4.3', phase: 'F4', file: 'F4-03-disciplinske-mjere.html', title: 'Disciplinske mjere', role: 'hr', desc: 'Unos po zaposleniku i kvartalu; nagrada tada 0 EUR.' },
    { id: 'F4.4', phase: 'F4', file: 'F4-04-unos-kvartalnih.html', title: 'Unos kvartalnih nagrada', role: 'rukovoditelj', desc: 'Preuzima postojeći ekran; kriteriji zadano 100 %, ponder i doprinos, obrazloženje ispod 100 %.' },
    { id: 'F4.5', phase: 'F4', file: 'F4-05-odobrenje-kvartalnih.html', title: 'Odobrenje kvartalnih nagrada', role: 'direktor', desc: 'Masovno Odobri, pojedinačno Odbaci uz napomenu.' },
    { id: 'F4.6', phase: 'F4', file: 'F4-06-izvoz-izvjestaji.html', title: 'Izvoz i izvještaji', role: 'hr', desc: 'Izvoz za HRNET po kvartalu; izvještaji u Excel.' }
  ];

  // ---------- uloge i izmišljeni korisnici ----------
  var ROLES = {
    rukovoditelj: { label: 'Rukovoditelj', user: 'Ivana Horvat', unit: 'Odjel Projekt tehnologije' },
    dodatni: { label: 'Dodatni odobravatelj', user: 'Luka Knežević', unit: 'Proizvodnja SET' },
    direktor: { label: 'Direktor', user: 'Marko Kovačević', unit: 'Sektor Tehnologija' },
    clan: { label: 'Član Uprave', user: 'Ana Babić', unit: 'Profitni centri DT/ST i SET' },
    predsjednik: { label: 'Predsjednik Uprave', user: 'Tomislav Marić', unit: 'Cijela tvrtka' },
    hr: { label: 'HR administrator', user: 'Petra Novak', unit: 'Ljudski potencijali' }
  };
  var ROLE_ORDER = ['rukovoditelj', 'dodatni', 'direktor', 'clan', 'predsjednik', 'hr'];
  var ALL = ROLE_ORDER;

  // ---------- izbornik aplikacije ----------
  var MENU = [
    { group: '', items: [{ label: 'Početna', screen: 'A3', roles: ALL }] },
    { group: 'Godišnje nagrađivanje', items: [
      { label: 'Moji zaposlenici', screen: 'F1.2', roles: ['rukovoditelj', 'clan'], p: { clan: 'P7' } },
      { label: 'Na odobrenju', screen: 'F1.4', roles: ['dodatni', 'direktor', 'clan'] },
      { label: 'HR provjera', screen: 'F1.5', roles: ['hr'] },
      { label: 'Budžet i pregled', screen: 'F1.6', roles: ['direktor', 'clan', 'predsjednik', 'hr'] },
      { label: 'Izvještaji i izvoz', screen: 'F1.7', roles: ALL },
      { label: 'Postavke ciklusa', screen: 'F1.1', roles: ['hr'] }
    ] },
    { group: 'Godišnje napredovanje', items: [
      { label: 'Moji zaposlenici', screen: 'F2.2', roles: ['rukovoditelj', 'clan'], p: { clan: 'P7' } },
      { label: 'Na odobrenju', screen: 'F2.7', roles: ['dodatni', 'clan'] },
      { label: 'HR provjera', screen: 'F2.6', roles: ['hr'] },
      { label: 'Budžet napredovanja', screen: 'F2.10', roles: ['clan', 'predsjednik', 'hr'] },
      { label: 'Primjena nove plaće', screen: 'F2.8', roles: ['hr'] },
      { label: 'Izvještaj po odjelu', screen: 'F2.9', roles: ALL },
      { label: 'Postavke ciklusa', screen: 'F2.1', roles: ['hr'] }
    ] },
    { group: 'Mjesečne stimulacije', items: [
      { label: 'Unos stimulacija', screen: 'F3.1', roles: ['rukovoditelj', 'clan'] },
      { label: 'Odobrenje stimulacija', screen: 'F3.2', roles: ['dodatni', 'direktor', 'clan', 'hr'] },
      { label: 'Fondovi', screen: 'F3.3', roles: ['hr'] },
      { label: 'Izvoz i izvještaji', screen: 'F3.4', roles: ALL }
    ] },
    { group: 'Kvartalne nagrade', items: [
      { label: 'Unos kvartalnih nagrada', screen: 'F4.4', roles: ['rukovoditelj', 'clan'] },
      { label: 'Odobrenje kvartalnih nagrada', screen: 'F4.5', roles: ['dodatni', 'direktor', 'clan', 'hr'] },
      { label: 'Postotak Uprave', screen: 'F4.1', roles: ['hr'] },
      { label: 'Uvoz prisutnosti', screen: 'F4.2', roles: ['hr'] },
      { label: 'Disciplinske mjere', screen: 'F4.3', roles: ['hr'] },
      { label: 'Izvoz i izvještaji', screen: 'F4.6', roles: ALL }
    ] },
    { group: 'Administracija', items: [
      { label: 'Zaposlenici', screen: 'A4', roles: ['hr', 'predsjednik'] },
      { label: 'Masovni uvoz zaposlenika', screen: 'A6', roles: ['hr'] },
      { label: 'Rukovoditelji i linije odobravanja', screen: 'A7', roles: ['hr'] },
      { label: 'Ciklusi i razdoblja', screen: 'A8', roles: ['hr'] },
      { label: 'Budžeti', screen: 'A9', roles: ['hr'] },
      { label: 'Obavijesti', screen: 'A10', roles: ['hr'] },
      { label: 'Trag izmjena', screen: 'A11', roles: ['hr'] },
      { label: 'Korisnici, uloge i šifrarnici', screen: 'A12', roles: ['hr'] }
    ] }
  ];

  // ---------- otvorena pitanja (P) i nova pitanja iz wireframea (N) – tekst za oblačić ----------
  var Q = {
    P1: 'Odbijanje kod stimulacija i kvartalnih – vraća li se samo odbijeni zaposlenik? Radimo: da, ostali ostaju odobreni.',
    P2: 'Nakon dorade – ponovno cijela linija ili od razine koja je odbila? Radimo: ponovno cijela linija.',
    P3: 'Tko je najviša razina po odjelu i modulu; postoji li kod napredovanja još zajednička odluka Uprave? Radimo: određuje se po rukovoditelju; u napredovanju je zadnji član Uprave.',
    P4: 'Koji odjeli osim proizvodnje SET imaju dodatnog odobravatelja? Radimo: HR ih upisuje po odjelu.',
    P5: 'Kad najviša razina odbije napredovanje ili nagradu, dodatni odobravatelj ne dobiva e-mail (u SET dobiva). Namjerno? Radimo: kako je u tablici obavijesti.',
    P6: 'Masovno odobravanje godišnje nagrade? Radimo: pojedinačno, uz mogućnost da se masovno uključi.',
    P7: 'Član Uprave kao predlagatelj – za koje izvršitelje i tko odobrava njegov prijedlog? Otvoreno.',
    P8: 'Potpisi na obrascima. Radimo: odobrenja u aplikaciji zamjenjuju potpise.',
    P9: 'HR izmjene nakon odobrenja. Radimo: kod napredovanja samo odluka Uprave, inače dogovor ili odluka nadležnih.',
    P10: 'Koji status ima prijedlog dok čeka dodatnog odobravatelja? Otvoreno.',
    P11: 'Prekoračenje budžeta kod nagrade – upozorenje ili blokada? Radimo: blokada, uz HR iznimku nakon odluke Uprave.',
    P12: 'Ocjene kod nagrade: obrazac opisuje 1–4, pravilo dopušta 2–4. Radimo: 2–4, doprinos timu 3–4.',
    P13: 'Koji limit vrijedi za I4 i I5 bez iznimnog učinka, što je „izniman učinak“ i „dopušteni raspon“? Otvoreno – utječe na izračun.',
    P14: 'Bira li rukovoditelj posebno „razinu nagrade“? Radimo: ne, razina se računa iz ocjena.',
    P15: 'Pravilo 3 % – što točno znači? Radimo: parametar ciklusa koji HR unosi prema odluci Uprave.',
    P16: 'Junior → Standardna: 12–24 mjeseca – tko određuje točan broj? Radimo: HR po ciklusu.',
    P17: 'Blokada 12 mjeseci – od datuma zaposlenja ili od dolaska na poziciju? Radimo: od datuma zaposlenja.',
    P18: 'Budžet napredovanja po odjelu. Radimo: uvijek i po odjelu.',
    P19: 'Postotak povećanja u obrascima. Radimo: sustav računa postotak iz iznosa.',
    P20: 'Standardna → Napredna: točno ili barem dvije ocjene 3 i dvije 4? Radimo: barem toliko.',
    P21: 'Doprinos timu – je li obavezan i vrijedi li ocjena 4 umjesto tražene „jedne razine 3“? Otvoreno.',
    P22: 'Eliminacija kod Standardna → Napredna. Radimo: nema posebnog kriterija, sigurnost i disciplina su među DA/NE uvjetima.',
    P23: 'Pozicije (Pripravnik, Junior, Standardna, Senior) i Početna/Napredna – kako uskladiti; za Senior trebaju potkategorija 3 ili 4 i datum odobrenja Uprave. Otvoreno.',
    P24: 'Naziv obrasca. Radimo: Standardna → Napredna; Senior je naziv nakon 12 mjeseci.',
    P25: 'Izvoz napredovanja – dodati status „Izvezeno za obračun“? Radimo: da.',
    P26: 'Obrazloženje stimulacije – za svakoga ili samo iznad 0 %? Radimo: samo iznad 0 %.',
    P27: 'Disciplinska mjera – samo HR ili i rukovoditelj? Radimo: samo HR.',
    P28: 'Neispravan OIB pri uvozu prisutnosti. Radimo: prikazuje se kao greška retka.',
    P29: 'Format izvoza za HRNET, izvoz godišnje nagrade, poseban izvoz za Upravu? Radimo: Excel i CSV.',
    P30: 'Odakle prvi put nova polja (pozicija, stupanj složenosti, platni razred, sektor…)? Radimo: HR dostavlja Excel.',
    P31: 'Koliko dugo se čuvaju podaci i trag izmjena, i vrijedi li isto za zaposlenike koji su otišli? Otvoreno.',
    N1: 'NOVO: Budžet „iznos i %“ – postotak čega? Wireframe pretpostavlja godišnju masu bruto plaća odjela.',
    N2: 'NOVO: Statusi godišnje nagrade dok je kod HR-a. Wireframe koristi „Poslano HR-u“ i „HR provjereno“ kao kod napredovanja, jer je HR od 1. 10. i u liniji nagrađivanja.',
    N3: 'NOVO: „Faktor uspjeha“ iz izbornika postojeće aplikacije nije opisan ni u jednom dokumentu – što je i treba li ga nova aplikacija?',
    N4: 'NOVO: Naziv HR radnje kojom prijedlog prolazi formalnu provjeru. Wireframe predlaže „Potvrdi provjeru“; u postojećoj aplikaciji ne postoji.',
    N5: 'NOVO: Može li se predati prijedlog nagrade s razinom 1 ili 2 (faktor 0)? Wireframe pretpostavlja da ne – sustav upozori i prijedlog se ne šalje.',
    // Temelj
    N10: 'NOVO: Kako radi korisnik s više uloga (npr. rukovoditelj koji je i dodatni odobravatelj)? Wireframe: izbornik je zbroj stavki svih uloga, zaglavlje navodi sve uloge, vlastiti prijedlog ne odobrava sam.',
    N11: 'NOVO: Što kad se prijavi Microsoft račun koji nije među korisnicima aplikacije? Wireframe: poruka bez pristupa i uputa da se obrati HR-u; korisnika dodaje HR.',
    N12: 'NOVO: Što s otvorenim prijedlozima kad se zaposlenik deaktivira? Wireframe: sustav upozori HR popisom otvorenih prijedloga i ne briše ih; HR ih rješava ručno.',
    N13: 'NOVO: Vidi li predsjednik Uprave bruto plaće u popisu zaposlenika? Specifikacija mu daje pregled svih zaposlenika, a plaće navodi samo za HR, rukovoditelje, direktore i članove Uprave. Wireframe: vidi, samo za čitanje.',
    N14: 'NOVO: Koje vrijednosti ima „status zaposlenja“? Wireframe: Aktivan i Neaktivan.',
    N15: 'NOVO: Što je „organizacijska jedinica“ u odnosu na sektor i odjel, i je li „odobravatelj“ zaseban podatak o zaposleniku? Wireframe: organizacijska jedinica je profitni centar; odobravatelj se izvodi iz linije rukovoditelja.',
    N16: 'NOVO: Tko smije otključati zaključano razdoblje i treba li razlog? Wireframe: samo HR, uz obaveznu napomenu u tragu izmjena.',
    N17: 'NOVO: Treba li uz preraspodjelu budžeta bilježiti datum i oznaku odluke? Wireframe: HR upisuje temelj, datum odluke i napomenu.',
    N18: 'NOVO: Smije li HR sam uređivati šifrarnike, uključujući razloge vraćanja i „ne smije biti predložen“? Wireframe: smije; popisi iz Specifikacije su zadani, „ostalo“ je uvijek dostupno.',
    N19: 'NOVO: Koja se polja smiju mijenjati masovnim uvozom i uvozi li se djelomično kad ima grešaka? Wireframe: plaća, platni razred, radno mjesto, pozicija i stupanj složenosti; uvoz samo bez grešaka.',
    // Faza 1
    N20: 'NOVO: Predaje li se godišnja nagrada pojedinačno (s obrasca) ili za sve spremljene prijedloge odjednom? Wireframe: pojedinačno; varijanta „odjednom“ prikazana je kao stanje na F1.2.',
    N21: 'NOVO: Što se događa nakon roka unosa i roka odobravanja? Wireframe: nakon roka unosa nema predaje, rok odobravanja je podsjetnik, HR može produžiti rokove.',
    N22: 'NOVO: Što znači korekcija budžeta po sektoru ili profitnom centru? Wireframe: drugo pravilo za sve odjele te jedinice; uža razina nadjačava širu.',
    N23: 'NOVO: Smije li HR mijenjati budžet, faktore i limite nakon otvaranja ciklusa? Wireframe: da, uz trag izmjena; budžet ne može pasti ispod rezerviranog i iskorištenog, odobreni prijedlozi se ne mijenjaju.',
    N24: 'NOVO: Mora li HR kod iznimki upisati osnovu odluke (tko i kada)? Wireframe: obavezno kod ručnog iznosa, iznimnog završnog odobrenja i korekcije; kod prekoračenja budžeta ne („bez posebne napomene“).',
    N25: 'NOVO: Odobrava li član Uprave preraspodjelu u aplikaciji ili izvan nje? Wireframe: izvan nje; HR evidentira iznos, jedinice, tko je odobrio i datum.',
    N26: 'NOVO: Kako izgleda kalibracija između profitnih centara u aplikaciji? Wireframe: HR unosi korekciju budžeta između PC prema odluci Uprave, tek nakon završnog odobrenja.',
    N27: 'NOVO: Izvoze li se za HRNET samo odobreni i neizvezeni prijedlozi; može li se izvoz ponoviti ili poništiti? Wireframe: samo odobreni i neizvezeni; ponavljanje nije prikazano.',
    N28: 'NOVO: Tko je u izvještajima „nagrađen“? Wireframe: zaposlenik s odobrenim ili izvezenim prijedlogom.',
    // Faza 2
    N30: 'NOVO: Odakle sustav zna probni rok i pripravnički staž koji se ne računaju u 12–24 mjeseca u Početnoj poziciji? Wireframe: HR ih evidentira u podacima o zaposleniku, sustav ih oduzima.',
    N31: 'NOVO: Računa li se spremljeni, a nepredani prijedlog napredovanja u udio 50 %/75 %? Wireframe: da, ali ne rezervira budžet.',
    N32: 'NOVO: Vidi li rukovoditelj budžet i udio predloženih na razini sektora i Društva? Wireframe: da, raspoloživo i udio na sve tri razine.',
    N33: 'NOVO: Pravilo „barem jedna ocjena 3“ – prolazi li i ocjena 4? Wireframe: da, vrijedi 3 ili viša.',
    N34: 'NOVO: Tko potvrđuje zadržanu uspješnost nakon 12 mjeseci za prijelaz u Senior? Wireframe: sustav podsjeća HR, HR potvrđuje.',
    N35: 'NOVO: Može li HR ukloniti oznaku „ne smije biti predložen“ i vidi li rukovoditelj razlog? Wireframe: HR može ukloniti uz trag izmjena; rukovoditelj vidi razlog.',
    N36: 'NOVO: Što ako se podaci o zaposleniku promijene između odobrenja i primjene nove plaće? Wireframe: primjena se zaustavlja dok HR ne pregleda i odluči.',
    N37: 'NOVO: „Povećanje broja zaposlenika u zadnjih godinu dana“ – u odnosu na koji datum? Wireframe: isti dan prije godinu dana.',
    N38: 'NOVO: Koga izvještaj napredovanja broji kao „promoviranog“? Wireframe: filtar statusa, zadano svi aktivni prijedlozi (spremljeni, u postupku, odobreni).',
    N39: 'NOVO: Kada se ciklus napredovanja zaključava za sve osim HR-a? Wireframe: kad je odlučen zadnji prijedlog i HR potvrdi zaključavanje.',
    // Faze 3 i 4
    N40: 'NOVO: Računa li korekciju fonda stimulacija (prestanak pripravničkog statusa) sustav ili je HR unosi ručno? Wireframe: HR je pokreće, sustav predlaže iznos.',
    N41: 'NOVO: Obuhvaća li izvoz stimulacija sve odjele u jednoj datoteci i samo zaposlenike iznad 0 %? Wireframe: da.',
    N42: 'NOVO: Je li „Maksimalni koeficijent“ s postojećeg ekrana Izvoz kvartalnice isto što i postotak Uprave? Vrijednosti na snimkama se ne slažu (70 i 100). Wireframe: isto je. Veza s N3.',
    N43: 'NOVO: Što ako se postotak Uprave promijeni nakon početka unosa? Wireframe: moguće do zaključavanja kvartala; iznosi se preračunaju, predani prijedlozi vraćaju se rukovoditeljima.',
    N44: 'NOVO: Što s retcima s greškom pri uvozu prisutnosti i treba li zasebna potvrda uvoza? Wireframe: ispravni retci primjenjuju se odmah, retci s greškom ne; nema zasebne potvrde.',
    N45: 'NOVO: Što točno šalje „Pošalji mail obavijest“ s postojećeg ekrana Import prisutnosti? Wireframe: obavijest rukovoditeljima da je prisutnost uvezena.',
    N46: 'NOVO: Što ako se disciplinska mjera unese nakon predaje ili odobrenja i može li se ukloniti? Wireframe: iznos postaje 0,00 €, prijedlog se vraća rukovoditelju; ispravak kroz Uredi, bez brisanja.',
    N47: 'NOVO: Što ako za zaposlenika nije uvezena prisutnost? Wireframe: nagrada se ne može izračunati i predaja je blokirana.',
    N48: 'NOVO: Ulaze li u HRNET izvoz kvartalnih nagrada i zaposlenici s konačnim iznosom 0,00 €? Wireframe: da.',
    N49: 'NOVO: Treba li HR-ovo iznimno završno odobrenje obaveznu napomenu (tko je i što dogovorio)? Wireframe: da.',
    N50: 'NOVO: Vrijedi li za proizvodnju SET kod stimulacija i kvartalnih nagrada ista tablica e-mail obavijesti kao za ostale odjele? Klijentov dijagram s dvije razine dodatnih odobravatelja odnosi se samo na napredovanje i nagrađivanje. Wireframe: vrijedi stupac „Stimulacije i kvartalne nagrade“.'
  };

  // ---------- pomoćne ----------
  var byId = {};
  SCREENS.forEach(function (s, i) { s.index = i; byId[s.id] = s; });
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // ---------- traka wireframea ----------
  function renderBar(scr, role, hasShell) {
    var bar = el('div', { 'class': 'wf-bar', role: 'navigation', 'aria-label': 'Navigacija wireframea' });
    var prev = scr ? SCREENS[scr.index - 1] : null;
    var next = scr ? SCREENS[scr.index + 1] : SCREENS[0];
    var h = '<span>WIREFRAME</span>';
    if (scr) h += '<span class="wf-bar-id">' + esc(scr.id) + '</span><span class="wf-bar-title">' + esc(scr.title) + '</span>';
    else h += '<span class="wf-bar-title">Popis ekrana</span>';
    h += '<span class="wf-bar-spacer"></span>';
    h += prev ? '<a href="' + prev.file + '" title="' + esc(prev.id + ' ' + prev.title) + '">← ' + esc(prev.id) + '</a>' : '<a class="is-off">←</a>';
    h += '<a href="index.html">Popis ekrana</a>';
    h += next ? '<a href="' + next.file + '" title="' + esc(next.id + ' ' + next.title) + '">' + esc(next.id) + ' →</a>' : '<a class="is-off">→</a>';
    if (hasShell) {
      h += '<label>Izbornik za ulogu: <select data-wf-role-select>' + ROLE_ORDER.map(function (r) {
        return '<option value="' + r + '"' + (r === role ? ' selected' : '') + '>' + esc(ROLES[r].label) + '</option>';
      }).join('') + '</select></label>';
    }
    h += '<button type="button" data-wf-notes-toggle></button>';
    bar.innerHTML = h;
    return bar;
  }

  function updateNotesButton() {
    var b = document.querySelector('[data-wf-notes-toggle]');
    if (b) b.textContent = document.body.classList.contains('wf-hide-notes') ? 'Bilješke: skrivene' : 'Bilješke: prikazane';
  }

  // ---------- izbornik i zaglavlje ----------
  function renderSide(scr, role) {
    var active = scr ? (scr.menu || scr.id) : null;
    var h = '<div class="wf-brand">D&amp;ST Grow &amp; Reward</div><div class="wf-brand-sub">KONČAR D&amp;ST · HR procesi</div><nav aria-label="Glavni izbornik">';
    // Wireframe uvijek prikazuje cijeli izbornik istim redoslijedom; stavke koje uloga
    // ne vidi su sive i precrtane (u aplikaciji ih ne bi bilo). Poveznica i dalje radi.
    MENU.forEach(function (g) {
      if (g.group) h += '<div class="wf-nav-group">' + esc(g.group) + '</div>';
      g.items.forEach(function (it) {
        var t = byId[it.screen];
        var ok = it.roles.indexOf(role) !== -1;
        var who = it.roles.map(function (r) { return ROLES[r].label; }).join(', ');
        var p = ok && it.p && it.p[role] ? ' <span class="wf-p">' + it.p[role] + '</span>' : '';
        h += '<a class="wf-nav-item' + (it.screen === active ? ' is-active' : '') + (ok ? '' : ' is-hidden-role') + '" href="' + t.file + '"' +
          (ok ? '' : ' title="Ova uloga ne vidi stavku. Vide je: ' + esc(who) + '"') + '><span class="wf-nav-box"></span>' + esc(it.label) + p + '</a>';
      });
    });
    h += '<div class="wf-nav-legend">Precrtano = stavka koju odabrana uloga u aplikaciji ne vidi.</div>';
    return h + '</nav>';
  }

  function renderHead(scr, role) {
    var r = ROLES[role];
    var crumb = scr ? (MODULES[scr.phase] ? esc(MODULES[scr.phase]) + ' › ' : '') + esc(scr.title) : '';
    return '<button type="button" class="wf-menu-btn" data-wf-menu>☰ Izbornik</button>' +
      '<div class="wf-crumb">' + crumb + '</div>' +
      '<div class="wf-user"><b>' + esc(r.user) + '</b><br>' + esc(r.label) + ' · ' + esc(r.unit) +
      ' · <a class="wf-link" href="A01-prijava.html">Odjava</a></div>';
  }

  // ---------- kartice i stanja: [data-wf-tabs="grupa"] > [data-wf-tab="kljuc"]  ↔  [data-wf-panel="grupa:kljuc"] ----------
  function activateTab(group, key) {
    document.querySelectorAll('[data-wf-tabs="' + group + '"] [data-wf-tab]').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-wf-tab') === key);
    });
    document.querySelectorAll('[data-wf-panel]').forEach(function (p) {
      var v = p.getAttribute('data-wf-panel').split(/\s+/);
      var mine = v.filter(function (x) { return x.indexOf(group + ':') === 0; });
      // zasebna klasa, da se ne sudara s is-active na koracima i karticama unutar ploče
      if (mine.length) p.classList.toggle('wf-on', mine.indexOf(group + ':' + key) !== -1);
    });
  }
  function initTabs() {
    document.querySelectorAll('[data-wf-tabs]').forEach(function (g) {
      var group = g.getAttribute('data-wf-tabs');
      var first = g.querySelector('[data-wf-tab].is-active') || g.querySelector('[data-wf-tab]');
      if (first) activateTab(group, first.getAttribute('data-wf-tab'));
    });
  }

  // ---------- popis ekrana na index.html ----------
  function renderIndex(box) {
    var h = '';
    Object.keys(PHASES).forEach(function (ph) {
      h += '<h2 class="wf-section-title">' + esc(PHASES[ph]) + '</h2><div class="wf-table-wrap"><table class="wf-table"><thead><tr>' +
        '<th style="width:70px">#</th><th>Ekran</th><th style="width:170px">Uloga</th><th>Sadržaj</th></tr></thead><tbody>';
      SCREENS.filter(function (s) { return s.phase === ph; }).forEach(function (s) {
        h += '<tr><td class="wf-mono">' + esc(s.id) + '</td><td><a class="wf-link" href="' + s.file + '">' + esc(s.title) + '</a></td><td>' +
          (s.role ? esc(ROLES[s.role].label) : '—') + '</td><td>' + esc(s.desc) + '</td></tr>';
      });
      h += '</tbody></table></div>';
    });
    box.innerHTML = h;
  }
  function renderQuestions(box) {
    var h = '<div class="wf-table-wrap"><table class="wf-table"><thead><tr><th style="width:60px">Oznaka</th><th>Pitanje i pretpostavka</th></tr></thead><tbody>';
    Object.keys(Q).forEach(function (k) { h += '<tr><td><span class="wf-p">' + k + '</span></td><td>' + esc(Q[k]) + '</td></tr>'; });
    box.innerHTML = h + '</tbody></table></div>';
  }

  // ---------- poruka nakon klika (samo prikaz) ----------
  var toastTimer;
  function toast(msg) {
    var t = document.getElementById('wf-toast');
    if (!t) {
      t = el('div', { id: 'wf-toast', role: 'status', style: 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#000;color:#fff;padding:8px 14px;font-size:13px;z-index:60;max-width:90vw;border:1px solid #fff' });
      document.body.appendChild(t);
    }
    t.textContent = msg; t.style.display = 'block';
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.style.display = 'none'; }, 2600);
  }

  // ---------- pokretanje ----------
  function init() {
    var body = document.body;
    var scr = byId[body.getAttribute('data-screen')] || null;
    var role = body.getAttribute('data-role') || (scr && scr.role) || 'rukovoditelj';
    var hasShell = body.getAttribute('data-shell') !== 'none' && !!(scr && scr.role);

    if (store('wf-notes') === 'off') body.classList.add('wf-hide-notes');
    if (scr) document.title = scr.id + ' ' + scr.title + ' – D&ST Grow & Reward (wireframe)';

    body.insertBefore(renderBar(scr, role, hasShell), body.firstChild);
    updateNotesButton();

    if (hasShell) {
      var main = document.querySelector('main');
      var shell = el('div', { 'class': 'wf-shell' });
      var side = el('aside', { 'class': 'wf-side' }, renderSide(scr, role));
      var wrap = el('div', { 'class': 'wf-main' });
      var head = el('header', { 'class': 'wf-head' }, renderHead(scr, role));
      main.classList.add('wf-content');
      body.insertBefore(shell, main);
      wrap.appendChild(head); wrap.appendChild(main);
      shell.appendChild(side); shell.appendChild(wrap);

      var sel = document.querySelector('[data-wf-role-select]');
      sel.addEventListener('change', function () {
        side.innerHTML = renderSide(scr, sel.value);
        head.innerHTML = renderHead(scr, sel.value);
        fillTitles(side);
      });
    }

    var idx = document.getElementById('wf-index'); if (idx) renderIndex(idx);
    var qb = document.getElementById('wf-questions'); if (qb) renderQuestions(qb);

    initTabs();
    fillTitles(document);

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-wf-tab], [data-wf-open], [data-wf-close], [data-wf-notes-toggle], [data-wf-menu], [data-wf-toast], a[href="#"]');
      if (!t) {
        if (body.classList.contains('wf-side-open') && !e.target.closest('.wf-side')) body.classList.remove('wf-side-open');
        return;
      }
      if (t.matches('a[href="#"]')) e.preventDefault();
      if (t.hasAttribute('data-wf-tab')) {
        var g = t.closest('[data-wf-tabs]');
        if (g) activateTab(g.getAttribute('data-wf-tabs'), t.getAttribute('data-wf-tab'));
      }
      if (t.hasAttribute('data-wf-open')) {
        var d = document.getElementById(t.getAttribute('data-wf-open'));
        if (d && d.showModal) d.showModal();
      }
      if (t.hasAttribute('data-wf-close')) { var dd = t.closest('dialog'); if (dd) dd.close(); }
      if (t.hasAttribute('data-wf-notes-toggle')) {
        body.classList.toggle('wf-hide-notes');
        store('wf-notes', body.classList.contains('wf-hide-notes') ? 'off' : 'on');
        updateNotesButton();
      }
      if (t.hasAttribute('data-wf-menu')) { body.classList.toggle('wf-side-open'); e.stopPropagation(); }
      if (t.hasAttribute('data-wf-toast')) toast(t.getAttribute('data-wf-toast'));
    });
    document.addEventListener('submit', function (e) { e.preventDefault(); });
  }

  function fillTitles(root) {
    root.querySelectorAll('.wf-p').forEach(function (p) {
      var k = p.textContent.trim();
      if (!p.title && Q[k]) p.title = k + ': ' + Q[k];
    });
  }

  // 1234.5 → "1.234,50"; za izračune uživo na pojedinim ekranima
  function fmt(n, dec) {
    dec = dec == null ? 2 : dec;
    var neg = n < 0, s = Math.abs(n).toFixed(dec).split('.');
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (neg ? '−' : '') + s.join(',');
  }

  window.WF = { screens: SCREENS, roles: ROLES, questions: Q, toast: toast, fmt: fmt };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
