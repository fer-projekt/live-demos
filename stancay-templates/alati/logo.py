#!/usr/bin/env python3
"""
Čišćenje logotipa od pozadine i izrada svijetle varijante za tamnu podlogu.

Klijenti najčešće pošalju logo s bijelim okvirom ili na obojenoj podlozi.
Ovo oboje rješava, bez ručnog rada u Photoshopu.

    python3 alati/logo.py ulaz.png img/klijent/
    python3 alati/logo.py ulaz.png img/klijent/ --nacin gradijent
    python3 alati/logo.py ulaz.png img/klijent/ --svijetla "#f5e8d0" --tamna "#5c301e"

Nastaje:
    img/klijent/logo.png           za svijetlu podlogu, zaglavlje
    img/klijent/logo-svijetli.png  za tamnu podlogu, podnožje

Načini:
    jednobojna  bijela ili jednobojna pozadina, uklanja se od rubova (zadano)
    gradijent   obojena podloga s prijelazom, npr. bakrena ili tamna ploča
    auto        sam bira prema tome koliko su kutovi slike međusobno slični
"""
import argparse, os, sys
from collections import deque

try:
    from PIL import Image, ImageChops, ImageFilter
except ImportError:
    sys.exit("treba Pillow: pip install Pillow")


def kutovi_slicni(im, prag=18):
    rgb = im.convert("RGB")
    w, h = rgb.size
    t = [rgb.getpixel(p) for p in ((2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3))]
    raspon = max(max(k[i] for k in t) - min(k[i] for k in t) for i in range(3))
    return raspon <= prag


def skini_jednobojnu(im, tolerancija=17):
    """Uklanja pozadinu širenjem od rubova. Ne dira istu boju unutar logotipa."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    poz = im.convert("RGB").getpixel((2, 2))

    def slicna(p):
        return all(abs(p[i] - poz[i]) <= tolerancija for i in range(3))

    red = deque()
    for x in range(w):
        red.append((x, 0)); red.append((x, h - 1))
    for y in range(h):
        red.append((0, y)); red.append((w - 1, y))
    vidjeno = set()
    while red:
        x, y = red.popleft()
        if not (0 <= x < w and 0 <= y < h) or (x, y) in vidjeno:
            continue
        if not slicna(px[x, y][:3]):
            continue
        vidjeno.add((x, y))
        px[x, y] = (255, 255, 255, 0)
        red.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    return im


def skini_gradijent(im, prag_tamno=120, meko_tamno=150, prag_svijetlo=218, puno_svijetlo=235):
    """
    Za podlogu s prijelazom boje. Zadržava piksel samo ako istodobno
    odstupa po svjetlini od pozadine i ima lokalni kontrast. Glatki
    gradijent prolazi prvi uvjet na svijetlim mjestima, ali pada na drugom.
    """
    rgb = im.convert("RGB")
    L = rgb.convert("L")

    def alfa(v):
        if v <= prag_tamno:
            return 255
        if v < meko_tamno:
            return int((meko_tamno - v) * 255 / (meko_tamno - prag_tamno))
        if v >= puno_svijetlo:
            return 255
        if v > prag_svijetlo:
            return int((v - prag_svijetlo) * 255 / (puno_svijetlo - prag_svijetlo))
        return 0

    po_svjetlini = L.point(alfa)
    zamuceno = L.filter(ImageFilter.GaussianBlur(14))
    kontrast = (ImageChops.difference(L, zamuceno)
                .point(lambda v: 0 if v < 12 else 255)
                .filter(ImageFilter.MaxFilter(9)))
    maska = (ImageChops.multiply(po_svjetlini, kontrast)
             .filter(ImageFilter.MinFilter(3))
             .filter(ImageFilter.MaxFilter(5))
             .filter(ImageFilter.GaussianBlur(0.6)))
    out = rgb.convert("RGBA")
    out.putalpha(maska)
    return out


def hex_u_rgb(s):
    s = s.lstrip("#")
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def preboji(im, svijetla, tamna, granica=190):
    """Svodi logo na dvije boje: svjetlije poteze i tamniji tekst."""
    out = Image.new("RGBA", im.size)
    ip, op = im.load(), out.load()
    for y in range(im.size[1]):
        for x in range(im.size[0]):
            r, g, b, a = ip[x, y]
            if not a:
                op[x, y] = (0, 0, 0, 0)
                continue
            l = (r * 299 + g * 587 + b * 114) // 1000
            op[x, y] = (*(svijetla if l > granica else tamna), a)
    return out


def invertiraj(im):
    out = Image.new("RGBA", im.size)
    ip, op = im.load(), out.load()
    for y in range(im.size[1]):
        for x in range(im.size[0]):
            r, g, b, a = ip[x, y]
            if not a:
                op[x, y] = (0, 0, 0, 0)
            else:
                l = (r * 299 + g * 587 + b * 114) // 1000
                v = 255 - l
                op[x, y] = (v, v, v, a)
    return out


def main():
    p = argparse.ArgumentParser(description="Očisti logo od pozadine")
    p.add_argument("ulaz")
    p.add_argument("mapa", help="mapa u koju se sprema, npr. img/klijent/")
    p.add_argument("--nacin", choices=["auto", "jednobojna", "gradijent"], default="auto")
    p.add_argument("--svijetla", help="hex boja za svjetlije poteze, npr. #b07c2a")
    p.add_argument("--tamna", help="hex boja za tamniji tekst, npr. #5c301e")
    a = p.parse_args()

    im = Image.open(a.ulaz)
    nacin = a.nacin
    if nacin == "auto":
        nacin = "jednobojna" if kutovi_slicni(im) else "gradijent"
        print(f"način: {nacin} (odabran automatski)", file=sys.stderr)

    ocisceno = skini_jednobojnu(im) if nacin == "jednobojna" else skini_gradijent(im)
    bb = ocisceno.getbbox()
    if bb:
        ocisceno = ocisceno.crop(bb)

    if a.svijetla and a.tamna:
        za_svijetlu = preboji(ocisceno, hex_u_rgb(a.svijetla), hex_u_rgb(a.tamna))
        za_tamnu = preboji(ocisceno, (245, 232, 208), (232, 214, 188))
    else:
        za_svijetlu = ocisceno
        za_tamnu = invertiraj(ocisceno)

    os.makedirs(a.mapa, exist_ok=True)
    p1 = os.path.join(a.mapa, "logo.png")
    p2 = os.path.join(a.mapa, "logo-svijetli.png")
    za_svijetlu.save(p1)
    za_tamnu.save(p2)
    print(f"{p1}  {za_svijetlu.size}  za svijetlu podlogu")
    print(f"{p2}  {za_tamnu.size}  za tamnu podlogu")
    print("\nProvjerite rezultat okom. Ako je gradijent ostavio mrlje, "
          "pokušajte --nacin gradijent s drugim slikom ili tražite logo u vektoru.",
          file=sys.stderr)


if __name__ == "__main__":
    main()
