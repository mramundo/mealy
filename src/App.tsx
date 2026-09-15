import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { BackgroundDecor } from './components/BackgroundDecor.tsx'
import { DayBar } from './components/DayBar.tsx'
import { Footer } from './components/Footer.tsx'
import { Masthead } from './components/Masthead.tsx'
import { MealCard } from './components/MealCard.tsx'
import { ProgressRing } from './components/ProgressRing.tsx'
import { ChevronIcon } from './components/icons.tsx'
import { plan } from './data/plan.ts'
import { DAY_META, DAY_ORDER, SLOT_ORDER, currentDayId } from './data/taxonomy.ts'
import type { DayId, LocaleCode } from './data/types.ts'
import { detectLocale, isLocaleCode } from './i18n/locale.ts'
import { progressText, ui } from './i18n/strings.ts'
import { useInstallPrompt } from './hooks/useInstallPrompt.ts'
import { usePersistentState } from './hooks/usePersistentState.ts'

type Checks = Record<string, boolean>

const checkKey = (day: DayId, slot: string) => `${day}:${slot}`

const reviveChecks = (raw: unknown): Checks | null =>
  raw !== null && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Checks) : null

const reviveLocale = (raw: unknown): LocaleCode | null => (isLocaleCode(raw) ? raw : null)

export default function App() {
  const detected = useMemo(() => detectLocale(), [])
  const [chosenLocale, setChosenLocale] = usePersistentState<LocaleCode | null>(
    'mealy:locale',
    null,
    reviveLocale,
  )
  const locale = chosenLocale ?? detected

  const [activeDay, setActiveDay] = useState<DayId>(() => currentDayId())
  const [checks, setChecks] = usePersistentState<Checks>('mealy:checks', {}, reviveChecks)
  const { canInstall, promptInstall } = useInstallPrompt()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const day = useMemo(() => plan.find((entry) => entry.id === activeDay), [activeDay])

  const plannedSlots = useMemo(
    () => (day ? SLOT_ORDER.filter((slot) => day.meals[slot] !== undefined) : []),
    [day],
  )

  const doneCount = plannedSlots.filter((slot) => checks[checkKey(activeDay, slot)]).length

  const progress = useMemo(() => {
    const result: Record<DayId, number> = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }
    for (const entry of plan) {
      const slots = SLOT_ORDER.filter((slot) => entry.meals[slot] !== undefined)
      const done = slots.filter((slot) => checks[checkKey(entry.id, slot)]).length
      result[entry.id] = slots.length === 0 ? 0 : done / slots.length
    }
    return result
  }, [checks])

  const toggle = useCallback(
    (slot: string) => {
      const key = checkKey(activeDay, slot)
      setChecks((prev) => ({ ...prev, [key]: !prev[key] }))
    },
    [activeDay, setChecks],
  )

  const clearDay = useCallback(() => {
    setChecks((prev) => {
      const next = { ...prev }
      for (const slot of SLOT_ORDER) delete next[checkKey(activeDay, slot)]
      return next
    })
  }, [activeDay, setChecks])

  const shiftDay = useCallback((delta: number) => {
    setActiveDay((current) => {
      const index = DAY_ORDER.indexOf(current)
      return DAY_ORDER[(index + delta + DAY_ORDER.length) % DAY_ORDER.length] ?? current
    })
  }, [])

  // Horizontal swipe moves between days on touch devices.
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const point = event.changedTouches[0]
    touchStart.current = point ? { x: point.clientX, y: point.clientY } : null
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current
    const point = event.changedTouches[0]
    touchStart.current = null
    if (!start || !point) return

    const dx = point.clientX - start.x
    const dy = point.clientY - start.y
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.6) shiftDay(dx < 0 ? 1 : -1)
  }

  if (!day) return null

  return (
    <div className="app">
      <BackgroundDecor />

      <a className="skip-link" href="#main">
        {ui.skip[locale]}
      </a>

      <Masthead
        locale={locale}
        onLocaleChange={setChosenLocale}
        canInstall={canInstall}
        onInstall={() => void promptInstall()}
      />

      <DayBar active={activeDay} locale={locale} progress={progress} onSelect={setActiveDay} />

      <main id="main" className="shell" tabIndex={-1}>
        <div className="dayhead">
          <div>
            <h2 className="dayhead__title">
              {DAY_META[activeDay].label[locale]}
              <em>.</em>
            </h2>
            <p className="dayhead__sub">
              {progressText(doneCount, plannedSlots.length, locale)}
              {doneCount > 0 && (
                <>
                  {' · '}
                  <button type="button" className="linkbtn" onClick={clearDay}>
                    {ui.clearDay[locale]}
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="dayhead__aside">
            <button
              type="button"
              className="arrowbtn"
              onClick={() => shiftDay(-1)}
              aria-label={ui.prevDay[locale]}
            >
              <ChevronIcon dir="left" />
            </button>

            <ProgressRing
              done={doneCount}
              total={plannedSlots.length}
              label={`${ui.progressTitle[locale]}: ${progressText(doneCount, plannedSlots.length, locale)}`}
            />

            <button
              type="button"
              className="arrowbtn"
              onClick={() => shiftDay(1)}
              aria-label={ui.nextDay[locale]}
            >
              <ChevronIcon dir="right" />
            </button>
          </div>
        </div>

        <div
          key={activeDay}
          id={`daypanel-${activeDay}`}
          role="tabpanel"
          aria-labelledby={`daytab-${activeDay}`}
          className="meals"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {SLOT_ORDER.map((slot, index) => (
            <MealCard
              key={slot}
              slot={slot}
              meal={day.meals[slot]}
              locale={locale}
              index={index}
              done={Boolean(checks[checkKey(activeDay, slot)])}
              onToggle={() => toggle(slot)}
            />
          ))}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}
