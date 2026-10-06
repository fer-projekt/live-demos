import { useI18n } from '../../i18n'
import { categoryImages, img } from '../../data/site'
import { useInquiry } from '../../context/Inquiry'
import { Arrow, Eyebrow, Reveal } from '../ui/primitives'

/**
 * Phase-1 B2B catalogue: categories without prices. Categories come from the dictionaries and
 * `categoryImages`, so a new category is one data entry, not a new component.
 */
export function Industries() {
  const { t } = useI18n()
  const { open } = useInquiry()
  return (
    <section id="industries" className="scroll-mt-[72px] bg-paper py-[clamp(88px,10vw,160px)] text-ink" aria-labelledby="industries-title">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow className="mb-6 text-steel-2">{t.industries.eyebrow}</Eyebrow>
            <h2 id="industries-title" className="h-section text-[clamp(2.2rem,4.6vw,4.4rem)]">
              {t.industries.title}
            </h2>
          </Reveal>
          <p className="max-w-[44ch] text-[17px] text-steel-2">{t.industries.intro}</p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.industries.categories.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[6px] bg-white">
                <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                  <img
                    src={img(categoryImages[c.id])}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="h-section text-[24px]">{c.title}</h3>
                  <ul className="grid gap-1.5 text-[15px] text-steel-2">
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[10px] h-px w-3 shrink-0 bg-blue" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => open('buyer', c.id)}
                    className="group mt-auto inline-flex items-center gap-2 self-start pt-4 text-[14px] font-medium text-blue-deep"
                  >
                    {t.industries.request} <Arrow />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
