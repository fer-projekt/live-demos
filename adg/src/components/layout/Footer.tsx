import { useI18n } from '../../i18n'
import { domain } from '../../data/site'
import { LanguageSwitch, Logo } from './Header'

export function Footer({ onLegal, onCookies }: { onLegal: (i: number) => void; onCookies: () => void }) {
  const { t } = useI18n()
  const links = [
    ['#network', t.nav.network],
    ['#services', t.nav.services],
    ['#process', t.nav.process],
    ['#industries', t.nav.industries],
    ['#about', t.nav.about],
    ['#contact', t.nav.contact],
  ] as const
  return (
    <footer className="border-t border-line-dark bg-graphite text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="max-w-[34ch] text-[18px] leading-snug tracking-[-0.01em] text-white/85">{t.footer.tagline}</p>
          <LanguageSwitch className="self-start" />
        </div>
        <nav aria-label={t.footer.company}>
          <p className="mono mb-4 text-[11px] text-steel">{t.footer.company}</p>
          <ul className="grid gap-2 text-[14px]">
            {links.map(([h, l]) => (
              <li key={h}>
                <a href={h} className="text-white/75 hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mono mb-4 text-[11px] text-steel">{t.footer.future}</p>
          <ul className="grid gap-2 text-[14px] text-white/40">
            {t.footer.futureItems.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono mb-4 text-[11px] text-steel">{t.footer.legalTitle}</p>
          <ul className="grid gap-2 text-[14px]">
            {t.footer.legal.map((l, i) => (
              <li key={l}>
                <button type="button" onClick={() => onLegal(i)} className="text-left text-white/75 hover:text-white">
                  {l}
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={onCookies} className="text-left text-white/75 hover:text-white">
                {t.footer.cookieSettings}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell flex flex-wrap justify-between gap-3 border-t border-line-dark py-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))] text-[12px] text-steel">
        <span>
          © {new Date().getFullYear()} {t.footer.rights}
        </span>
        <span className="mono text-[10.5px]">
          {domain} · {t.footer.credit}
        </span>
      </div>
    </footer>
  )
}
