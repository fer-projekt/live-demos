// Re-skins the Denart template stylesheet to the Dental Vidović brand.
// The template hardcodes every colour, so this introduces a token layer first and
// then rewrites the hexes to reference it — after this, palette changes are one-liners.
const fs = require('fs');

const FILE = 'F:/wamp/www/live-demos/dental-vidovic/css/style.css';
const BACKUP = FILE + '.denart-orig';

if (!fs.existsSync(BACKUP)) fs.copyFileSync(FILE, BACKUP);
let css = fs.readFileSync(BACKUP, 'utf8');   // always transform from the pristine copy
const before = css;

const TOKENS = `

/* ======= Brand tokens — Dental Vidović ======= */
/* Palette and fonts come from the client branding kit (branding/branding kit.png).
   Every colour below used to be hardcoded across ~540 sites in this file. */
:root {
    /* Brand */
    --gold: #e0aa48;            /* primary accent, surfaces */
    --gold-dark: #c8912f;       /* hover / pressed */
    --gold-soft: #f3dcae;       /* tints, dividers, underlines */
    --ink: #2d3333;             /* headings and dark sections */
    --ink-deep: #1e2222;        /* deepest background */
    --cream: #f6e5cc;           /* brand cream */
    --cream-soft: #fdf7ee;      /* large section backgrounds — cream is heavy at full strength */
    --muted: #6f6a63;           /* body copy, 5.2:1 on white */
    --white: #ffffff;

    /* Channels, for the translucent shadows the template builds out of 8-digit hex. */
    --gold-rgb: 224, 170, 72;
    --ink-rgb: 45, 51, 51;

    /* Text sitting on a gold surface. Brand gold is only 2.1:1 against white, so
       anything on top of it is inked instead. */
    --on-gold: #2d3333;

    /* Accent for text. Brand gold is unreadable as small text on white, so the
       default is a darker gold (4.9:1); dark containers below restore full gold.
       Custom properties inherit, so nested elements pick the right one up. */
    --accent: #96681c;

    /* Type — branding kit specifies Lora, with Georgia as the fallback. */
    --font-display: "Lora", Georgia, "Times New Roman", serif;
    --font-body: "Jost", sans-serif;

    scroll-behavior: auto;
}
/* Only genuinely dark backdrops belong here. Gold surfaces (.scrolling, .bg-turquoise)
   and the light footer are NOT dark — full-strength gold on them is 2.1:1. */
.bg-navy,
.bg-ink,
.pricing,
.appointment,
[data-overlay-dark] {
    --accent: var(--gold);
}
`;

/* ---------- 1. tokens ---------- */
// Fold the template's bare :root (it only carried scroll-behavior) into the token block.
css = css.replace(/:root \{\s*scroll-behavior: auto;\s*\}\n?/, '');
css = css.replace(/(------------------------------------------ \*\/\n)/, '$1' + TOKENS);
if (!css.includes('--font-display')) throw new Error('token block was not inserted');

/* ---------- 2. property-aware colour mapping ---------- */
// The accent reads differently as text than as a surface, so text properties get the
// context-sensitive --accent and everything else gets the literal brand gold.
const TEXT_PROPS = /^(color|-webkit-text-fill-color)$/;

function mapHex(hex, prop) {
  const h = hex.toLowerCase();
  const isText = TEXT_PROPS.test(prop);
  switch (h) {
    case '#00bde0': return isText ? 'var(--accent)' : 'var(--gold)';
    case '#fd961e': return isText ? 'var(--accent)' : 'var(--gold)';
    case '#031b4e': return 'var(--ink)';
    case '#0e1323': return 'var(--ink-deep)';
    case '#0f0c31': return 'var(--ink-deep)';
    case '#6e778c': return 'var(--muted)';
    case '#eff9ff': return 'var(--cream-soft)';
    case '#f4f4f4': return 'var(--cream-soft)';
    case '#f8f5f0': return 'var(--cream-soft)';
    case '#efeef6': return 'var(--cream-soft)';
    case '#e4e2f3': return 'var(--gold-soft)';
    case '#e8e8d4': return 'var(--gold-soft)';
    case '#ffd27d': return 'var(--gold-soft)';
    case '#b2daf2': return 'var(--gold-soft)';
    default: return null;
  }
}

// A handful of shadows use 8-digit hex (colour + alpha). Those can't reference a var,
// so rewrite them to rgba() over the channel tokens before the 6-digit pass runs.
const ALPHA_HEX = {
  '#0f0c3105': 'rgba(var(--ink-rgb), 0.02)',
  '#00bde01f': 'rgba(var(--gold-rgb), 0.12)',
  '#00bde012': 'rgba(var(--gold-rgb), 0.07)',
};
let alphaMapped = 0;
for (const [hex, repl] of Object.entries(ALPHA_HEX)) {
  const re = new RegExp(hex, 'gi');
  alphaMapped += (css.match(re) || []).length;
  css = css.replace(re, repl);
}
if (/#[0-9a-fA-F]{8}\b/.test(css)) {
  throw new Error('unhandled 8-digit hex: ' + css.match(/#[0-9a-fA-F]{8}\b/g).join(', '));
}

// The old accent also appears as rgba() channels (23 borders and dividers), which the
// hex pass below cannot see. These are decorative, so the alpha carries over unchanged.
const RGBA_MAP = [
  [/rgba\(0, *189, *224, *([\d.]+)\)/g, 'rgba(var(--gold-rgb), $1)'],   // turquoise accent
  [/rgba\(3, *27, *78, *([\d.]+)\)/g, 'rgba(var(--ink-rgb), $1)'],      // navy
  [/rgba\(110, *119, *140, *([\d.]+)\)/g, 'rgba(111, 106, 99, $1)'],    // muted grey
];
let rgbaMapped = 0;
for (const [re, repl] of RGBA_MAP) {
  rgbaMapped += (css.match(re) || []).length;
  css = css.replace(re, repl);
}

// Collapse the 11-stop light-blue gradient into a cream-to-white wash first, so the
// per-declaration pass below doesn't have to deal with it stop by stop.
css = css.replace(
  /linear-gradient\(to bottom, *#eff9ff[^)]*\)/gi,
  'linear-gradient(to bottom, var(--cream-soft), var(--white))'
);

// Walk declarations so each hex is rewritten in the context of its own property.
let mapped = 0, skipped = new Map();
css = css.replace(/([-\w]+)(\s*:\s*)([^;{}]*#[0-9a-fA-F]{3,6}[^;{}]*)/g, (m, prop, sep, value) => {
  const newValue = value.replace(/#[0-9a-fA-F]{6}\b/g, (hex) => {
    const t = mapHex(hex, prop);
    if (t) { mapped++; return t; }
    skipped.set(hex.toLowerCase(), (skipped.get(hex.toLowerCase()) || 0) + 1);
    return hex;
  });
  return prop + sep + newValue;
});

/* ---------- 3. readable text on gold surfaces ---------- */
// Turquoise was light enough to carry white text; brand gold is not (2.1:1). Every
// rule that paints a gold surface, plus every rule targeting something *inside* one,
// gets its white text re-inked.

// 3a. collect the selectors that paint gold.
const goldSelectors = new Set();
const RULE = /([^{}]+)\{([^{}]*)\}/g;
let m2;
while ((m2 = RULE.exec(css))) {
  // Gold arrives as a flat value or inside a gradient. `var(--gold)` with its closing
  // paren keeps `var(--gold-soft)` out.
  if (!/background(-color|-image)?\s*:[^;]*var\(--gold\)/.test(m2[2])) continue;
  // A rule can list several selectors; each one paints gold on its own.
  for (const s of m2[1].split(',')) {
    const clean = s.replace(/\/\*[\s\S]*?\*\//g, '').trim().replace(/\s+/g, ' ');
    if (clean && !clean.startsWith('@')) goldSelectors.add(clean);
  }
}

// A selector sits on gold if it *is* a gold selector or descends from one. Matching is
// done compound by compound rather than by raw string prefix, so `.scrolling` also
// covers `.scrolling.scrolling-ticker .content span`. Comparing whole compounds keeps
// `.blog .item:hover .icon .arrow` (gold) from dragging in `.blog .item:hover .cont h4`
// (white text on a white card).
const compounds = (sel) => sel
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .trim()
  .replace(/\s*>\s*/g, ' ')
  .split(/\s+/)
  .filter(Boolean);

const goldCompounds = [...goldSelectors].map(compounds).filter(c => c.length);

const onGoldSurface = (sel) => {
  const s = compounds(sel);
  if (!s.length) return false;
  return goldCompounds.some((g) => {
    if (g.length > s.length) return false;
    for (let i = 0; i < g.length - 1; i++) if (s[i] !== g[i]) return false;
    // The deepest gold compound may be narrowed further (`.scrolling` → `.scrolling.x`).
    return s[g.length - 1].startsWith(g[g.length - 1]);
  });
};

let onGold = 0;
const inked = [];
css = css.replace(/([^{}]+)\{([^{}]*)\}/g, (m, sel, body) => {
  const parts = sel.split(',');
  if (!parts.some(onGoldSurface)) return m;
  let touched = false;
  const fixed = body
    .replace(/(^|;)(\s*(?:color|-webkit-text-fill-color)\s*:\s*)#fff(?:fff)?\b/gi, (mm, semi, decl) => {
      touched = true; onGold++;
      return semi + decl + 'var(--on-gold)';
    })
    // Translucent whites (icon and label tints) need the same treatment. Ink is much
    // darker than white, so a faded ink loses contrast far faster — text keeps at least
    // 0.9 alpha (0.8 ink on gold is only 4.16:1), decoration keeps its original value.
    .replace(/([-\w]+)(\s*:\s*)([^;]*rgba\(255, *255, *255, *[\d.]+\)[^;]*)/g, (mm, prop, sep, value) => {
      const isText = /^(color|-webkit-text-fill-color)$/.test(prop);
      const next = value.replace(/rgba\(255, *255, *255, *([\d.]+)\)/g, (m3, a) => {
        onGold++;
        return `rgba(var(--ink-rgb), ${isText ? Math.max(parseFloat(a), 0.9) : a})`;
      });
      if (next !== value) touched = true;
      return prop + sep + next;
    });
  if (touched) inked.push(sel.trim().replace(/\s+/g, ' ').slice(0, 70));
  return sel + '{' + fixed + '}';
});

/* ---------- 3b. move the collapsed-navbar breakpoint to match navbar-expand-xl ---------- */
// The markup uses navbar-expand-xl, so the burger appears below 1200px. All 28 of the
// template's collapsed-navbar rules sit in a single @media (max-width: 991px) block that
// contains nothing else, so its condition can be widened without dragging along unrelated
// mobile styling (the other 18 blocks at that width are not navbar rules and stay put).
// Both sides of the boundary move: the collapsed-bar rules (max-width: 991px) and the
// expanded-bar rules (min-width: 992px, which carry the hover-to-open dropdown behaviour).
// Leaving the latter behind would give 992-1199px desktop dropdowns inside a burger menu.
const BOUNDARY = [
  { re: /(@media[^{]*max-width: *991px[^{]*)\{/g, from: 'max-width: 991px', to: 'max-width: 1199.98px', expect: 1 },
  { re: /(@media[^{]*min-width: *992px[^{]*)\{/g, from: 'min-width: 992px', to: 'min-width: 1200px', expect: 1 },
];
for (const step of BOUNDARY) {
  let moved = 0;
  css = css.replace(step.re, (full, head, offset) => {
    // read the block body to decide whether this block is navbar-only
    let depth = 1, k = offset + full.length;
    for (; k < css.length; k++) {
      if (css[k] === '{') depth++;
      else if (css[k] === '}') { depth--; if (depth === 0) break; }
    }
    const body = css.slice(offset + full.length, k);
    const sels = [...body.matchAll(/([^{}]+)\{/g)].map(x => x[1].trim()).filter(Boolean);
    const navSels = sels.filter(s => /navbar|logo|nav-scroll|dropdown/.test(s)).length;
    if (!sels.length || navSels !== sels.length) return full;   // mixed or unrelated, leave it
    moved++;
    return head.replace(step.from, step.to) + '{';
  });
  if (moved !== step.expect) {
    throw new Error(`expected ${step.expect} navbar-only block for "${step.from}", moved ${moved}`);
  }
}

/* ---------- 4. fonts ---------- */
const jost = (css.match(/font-family: *"Jost", *sans-serif/g) || []).length;
css = css.replace(/font-family: *"Jost", *sans-serif/g, 'font-family: var(--font-body)');

/* ---------- 5. brand overrides appended last so they win ---------- */
css += `

/* ======= Brand overrides — Dental Vidović ======= */
/* Appended last so it beats the template rules above without editing them in place. */

/* Display type: Lora for headings and the big numerals, Jost stays for body copy. */
h1, h2, h3, h4, h5, h6,
.section-title,
.banner-header h1,
.header h1,
.header h2,
.pricing .item .head .title,
.pricing .item .head .price,
.pricing2 .box2 .price,
.team .item .text .name,
.team-details .item .wrap h4,
.blog .item .cont h4,
.post .cont h4,
.footer-top .item .title,
.footer-top .item .phone,
blockquote {
    font-family: var(--font-display);
    letter-spacing: -0.01em;
}

/* Buttons on gold: the background comes from a rule that carries no colour of its
   own, so the nested text spans have to be inked separately. */
.durubtn2,
.durubtn2 .text,
.durubtn2 i,
.durubtn:hover,
.durubtn:hover .text,
.durubtn:hover i,
.durubtn3:hover,
.durubtn3:hover .text,
.durubtn3:hover i,
.navbar .navbar-right .durubtn5,
.navbar .navbar-right .durubtn5 .text,
.navbar .navbar-right .durubtn5 i,
.navbar .navbar-right .durubtn5:hover,
.navbar .navbar-right .durubtn5:hover .text,
.navbar .navbar-right .durubtn5:hover i,
.navbar .navbar-right .phonex i,
.footer-top .item .subscribe form button,
.blog-sidebar .search form button,
.appointment .help .icon,
.call-button .icon,
.info-box .item .icon,
.owl-theme .owl-prev,
.owl-theme .owl-next {
    color: var(--on-gold);
}

/* Hover state for the gold buttons — darken the surface rather than inverting it. */
.durubtn2:hover {
    background: var(--ink);
    color: var(--white);
}
.durubtn2:hover .text,
.durubtn2:hover i {
    color: var(--white);
}

/* The gold mark in the logo carries its own colour; keep the lockup crisp. The lockup was
   sitting a few px off centre in the bar — inline-box metrics rather than any one margin,
   so the wrapper and anchor centre it with flex instead of chasing a padding value. */
.logo-img {
    height: auto;
    display: block;
}
.logo-wrapper,
.logo-wrapper .logo {
    display: flex;
    align-items: center;
}

/* Full-bleed quote image the client asked to bring back. The quote is baked into the
   artwork, so no overlay or text goes on top of it. */
.quote-band {
    background: var(--cream-soft);
    line-height: 0;
}
.quote-band img {
    display: block;
    width: 100%;
    max-width: 1180px;
    height: auto;
    margin: 0 auto;
}

/* Review cards carry no patient photo, so the name block sits on its own. The template's
   35px left margin was reserving room for the avatar that .img-curv used to hold. */
.testimonials .item .info .text-box {
    margin-left: 0;
    padding-left: 0;
}

/* The menu carries nine Croatian labels plus a phone number and a button — more than
   the template's six English ones. Tighten the spacing and stop mid-label wrapping. */
.navbar .navbar-nav .nav-link,
.navbar .navbar-right .phonex {
    white-space: nowrap;
}
@media only screen and (min-width: 1200px) {
    .navbar .navbar-nav .nav-link {
        padding-left: 12px;
        padding-right: 12px;
        font-size: 15px;
    }
    .navbar .navbar-right .phonex {
        font-size: 16px;
    }
}

/* Logo scales in three steps: 300px on wide screens, 200px across the rest of the expanded
   range, and the template's 143px once the menu collapses at 1200px. Both the resting and
   the scrolled bar are set — the template sizes .logo-img and .nav-scroll .logo-img
   separately, so touching only one would make the lockup resize as soon as the page moves. */
@media only screen and (min-width: 1600px) {
    .logo-img,
    .nav-scroll .logo-img {
        width: 300px;
    }
}
@media only screen and (min-width: 1200px) and (max-width: 1599.98px) {
    .logo-img,
    .nav-scroll .logo-img {
        width: 200px;
    }
}

/* Full-width bar: the markup uses .container-fluid instead of .container, so the inset
   comes from here rather than from Bootstrap's centred max-width. Logo sits left, the menu
   group is pushed right by ms-auto in the markup. */
.navbar .container-fluid {
    padding-left: 40px;
    padding-right: 40px;
}

/* Shorter bar once the menu collapses (navbar-expand-xl switches at 1200px). The template
   keeps 100px with 28px of wrapper padding around a 20px logo, which is a lot of empty
   height on a phone. The hero's min-height tracks the new bar height. */
@media only screen and (max-width: 1199.98px) {
    .navbar {
        height: 70px;
    }
    /* The bar's container is a wrapping flex row. When the menu opens it grows to fit the
       expanded list, and align-items:center would then centre the first row inside that
       tall box — dragging the logo and burger upward. Pinning both to the bar height keeps
       them put whether the menu is open or closed. */
    .navbar .container-fluid {
        padding-left: 15px;
        padding-right: 15px;
    }
    /* Horizontal inset now lives on the container, so the wrapper only keeps its height. */
    .logo-wrapper,
    .nav-scroll .logo-wrapper {
        height: 70px;
        padding: 0;
    }
    /* The template gives the burger a 10px top margin below 768px, which made the flex row
       80px tall inside a 70px bar and pushed the logo 5px down. Its height handles the
       alignment now, so the margin goes. */
    .navbar .navbar-toggler {
        height: 70px;
        margin: 0;
        display: flex;
        align-items: center;
    }
    .header {
        min-height: calc(95vh - 70px);
    }
    .header.hero-static .item {
        min-height: calc(95vh - 70px);
    }
}

/* The template's cursor-following blob is a desktop flourish; on a touch screen it jumps to
   wherever you tapped and lingers there, which reads as a glitch when opening the burger.
   Off below 1200px, i.e. wherever the menu is collapsed. Nothing in the stylesheet sets
   cursor:none, so the real pointer is unaffected. */
@media only screen and (max-width: 1199.98px) {
    .cursor {
        display: none;
    }
}

/* Utility: drop an element on narrow screens. Bootstrap's nearest breakpoint is 576px, so
   this is its own rule. The .98 avoids sitting exactly on 640 — browsers round subpixel
   viewport widths, so a plain 639px can still match at a nominal 640 and vice versa. */
@media only screen and (max-width: 639.98px) {
    .hide-under-640 {
        display: none !important;
    }
}

/* Static hero. The slider is down to one slide, so Owl no longer runs here and the height
   the carousel used to provide has to come from the slide itself. .valign already handles
   the vertical centring. */
.header.hero-static .item {
    position: relative;
    width: 100%;
    min-height: calc(95vh - 100px);
    background-size: cover;
    background-position: top;
}

/* Hero heading. The template shipped the slider with an h2, so the page had no h1 at all;
   the first slide is now the h1. The template's own .header h1 is a different hero variant
   (21px label above a 200px span), so the slider styling is restated here and that span
   treatment neutralised. Slides 2 and 3 stay h2 and must track the same sizes. */
.header h1 {
    color: var(--white) !important;
    font-size: 75px;
    line-height: 1em;
    white-space: normal;
    word-break: normal;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0;
}
.header h1 span {
    font-size: inherit;
    line-height: inherit;
    display: inline;
    font-weight: inherit;
    letter-spacing: 0;
    color: var(--accent) !important;
}
@media only screen and (max-width: 1599px) {
    .header h1,
    .header h2 {
        font-size: 60px;
    }
}
@media only screen and (max-width: 991px) {
    .header h1,
    .header h2 {
        font-size: 45px;
    }
}

/* Below 1440px the bar gets tight, so the phone number is dropped from it. The number
   stays reachable in the appointment band, the contact cards and the "Zatraži termin"
   button right next to it. */
@media only screen and (max-width: 1439px) {
    .navbar .navbar-right .phonex {
        display: none;
    }
}

/* Prices here are words ("Besplatno", "Na upit"), not two-digit numbers, so the
   template's display size overflows into the frequency label. */
.pricing .item .head .price-wrapper {
    flex-wrap: wrap;
    row-gap: 4px;
}
.pricing .item .head .price {
    font-size: 40px;
}
.pricing .item .head .frequency {
    white-space: normal;
    flex-basis: 100%;   /* keep the qualifier on its own line in all three cards */
}

/* The template pulls .contact-box up over a banner header. Here it follows the service
   ticker, which the negative margin would swallow. */
.contact-box {
    margin-top: 0;
    padding-top: 60px;
}

/* Hover states that flip a gold surface to ink. The re-inking pass above coloured these
   glyphs for the resting gold circle; on an ink circle a dark glyph is invisible, so they
   have to go white. Two glyphs per arrow: the span, plus the ::before that fades in as the
   span fades out. .blog is deliberately absent — its circle stays gold on hover. */
.services .item:hover .icon .arrow,
.services .item:hover .icon .arrow span,
.services .item:hover .icon .arrow::before,
.services2 .item:hover .icon .arrow,
.services2 .item:hover .icon .arrow span,
.services2 .item:hover .icon .arrow::before,
.services3 .item:hover .icon .arrow,
.services3 .item:hover .icon .arrow span,
.services3 .item:hover .icon .arrow::before,
.services4 .item:hover .icon .arrow,
.services4 .item:hover .icon .arrow span,
.services4 .item:hover .icon .arrow::before,
.team .item:hover .wrapper .icon .arrow,
.team .item:hover .wrapper .icon .arrow span,
.team .item:hover .wrapper .icon .arrow::before,
.faqs .item:hover .icon .arrow,
.faqs .item:hover .icon .arrow span,
.faqs .item:hover .icon .arrow::before,
.call-button .icon:hover i,
.footer-top .item .subscribe form button:hover {
    color: var(--white);
}

/* Equal-height slides in the services carousel. Card height otherwise follows its own
   description, so neighbouring slides sit 350-403px tall and the row looks ragged. Owl
   lays items out as floats, so the stage has to become a flex row before stretch applies;
   the inline widths Owl writes are preserved with flex: 0 0 auto. */
.services2 .owl-stage {
    display: flex;
}
.services2 .owl-item {
    display: flex;
    flex: 0 0 auto;
}
.services2 .owl-item > .item {
    display: flex;
    width: 100%;
}
.services2 .owl-item > .item > .row {
    flex: 1 1 auto;
    width: 100%;
}

/* Two adjacent .section-padding blocks each contribute 120px, so every section boundary
   opens a 240px hole. Margins aren't involved — nothing collapses here, the padding just
   stacks. Trim the top half on the following section; a single section keeps its full
   breathing room. */
.section-padding + .section-padding {
    padding-top: 60px;
}

/* The template's base input styling enumerates types (password, email, text, file) and
   misses tel and date, so those two fields rendered as bare browser defaults next to the
   styled ones. Matching by exclusion instead, so future field types inherit it too. */
.contact-form input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]),
.contact-form .form-control,
.contact-form .form-select {
    max-width: 100%;
    margin-bottom: 15px;
    padding: 11px 11px 11px 45px;
    height: auto;
    background-color: transparent;
    box-shadow: none;
    display: block;
    width: 100%;
    line-height: 1.75em;
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 400;
    color: var(--muted);
    background-image: none;
    border: 1px solid rgba(var(--gold-rgb), 0.2);
    border-radius: 5px;
}
.contact-form .form-select {
    /* keep room for the native dropdown arrow */
    padding-right: 32px;
}

/* Fix the news card images to one ratio. The client photos come in different formats
   (a 4:3 diagram next to 16:9 photos), which made the cards different heights. */
.blog .item .img {
    aspect-ratio: 16 / 9;
}
.blog .item .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

/* Same for the review carousel — quote lengths differ, so the gold cards would sit at
   different heights next to each other. */
.testimonials .owl-stage {
    display: flex;
}
.testimonials .owl-item {
    display: flex;
    flex: 0 0 auto;
}
.testimonials .owl-item > .item {
    display: flex;
    flex-direction: column;
    width: 100%;
}
`;

fs.writeFileSync(FILE, css);

console.log(`hexes mapped:        ${mapped} (+${alphaMapped} translucent, +${rgbaMapped} rgba channels)`);
console.log(`gold surfaces:       ${goldSelectors.size} selectors`);
console.log(`gold-surface text:   ${onGold} declarations re-inked across ${inked.length} rules`);
for (const s of inked) console.log(`    ${s}`);
console.log(`font-family swapped: ${jost} -> var(--font-body)`);
console.log(`size: ${before.length} -> ${css.length} B`);
const leftover = [...skipped.entries()].filter(([h]) => !['#ffffff', '#000000'].includes(h));
console.log(`left as-is: ${leftover.map(([h, n]) => h + '×' + n).join(', ') || '(none)'}`);
const stray = css.match(/#(00bde0|031b4e|6e778c|eff9ff|fd961e|ffd27d|b2daf2|0e1323|0f0c31)/gi);
console.log(`stray brand-mapped hexes remaining: ${stray ? stray.join(', ') : 'none'}`);
