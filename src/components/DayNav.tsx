import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react'
import type { DayId, LocaleCode } from '../data/types.ts'
import { DAY_META, DAY_ORDER } from '../data/taxonomy.ts'
import { ui } from '../i18n/strings.ts'
import { BackgroundDecor } from './BackgroundDecor.tsx'

export interface DayStat {
  done: number
  total: number
}

interface DayNavProps {
  active: DayId
  locale: LocaleCode
  stats: Record<DayId, DayStat>
  onSelect: (day: DayId) => void
}

/**
 * One list, two shapes: a thumb-reachable dock at the bottom on phones, a
 * sticky rail beside the plan on wide screens. Same DOM, same semantics.
 */
export function DayNav({ active, locale, stats, onSelect }: DayNavProps) {
  const buttons = useRef<Map<DayId, HTMLButtonElement>>(new Map())

  useEffect(() => {
    buttons.current.get(active)?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [active])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const current = DAY_ORDER.indexOf(active)
    let next: number | null = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = current + 1
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = current - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = DAY_ORDER.length - 1
    if (next === null) return

    event.preventDefault()
    const day = DAY_ORDER[(next + DAY_ORDER.length) % DAY_ORDER.length]
    if (!day) return
    onSelect(day)
    buttons.current.get(day)?.focus()
  }

  return (
    <nav className="daynav" aria-label={ui.daysLabel[locale]}>
      <BackgroundDecor variant="bottom" />

      <p className="daynav__title">{ui.week[locale]}</p>

      <div role="tablist" aria-orientation="vertical" className="daynav__list">
        {DAY_ORDER.map((day) => {
          const selected = day === active
          const stat = stats[day]
          const ratio = stat.total === 0 ? 0 : stat.done / stat.total

          return (
            <button
              key={day}
              type="button"
              role="tab"
              id={`daytab-${day}`}
              aria-controls="dayplan"
              aria-selected={selected}
              aria-label={DAY_META[day].label[locale]}
              tabIndex={selected ? 0 : -1}
              className="dayitem"
              onClick={() => onSelect(day)}
              onKeyDown={handleKeyDown}
              ref={(node) => {
                if (node) buttons.current.set(day, node)
                else buttons.current.delete(day)
              }}
            >
              <span className="dayitem__ring" style={{ '--p': ratio } as CSSProperties}>
                <span className="dayitem__face" aria-hidden="true">
                  {DAY_META[day].mini[locale]}
                </span>
              </span>
              <span className="dayitem__name" aria-hidden="true">
                {DAY_META[day].label[locale]}
              </span>
              <span className="dayitem__count" aria-hidden="true">
                {stat.done}/{stat.total}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
