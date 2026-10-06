import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { useI18n } from '../../i18n'
import { domain, img } from '../../data/site'
import { useInquiry } from '../../context/Inquiry'
import type { Segment } from '../../context/Inquiry'
import { Arrow, Button, Eyebrow } from '../ui/primitives'

const SEGMENTS: Segment[] = ['manufacturer', 'buyer', 'partner']

/** Segmented business inquiry: the form adapts to manufacturer, buyer or partner. */
export function Contact() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const { segment, setSegment, category, setCategory } = useInquiry()
  const f = t.contact.fields
  const [data, setData] = useState({ company: '', name: '', email: '', country: '', extra: '', partnerType: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const set = (k: keyof typeof data) => (v: string) => setData((d) => ({ ...d, [k]: v }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const er = t.contact.errors
    if (data.company.trim().length < 2) return setError(er.company)
    if (data.name.trim().length < 2) return setError(er.name)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return setError(er.email)
    if (!consent) return setError(er.consent)
    setError(null)
    // TODO: POST to the inquiry endpoint / CRM, tagged with `segment` for routing.
    setSent(true)
  }

  const onTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const n = (SEGMENTS.indexOf(segment) + (e.key === 'ArrowRight' ? 1 : -1) + 3) % 3
    setSegment(SEGMENTS[n])
    document.getElementById(`seg-${SEGMENTS[n]}`)?.focus()
  }

  const input = 'h-12 w-full rounded-[4px] border border-white/15 bg-graphite px-4 text-[15px] text-white outline-none transition-colors placeholder:text-steel focus:border-blue'
  const label = 'grid gap-2 text-[13px] text-steel'

  return (
    <section id="contact" className="relative isolate scroll-mt-[72px] overflow-hidden bg-graphite py-[clamp(88px,10vw,160px)] text-white" aria-labelledby="contact-title">
      <img src={img('ship-minimal')} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-graphite)_35%,rgb(14_17_20/0.75))]" />

      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col gap-6">
          <Eyebrow className="text-steel">{t.contact.eyebrow}</Eyebrow>
          <h2 id="contact-title" className="h-section text-[clamp(2.4rem,5vw,4.8rem)]">
            {t.contact.title}
          </h2>
          <p className="max-w-[40ch] text-[17px] text-white/70">{t.contact.intro}</p>
          <dl className="mt-6 grid gap-4 border-t border-line-dark pt-6 text-[15px]">
            <div>
              <dt className="mono text-[11px] text-steel">{t.contact.direct}</dt>
              <dd className="mt-1">{t.contact.address}</dd>
              <dd className="text-white/70">{domain}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-[6px] border border-line-dark bg-graphite-2/95 p-5 sm:p-8">
          <div role="tablist" aria-label={t.contact.eyebrow} onKeyDown={onTabKey} className="grid gap-2 sm:grid-cols-3">
            {SEGMENTS.map((s) => {
              const on = s === segment
              const seg = t.contact.segments[s]
              return (
                <button
                  key={s}
                  id={`seg-${s}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => {
                    setSegment(s)
                    setSent(false)
                  }}
                  className={`flex flex-col gap-1 rounded-[4px] border p-4 text-left transition-colors ${on ? 'border-blue bg-blue/10' : 'border-line-dark hover:border-white/30'} ${s === 'partner' ? 'sm:opacity-90' : ''}`}
                >
                  <span className="text-[15px] font-semibold">{seg.label}</span>
                  <span className="text-[12.5px] leading-snug text-steel">{seg.hint}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div key="sent" role="status" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[420px] flex-col justify-center gap-5 pt-8">
                <span className="grid size-12 place-items-center rounded-full bg-blue">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <p className="h-section max-w-[24ch] text-[28px]">{t.contact.success}</p>
                <p className="mono text-[10.5px] text-steel">{t.contact.demo}</p>
                <button type="button" onClick={() => setSent(false)} className="self-start text-[14px] underline underline-offset-4">
                  {t.contact.newInquiry}
                </button>
              </motion.div>
            ) : (
              <motion.form key={`form-${segment}`} onSubmit={submit} noValidate initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 pt-8 sm:grid-cols-2" aria-describedby={error ? 'inq-error' : undefined}>
                <label className={label} htmlFor="inq-company">
                  {f.company}
                  <input id="inq-company" autoComplete="organization" value={data.company} onChange={(e) => set('company')(e.target.value)} className={input} />
                </label>
                <label className={label} htmlFor="inq-country">
                  {f.country}
                  <input id="inq-country" autoComplete="country-name" value={data.country} onChange={(e) => set('country')(e.target.value)} className={input} />
                </label>
                <label className={label} htmlFor="inq-name">
                  {f.name}
                  <input id="inq-name" autoComplete="name" value={data.name} onChange={(e) => set('name')(e.target.value)} className={input} />
                </label>
                <label className={label} htmlFor="inq-email">
                  {f.email}
                  <input id="inq-email" type="email" autoComplete="email" value={data.email} onChange={(e) => set('email')(e.target.value)} className={input} />
                </label>

                {segment !== 'partner' ? (
                  <>
                    <label className={label} htmlFor="inq-category">
                      {f.category}
                      <select id="inq-category" value={category} onChange={(e) => setCategory(e.target.value)} className={`${input} cursor-pointer`}>
                        <option value="">—</option>
                        {t.industries.categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className={label} htmlFor="inq-extra">
                      {segment === 'manufacturer' ? f.capacity : f.volume}
                      <input id="inq-extra" value={data.extra} onChange={(e) => set('extra')(e.target.value)} className={input} />
                    </label>
                  </>
                ) : (
                  <label className={`${label} sm:col-span-2`} htmlFor="inq-ptype">
                    {f.partnerType}
                    <select id="inq-ptype" value={data.partnerType} onChange={(e) => set('partnerType')(e.target.value)} className={`${input} cursor-pointer`}>
                      <option value="">—</option>
                      {f.partnerTypes.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                )}

                <label className={`${label} sm:col-span-2`} htmlFor="inq-message">
                  {f.message}
                  <textarea id="inq-message" rows={4} value={data.message} onChange={(e) => set('message')(e.target.value)} className={`${input} h-auto resize-y py-3`} />
                </label>
                <label className="flex items-start gap-3 text-[13px] leading-snug text-white/70 sm:col-span-2" htmlFor="inq-consent">
                  <input id="inq-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-[var(--color-blue)]" />
                  {f.consent}
                </label>
                <p id="inq-error" role="alert" className="min-h-5 text-[14px] text-[#ff8a8a] sm:col-span-2">
                  {error}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                  <p className="mono text-[10.5px] text-steel">{t.contact.demo}</p>
                  <Button type="submit">
                    {f.submit} <Arrow />
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
