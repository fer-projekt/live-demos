# Alati za izradu klijentskih stranica

Cilj: prodavač donese minimum, ostalo se pokupi automatski.

## Što prodavač mora donijeti

Samo troje, i to stane u jednu SMS poruku:

1. **Google Maps poveznica na lokal** (dijeljenje iz aplikacije)
2. **E-mail adresa** na koju stižu upiti
3. **Logo**, u najvećoj verziji koju imaju, svejedno s kakvom pozadinom

Sve ostalo pokušavamo automatski. Što ne uspije, ispiše se na kraju kao popis
za klijenta.

---

## prikupi.py

```bash
python3 alati/prikupi.py --maps "https://maps.app.goo.gl/xxxxx" --izlaz klijent.json
python3 alati/prikupi.py "Naziv lokala" "Zagreb" --slike img/klijent
```

Pokreće lokalni Chrome bez prozora, prolazi Googleov zid s privolom i skuplja:

| Podatak | Izvor | Pouzdanost |
|---|---|---|
| naziv, adresa, telefon | Google Maps | visoka |
| radno vrijeme po danima | Google Maps | visoka, ali zna biti staro |
| ocjena i broj recenzija | Google Maps | visoka |
| kategorija, cjenovni rang | Google Maps | visoka |
| koordinate za kartu | Google Maps | visoka |
| Instagram opis i poveznica | Instagram | visoka ako se profil nađe |
| fotografije | Instagram | srednja, vidi ograničenja |
| pravni subjekt, matični broj | FINA Info.BIZ | srednja, treba potvrditi |

**Poveznica je bolja od naziva.** Kod generičkih naziva poput "Pivnica"
tražilica lako nađe krivi lokal u drugom gradu. Poveznica pogađa točno.

### Ograničenja, provjereno u praksi

- **Instagram** bez prijave servira slike od 640 px, a nakon nekoliko
  uzastopnih dohvata padne na 240 px ili potpuno zatvori pristup. Za ozbiljne
  fotografije tražite originale od klijenta.
- **Facebook** bez prijave daje samo naslovnu fotografiju.
- **Obrtni registar** blokira automatski pristup, pa se podaci o obrtima
  i dalje uzimaju od klijenta.
- **IBAN** nije javno dostupan ni na jednom besplatnom servisu.

### Sudski registar

Modul `sudski_registar()` je napisan i čeka pristupne podatke. Registracija je
besplatna na https://sudreg-data.gov.hr/, nakon nje se dobiju Client ID i Secret:

```bash
export SUDREG_ID="..."
export SUDREG_SECRET="..."
```

Tada se za **trgovačka društva** automatski dobiju naziv, sjedište, OIB, MBS,
temeljni kapital, pretežita djelatnost i e-mail iz registra. To pokriva
cijeli impresum osim IBAN-a.

Za **obrte** to ne vrijedi, jer obrti nisu u sudskom nego u obrtnom registru.
Većina malih ugostitelja su obrti, pa za njih podaci ostaju ručni.

---

## logo.py

```bash
python3 alati/logo.py logo-od-klijenta.png img/klijent/
python3 alati/logo.py logo.png img/klijent/ --svijetla "#b07c2a" --tamna "#5c301e"
```

Sam prepoznaje s kakvom je pozadinom logo stigao i bira postupak:

- **jednobojna**: bijeli ili jednobojni okvir, uklanja se širenjem od rubova.
  Ne dira istu boju unutar logotipa, jer ide samo od ruba prema unutra.
- **gradijent**: obojena podloga s prijelazom. Piksel ostaje samo ako
  istodobno odstupa po svjetlini i ima lokalni kontrast. Glatki prijelaz
  prolazi prvi uvjet, ali pada na drugom, pa mrlje nestaju.

Uvijek nastaju dvije datoteke, jer jedna ne može raditi svugdje:
`logo.png` za svijetlo zaglavlje i `logo-svijetli.png` za tamno podnožje.

Rezultat treba pogledati okom. Ako je logo loše skeniran ili ima sjenu,
bolje je tražiti vektor.

---

## Čega još nema, a isplatilo bi se

- **Punjenje predloška iz JSON-a.** Sada podatke iz `prikupi.py` prepisujem
  ručno u HTML. Sljedeći korak je da predložak ima oznake koje se popune iz
  JSON-a, pa je izrada stranice jedna naredba.
- **Provjera nakon izrade.** Skripta koja otvori gotovu stranicu na 1440 i
  360 px i javi horizontalni scroll, slomljene slike, mrtva sidra i skriveni
  sadržaj. Te provjere sada radim ručno pri svakom sajtu.
- **Dohvat s Google profila uz prijavu**, čime bi se dobile fotografije u
  punoj veličini umjesto Instagramovih smanjenih.
