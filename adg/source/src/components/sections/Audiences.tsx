import { useI18n } from '../../i18n'
import { img } from '../../data/site'
import { useInquiry } from '../../context/Inquiry'
import type { Segment } from '../../context/Inquiry'
import { Arrow, Button, Eyebrow, Reveal } from '../ui/primitives'

/** The two primary audiences side by side, each ending in its own inquiry path. */
export function Audiences() {
  const { t } = useI18n()
  const { open } = useInquiry()
  const panels: { seg: Segment; data: typeof t.audiences.manufacturer; image: string }[] = [
    { seg: 'manufacturer', data: t.audiences.manufacturer, image: 'cranes-sunset' },
    { seg: 'buyer', data: t.audiences.buyer, image: 'bulk-port' },
  ]
  return (
    <section className="grid bg-graphite text-white lg:grid-cols-2" aria-label={`${t.audiences.manufacturer.eyebrow} · ${t.audiences.buyer.eyebrow}`}>
      {panels.map(({ seg, data, image }, i) => (
        <article key={seg} className={`group relative isolate flex min-h-[640px] flex-col justify-end overflow-hidden ${i === 1 ? 'lg:border-l lg:border-line-dark' : ''}`}>
          <img src={img(image)} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45 transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-graphite)_30%,rgb(14_17_20/0.4)_100%)]" />
          <Reveal className="flex flex-col gap-6 px-[var(--gutter)] py-16 lg:px-14 lg:py-20">
            <Eyebrow className="text-steel">{data.eyebrow}</Eyebrow>
            <h2 className="h-section max-w-[16ch] text-[clamp(2rem,3.6vw,3.4rem)]">{data.title}</h2>
            <p className="max-w-[44ch] text-[16px] text-white/70">{data.body}</p>
            <div>
              <p className="mono mb-3 text-[11px] text-steel">{data.roleTitle}</p>
              <ul className="flex flex-wrap gap-2">
                {data.roles.map((r) => (
                  <li key={r} className="rounded-[3px] border border-white/20 px-3 py-1.5 text-[13.5px]">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2">
              <Button variant={seg === 'manufacturer' ? 'blue' : 'white'} onClick={() => open(seg)}>
                {data.cta} <Arrow />
              </Button>
            </div>
          </Reveal>
        </article>
      ))}
    </section>
  )
}
