// Cookie consent + GA4. GA4 is loaded only after the visitor accepts analytics,
// and only when VITE_GA4_ID is set at build time (e.g. VITE_GA4_ID=G-XXXXXXX).

export type Consent = { analytics: boolean; decided: boolean }

const KEY = 'adg-consent'

export function readConsent(): Consent {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...JSON.parse(raw), decided: true }
  } catch {
    /* storage unavailable */
  }
  return { analytics: false, decided: false }
}

export function saveConsent(analytics: boolean) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics }))
  } catch {
    /* ignore */
  }
  if (analytics) loadGA4()
}

let loaded = false
export function loadGA4() {
  const id = import.meta.env.VITE_GA4_ID as string | undefined
  if (loaded || !id) return
  loaded = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(s)
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', id, { anonymize_ip: true })
}
