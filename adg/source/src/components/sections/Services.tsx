import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { useI18n } from '../../i18n'
import { img, serviceImages } from '../../data/site'
import { Eyebrow, Reveal } from '../ui/primitives'

/**
 * Six service pillars as an index: names on the left, the selected pillar's
 * picture and scope on the right. On phones each pillar opens in place.
 */
export function Services() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const items = t.services.items
  const s = items[active]

  return (
    <section id="services" className="scroll-mt-[72px] bg-white py-[clamp(88px,10vw,160px)] text-ink" aria-labelledby="services-title">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow className="mb-6 text-steel-2">{t.services.eyebrow}</Eyebrow>
            <h2 id="services-title" className="h-section text-[clamp(2.2rem,4.6vw,4.4rem)]">
              {t.services.title}
            </h2>
          </Reveal>
          <p className="max-w-[46ch] text-[17px] text-steel-2">{t.services.intro}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <ul className="border-t border-line">
            {items.map((it, i) => {
              const on = i === active
              return (
                <li key={it.id} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia('(min-width: 1024px)').matches && setActive(i)}
                    aria-expanded={on}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`h-section text-[clamp(1.35rem,2.2vw,2rem)] transition-colors ${on ? 'text-ink' : 'text-ink/40 group-hover:text-ink/70'}`}>{it.title}</span>
                    <span
                      aria-hidden="true"
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? 'rotate-0 border-blue bg-blue text-white' : '-rotate-45 border-line text-ink/50'}`}
                    >
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                        <path d="M4 12h15m-5-6 6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                  {/* phones: content opens under the title */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        className="overflow-hidden lg:hidden"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <img src={img(serviceImages[it.id])} alt="" loading="lazy" className="aspect-[16/9] w-full rounded-[6px] object-cover" />
                        <p className="mt-4 text-[16px] text-steel-2">{it.body}</p>
                        <ul className="mt-4 grid gap-2 pb-6 text-[15px]">
                          {it.points.map((p) => (
                            <li key={p} className="flex gap-3">
                              <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-blue" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-graphite">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={s.id}
                    src={img(serviceImages[s.id])}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={s.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-[1fr_1fr] gap-8 pt-6"
                >
                  <p className="text-[17px] leading-relaxed">{s.body}</p>
                  <ul className="grid content-start gap-2 text-[15px] text-steel-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[10px] h-px w-3 shrink-0 bg-blue" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
