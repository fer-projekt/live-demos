import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n'
import { loadGA4, readConsent, saveConsent } from '../../lib/consent'

/** GDPR cookie banner: nothing but necessary storage until the visitor chooses. */
export function CookieBanner({ forceOpen, onClose }: { forceOpen: boolean; onClose: () => void }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const c = readConsent()
    setAnalytics(c.analytics)
    if (!c.decided) setOpen(true)
    else if (c.analytics) loadGA4()
  }, [])
  useEffect(() => {
    if (forceOpen) setOpen(true)
  }, [forceOpen])

  const done = (a: boolean) => {
    saveConsent(a)
    setAnalytics(a)
    setOpen(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-title"
          className="fixed bottom-4 left-4 right-4 z-[60] mb-[env(safe-area-inset-bottom,0px)] max-w-[420px] rounded-[6px] border border-line-dark bg-graphite-2 p-5 text-white shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)] sm:left-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p id="cookie-title" className="text-[15px] font-semibold">
            {t.cookies.title}
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">{t.cookies.body}</p>
          <div className="mt-4 grid gap-2 border-y border-line-dark py-3 text-[13px]">
            <label className="flex items-center justify-between gap-3 text-white/60">
              {t.cookies.necessary}
              <input type="checkbox" checked disabled className="size-4 accent-[var(--color-blue)]" />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-3" htmlFor="consent-analytics">
              {t.cookies.analytics}
              <input id="consent-analytics" type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="size-4 accent-[var(--color-blue)]" />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => done(true)} className="h-10 rounded-[4px] bg-blue px-4 text-[13px] font-medium hover:bg-blue-deep">
              {t.cookies.accept}
            </button>
            <button type="button" onClick={() => done(false)} className="h-10 rounded-[4px] border border-white/20 px-4 text-[13px] hover:border-white">
              {t.cookies.reject}
            </button>
            <button type="button" onClick={() => done(analytics)} className="h-10 px-2 text-[13px] text-white/70 underline underline-offset-4 hover:text-white">
              {t.cookies.save}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Legal pages as an overlay for now; they become routes (/privacy etc.) when a router is added. */
export function LegalDialog({ index, onClose }: { index: number | null; onClose: () => void }) {
  const { t } = useI18n()
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (index === null) return
    closeRef.current?.focus()
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', k)
      document.documentElement.style.overflow = ''
    }
  }, [index, onClose])

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div className="fixed inset-0 z-[70] flex justify-end bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-title"
            className="h-full w-full max-w-[640px] overflow-y-auto bg-white p-8 pt-[calc(32px+env(safe-area-inset-top,0px))] text-ink sm:p-12"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <h2 id="legal-title" className="h-section text-[32px]">
                {t.footer.legal[index]}
              </h2>
              <button ref={closeRef} type="button" onClick={onClose} className="h-10 shrink-0 rounded-[4px] border border-line px-4 text-[13px]">
                {t.legal.close}
              </button>
            </div>
            <p className="mt-6 rounded-[4px] bg-paper p-4 text-[14px] text-steel-2">{t.legal.placeholder}</p>
            <ol className="mt-8 grid gap-6">
              {t.legal.sections.map((s, i) => (
                <li key={s}>
                  <h3 className="text-[17px] font-semibold">
                    {i + 1}. {s}
                  </h3>
                  <div className="mt-2 grid gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-full rounded bg-paper" />
                    <span className="h-2.5 w-11/12 rounded bg-paper" />
                    <span className="h-2.5 w-3/5 rounded bg-paper" />
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
