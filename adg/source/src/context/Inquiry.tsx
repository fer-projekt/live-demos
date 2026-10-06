import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Segment = 'manufacturer' | 'buyer' | 'partner'

type Ctx = {
  segment: Segment
  category: string
  open: (segment: Segment, category?: string) => void
  setSegment: (s: Segment) => void
  setCategory: (c: string) => void
}

const InquiryContext = createContext<Ctx | null>(null)

/** Lets any section preselect the inquiry type (and product category) before scrolling to the form. */
export function InquiryProvider({ children }: { children: ReactNode }) {
  const [segment, setSegment] = useState<Segment>('manufacturer')
  const [category, setCategory] = useState('')
  const open = useCallback((s: Segment, c?: string) => {
    setSegment(s)
    if (c !== undefined) setCategory(c)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const value = useMemo(() => ({ segment, category, open, setSegment, setCategory }), [segment, category, open])
  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
}

export function useInquiry() {
  const c = useContext(InquiryContext)
  if (!c) throw new Error('useInquiry outside InquiryProvider')
  return c
}
