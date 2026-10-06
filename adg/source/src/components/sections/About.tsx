import { useI18n } from '../../i18n'
import { ZAGREB, cityLabel, distances, img } from '../../data/site'
import { Eyebrow, Reveal } from '../ui/primitives'

const SIZE = 440
const C = SIZE / 2
const R = 190 // radius for 600 km
const scale = (km: number) => (km / 600) * R

/** Zagreb at the centre; each line points in the real compass direction, length proportional to road distance. */
function DistanceDiagram({ label, locale }: { label: string; locale: string }) {
  const cos = Math.cos((ZAGREB.lat * Math.PI) / 180)
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full max-w-[460px]" role="img" aria-label={label}>
      {[100, 300, 500].map((km) => (
        <g key={km}>
          <circle cx={C} cy={C} r={scale(km)} fill="none" stroke="var(--color-ink)" strokeOpacity="0.1" strokeDasharray="2 4" />
          <text x={C - 4} y={C + scale(km) + 12} textAnchor="end" fontSize="10" fill="var(--color-steel-2)" fontFamily="var(--font-mono)">
            {km} km
          </text>
        </g>
      ))}
      {distances.map((d) => {
        const dx = (d.lon - ZAGREB.lon) * cos
        const dy = d.lat - ZAGREB.lat
        const a = Math.atan2(dy, dx)
        const x = C + Math.cos(a) * scale(d.km)
        const y = C - Math.sin(a) * scale(d.km)
        const right = x >= C
        return (
          <g key={d.id}>
            <line x1={C} y1={C} x2={x} y2={y} stroke={d.port ? 'var(--color-blue)' : 'var(--color-ink)'} strokeOpacity={d.port ? 1 : 0.35} strokeWidth={d.port ? 2 : 1.2} />
            <circle cx={x} cy={y} r={d.port ? 5 : 3.5} fill={d.port ? 'var(--color-blue)' : 'var(--color-ink)'} />
            <text x={x + (right ? 9 : -9)} y={y - 2} textAnchor={right ? 'start' : 'end'} fontSize="13" fontWeight="600" fill="var(--color-ink)">
              {cityLabel(d.id, locale)}
            </text>
            <text x={x + (right ? 9 : -9)} y={y + 13} textAnchor={right ? 'start' : 'end'} fontSize="11" fill="var(--color-steel-2)" fontFamily="var(--font-mono)">
              ≈ {d.km} km
            </text>
          </g>
        )
      })}
      <circle cx={C} cy={C} r="9" fill="var(--color-blue)" stroke="#fff" strokeWidth="2.5" />
      <text x={C} y={C + 28} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--color-ink)" fontFamily="var(--font-mono)" letterSpacing="0.06em">
        {cityLabel('zagreb', locale).toUpperCase()}
      </text>
    </svg>
  )
}

export function About() {
  const { t, locale } = useI18n()
  return (
    <section id="about" className="scroll-mt-[72px] bg-white py-[clamp(88px,10vw,160px)] text-ink" aria-labelledby="about-title">
      <div className="shell grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <Reveal>
            <Eyebrow className="mb-6 text-steel-2">{t.about.eyebrow}</Eyebrow>
            <h2 id="about-title" className="h-section text-[clamp(2.2rem,4.6vw,4.4rem)]">
              {t.about.title}
            </h2>
          </Reveal>
          <div className="grid max-w-[60ch] gap-4 text-[17px] leading-relaxed text-steel-2">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="flex flex-wrap gap-2">
            {t.about.values.map((v) => (
              <li key={v} className="rounded-[3px] border border-line px-3 py-1.5 text-[14px]">
                {v}
              </li>
            ))}
          </ul>
          <div className="mt-4 aspect-[16/9] overflow-hidden rounded-[6px]">
            <img src={img('port-sunset')} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:pt-4">
          <div className="rounded-[6px] bg-paper p-6 sm:p-10">
            <h3 className="h-section text-[clamp(1.6rem,2.6vw,2.2rem)]">{t.about.whyTitle}</h3>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-steel-2">{t.about.whyBody}</p>
            <div className="mt-6 flex justify-center">
              <DistanceDiagram label={t.about.diagramLabel} locale={locale} />
            </div>
            <p className="mono mt-2 text-[10.5px] text-steel-2">
              {t.network.distancesTitle} · {t.network.distancesNote}
            </p>
          </div>
          <dl className="grid grid-cols-2 border-t border-line">
            {t.about.facts.map((f, i) => (
              <div key={f.k} className={`flex flex-col gap-1 border-b border-line py-5 ${i % 2 ? 'border-l pl-6' : 'pr-6'}`}>
                <dt className="mono text-[11px] text-steel-2">{f.k}</dt>
                <dd className="text-[20px] font-medium tracking-[-0.01em]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
