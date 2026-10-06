import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useI18n } from '../../i18n'
import { useInquiry } from '../../context/Inquiry'
import { Arrow, Button } from '../ui/primitives'
import { WorldMap } from '../ui/WorldMap'

/** WORLD → CONNECTION first: the network is the opening image, the words come second. */
export function Hero() {
  const { t, locale } = useI18n()
  const { open } = useInquiry()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const mapY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-graphite text-white">
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { scale: mapScale, y: mapY }}>
        <WorldMap title={t.hero.mapLabel} className="absolute inset-x-0 top-[72px] h-[58svh] w-full md:inset-0 md:top-0 md:h-full" viewBox="-420 -40 1560 860" />
      </motion.div>
      {/* shade for legibility, stronger on the text side */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-graphite)_12%,transparent_55%)] md:bg-[linear-gradient(100deg,rgb(14_17_20/0.92)_0%,rgb(14_17_20/0.6)_38%,transparent_70%),linear-gradient(to_top,var(--color-graphite)_4%,transparent_35%)]" />

      <div className="shell mt-auto pb-10 pt-[62svh] md:pb-14 md:pt-40">
        <motion.p
          className="mono mb-8 flex items-center gap-3 text-steel"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span aria-hidden="true" className="inline-block h-px w-6 bg-blue" />
          {t.hero.eyebrow}
        </motion.p>
        <h1 key={locale} className={`h-display max-w-[15ch] ${locale === 'zh' ? 'text-[clamp(2.4rem,5.4vw,5.2rem)]' : 'text-[clamp(2.5rem,5.6vw,6rem)]'}`}>
          {t.hero.lines.map((l, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === t.hero.lines.length - 1 ? 'text-blue-2' : ''}`}
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="mt-8 flex max-w-[640px] flex-col gap-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[18px] leading-relaxed text-white/75">{t.hero.sub}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#network">
              {t.hero.cta} <Arrow />
            </Button>
            <Button variant="ghost" onClick={() => open('manufacturer')}>
              {t.hero.manufacturer}
            </Button>
            <Button variant="ghost" onClick={() => open('buyer')}>
              {t.hero.buyer}
            </Button>
          </div>
        </motion.div>

        <dl className="mt-14 grid grid-cols-2 border-t border-line-dark md:grid-cols-4">
          {t.hero.facts.map((f, i) => (
            <div key={f.k} className={`flex flex-col gap-1.5 py-5 pr-4 ${i > 0 ? 'md:border-l md:border-line-dark md:pl-6' : ''} ${i % 2 ? 'border-l border-line-dark pl-4 md:pl-6' : ''}`}>
              <dt className="mono text-[11px] text-steel">{f.k}</dt>
              <dd className="text-[15px] font-medium">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
