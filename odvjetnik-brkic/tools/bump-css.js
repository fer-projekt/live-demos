// Podiže verziju u linku na stylesheet (css/output.css?v=N) na svim stranicama.
// Bez toga preglednik zna vratiti zapamćen stari CSS nakon builda.
// Pokreće se sam uz `npm run build`, a ručno s `npm run bump`.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const RE = /(href="css\/output\.css\?v=)(\d+)(")/;

const pages = fs.readdirSync(root).filter(f => f.endsWith('.html'));

// Najveća zatečena verzija + 1, pa su sve stranice uvijek na istom broju.
let next = 1;
for (const p of pages) {
  const m = fs.readFileSync(path.join(root, p), 'utf8').match(RE);
  if (m) next = Math.max(next, Number(m[2]) + 1);
}

let changed = 0;
const missing = [];
for (const p of pages) {
  const file = path.join(root, p);
  const src = fs.readFileSync(file, 'utf8');
  if (!RE.test(src)) { missing.push(p); continue; }
  const out = src.replace(RE, `$1${next}$3`);
  if (out !== src) { fs.writeFileSync(file, out); changed++; }
}

console.log(`css verzija -> v=${next} (${changed}/${pages.length} stranica)`);
if (missing.length) {
  console.warn(`bez linka na css/output.css?v=N: ${missing.join(', ')}`);
}
