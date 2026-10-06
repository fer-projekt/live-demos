// Turns dist-single/index.html into a page fragment for hosts that supply their
// own <!doctype>/<html>/<head>/<body> skeleton (e.g. a Claude Artifact).
import fs from 'node:fs'
const src = fs.readFileSync('dist-single/index.html', 'utf8')
const head = src.match(/<head>([\s\S]*?)<\/head>/)[1]
const body = src.match(/<body>([\s\S]*?)<\/body>/)[1]
const keep = [
  ...head.matchAll(/<title>[\s\S]*?<\/title>/g),
  ...head.matchAll(/<meta name="(description|theme-color)"[^>]*>/g),
  ...head.matchAll(/<style[\s\S]*?<\/style>/g),
].map((m) => m[0])
const scripts = [...head.matchAll(/<script[\s\S]*?<\/script>/g)].map((m) => m[0])
const out = [...keep, body.trim(), ...scripts].join('\n')
fs.mkdirSync('dist-artifact', { recursive: true })
fs.writeFileSync('dist-artifact/page.html', out)
console.log('dist-artifact/page.html', Math.round(out.length / 1024) + ' KB')
