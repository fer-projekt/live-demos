// Language-independent data. New markets, categories or people are added here
// (plus their labels in each dictionary), without touching the components.

// Images live in src/assets/img so Vite fingerprints them (and inlines them in the single-file build).
const images = import.meta.glob('../assets/img/*.webp', { eager: true, import: 'default', query: '?url' }) as Record<string, string>
export const img = (name: string) => images[`../assets/img/${name}.webp`]

export const domain = 'adriaticdistributiongroup.com'

export type CorridorId = 'asia' | 'africa' | 'med'

export const corridorMeta: Record<CorridorId, { image: string; cities: string[] }> = {
  asia: { image: 'shanghai', cities: ['shanghai', 'shenzhen', 'singapore', 'mumbai', 'portsaid'] },
  africa: { image: 'harbor-city', cities: ['lagos', 'abidjan', 'dakar', 'casablanca', 'alexandria', 'mombasa'] },
  med: { image: 'port-dusk', cities: ['istanbul', 'piraeus', 'valencia'] },
}

// City names for map labels (shown only on the network map)
export const cityNames: Record<string, string> = {
  shanghai: 'Shanghai', shenzhen: 'Shenzhen', singapore: 'Singapore', mumbai: 'Mumbai', portsaid: 'Suez · Port Said',
  lagos: 'Lagos', abidjan: 'Abidjan', dakar: 'Dakar', casablanca: 'Casablanca', alexandria: 'Alexandria', mombasa: 'Mombasa',
  istanbul: 'Istanbul', piraeus: 'Piraeus', valencia: 'Valencia',
  zagreb: 'Zagreb', rijeka: 'Rijeka', ploce: 'Ploče',
  ljubljana: 'Ljubljana', vienna: 'Vienna', budapest: 'Budapest', belgrade: 'Belgrade', sarajevo: 'Sarajevo', munich: 'Munich', prague: 'Prague',
}

export const serviceImages: Record<string, string> = {
  sourcing: 'factory',
  trade: 'container-ship',
  distribution: 'warehouse',
  logistics: 'terminal-night',
  market: 'city-night',
  partnerships: 'boardroom',
}

export const categoryImages: Record<string, string> = {
  construction: 'cement-silos',
  industrial: 'molten-steel',
  marine: 'ship-bow',
  additional: 'containers-top',
}

// Approximate road distances from Zagreb (km) with lon/lat for the radial diagram
export const distances = [
  { id: 'rijeka', km: 165, lon: 14.44, lat: 45.33, port: true },
  { id: 'ljubljana', km: 140, lon: 14.5, lat: 46.05 },
  { id: 'vienna', km: 370, lon: 16.37, lat: 48.21 },
  { id: 'budapest', km: 345, lon: 19.04, lat: 47.5 },
  { id: 'belgrade', km: 395, lon: 20.46, lat: 44.8 },
  { id: 'sarajevo', km: 400, lon: 18.41, lat: 43.86 },
  { id: 'munich', km: 560, lon: 11.58, lat: 48.14 },
]
export const ZAGREB = { lon: 15.98, lat: 45.81 }

// Localised city names where they differ from English
const cityOverrides: Record<string, Record<string, string>> = {
  hr: { vienna: 'Beč', budapest: 'Budimpešta', belgrade: 'Beograd', munich: 'München', prague: 'Prag', shanghai: 'Šangaj', singapore: 'Singapur', alexandria: 'Aleksandrija', piraeus: 'Pirej', portsaid: 'Suez · Port Said' },
  fr: { vienna: 'Vienne', belgrade: 'Belgrade', munich: 'Munich', prague: 'Prague', singapore: 'Singapour', alexandria: 'Alexandrie', piraeus: 'Le Pirée', valencia: 'Valence' },
  zh: { zagreb: '萨格勒布', rijeka: '里耶卡', ploce: '普洛切', ljubljana: '卢布尔雅那', vienna: '维也纳', budapest: '布达佩斯', belgrade: '贝尔格莱德', sarajevo: '萨拉热窝', munich: '慕尼黑', prague: '布拉格', shanghai: '上海', shenzhen: '深圳', singapore: '新加坡', mumbai: '孟买', portsaid: '苏伊士 · 塞得港', lagos: '拉各斯', abidjan: '阿比让', dakar: '达喀尔', casablanca: '卡萨布兰卡', alexandria: '亚历山大', mombasa: '蒙巴萨', istanbul: '伊斯坦布尔', piraeus: '比雷埃夫斯', valencia: '瓦伦西亚' },
}
export const cityLabel = (id: string, locale: string) => cityOverrides[locale]?.[id] ?? cityNames[id]
