  document.addEventListener('DOMContentLoaded', () => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.2 });
    window.revealIO = io;
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  });

  window.mjesta = function () {
    return {
      places: [
      { k:'Dubrovnik',  n:'Gradske zidine', rv:'8–19 h',        d:'Današnji opseg dubrovačkih zidina nastao je u 13. stoljeću, a one se sustavno osuvremenjuju i grade do 1660. godine, kad je izgrađena posljednja utvrda, bastion sv. Stjepana na južnom dijelu zidina. Zidine su dugačke 1940 metara i sastoje se od glavnog gradskog zida, šesnaest kula, tri tvrđave, šest…', img:'images/foto-gradske-zidine.jpg',     href:'lokalitet-gradske-zidine.html' },
      { k:'Dubrovnik',  n:'Tvrđava Lovrjenac', rv:'8–19 h',     d:'Samostojeća snažna utvrda u predgrađu Pile, na 37 metara visokoj hridi, ime nosi po svetom Lovru, čija se crkva nalazila na njezinu mjestu. Kapela je i danas u tijelu tvrđave. Nastanak Lovrjenca datira se u 1018. i 1038. godinu, dok prvi očuvani spomen te tvrđave potječe iz 1301. godine, kad se imenuje jedan u…',           img:'images/foto-lovrjenac.jpg',          href:'lokalitet-lovrjenac.html' },
      { k:'Dubrovnik',  n:'Zapadno predziđe', rv:'9–18 h',      d:'Zapadni sklop zidina nastao je u 13. stoljeću, kad se grad širi prema sjeveru i obzidava. Bio je to jednostavan, okomiti zid s kruništem i zupcima, debeo metar i pol. S unutarnje strane tekao je obilazni hodnik, oslonjen na svodiće i konzole. U tom zidu sagrađeno je pet četvrtastih kula, otvorenih prema…',   img:'images/foto-zapadno-predzide.jpg',   href:'lokalitet-zapadno-predzide.html' },
      { k:'Ston',       n:'Stonske zidine', rv:'8–18.30 h',        d:'Stonske zidine osim osnovnog zidnog platna sastoje se od tri tvrđave (Veliki Kaštio, Koruna i Podzvizd), četrdesetjedne kule, sedam bastiona (Sokolić, Arcimon u Stonu, tri bastiona Velikog Kaštela, bastion Podzvizda i malostonski Arcimon), četiri predziđa (istočno i jugozapadno u Stonu, jedno pred Malim Stonom…',         img:'images/foto-stonske-zidine.jpg',     href:'index.html#karta' },
      { k:'Slano',      n:'Knežev dvor u Slanome', rv:'9–17 h', d:'Širenje teritorija Dubrovačke Republike prema zapadu odvijalo se u dva navrata tijekom 14. stoljeća. Prvo su 1933. godine otkupljeni Ston i poluotok Pelješac, a 1399. godine, od bosanskog kralja Stjepana Ostoje, i područje Primorja, u suvremenim dubrovačkim dokumentima zvanog Terre Nuove. Središte knežije…',               img:'images/foto-knezev-dvor-slano.jpg',  href:'index.html#karta' },
      { k:'Konavle',    n:'Sokol grad u Konavlima', rv:'9–18 h', d:'U posjed ove utvrde Dubrovčani su praktički ušli tek 1420. godine; od tad počinju kontinuirani radovi na njenoj dogradnji, preuređenju, pojačanju, naoružavanju i održavanju. Važno je napomenuti da Dubrovčani utvrdu Sokol redovito nazivaju kastel, a njezina zapovjednika kastelan (ili kapetan). U dokumentima…',    img:'images/foto-sokol-grad.jpg',         href:'index.html#karta' },
      { k:'Konavle',    n:'Knežev dvor u Pridvorju', rv:'9–17 h', img:'images/foto-knezev-dvor-pridvorje.jpg', d:'Knežev dvor u Pridvorju ili „Gospodski gaj“, kako ga se u mnogim dubrovačkim dokumentima naziva, bio je sjedište kneza u Konavlima kojeg je Dubrovačka Republika dala izgraditi uz selo Sveti Martin nakon što je 1427. godine uspostavila cjelokupnu vlast nad Konavlima. Knez koji je vladao konavoskom knežijom…',          href:'index.html#karta' },
      { k:'Otok Lopud', n:'Knežev dvor na Lopudu', rv:'10–17 h', d:'Od osnutka Lopudske knežije 1456. do izgradnje kneževa dvora na Lopudu prošlo je više od pola stoljeća. Godine 1475. Senat odlučuje kupiti zemlju za izgradnju dvora, ali je odluka tri godine kasnije poništena. Konačno je 23. srpnja 1505. donesena odluka o kupnji terena u vlasništvu crkve za gradnju kneževe rezidencije…',          img:'images/foto-knezev-dvor-lopud.jpg', href:'index.html#karta' }
      ]
    };
  };
  window.ulaznice = function () {
    return {
      i: 0,
      timer: null,
      tickets: [
        { k:'Jedna ulaznica, tri lokaliteta', n:'Zidine, Lovrjenac i Zapadno predziđe', d:'Ulaznica vrijedi na dan kupnje, a djeca do 7 godina ulaze besplatno.', h:'8.00 – 19.30', img:'images/foto-gradske-zidine.jpg', href:'lokalitet-gradske-zidine.html' },
        { k:'Dubrovnik', n:'Tvrđava Lovrjenac', d:'Ulaz je uključen u ulaznicu za gradske zidine — hrid je pet minuta hoda od vrata Pile.', h:'8.00 – 19.00', img:'images/foto-lovrjenac.jpg', href:'lokalitet-lovrjenac.html' },
        { k:'Ston', n:'Stonske zidine', d:'Najdulji obrambeni sklop u Europi — posebna ulaznica za Veliki Kaštio i Korunu.', h:'8.00 – 18.30', img:'images/foto-stonske-zidine.jpg', href:'index.html#karta' },
        { k:'Konavle', n:'Sokol grad', d:'Utvrda u konavoskom kršu s obnovljenim postavom i vidikovcem.', h:'9.00 – 18.00', img:'images/foto-sokol-grad.jpg', href:'index.html#karta' }
      ],
      go(n) { this.i = (n + this.tickets.length) % this.tickets.length; },
      next() { this.go(this.i + 1); },
      prev() { this.go(this.i - 1); },
      start() { this.stop(); this.timer = setInterval(() => this.next(), 6000); },
      stop() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
    };
  };
  window.karta = function () {
    return {
      region: 'dubrovnik',
      cityOn: null,
      regions: [
      { id:'dubrovnik', n:'Dubrovnik',  c:'3', t:'' },
      { id:'ston',      n:'Ston',       c:'1', t:'1 h automobilom iz Dubrovnika.' },
      { id:'slano',     n:'Slano',      c:'1', t:'45 min automobilom iz Dubrovnika.' },
      { id:'konavle',   n:'Konavle',    c:'2', t:'35 min automobilom iz Dubrovnika.' },
      { id:'lopud',     n:'Otok Lopud', c:'1', t:'15 min brodom iz Dubrovnika.' }
      ],
      pins: [
      { i:0, n:'Gradske zidine',    en:'City Walls',         x:61,   y:24.5, tail:22, img:'images/map/city-walls.png',     photo:'images/foto-gradske-zidine.jpg',  d:'Dva kilometra neprekinutog obrambenog prstena oko staroga grada.', dist:'Ulaz Pile · u starom gradu',        href:'lokalitet-gradske-zidine.html' },
      { i:2, n:'Tvrđava Lovrjenac', en:'Lovrjenac Fortress', x:17,   y:52.5, tail:50, img:'images/map/city-lovrjenac.png', photo:'images/foto-lovrjenac.jpg',       d:'Tvrđava na 37 metara visokoj litici zapadno od zidina.',           dist:'5 min hoda od vrata Pile',          href:'lokalitet-lovrjenac.html' },
      { i:1, n:'Zapadno predziđe',  en:'Western Outer Wall', x:36.7, y:71.5, tail:25, img:'images/map/city-predzide.png',  photo:'images/foto-zapadno-predzide.jpg', d:'Vanjski obrambeni pojas pred vratima od Pila.',      dist:'Uz zapadni ulaz na zidine',         href:'lokalitet-zapadno-predzide.html' }
      ],
      spots: [
      { i:0, l:36, t:5,  w:58, h:82, z:10 },
      { i:2, l:8,  t:46, w:21, h:34, z:20 },
      { i:1, l:24, t:66, w:14, h:26, z:20 }
      ],
      sites: [
      { k:'D', n:'Stonske zidine',        p:'Ston',       d:'Najduže zidine u Europi',       img:'images/foto-stonske-zidine.jpg' },
      { k:'E', n:'Knežev dvor Slano',     p:'Slano',      d:'Renesansna ljetna rezidencija', img:'images/foto-knezev-dvor-slano.jpg' },
      { k:'F', n:'Sokol grad',            p:'Konavle',    d:'Utvrda u konavoskom kršu',      img:'images/foto-sokol-grad.jpg' },
      { k:'G', n:'Knežev dvor Pridvorje', p:'Konavle',    d:'Knežev dvor u srcu Konavala',   img:'images/foto-knezev-dvor-pridvorje.jpg' },
      { k:'H', n:'Knežev dvor Lopud',     p:'Otok Lopud', d:'Ljetnikovac na otoku Lopudu',   img:'images/foto-knezev-dvor-lopud.jpg' },
      ]
    };
  };
