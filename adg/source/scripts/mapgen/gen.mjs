import fs from 'fs'
import { geoNaturalEarth1, geoContains, geoPath } from 'd3-geo'
import { line, curveCatmullRom } from 'd3-shape'
import { feature } from 'topojson-client'
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/land-50m.json'))
const land = feature(topo, topo.objects.land)
const W = 1200, H = 720
const pts = []
for (let lon = -24; lon <= 140; lon += 4) { pts.push([lon, -36], [lon, 62]) }
for (let lat = -36; lat <= 62; lat += 4) { pts.push([-24, lat], [140, lat]) }
const bbox = { type: 'MultiPoint', coordinates: pts }
const proj = geoNaturalEarth1().rotate([-58, 0]).fitExtent([[0, 0], [W, H]], bbox)
const P = ([lon, lat]) => proj([lon, lat]).map((v) => +v.toFixed(1))

// Dots
const step = 8.5
let d = ''
let n = 0
for (let y = step / 2; y < H; y += step) {
  for (let x = step / 2; x < W; x += step) {
    const ll = proj.invert([x, y])
    if (ll && geoContains(land, ll)) { d += `M${x.toFixed(1)} ${y.toFixed(1)}h0`; n++ }
  }
}
// Europe EU region highlight (rough): dots inside lon -10..30, lat 36..60
let eu = ''
for (let y = step / 2; y < H; y += step) for (let x = step / 2; x < W; x += step) {
  const ll = proj.invert([x, y])
  if (ll && ll[0] > -10 && ll[0] < 28 && ll[1] > 36 && ll[1] < 58 && geoContains(land, ll)) eu += `M${x.toFixed(1)} ${y.toFixed(1)}h0`
}

const cities = {
  zagreb: [15.98, 45.81], rijeka: [14.44, 45.33], koper: [13.73, 45.55], ploce: [17.43, 43.05],
  shanghai: [121.47, 31.23], shenzhen: [114.1, 22.5], singapore: [103.82, 1.35], mumbai: [72.88, 19.08],
  lagos: [3.39, 6.45], abidjan: [-4.0, 5.3], dakar: [-17.44, 14.69], casablanca: [-7.59, 33.57], alexandria: [29.92, 31.2], mombasa: [39.67, -4.04],
  piraeus: [23.63, 37.94], istanbul: [28.98, 41.0], valencia: [-0.33, 39.47], portsaid: [32.3, 31.26],
  ljubljana: [14.5, 46.05], vienna: [16.37, 48.21], budapest: [19.04, 47.5], belgrade: [20.46, 44.8], sarajevo: [18.41, 43.86], munich: [11.58, 48.14], prague: [14.42, 50.08],
}
const C = Object.fromEntries(Object.entries(cities).map(([k, v]) => [k, P(v)]))

const ADRIATIC = [[18.8, 39.8], [17.2, 41.6], [15.2, 43.3], [14.2, 44.8], [14.44, 45.3]]
const routes = [
  { id: 'asia-main', corridor: 'asia', mode: 'sea', pts: [[121.8, 30.8], [123, 26], [119.5, 22.5], [114.5, 19], [109.5, 11.5], [105, 2.5], [103.9, 1.2], [99, 5], [92, 6], [81, 5.3], [70, 9.5], [60, 12.5], [51, 13], [43.4, 12.6], [40, 16.5], [37.5, 21], [34.5, 27], [32.55, 29.9], [32.35, 31.4], [28, 33.2], [22, 35.2], ...ADRIATIC] },
  { id: 'asia-shenzhen', corridor: 'asia', mode: 'sea', pts: [[114.1, 22.3], [114.5, 19]] },
  { id: 'asia-mumbai', corridor: 'asia', mode: 'sea', pts: [[72.6, 18.8], [68, 15], [60, 12.5]] },
  { id: 'africa-west', corridor: 'africa', mode: 'sea', pts: [[3.3, 6.2], [1, 4.8], [-4, 4.9], [-9, 4.6], [-13.5, 7.5], [-17.8, 13.5], [-17.9, 17], [-17.3, 22], [-13.8, 27.5], [-10.5, 31.5], [-8.5, 34.5], [-5.6, 35.95], [-1, 37], [5, 37.6], [10.5, 37.6], [12.5, 36.8], [15.8, 36.6], ...ADRIATIC] },
  { id: 'africa-east', corridor: 'africa', mode: 'sea', pts: [[39.9, -4.2], [42.5, -1], [48, 5], [51.5, 11.8], [47, 12], [43.4, 12.6]] },
  { id: 'africa-north', corridor: 'africa', mode: 'sea', pts: [[29.9, 31.4], [25, 33.6], [20.5, 36.2], [18.8, 39.8]] },
  { id: 'med-east', corridor: 'med', mode: 'sea', pts: [[28.9, 40.9], [26.6, 40.3], [25.3, 39], [23.7, 37.8], [22.2, 36.6], [20.8, 37.6], [18.8, 39.8]] },
  { id: 'med-west', corridor: 'med', mode: 'sea', pts: [[-0.2, 39.4], [4, 39], [8.8, 38.6], [12, 37.9], [15.6, 37.3], [16.8, 38.6], [18.8, 39.8]] },
]
const curve = line().curve(curveCatmullRom.alpha(0.5))
const out = routes.map((r) => ({ id: r.id, corridor: r.corridor, mode: r.mode, d: curve(r.pts.map(P)).replace(/(\d+\.\d{1})\d+/g, '$1') }))
// Land distribution from Rijeka/Zagreb hub
const land_ = [['rijeka', 'zagreb'], ['zagreb', 'ljubljana'], ['zagreb', 'vienna'], ['zagreb', 'budapest'], ['zagreb', 'belgrade'], ['zagreb', 'munich'], ['zagreb', 'prague'], ['ploce', 'sarajevo']]
for (const [a, b] of land_) {
  const [x1, y1] = C[a], [x2, y2] = C[b]
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.18
  out.push({ id: `land-${b}`, corridor: 'cee', mode: 'land', d: `M${x1} ${y1}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2} ${y2}` })
}
fs.writeFileSync('map.json', JSON.stringify({ width: W, height: H, dots: d, eu, cities: C, routes: out }))
console.log('dots', n, 'size', fs.statSync('map.json').size)
// Preview SVG
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#101418"/><path d="${d}" stroke="#3a4450" stroke-width="3.2" stroke-linecap="round"/><path d="${eu}" stroke="#6b7a8c" stroke-width="3.2" stroke-linecap="round"/>${out.map(r=>`<path d="${r.d}" fill="none" stroke="${r.mode==='land'?'#fff':'#3d7bff'}" stroke-width="1.6"/>`).join('')}${Object.entries(C).map(([k,[x,y]])=>`<circle cx="${x}" cy="${y}" r="3" fill="#fff"/><text x="${x+5}" y="${y-4}" fill="#9aa" font-size="10" font-family="sans-serif">${k}</text>`).join('')}</svg>`
fs.writeFileSync('preview.svg', svg)
