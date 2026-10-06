import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useI18n } from '../../i18n'
import { corridorMeta, img } from '../../data/site'
import type { CorridorId } from '../../data/site'
import { ChainIcon, Eyebrow, Reveal } from '../ui/primitives'
import { WorldMap } from '../ui/WorldMap'

export function Network() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [active, setActive] = useState<CorridorId>('asia')
  const corridors = t.network.corridors
  const c = corridors.find((x) => x.id === active)!
  const ids = corridors.map((x) => x.id as CorridorId)

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const n = (ids.indexOf(active) + (e.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length
    setActive(ids[n])
    document.getElementById(`corridor-tab-${ids[n]}`)?.focus()
  }

  return (
    <section id="network" className="scroll-mt-[72px] bg-graphite-2 py-[clamp(88px,10vw,160px)] text-white" aria-labelledby="network-title">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow className="mb-6 text-steel">{t.network.eyebrow}</Eyebrow>
            <h2 id="network-title" className="h-section text-[clamp(2.2rem,4.6vw,4.4rem)]">
              {t.network.title}
            </h2>
          </Reveal>
          <p className="max-w-[46ch] text-[17px] text-white/70">{t.network.intro}</p>
        </div>

        <div role="tablist" aria-label={t.network.eyebrow} onKeyDown={onKey} className="no-scrollbar mt-12 flex gap-2 overflow-x-auto border-b border-line-dark">
          {corridors.map((x) => {
            const on = x.id === active
            return (
              <button
                key={x.id}
                id={`corridor-tab-${x.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls="corridor-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(x.id as CorridorId)}
                className={`relative shrink-0 px-1 pb-4 pr-6 text-left text-[15px] transition-colors ${on ? 'text-white' : 'text-steel hover:text-white'}`}
              >
                {x.name}
                {on && <motion.span layoutId="corridor-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-blue" />}
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="relative min-w-0 overflow-hidden rounded-[6px] border border-line-dark bg-graphite">
            <WorldMap highlight={active} labels title={`${c.name}: ${c.route}`} className="block aspect-[16/10] w-full" viewBox="60 20 1000 625" draw={false} />
            <p className="mono absolute bottom-4 left-4 flex items-center gap-2 rounded-[3px] bg-graphite/90 px-3 py-2 text-[11px] text-white">
              <span className="inline-block size-2 rounded-full bg-blue" />
              {t.network.hub}
            </p>
          </div>

          <div id="corridor-panel" role="tabpanel" aria-labelledby={`corridor-tab-${active}`} className="flex min-w-0 flex-col gap-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-5"
              >
                <div className="relative aspect-[16/8] overflow-hidden rounded-[6px]">
                  <img src={img(corridorMeta[active].image)} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(14_17_20/0.8),transparent_60%)]" />
                  <p className="mono absolute bottom-3 left-4 text-[11px] text-white/85">{c.origins}</p>
                </div>
                <h3 className="h-section text-[28px]">{c.name}</h3>
                <p className="mono text-[11.5px] leading-relaxed text-blue-2 normal-case">{c.route}</p>
                <p className="text-[16px] text-white/70">{c.body}</p>
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-line-dark pt-5">
              <p className="mono mb-4 text-[11px] text-steel">{t.network.chainTitle}</p>
              <ol className="grid grid-cols-5 gap-1">
                {t.network.chain.map((label, i) => (
                  <li key={label} className="relative flex flex-col items-start gap-2">
                    <motion.span
                      key={`${active}-${i}`}
                      className="grid size-11 place-items-center rounded-[4px] border border-line-dark text-white"
                      initial={reduce ? false : { backgroundColor: 'rgba(58,115,255,0)', borderColor: 'rgba(255,255,255,0.1)' }}
                      animate={{ backgroundColor: ['rgba(58,115,255,0)', 'rgba(58,115,255,0.9)', 'rgba(58,115,255,0.12)'], borderColor: ['rgba(255,255,255,0.1)', 'rgba(58,115,255,1)', 'rgba(58,115,255,0.5)'] }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.28, times: [0, 0.3, 1] }}
                    >
                      <ChainIcon i={i} className="size-5" />
                    </motion.span>
                    <span className="text-[12px] leading-tight text-white/75">{label}</span>
                    {i < 4 && <span aria-hidden="true" className="absolute left-12 top-[21px] h-px w-[calc(100%-52px)] bg-line-dark" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
