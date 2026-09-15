import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { DayId, LocaleCode } from '../data/types.ts'
import { DAY_META, DAY_ORDER } from '../data/taxonomy.ts'
import { ui } from '../i18n/strings.ts'

interface DayBarProps {
  active: DayId
  locale: LocaleCode
  /** 0 → 1 completion for each day, used for the underline meter. */
  progress: Record<DayId, number>
  onSelect: (day: DayId) => void
}

export function DayBar({ active, locale, progress, onSelect }: DayBarProps) {
  const tabsRef = useRef<Map<DayId, HTMLButtonElement>>(new Map())

  // Keep the selected pill visible on narrow screens without scrolling the page.
  useEffect(() => {
    tabsRef.current.get(active)?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [active])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const current = DAY_ORDER.indexOf(active)
    let next: number | null = null

    if (event.key === 'ArrowRight') next = (current + 1) % DAY_ORDER.length
    else if (event.key === 'ArrowLeft') next = (current - 1 + DAY_ORDER.length) % DAY_ORDER.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = DAY_ORDER.length - 1
    if (next === null) return

    event.preventDefault()
    const day = DAY_ORDER[next]
    if (!day) return
    onSelect(day)
    tabsRef.current.get(day)?.focus()
  }

  return (
    <div className="daybar">
      <div className="shell">
        <div className="daybar__track" role="tablist" aria-label={ui.daysLabel[locale]}>
          {DAY_ORDER.map((day) => {
            const selected = day === active
            return (
              <button
                key={day}
                type="button"
                role="tab"
                id={`daytab-${day}`}
                aria-controls={`daypanel-${day}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                className="daytab"
                onClick={() => onSelect(day)}
                onKeyDown={handleKeyDown}
                ref={(node) => {
                  if (node) tabsRef.current.set(day, node)
                  else tabsRef.current.delete(day)
                }}
              >
                <span className="daytab__short" aria-hidden="true">
                  {DAY_META[day].short[locale]}
                </span>
                <span className="daytab__full" aria-hidden="true">
                  {DAY_META[day].label[locale]}
                </span>
                <span className="visually-hidden">{DAY_META[day].label[locale]}</span>
                <span className="daytab__meter" aria-hidden="true">
                  <i style={{ width: `${Math.round(progress[day] * 100)}%` }} />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
