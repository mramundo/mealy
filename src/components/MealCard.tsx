import type { CSSProperties } from 'react'
import type { LocaleCode, Meal, SlotId } from '../data/types.ts'
import { SLOT_META } from '../data/taxonomy.ts'
import { AsteriskIcon, CheckIcon, SLOT_ICONS } from './icons.tsx'
import { ui } from '../i18n/strings.ts'

interface MealCardProps {
  slot: SlotId
  meal: Meal | undefined
  locale: LocaleCode
  index: number
  done: boolean
  onToggle: () => void
}

export function MealCard({ slot, meal, locale, index, done, onToggle }: MealCardProps) {
  const Icon = SLOT_ICONS[slot]
  const meta = SLOT_META[slot]
  const empty = meal === undefined

  return (
    <article
      className="card"
      data-slot={slot}
      data-done={done}
      data-empty={empty}
      style={{ '--i': index } as CSSProperties}
    >
      <header className="card__top">
        <span className="card__badge" aria-hidden="true">
          <Icon />
        </span>

        <div className="card__heading">
          <p className="card__when">{meta.when[locale]}</p>
          <h3 className="card__name">{meta.label[locale]}</h3>
        </div>

        {!empty && (
          <button
            type="button"
            role="switch"
            aria-checked={done}
            className="card__check"
            onClick={onToggle}
            aria-label={`${meta.label[locale]} — ${(done ? ui.markUndone : ui.markDone)[locale]}`}
          >
            <CheckIcon />
          </button>
        )}
      </header>

      <div className="card__body">
        {empty ? (
          <div className="free">
            <span className="free__mark">{ui.notPlanned[locale]}</span>
            <p className="free__text">{ui.notPlannedBody[locale]}</p>
          </div>
        ) : meal.free ? (
          <div className="free">
            <span className="free__mark">{ui.freeMeal[locale]}</span>
            {meal.note && <p className="free__text">{meal.note[locale]}</p>}
          </div>
        ) : (
          <>
            <ul className="food">
              {meal.items.map((item, itemIndex) => (
                <li key={`${item.name.en}-${itemIndex}`}>
                  <div className="food__row">
                    <span className="qty">{item.qty}</span>
                    <span className="food__name">
                      {item.name[locale]}
                      {item.hint && <span className="food__hint">{item.hint[locale]}</span>}
                    </span>
                  </div>

                  {item.alternatives && (
                    <ul className="alts">
                      {item.alternatives.map((alt, altIndex) => (
                        <li className="alts__row" key={`${alt.name.en}-${altIndex}`}>
                          <span className="alts__tag">{ui.or[locale]}</span>
                          <span className="qty">{alt.qty}</span>
                          <span>
                            {alt.name[locale]}
                            {alt.hint && <span className="food__hint">{alt.hint[locale]}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {meal.note && (
              <p className="note">
                <span className="note__title">
                  <AsteriskIcon />
                  {ui.note[locale]}
                </span>
                {meal.note[locale]}
              </p>
            )}
          </>
        )}
      </div>
    </article>
  )
}
