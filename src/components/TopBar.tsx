import type { LocaleCode } from '../data/types.ts'
import { LOCALES } from '../i18n/locale.ts'
import { ui } from '../i18n/strings.ts'
import { BackgroundDecor } from './BackgroundDecor.tsx'
import { BrandMark } from './brand.tsx'
import { DownloadIcon } from './icons.tsx'

interface TopBarProps {
  locale: LocaleCode
  onLocaleChange: (locale: LocaleCode) => void
  canInstall: boolean
  onInstall: () => void
}

export function TopBar({ locale, onLocaleChange, canInstall, onInstall }: TopBarProps) {
  return (
    <header className="topbar">
      <BackgroundDecor variant="top" />

      <div className="wrap topbar__inner">
        <div className="brand">
          <BrandMark />
          <span className="brand__text">
            <span className="brand__name">Mealy</span>
            <span className="brand__tag">{ui.tagline[locale]}</span>
          </span>
        </div>

        <div className="topbar__tools">
          {canInstall && (
            <button type="button" className="pill-btn" onClick={onInstall}>
              <DownloadIcon />
              {ui.install[locale]}
            </button>
          )}

          <div className="segmented" role="group" aria-label={ui.language[locale]}>
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                className="segmented__btn"
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
