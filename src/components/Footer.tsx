import type { LocaleCode } from '../data/types.ts'
import { ui } from '../i18n/strings.ts'
import { GitHubIcon } from './icons.tsx'

const SEED_COLORS = [
  'var(--amber)',
  'var(--basil)',
  'var(--tomato)',
  'var(--berry)',
  'var(--aubergine)',
]

export function Footer({ locale }: { locale: LocaleCode }) {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p>
          <strong>Mealy</strong> — {ui.footerNote[locale]}
        </p>

        <span className="footer__seeds" aria-hidden="true">
          {SEED_COLORS.map((color) => (
            <i key={color} style={{ background: color }} />
          ))}
        </span>

        <a
          className="footer__link"
          href="https://github.com/mramundo"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GitHubIcon />
          github.com/mramundo
        </a>
      </div>
    </footer>
  )
}
