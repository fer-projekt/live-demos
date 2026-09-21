# Što trebamo od klijenta prije izrade stranice

Popis za sastanak. Prva skupina je obavezna, bez nje stranica ne može van.
Ostalo se može dopuniti naknadno.

---

## Najkraća verzija, ako nemate vremena

Ponesite s terena samo ovo troje i mi krećemo:

1. **Google Maps poveznica na lokal.** Otvorite lokal u Google kartama,
   Dijeli, kopirajte poveznicu. Iz nje automatski izvučemo naziv, adresu,
   telefon, radno vrijeme po danima, ocjenu, broj recenzija i kartu.
2. **E-mail adresa** na koju će stizati upiti s obrasca. Ako je nemaju,
   dogovorite da je otvore, bez nje obrazac nema kamo slati.
3. **Logo** u najvećoj verziji koju imaju, svejedno s kakvom pozadinom.
   Bijeli okvir i obojenu podlogu skidamo sami.

Ostalo niže na popisu tražimo samo ako nam automatski ne uspije, ili ako
klijent želi nešto posebno. Prije sastanka pokrenite:

```
python3 alati/prikupi.py --maps "<poveznica>" --izlaz klijent.json
```

pa na sastanak idete s onim što je stvarno ostalo nepoznato.

---

## 1. Bez ovoga ne možemo objaviti

**Naziv i pravni podaci** (za impresum u podnožju)

- Puni naziv tvrtke ili obrta, točno onako kako piše u registru
  (npr. "KALUN, obrt za ugostiteljstvo, vl. Dražan Vukušić", ne samo "Kod Vukušića")
- Adresa sjedišta iz registra
- OIB
- Matični broj (MB za d.o.o., MBO za obrt)
- Kod d.o.o. još: kod kojeg je trgovačkog suda upisan, MBS i temeljni kapital
- IBAN i naziv banke
- Ime i prezime odgovorne osobe ili vlasnika
- Jesu li u sustavu PDV-a

Zašto baš to: impresum s ovim podacima je zakonska obveza za svakoga tko
posluje preko interneta, a usput djeluje ozbiljno i personalizirano.

**Kontakt**

- Službena e-mail adresa. Ovo je važno: ako je nemaju, treba je otvoriti prije
  objave. Ne smijemo izmisliti adresu, jer upiti s obrasca nigdje ne stižu.
- Telefon, i mobitel ako je drugi broj
- Adresa lokala, ako nije ista kao sjedište
- Radno vrijeme po danima, plus što je zimi ili ljeti drukčije i rade li praznikom

---

## 2. Logo i fotografije

**Logo, po redu poželjnosti**

1. Vektor: AI, EPS, SVG ili PDF. Ovo je najbolje, radi u svim veličinama.
2. PNG s prozirnom pozadinom, širine barem 1000 px
3. Ako imaju samo logo s pozadinom (bijeli okvir ili obojena podloga), recite
   da nije problem, mi ga očistimo. Ali neka pošalju najveću verziju koju imaju.

Pitajte i imaju li svijetlu verziju logotipa za tamnu podlogu. Ako nemaju,
mi je izradimo.

**Fotografije**

- U punoj rezoluciji, iz originala, ne skinute s Facebooka ili Instagrama
  (tamo se stlače na 500 do 600 px i mute se kad se povećaju)
- Poželjno barem: vanjski izgled lokala, interijer, terasa, nekoliko jela ili
  proizvoda, tim ili vlasnik
- Ako nemaju dobre fotografije, to je prilika da im ponudimo fotografiranje

**Pitanje o pravima na fotografije:** jesu li slike njihove ili ih je radio
fotograf. Ako ih je radio fotograf, smiju li se koristiti na webu.

---

## 3. Sadržaj

- **Jelovnik ili cjenik** u elektronskom obliku: PDF, Word, Excel, svejedno.
  Recite im da to postavljamo besplatno, samo neka dostave.
- Kratki opis lokala svojim riječima: otkad rade, po čemu su poznati, tko im
  dolazi. Dvije do tri rečenice su dovoljne, mi to dotjeramo.
- Popis usluga ili kategorija ponude
- Ako imaju nešto posebno: dostava, catering, proslave, parking, pet friendly,
  dječja igraonica, terasa, wifi

---

## 4. Digitalno što već imaju

- Facebook stranica, link
- Instagram profil, link
- Google poslovni profil: imaju li ga i imaju li pristup. Ovo je važno jer se
  ondje uređuje radno vrijeme i fotografije koje ljudi prvo vide.
- Postojeća domena ili web, ako postoji, i tko je drži
- Imaju li rezervacije preko nekog sustava

---

## 5. Za obrazac i privolu

- Tko je voditelj obrade podataka, obično isti pravni subjekt iz impresuma
- Na koji e-mail stižu upiti s obrasca
- Trebaju li pravila privatnosti i izjavu o kolačićima. Ako nemaju, mi
  pripremimo standardni tekst.

---

## Česte zamke

**Naziv lokala nije naziv tvrtke.** Lokal se zove "Kod Vukušića", a obrt
"KALUN". U impresum ide pravni naziv, u zaglavlje stranice ime lokala.

**Više lokala na istoj adresi.** U poslovnim centrima zna biti nekoliko
ugostitelja na istom kućnom broju, pa se lako pripiše krivi OIB. Uvijek
potvrdite podatke s vlasnikom, ne samo s interneta.

**Radno vrijeme s interneta zna biti staro.** Google i portali često imaju
zastarjelo radno vrijeme. Pitajte vlasnika.

**Cijene se mijenjaju.** Ako stavljamo cjenik, dogovorite tko javlja izmjene.

**E-mail adresa.** Najčešće nedostaje kod manjih obrta. Bez nje obrazac na
stranici nema kamo slati, pa to riješite na prvom sastanku.

---

## Što skupljamo automatski, ne treba ih gnjaviti

Ovo alat `prikupi.py` izvuče sam iz Google Maps poveznice:

- naziv, adresa, telefon
- radno vrijeme po danima
- ocjena i broj recenzija
- kategorija lokala i cjenovni rang
- koordinate i kartu za stranicu
- Instagram profil, opis i poveznice, ako profil postoji
- prvi podaci o pravnom subjektu s FINA Info.BIZ-a

Uz to radimo sami:

- čišćenje logotipa od pozadine, u obje varijante
- tekstove, na temelju njihovih natuknica i onoga što se vidi na profilima
- pravila privatnosti i izjavu o kolačićima, standardni tekst

## Što alat ne može, pa se mora pitati

- **IBAN.** Nije javno dostupan ni na jednom besplatnom servisu.
- **OIB i matični broj za obrte.** Obrtni registar blokira automatski
  pristup. Za trgovačka društva ćemo to riješiti preko sudskog registra
  čim se registriramo za njihov besplatni API.
- **E-mail adresa.** Rijetko je javno objavljena.
- **Fotografije u punoj veličini.** S Instagrama dolaze smanjene na 640 px
  i mute se kad se povećaju.
- **Jelovnik ili cjenik.**
