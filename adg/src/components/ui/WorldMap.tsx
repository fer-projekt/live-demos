import { motion, useReducedMotion } from 'motion/react'
import map from '../../data/map.json'
import { cityLabel, corridorMeta } from '../../data/site'
import { useI18n } from '../../i18n'
import type { CorridorId } from '../../data/site'

type Route = { id: string; corridor: string; mode: string; d: string }
const routes = map.routes as Route[]
const cities = map.cities as unknown as Record<string, [number, number]>

// Shipments travel along the main sea lanes toward the Adriatic; duration ~ route length
const SHIPMENTS: { id: string; dur: number; delay: number }[] = [
  { id: 'asia-main', dur: 16, delay: 0 },
  { id: 'asia-main', dur: 16, delay: 8 },
  { id: 'africa-west', dur: 13, delay: 2 },
  { id: 'africa-east', dur: 6, delay: 1 },
  { id: 'africa-north', dur: 5, delay: 3 },
  { id: 'med-east', dur: 5, delay: 0.5 },
  { id: 'med-west', dur: 6, delay: 2.5 },
]

/**
 * Dotted map of Africa, Europe and Asia with ADG's trade corridors converging on the Adriatic.
 * Geometry is pre-computed at build time (scripts in /mapgen), so the page ships no map library.
 */
export function WorldMap({
  highlight = null,
  labels = false,
  className = '',
  viewBox = `0 0 ${map.width} ${map.height}`,
  title,
  draw = true,
}: {
  highlight?: CorridorId | null
  labels?: boolean
  className?: string
  viewBox?: string
  title: string
  draw?: boolean
}) {
  const reduce = useReducedMotion()
  const { locale } = useI18n()
  const dim = (c: string) => highlight !== null && c !== highlight && c !== 'cee'
  const labelled = new Set<string>(['zagreb', 'rijeka', ...(highlight ? corridorMeta[highlight].cities : [])])
  const [zx, zy] = cities.zagreb

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <path d={map.dots} stroke="#2b343f" strokeWidth="3.3" strokeLinecap="round" fill="none" />
      <path d={map.eu} stroke="#4b5663" strokeWidth="3.3" strokeLinecap="round" fill="none" />

      {/* corridors */}
      {routes.map((r, i) => {
        const land = r.mode === 'land'
        const faded = dim(r.corridor)
        return (
          <g key={r.id} style={{ opacity: faded ? 0.12 : 1, transition: 'opacity 500ms' }}>
            <motion.path
              d={r.d}
              fill="none"
              stroke={land ? '#ffffff' : 'var(--color-blue)'}
              strokeOpacity={land ? 0.55 : 0.6}
              strokeWidth={land ? 1.1 : 1.4}
              initial={reduce || !draw ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: land ? 1 : 2.4, delay: land ? 2.2 + i * 0.05 : 0.3 + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
            />
            {!reduce && !land && (
              <path
                d={r.d}
                fill="none"
                stroke="var(--color-blue-2)"
                strokeWidth="1.6"
                strokeDasharray="2 18"
                strokeLinecap="round"
                style={{ animation: `dash-flow 1.6s linear infinite` }}
              />
            )}
          </g>
        )
      })}

      {/* moving shipments (SMIL keeps this off the JS thread) */}
      {!reduce &&
        SHIPMENTS.map((s, i) => {
          const r = routes.find((x) => x.id === s.id)!
          if (dim(r.corridor)) return null
          return (
            <circle key={i} r="3.2" fill="#ffffff">
              <animateMotion dur={`${s.dur}s`} begin={`${s.delay + 2}s`} repeatCount="indefinite" path={r.d} />
            </circle>
          )
        })}

      {/* cities */}
      {Object.entries(cities).map(([id, [x, y]]) => {
        if (id === 'zagreb') return null
        const show = labels && labelled.has(id)
        return (
          <g key={id}>
            <circle cx={x} cy={y} r={show ? 3 : 2} fill={show ? '#ffffff' : '#8d97a3'} />
            {show && (
              <text x={x + 7} y={y + 4} fill="#c9d0d8" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="0.04em">
                {cityLabel(id, locale)}
              </text>
            )}
          </g>
        )
      })}

      {/* Zagreb hub */}
      <g transform={`translate(${zx} ${zy})`}>
        {!reduce &&
          [0, 1].map((i) => (
            <circle
              key={i}
              r="9"
              fill="none"
              stroke="var(--color-blue-2)"
              strokeWidth="1.2"
              style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: `pulse-ring 2.8s ${i * 1.4}s ease-out infinite` }}
            />
          ))}
        <circle r="5.5" fill="var(--color-blue)" stroke="#ffffff" strokeWidth="1.5" />
        {labels && (
          <text x="10" y="-10" fill="#ffffff" fontSize="13" fontWeight="600" fontFamily="var(--font-mono)" letterSpacing="0.04em">
            {cityLabel('zagreb', locale).toUpperCase()}
          </text>
        )}
      </g>
    </svg>
  )
}
