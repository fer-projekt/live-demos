import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useI18n } from '../../i18n'
import { img } from '../../data/site'
import { Eyebrow, Reveal } from '../ui/primitives'

/** Source → Grow. The line fills as you read down the page, so the sequence reads as one movement. */
export function Process() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" className="relative isolate scroll-mt-[72px] overflow-hidden bg-graphite py-[clamp(88px,10vw,160px)] text-white" aria-labelledby="process-title">
      <img src={img('bulk-aerial')} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-graphite)_0%,rgb(14_17_20/0.7)_40%,var(--color-graphite)_100%)]" />

      <div className="shell">
        <Reveal>
          <Eyebrow className="mb-6 text-steel">{t.process.eyebrow}</Eyebrow>
          <h2 id="process-title" className="h-section max-w-[18ch] text-[clamp(2.2rem,4.6vw,4.4rem)]">
            {t.process.title}
          </h2>
        </Reveal>

        {/* the business story in one line */}
        <ol className="no-scrollbar mt-10 flex gap-x-3 gap-y-2 overflow-x-auto whitespace-nowrap pb-2 md:flex-wrap md:overflow-visible" aria-label={t.process.eyebrow}>
          {t.process.chain.map((c, i) => (
            <li key={c} className="mono flex items-center gap-3 text-[11.5px] text-white/80">
              <span className="rounded-[3px] border border-line-dark bg-graphite/60 px-3 py-2">{c}</span>
              {i < t.process.chain.length - 1 && (
                <span aria-hidden="true" className="text-blue-2">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <div ref={ref} className="relative mt-16">
          <div aria-hidden="true" className="absolute left-0 right-0 top-0 hidden h-px bg-line-dark xl:block">
            <motion.div className="h-full origin-left bg-blue" style={reduce ? undefined : { scaleX: fill }} />
          </div>
          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {t.process.steps.map((s, i) => (
              <Reveal as="li" key={s.k} delay={i * 0.06} className="relative flex flex-col gap-4 border-t border-line-dark pt-6 xl:border-t-0 xl:pt-8">
                <span aria-hidden="true" className="absolute -top-[5px] left-0 hidden size-[9px] rounded-full border border-blue bg-graphite xl:block" />
                <span className="mono tabular text-[12px] text-blue-2">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h-section text-[26px] uppercase tracking-[-0.01em]">{s.k}</h3>
                <p className="text-[15px] leading-relaxed text-white/65">{s.v}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
