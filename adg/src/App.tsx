import { MotionConfig } from 'motion/react'
import { useCallback, useState } from 'react'
import { I18nProvider } from './i18n'
import { InquiryProvider } from './context/Inquiry'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { CookieBanner, LegalDialog } from './components/layout/Overlays'
import { Hero } from './components/sections/Hero'
import { Network } from './components/sections/Network'
import { Services } from './components/sections/Services'
import { Process } from './components/sections/Process'
import { Industries } from './components/sections/Industries'
import { Audiences } from './components/sections/Audiences'
import { About } from './components/sections/About'
import { Team } from './components/sections/Team'
import { Contact } from './components/sections/Contact'

// Visual hierarchy from the brief: WORLD → CONNECTION → ADG → CAPABILITIES → PRODUCTS → PARTNERSHIP
export default function App() {
  const [legal, setLegal] = useState<number | null>(null)
  const [cookies, setCookies] = useState(false)
  const closeLegal = useCallback(() => setLegal(null), [])
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <InquiryProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-[4px] focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
            Skip to content
          </a>
          <Header />
          <main id="main">
            <Hero />
            <Network />
            <Services />
            <Process />
            <Industries />
            <Audiences />
            <About />
            <Team />
            <Contact />
          </main>
          <Footer onLegal={setLegal} onCookies={() => setCookies(true)} />
          <CookieBanner forceOpen={cookies} onClose={() => setCookies(false)} />
          <LegalDialog index={legal} onClose={closeLegal} />
        </InquiryProvider>
      </I18nProvider>
    </MotionConfig>
  )
}
