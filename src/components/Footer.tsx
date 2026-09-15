import type { LocaleCode } from '../data/types.ts'
import { ui } from '../i18n/strings.ts'
import { GitHubIcon } from './icons.tsx'

export function Footer({ locale }: { locale: LocaleCode }) {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p>
          <strong>Mealy</strong> — {ui.footerNote[locale]}
        </p>

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
