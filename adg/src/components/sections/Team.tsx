import { useI18n } from '../../i18n'
import { Eyebrow, Reveal } from '../ui/primitives'

/**
 * Corporate team strip. Until ADG supplies approved photos, each card shows a neutral
 * placeholder rather than a stock face, so nobody is mistaken for a real employee.
 */
export function Team() {
  const { t } = useI18n()
  return (
    <section className="bg-white pb-[clamp(88px,10vw,160px)] text-ink" aria-labelledby="team-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-[clamp(64px,7vw,110px)]">
          <Reveal>
            <Eyebrow className="mb-6 text-steel-2">{t.team.eyebrow}</Eyebrow>
            <h2 id="team-title" className="h-section text-[clamp(2rem,3.6vw,3.4rem)]">
              {t.team.title}
            </h2>
          </Reveal>
          <p className="mono max-w-[40ch] text-[10.5px] text-steel-2">{t.team.placeholder}</p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 xl:grid-cols-4">
          {t.team.members.map((m, i) => (
            <Reveal as="li" key={i} delay={i * 0.06}>
              <article className="flex flex-col gap-4">
                <div className="relative grid aspect-[4/4.2] place-items-center overflow-hidden rounded-[6px] bg-paper">
                  <svg viewBox="0 0 120 150" className="h-1/2 w-auto text-ink/10" aria-hidden="true">
                    <circle cx="60" cy="52" r="26" fill="currentColor" />
                    <path d="M14 150c4-34 22-52 46-52s42 18 46 52Z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold">{m.name}</h3>
                  <p className="text-[15px]">{m.role}</p>
                  <p className="mt-1 text-[14px] text-steel-2">{m.area}</p>
                </div>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="mono inline-flex items-center gap-2 self-start text-[11px] text-blue-deep hover:underline">
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" />
                  </svg>
                  LinkedIn
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
