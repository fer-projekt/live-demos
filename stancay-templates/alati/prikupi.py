#!/usr/bin/env python3
"""
Prikupljanje javnih podataka o ugostitelju iz minimuma koji donese prodavač.

Ulaz je naziv lokala i grad, ili Google Maps poveznica.
Izlaz je JSON sa svime što se dalo naći, plus popis onoga što nedostaje.

Primjeri:
    python3 alati/prikupi.py "Pivnica" "Zagreb"
    python3 alati/prikupi.py --maps "https://share.google/8SQAKaSjvDKYy7sES"
    python3 alati/prikupi.py "Bistro Kod Vukusica" "Zagreb" --slike img/bistro

Traži lokalni Chrome. Pokreće ga sam, u headless načinu.
"""
import argparse, asyncio, base64, json, os, re, subprocess, sys, time, urllib.parse, urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cdp import Browser

PORT = 9401
PROFIL = "/tmp/cr-prikupi"
UA_DESKTOP = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
UA_MOBILNI = ("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
              "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1")


# ---------------------------------------------------------------- Chrome

def pokreni_chrome():
    subprocess.run(["pkill", "-9", "-f", f"user-data-dir={PROFIL}"],
                   capture_output=True)
    time.sleep(1)
    subprocess.run(["rm", "-rf", PROFIL], capture_output=True)
    subprocess.Popen(
        ["google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
         f"--remote-debugging-port={PORT}", f"--user-data-dir={PROFIL}",
         "--window-size=1400,1100", "--hide-scrollbars", "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    for _ in range(40):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version", timeout=2)
            return
        except Exception:
            time.sleep(0.5)
    raise RuntimeError("Chrome se nije pokrenuo")


def ugasi_chrome():
    subprocess.run(["pkill", "-9", "-f", f"user-data-dir={PROFIL}"], capture_output=True)
    subprocess.run(["rm", "-rf", PROFIL], capture_output=True)


async def prihvati_privolu(b):
    """Google prikazuje zid s privolom prije prvog rezultata."""
    r = await b.js("""(() => {
      const zeljeni = ['Prihvati sve','Accept all','Odbij sve','Reject all'];
      const els = [...document.querySelectorAll('button, div[role=button], input[type=submit]')];
      for (const z of zeljeni) {
        const el = els.find(e => (e.innerText || e.value || '').trim().toLowerCase() === z.toLowerCase());
        if (el) { el.click(); return z; }
      }
      return null;
    })()""")
    if r:
        await asyncio.sleep(5)
    return r


# ---------------------------------------------------------------- Google Maps

async def google_maps(b, upit):
    """Naziv, adresa, telefon, radno vrijeme, ocjena, kategorija, web.

    Upit je ili poveznica na Maps, koja se otvara izravno, ili tekst za tražilicu.
    """
    if upit.startswith("http"):
        url = upit
    else:
        url = "https://www.google.com/maps/search/" + urllib.parse.quote(upit) + "?hl=hr"
    await b.goto(url, wait=9)
    if "consent" in str(await b.js("location.href") or ""):
        await prihvati_privolu(b)
        await b.goto(url, wait=8)

    # panel s podacima stigne kasnije od same karte, čekamo da se pojavi
    for _ in range(12):
        tekst = str(await b.js("document.body.innerText") or "")
        if re.search(r"\d{5},?\s*[A-ZŠĐČĆŽ]", tekst) or re.search(r"\n0\d{1,2}[\s/]?\d{3}", tekst):
            break
        await asyncio.sleep(1.5)

    tekst = str(await b.js("document.body.innerText") or "")
    puni = str(await b.js("location.href") or "")

    out = {"izvor": "Google Maps", "upit": upit}
    m = re.search(r"@(-?\d+\.\d+),(-?\d+\.\d+)", puni)
    if m:
        out["lat"], out["lon"] = m.group(1), m.group(2)

    # naziv je prvi redak koji se ponovi iznad ocjene
    m = re.search(r"\n([^\n]{2,60})\n(\d,\d)\n", tekst)
    if m:
        out["naziv"] = m.group(1).strip()
        out["ocjena"] = m.group(2)
    m = re.search(r"\n([^\n]{5,90}?,\s*\d{5},?\s*[A-ZŠĐČĆŽ][^\n]{2,30})\n", tekst)
    if m:
        out["adresa"] = m.group(1).strip()
    m = re.search(r"\n(0\d{1,2}[\s/-]?\d{3,4}[\s-]?\d{3,4})\n", tekst)
    if m:
        out["telefon"] = m.group(1).strip()
    m = re.search(r"\((\d[\d.,]*)\)", tekst)
    if m:
        out["broj_recenzija"] = m.group(1)
    m = re.search(r"·\s*(\d+\s*[–-]\s*\d+\s*€)", tekst)
    if m:
        out["cjenovni_rang"] = m.group(1).replace(" ", "")
    m = re.search(r"Zatvara se u (\d{1,2}(?::\d{2})?)", tekst)
    if m:
        out["zatvara_se_danas"] = m.group(1)
    m = re.search(r"\n([a-z0-9.-]+\.(?:hr|com|net|eu))\n", tekst)
    if m:
        out["web_ili_profil"] = m.group(1)
    for k in ("Restoran", "Bar", "Kafić", "Pizzeria", "Konoba", "Slastičarnica", "Pub"):
        if re.search(r"\n" + k + r"·", tekst):
            out["kategorija"] = k
            break
    out["_sirovi_tekst"] = tekst[:1200]
    return out


async def radno_vrijeme(b):
    """Otvara popis radnog vremena ako postoji gumb za to."""
    r = await b.js("""(async () => {
      const gumb = [...document.querySelectorAll('[aria-label*="Radno vrijeme"], [jsaction*="openhours"], button')]
        .find(e => /radno vrijeme|otvoreno|zatvara se/i.test(e.getAttribute('aria-label') || e.innerText || ''));
      if (!gumb) return null;
      gumb.click();
      await new Promise(r => setTimeout(r, 1800));
      const tabl = document.querySelector('table');
      if (!tabl) return null;
      return [...tabl.querySelectorAll('tr')].map(tr =>
        [...tr.querySelectorAll('td,th')].map(td => td.innerText.trim()).join(' ')).filter(Boolean);
    })()""")
    if not r:
        return None
    # Google ubacuje znakove iz svoje ikonske fontove, izbacujemo ih
    return [re.sub(r"[-]", "", red).strip() for red in r]


# ---------------------------------------------------------------- Instagram

async def instagram(b, handle, mapa_slika=None, max_slika=12):
    """Bio, vanjska poveznica, broj pratitelja i fotografije s profila."""
    await b.send("Network.setUserAgentOverride", userAgent=UA_DESKTOP)
    await b.send("Emulation.setDeviceMetricsOverride", width=1400, height=1000,
                 deviceScaleFactor=1, mobile=False)
    await b.goto(f"https://www.instagram.com/{handle}/", wait=11)
    naslov = str(await b.js("document.title") or "")
    if "isn't available" in naslov or "Page Not Found" in naslov:
        return {"_greska": f"profil @{handle} ne postoji"}

    tekst = str(await b.js("document.body.innerText") or "")
    out = {"izvor": "Instagram", "handle": handle}
    m = re.search(r"([\d.,]+)\s+followers", tekst)
    if m:
        out["pratitelja"] = m.group(1)
    m = re.search(r"followers\s*\n\s*[\d.,]+\s+following\s*\n([^\n]+)\n([^\n]{10,300})", tekst)
    if m:
        out["ime_profila"] = m.group(1).strip()
        out["opis"] = m.group(2).strip()
    m = re.search(r"\n((?:www\.)?[a-z0-9.-]+\.(?:hr|com|net|eu)[^\s\n]*)\n", tekst)
    if m:
        out["poveznica_iz_opisa"] = m.group(1)

    if mapa_slika:
        out["slike"] = await skini_slike(b, mapa_slika, max_slika)
    return out


async def skini_slike(b, mapa, maks):
    """Skuplja fotografije s otvorenog profila. Bira najveću ponuđenu veličinu."""
    os.makedirs(mapa, exist_ok=True)
    vidjeno = {}
    for _ in range(10):
        r = await b.js("""(() => {const o = {};
          document.querySelectorAll('img').forEach(i => {
            const alt = i.alt || '', s = i.currentSrc || i.src || '';
            if (!s.includes('fbcdn') || /profile picture|highlight/.test(alt)) return;
            let naj = s, sirina = i.naturalWidth || 0;
            (i.srcset || '').split(',').forEach(p => {
              const m = p.trim().match(/^(\\S+)\\s+(\\d+)w$/);
              if (m && +m[2] > sirina) { sirina = +m[2]; naj = m[1]; }
            });
            o[s.split('?')[0].slice(-36)] = [naj, sirina, alt.slice(0, 70)];
          });
          return o;})()""") or {}
        vidjeno.update(r)
        await b.js("window.scrollBy(0, 650)")
        await asyncio.sleep(1.3)

    spremljene = []
    for n, (u, w, alt) in enumerate(list(vidjeno.items())[:maks], 1):
        podaci = await b.js("""(async () => {try {
            const r = await fetch(%s, {credentials:'omit'});
            if (!r.ok) return null;
            const b = await r.blob(), fr = new FileReader();
            return await new Promise(res => { fr.onload = () => res(fr.result); fr.readAsDataURL(b); });
          } catch (e) { return null; }})()""" % json.dumps(u))
        if isinstance(podaci, str) and podaci.startswith("data:"):
            put = os.path.join(mapa, f"{n:02d}.jpg")
            with open(put, "wb") as fh:
                fh.write(base64.b64decode(podaci.split(",", 1)[1]))
            spremljene.append({"datoteka": put, "sirina": w, "opis": alt})
    return spremljene


async def nadi_instagram(b, naziv, grad):
    """Pogađa handle iz naziva i provjerava koji postoji."""
    osnova = re.sub(r"[^a-z0-9]", "", naziv.lower())
    kandidati = [osnova, osnova + grad.lower(), osnova + "hr", osnova + "zg"]
    for h in dict.fromkeys(kandidati):
        if len(h) < 3:
            continue
        await b.goto(f"https://www.instagram.com/{h}/", wait=6)
        naslov = str(await b.js("document.title") or "")
        if "Instagram photos and videos" in naslov:
            return h
    return None


# ---------------------------------------------------------------- Pravni podaci

async def fina_infobiz(b, naziv):
    """Naziv pravnog subjekta, matični broj i djelatnost s javnog pregleda."""
    url = "https://www.fininfo.hr/Pretraga?pojam=" + urllib.parse.quote(naziv)
    await b.goto(url, wait=8)
    tekst = str(await b.js("document.body.innerText") or "")
    out = {"izvor": "FINA Info.BIZ", "upit": naziv}
    pogoci = re.findall(r"([A-ZŠĐČĆŽ][^\n]{6,90}(?:d\.o\.o\.|j\.d\.o\.o\.|obrt[^\n]{0,60}))", tekst)
    if pogoci:
        out["kandidati"] = list(dict.fromkeys(p.strip() for p in pogoci))[:6]
    m = re.search(r"MBO?[:\s]*(\d{8,9})", tekst)
    if m:
        out["maticni_broj"] = m.group(1)
    m = re.search(r"OIB[:\s]*(\d{11})", tekst)
    if m:
        out["oib"] = m.group(1)
    return out


def sudski_registar(oib=None, naziv=None):
    """
    Sudski registar, otvoreni API. Vraća naziv, sjediste, temeljni kapital i
    djelatnost za trgovacka drustva.

    Traži besplatnu registraciju na https://sudreg-data.gov.hr/
    Nakon nje se dobiju Client ID i Client Secret, koji se stave u okolinu:
        export SUDREG_ID="..."
        export SUDREG_SECRET="..."

    Obrti NISU u sudskom registru, oni su u Obrtnom registru
    (pretrazivac-obrta.gov.hr), koji nema otvoreni API i blokira automatski
    pristup, pa se za obrte podaci i dalje uzimaju od klijenta.
    """
    cid, secret = os.environ.get("SUDREG_ID"), os.environ.get("SUDREG_SECRET")
    if not (cid and secret):
        return {"_preskoceno": "nema SUDREG_ID i SUDREG_SECRET u okolini, "
                               "registracija je besplatna na sudreg-data.gov.hr"}
    try:
        podaci = urllib.parse.urlencode({"grant_type": "client_credentials"}).encode()
        zahtjev = urllib.request.Request("https://sudreg-data.gov.hr/api/oauth/token", data=podaci)
        kljuc = base64.b64encode(f"{cid}:{secret}".encode()).decode()
        zahtjev.add_header("Authorization", "Basic " + kljuc)
        token = json.loads(urllib.request.urlopen(zahtjev, timeout=25).read())["access_token"]

        par = {"tip_identifikatora": "oib", "identifikator": oib} if oib else {"expand_relations": "true"}
        u = "https://sudreg-data.gov.hr/api/javni/subjekt?" + urllib.parse.urlencode(par)
        z = urllib.request.Request(u, headers={"Authorization": "Bearer " + token})
        return json.loads(urllib.request.urlopen(z, timeout=25).read())
    except Exception as e:
        return {"_greska": str(e)[:200]}


# ---------------------------------------------------------------- glavno

NEDOSTAJE_UVIJEK = [
    ("oib", "OIB, iz registra ili od klijenta"),
    ("maticni_broj", "matični broj, MB za društvo, MBO za obrt"),
    ("iban", "IBAN, nije javno dostupan, traži se od klijenta"),
    ("email", "službena e-mail adresa, često je nema pa je treba otvoriti"),
    ("odgovorna_osoba", "ime i prezime vlasnika ili odgovorne osobe"),
]


async def prikupi(naziv, grad, mapa_slika=None, maps_url=None):
    rezultat = {"traženo": {"naziv": naziv, "grad": grad}, "prikupljeno": {}, "nedostaje": []}
    async with Browser(port=PORT) as b:
        await b.send("Network.enable")
        await b.send("Network.setUserAgentOverride", userAgent=UA_DESKTOP)

        upit = maps_url or f"{naziv} {grad}"
        print(f"  Google Maps: {upit}", file=sys.stderr)
        gm = await google_maps(b, upit)
        rv = await radno_vrijeme(b)
        if rv:
            gm["radno_vrijeme"] = rv
        rezultat["prikupljeno"]["google_maps"] = gm

        print("  Instagram: tražim profil", file=sys.stderr)
        handle = await nadi_instagram(b, naziv, grad)
        if handle:
            print(f"  Instagram: @{handle}", file=sys.stderr)
            rezultat["prikupljeno"]["instagram"] = await instagram(b, handle, mapa_slika)
        else:
            rezultat["nedostaje"].append("Instagram profil nije pronađen automatski, pitati klijenta")

        print("  FINA Info.BIZ: pravni subjekt", file=sys.stderr)
        rezultat["prikupljeno"]["fina"] = await fina_infobiz(b, naziv)

    oib = (rezultat["prikupljeno"].get("fina") or {}).get("oib")
    rezultat["prikupljeno"]["sudski_registar"] = sudski_registar(oib=oib, naziv=naziv)

    imamo = json.dumps(rezultat["prikupljeno"], ensure_ascii=False).lower()
    for kljuc, opis in NEDOSTAJE_UVIJEK:
        if kljuc not in imamo:
            rezultat["nedostaje"].append(opis)
    return rezultat


def main():
    p = argparse.ArgumentParser(description="Prikupi javne podatke o ugostitelju")
    p.add_argument("naziv", nargs="?", help="naziv lokala")
    p.add_argument("grad", nargs="?", default="Zagreb", help="grad")
    p.add_argument("--maps", help="Google Maps poveznica umjesto naziva")
    p.add_argument("--slike", help="mapa u koju spremiti fotografije s Instagrama")
    p.add_argument("--izlaz", help="datoteka za JSON, inače na zaslon")
    a = p.parse_args()
    if not a.naziv and not a.maps:
        p.error("treba naziv lokala ili --maps poveznica")

    pokreni_chrome()
    try:
        r = asyncio.run(prikupi(a.naziv or "", a.grad, a.slike, a.maps))
    finally:
        ugasi_chrome()

    tekst = json.dumps(r, ensure_ascii=False, indent=2)
    if a.izlaz:
        with open(a.izlaz, "w", encoding="utf-8") as fh:
            fh.write(tekst)
        print(f"spremljeno u {a.izlaz}", file=sys.stderr)
    else:
        print(tekst)

    if r["nedostaje"]:
        print("\nTREBA UZETI OD KLIJENTA:", file=sys.stderr)
        for n in r["nedostaje"]:
            print("  -", n, file=sys.stderr)


if __name__ == "__main__":
    main()
