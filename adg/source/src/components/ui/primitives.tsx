import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Variant = 'blue' | 'white' | 'ghost' | 'ghost-dark' | 'ink'

const variants: Record<Variant, string> = {
  blue: 'bg-blue text-white hover:bg-blue-deep',
  white: 'bg-white text-ink hover:bg-paper',
  ink: 'bg-ink text-white hover:bg-graphite-3',
  ghost: 'border border-white/25 text-white hover:border-white hover:bg-white/5',
  'ghost-dark': 'border border-ink/20 text-ink hover:border-ink',
}

/** Rectangular, lightly rounded buttons: corporate, not playful. */
export function Button({
  children,
  variant = 'blue',
  href,
  type = 'button',
  onClick,
  className = '',
}: {
  children: ReactNode
  variant?: Variant
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
}) {
  const cls = `group inline-flex h-12 items-center justify-center gap-3 rounded-[4px] px-6 text-[14px] font-medium tracking-[-0.005em] whitespace-nowrap transition-colors duration-300 ${variants[variant]} ${className}`
  return href ? (
    <a href={href} onClick={onClick} className={cls}>
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 ${className}`} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15m-5-6 6 6-6 6" />
    </svg>
  )
}

/** Fades content up once when it enters the viewport; visible at rest. */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0.35, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mono flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-blue" />
      {children}
    </p>
  )
}

/** Line icons for the logistics chain: vessel → port → terminal → truck/rail → buyer */
export function ChainIcon({ i, className = 'size-6' }: { i: number; className?: string }) {
  const paths = [
    <path key="v" d="M3 16.5 5 12h14l2 4.5M7 12V8.5h7V12M9 8.5V6h3v2.5M2.5 20c1.6 0 1.6-1 3.2-1s1.6 1 3.2 1 1.6-1 3.2-1 1.6 1 3.2 1 1.6-1 3.2-1 1.6 1 3.2 1" />,
    <path key="p" d="M4 20V9l5-3v14M9 11h6M15 20V4h2l3 5M17 4v16M3 20h18" />,
    <path key="t" d="M3 20h18M5 20v-7h5v7M10 16h9v4M12 16v-4h5v4M6 13V9h3v4" />,
    <path key="r" d="M3 7h11v9H3zM14 10h4l3 3v3h-7M6.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />,
    <path key="b" d="M3 20V10l6 3.5V10l6 3.5V6h6v14H3ZM17 10h2M17 13.5h2M6 16.5h2M10.5 16.5h2" />,
  ]
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[i]}
    </svg>
  )
}
