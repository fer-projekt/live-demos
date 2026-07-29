// Builds a clean horizontal Dental Vidović logo out of "DENTAL VIDOVIĆ (2).svg".
// The source is a fake-vector: an embedded transparent PNG mark plus real vector glyph
// paths, sitting on a baked #2d3333 background rect. We drop the background, then re-lay
// the two pieces out side by side using geometry measured in-browser.
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/lukam/Downloads/vidovic/logotip/DENTAL VIDOVIĆ (2).svg';
const OUT = 'F:/wamp/www/live-demos/dental-vidovic/img';

// Measured in Chrome against the source 375x375 viewBox: alpha-scan of a canvas render
// for the mark, union of getBoundingClientRect() for the wordmark glyph groups.
const MARK = { x: 125.75, y: 103.25, w: 123.25, h: 105.25 };
const WORD = { x: 68.18, y: 218.53, w: 239.67, h: 24.57 };

const MARK_H = 42;                       // mark height in the output viewBox
const GAP = 13;                          // space between mark and wordmark
const s = MARK_H / MARK.h;
const wordX = MARK.w * s + GAP;
const wordY = (MARK_H - WORD.h) / 2;     // vertically centre the wordmark on the mark
const VB_W = +(wordX + WORD.w).toFixed(2);

// Walk the root's direct children, tracking nesting depth so multi-level <g> wrappers
// stay intact (a non-greedy regex silently truncates them).
function topLevelChildren(xml) {
  const out = [];
  const tagRe = /<(\/?)([A-Za-z][-\w:]*)([^>]*?)(\/?)>/g;
  let depth = 0, start = -1, m;
  while ((m = tagRe.exec(xml))) {
    const [raw, close, tag, , selfClose] = m;
    if (close) {
      depth--;
      if (depth === 0) { out.push({ tag: tag, raw: xml.slice(start, m.index + raw.length) }); start = -1; }
    } else if (selfClose) {
      if (depth === 0) out.push({ tag: tag, raw: raw });
    } else {
      if (depth === 0) start = m.index;
      depth++;
    }
  }
  if (depth !== 0) throw new Error(`unbalanced markup, depth ended at ${depth}`);
  return out;
}

const svg = fs.readFileSync(SRC, 'utf8').replace(/<metadata>[\s\S]*?<\/metadata>/g, '');
const rootOpen = svg.match(/^<svg[^>]*>/)[0];
const body = svg.slice(rootOpen.length).replace(/<\/svg>\s*$/, '');

const children = topLevelChildren(body);
const defs = children.filter(c => c.tag === 'defs').map(c => c.raw).join('');
// Background = the full-bleed rects; wordmark = the fill="#f5e3ca" groups; mark = the rest.
const glyphs = children.filter(c => c.tag === 'g' && /^<g fill="#f5e3ca"/.test(c.raw)).map(c => c.raw);
const mark = children
  .filter(c => c.tag !== 'defs' && !/^<rect[^>]*x="-37\.5"/.test(c.raw) && !/^<g fill="#f5e3ca"/.test(c.raw))
  .map(c => c.raw).join('');

if (!defs) throw new Error('no <defs> found');
if (glyphs.length < 10) throw new Error(`expected the full wordmark, got ${glyphs.length} glyph groups`);
if (!mark) throw new Error('no mark group left over');

const markT = `scale(${s.toFixed(6)}) translate(${-MARK.x}, ${-MARK.y})`;
const wordT = `translate(${(wordX - WORD.x).toFixed(3)}, ${(wordY - WORD.y).toFixed(3)})`;

function build(fill) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${VB_W} ${MARK_H}" width="${VB_W}" height="${MARK_H}" role="img" aria-label="Dental Vidović">
<title>Dental Vidović</title>
${defs}
<g transform="${markT}">${mark}</g>
<g transform="${wordT}">${glyphs.join('').replace(/fill="#f5e3ca"/g, `fill="${fill}"`)}</g>
</svg>
`;
}

fs.writeFileSync(path.join(OUT, 'logo.svg'), build('#2d3333'));
fs.writeFileSync(path.join(OUT, 'logo-light.svg'), build('#f6e5cc'));
console.log(`viewBox 0 0 ${VB_W} ${MARK_H} | mark scale ${s.toFixed(4)} | ${glyphs.length} glyph groups | defs ${defs.length} B`);
for (const f of ['logo.svg', 'logo-light.svg']) console.log(`  ${f}: ${fs.statSync(path.join(OUT, f)).size} B`);
