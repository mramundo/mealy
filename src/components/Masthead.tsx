import type { LocaleCode } from '../data/types.ts'
import { LOCALES } from '../i18n/locale.ts'
import { ui } from '../i18n/strings.ts'
import { DownloadIcon } from './icons.tsx'

interface MastheadProps {
  locale: LocaleCode
  onLocaleChange: (locale: LocaleCode) => void
  canInstall: boolean
  onInstall: () => void
}

/* One letter per meal slot — the wordmark doubles as the colour key. */
const WORDMARK = [
  { letter: 'M', color: 'var(--amber)' },
  { letter: 'e', color: 'var(--basil)' },
  { letter: 'a', color: 'var(--tomato)' },
  { letter: 'l', color: 'var(--berry)' },
  { letter: 'y', color: 'var(--aubergine)' },
]

export function Masthead({ locale, onLocaleChange, canInstall, onInstall }: MastheadProps) {
  return (
    <header className="masthead shell">
      <div className="masthead__row">
        <div>
          <h1 className="wordmark">
            {WORDMARK.map(({ letter, color }) => (
              <span key={letter} style={{ color }}>
                {letter}
              </span>
            ))}
            <span className="wordmark__dot" aria-hidden="true" />
          </h1>
          <p className="tagline">{ui.tagline[locale]}</p>
        </div>

        <div className="masthead__tools">
          {canInstall && (
            <button type="button" className="ghost-btn" onClick={onInstall}>
              <DownloadIcon />
              {ui.install[locale]}
            </button>
          )}

          <div className="langswitch" role="group" aria-label={ui.language[locale]}>
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                className="langswitch__btn"
                aria-pressed={code === locale}
                onClick={() => onLocaleChange(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
