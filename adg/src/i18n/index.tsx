import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en } from './en'
import type { Dict } from './en'
import { hr } from './hr'
import { fr } from './fr'
import { zh } from './zh'

// Adding a language = adding one dictionary file and one entry here.
export const locales = { en, hr, fr, zh } as const
export type Locale = keyof typeof locales
export const localeOrder: Locale[] = ['en', 'hr', 'fr', 'zh']

const KEY = 'adg-locale'
function initial(): Locale {
  try {
    const saved = localStorage.getItem(KEY) as Locale | null
    if (saved && saved in locales) return saved
  } catch {
    /* storage unavailable */
  }
  // English is the base corporate version; visitors switch language explicitly.
  return 'en'
}

type Ctx = { locale: Locale; t: Dict; setLocale: (l: Locale) => void }
const I18n = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initial)
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale
    try {
      localStorage.setItem(KEY, locale)
    } catch {
      /* ignore */
    }
  }, [locale])
  const value = useMemo(() => ({ locale, t: locales[locale], setLocale }), [locale])
  return <I18n.Provider value={value}>{children}</I18n.Provider>
}

export function useI18n() {
  const c = useContext(I18n)
  if (!c) throw new Error('useI18n outside I18nProvider')
  return c
}
