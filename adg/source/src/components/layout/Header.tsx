import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { localeOrder, locales, useI18n } from '../../i18n'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Adriatic Distribution Group">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="3" fill="var(--color-blue)" />
        {/* three lanes converging on one point: sourcing markets meeting at the Adriatic */}
        <path d="M6 9 L20 16 M6 16 H20 M6 23 L20 16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="23" cy="16" r="3" fill="#fff" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.02em]">ADG</span>
        {!compact && <span className="mono mt-1 hidden text-[9.5px] text-steel sm:block">Adriatic Distribution Group</span>}
      </span>
    </a>
  )
}

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  return (
    <div role="group" aria-label={t.nav.language} className={`flex items-center rounded-[4px] border border-white/15 p-0.5 ${className}`}>
      {localeOrder.map((l) => (
        <button
          key={l}
          type="button"
          lang={locales[l].meta.lang}
          aria-pressed={l === locale}
          title={locales[l].meta.name}
          onClick={() => setLocale(l)}
          className={`h-8 min-w-9 rounded-[3px] px-2 text-[12px] font-medium transition-colors ${l === locale ? 'bg-white text-ink' : 'text-steel hover:text-white'}`}
        >
          {locales[l].meta.label}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { t } = useI18n()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 24))

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  const links = [
    ['#network', t.nav.network],
    ['#services', t.nav.services],
    ['#process', t.nav.process],
    ['#industries', t.nav.industries],
    ['#about', t.nav.about],
  ] as const

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] text-white transition-colors duration-500 ${
          solid || open ? 'border-b border-line-dark bg-graphite' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="relative text-[14px] text-white/80 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitch className="hidden md:flex" />
            <a href="#contact" className="hidden h-10 items-center rounded-[4px] bg-blue px-4 text-[13px] font-medium transition-colors hover:bg-blue-deep sm:inline-flex">
              {t.nav.inquiry}
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-[4px] border border-white/15 xl:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.nav.close : t.nav.menu}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
                {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-x-0 bottom-0 top-[calc(72px+env(safe-area-inset-top,0px))] z-40 flex flex-col overflow-y-auto bg-graphite text-white xl:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile" className="shell flex flex-col pt-6">
              {[...links, ['#contact', t.nav.contact] as const].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="h-section border-b border-line-dark py-4 text-[32px]">
                  {label}
                </a>
              ))}
            </nav>
            <div className="shell mt-auto flex flex-col gap-4 pb-[calc(32px+env(safe-area-inset-bottom,0px))] pt-8">
              <LanguageSwitch className="self-start" />
              <a href="#contact" onClick={() => setOpen(false)} className="inline-flex h-12 items-center justify-center rounded-[4px] bg-blue text-[15px] font-medium">
                {t.nav.inquiry}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
