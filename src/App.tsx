import { useCallback, useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { BackgroundDecor } from './components/BackgroundDecor.tsx'
import { DayNav, type DayStat } from './components/DayNav.tsx'
import { Footer } from './components/Footer.tsx'
import { MealBlock } from './components/MealBlock.tsx'
import { TopBar } from './components/TopBar.tsx'
import { ChevronIcon } from './components/icons.tsx'
import { plan } from './data/plan.ts'
import { DAY_META, DAY_ORDER, SLOT_ORDER, currentDayId } from './data/taxonomy.ts'
import type { DayId, LocaleCode } from './data/types.ts'
import { detectLocale, isLocaleCode } from './i18n/locale.ts'
import { mealCount, ui } from './i18n/strings.ts'
import { useInstallPrompt } from './hooks/useInstallPrompt.ts'
import { usePersistentState } from './hooks/usePersistentState.ts'

type NumberMap = Record<string, number>
type BoolMap = Record<string, boolean>

const mealKey = (day: DayId, slot: string) => `${day}:${slot}`

const reviveMap = <T,>(raw: unknown): Record<string, T> | null =>
  raw !== null && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, T>) : null

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
  const [checks, setChecks] = usePersistentState<BoolMap>('mealy:checks', {}, reviveMap<boolean>)
  const [choices, setChoices] = usePersistentState<NumberMap>(
    'mealy:choices',
    {},
    reviveMap<number>,
  )
  const { canInstall, promptInstall } = useInstallPrompt()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const day = useMemo(() => plan.find((entry) => entry.id === activeDay), [activeDay])

  const plannedSlots = useMemo(
    () => (day ? SLOT_ORDER.filter((slot) => day.meals[slot] !== undefined) : []),
    [day],
  )

  const doneCount = plannedSlots.filter((slot) => checks[mealKey(activeDay, slot)]).length

  const stats = useMemo(() => {
    const result = {} as Record<DayId, DayStat>
    for (const entry of plan) {
      const slots = SLOT_ORDER.filter((slot) => entry.meals[slot] !== undefined)
      result[entry.id] = {
        done: slots.filter((slot) => checks[mealKey(entry.id, slot)]).length,
        total: slots.length,
      }
    }
    return result
  }, [checks])

  const toggle = useCallback(
    (slot: string) => {
      const key = mealKey(activeDay, slot)
      setChecks((prev) => ({ ...prev, [key]: !prev[key] }))
    },
    [activeDay, setChecks],
  )

  const clearDay = useCallback(() => {
    setChecks((prev) => {
      const next = { ...prev }
      for (const slot of SLOT_ORDER) delete next[mealKey(activeDay, slot)]
      return next
    })
  }, [activeDay, setChecks])

  const choose = useCallback(
    (key: string, value: number) => setChoices((prev) => ({ ...prev, [key]: value })),
    [setChoices],
  )

  const shiftDay = useCallback((delta: number) => {
    setActiveDay((current) => {
      const index = DAY_ORDER.indexOf(current)
      return DAY_ORDER[(index + delta + DAY_ORDER.length) % DAY_ORDER.length] ?? current
    })
  }, [])

  // Horizontal swipe moves between days on touch devices.
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const point = event.changedTouches[0]
    touchStart.current = point ? { x: point.clientX, y: point.clientY } : null
  }

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
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
    <div className="page">
      <BackgroundDecor />

      <a className="skip-link" href="#dayplan">
        {ui.skip[locale]}
      </a>

      <TopBar
        locale={locale}
        onLocaleChange={setChosenLocale}
        canInstall={canInstall}
        onInstall={() => void promptInstall()}
      />

      <main className="main">
        <div className="wrap layout">
          <DayNav active={activeDay} locale={locale} stats={stats} onSelect={setActiveDay} />

          <div className="column">
            <header className="dayhead">
              <div>
                <h2 className="dayhead__title">{DAY_META[activeDay].label[locale]}</h2>
                <span className="daymeter" aria-hidden="true">
                  {plannedSlots.map((slot) => (
                    <i
                      key={slot}
                      data-slot={slot}
                      data-done={String(Boolean(checks[mealKey(activeDay, slot)]))}
                    />
                  ))}
                </span>
                <p className="dayhead__meta">
                  {mealCount(doneCount, plannedSlots.length, locale)}
                  {doneCount > 0 && (
                    <button type="button" className="textbtn" onClick={clearDay}>
                      {ui.clearDay[locale]}
                    </button>
                  )}
                </p>
              </div>

              <div className="dayhead__nav">
                <button
                  type="button"
                  className="iconbtn"
                  onClick={() => shiftDay(-1)}
                  aria-label={ui.prevDay[locale]}
                >
                  <ChevronIcon dir="left" />
                </button>
                <button
                  type="button"
                  className="iconbtn"
                  onClick={() => shiftDay(1)}
                  aria-label={ui.nextDay[locale]}
                >
                  <ChevronIcon dir="right" />
                </button>
              </div>
            </header>

            <ol
              key={activeDay}
              id="dayplan"
              role="tabpanel"
              aria-labelledby={`daytab-${activeDay}`}
              tabIndex={-1}
              className="timeline"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {SLOT_ORDER.map((slot) => (
                <MealBlock
                  key={slot}
                  slot={slot}
                  meal={day.meals[slot]}
                  locale={locale}
                  done={Boolean(checks[mealKey(activeDay, slot)])}
                  onToggle={() => toggle(slot)}
                  keyBase={mealKey(activeDay, slot)}
                  choices={choices}
                  onChoose={choose}
                />
              ))}
            </ol>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}
