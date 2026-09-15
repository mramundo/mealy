import type { FoodEntry, LocaleCode, Meal, SlotId } from '../data/types.ts'
import { SLOT_META } from '../data/taxonomy.ts'
import { CheckIcon, SLOT_ICONS, SparkIcon, StarIcon, SwapIcon } from './icons.tsx'
import { pickOne, ui } from '../i18n/strings.ts'

interface Choice {
  qty?: string
  text: string
  hint?: string
}

interface MealBlockProps {
  slot: SlotId
  meal: Meal | undefined
  locale: LocaleCode
  done: boolean
  onToggle: () => void
  /** Prefix for radio group names and stored choices, e.g. "mon:lunch". */
  keyBase: string
  choices: Record<string, number>
  onChoose: (key: string, value: number) => void
}

export function MealBlock({
  slot,
  meal,
  locale,
  done,
  onToggle,
  keyBase,
  choices,
  onChoose,
}: MealBlockProps) {
  const Icon = SLOT_ICONS[slot]
  const meta = SLOT_META[slot]
  const empty = meal === undefined
  const swapKey = `${keyBase}:swap`
  const swapPick = choices[swapKey] ?? 0

  return (
    <li className={empty ? 'meal blank' : 'meal'} data-slot={slot} data-done={done}>
      <span className="meal__dot" aria-hidden="true">
        <Icon />
      </span>

      <div className="card">
        <div className="card__head">
          <div className="card__title">
            <p className="card__slot">{meta.when[locale]}</p>
            <h3 className="card__name">{meta.label[locale]}</h3>
          </div>

          {!empty && (
            <button
              type="button"
              role="switch"
              aria-checked={done}
              className="check"
              onClick={onToggle}
              aria-label={`${meta.label[locale]} — ${(done ? ui.markUndone : ui.markDone)[locale]}`}
            >
              <span className="check__label">{ui.done[locale]}</span>
              <span className="check__box">
                <CheckIcon />
              </span>
            </button>
          )}
        </div>

        <div className="card__body">
          {empty ? (
            <p>{ui.notPlannedBody[locale]}</p>
          ) : (
            <>
              {meal.free && (
                <p className="freebanner">
                  <StarIcon />
                  <span className="freebanner__mark">{ui.freeMeal[locale]}</span>
                </p>
              )}

              {meal.items.length > 0 && (
                <div className="foods" data-muted={meal.swaps ? String(swapPick > 0) : undefined}>
                  {meal.items.map((item, index) => {
                    const entries = [item, ...(item.alternatives ?? [])]
                    if (entries.length === 1) {
                      return <FoodRow key={index} entry={item} locale={locale} />
                    }

                    const key = `${keyBase}:i${index}`
                    return (
                      <OptionGroup
                        key={index}
                        name={key}
                        legend={pickOne(entries.length, locale)}
                        choices={entries.map((entry) => toChoice(entry, locale))}
                        value={choices[key] ?? 0}
                        onChange={(value) => onChoose(key, value)}
                      />
                    )
                  })}
                </div>
              )}

              {meal.swaps && (
                <OptionGroup
                  className="swaps"
                  name={swapKey}
                  legend={ui.pickVersion[locale]}
                  choices={[
                    { text: ui.baseVersion[locale] },
                    ...meal.swaps.map((swap) => ({ text: swap[locale] })),
                  ]}
                  value={swapPick}
                  onChange={(value) => onChoose(swapKey, value)}
                />
              )}

              {meal.tips && (
                <div className="tips">
                  <p className="tips__title">
                    <SparkIcon />
                    {ui.tips[locale]}
                  </p>
                  <ul className="tips__list">
                    {meal.tips.map((tip) => (
                      <li key={tip.en}>{tip[locale]}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  )
}

function toChoice(entry: FoodEntry, locale: LocaleCode): Choice {
  return {
    qty: entry.qty,
    text: entry.name[locale],
    ...(entry.hint ? { hint: entry.hint[locale] } : {}),
  }
}

function FoodRow({ entry, locale }: { entry: FoodEntry; locale: LocaleCode }) {
  return (
    <p className="food">
      <span className="chip">{entry.qty}</span>
      <span className="food__name">
        {entry.name[locale]}
        {entry.hint && <span className="food__hint">{entry.hint[locale]}</span>}
      </span>
    </p>
  )
}

interface OptionGroupProps {
  name: string
  legend: string
  choices: Choice[]
  value: number
  onChange: (value: number) => void
  className?: string
}

/** Interchangeable choices, rendered as a real radio group. */
function OptionGroup({ name, legend, choices, value, onChange, className }: OptionGroupProps) {
  return (
    <fieldset className={className ? `options ${className}` : 'options'}>
      <legend className="options__legend">
        <SwapIcon />
        {legend}
      </legend>

      <div className="options__list">
        {choices.map((choice, index) => (
          <label className="option" key={`${choice.text}-${index}`}>
            <input
              type="radio"
              name={name}
              value={index}
              checked={value === index}
              onChange={() => onChange(index)}
            />
            <span className="option__radio" aria-hidden="true" />
            {choice.qty && <span className="chip">{choice.qty}</span>}
            <span className="option__text">
              {choice.text}
              {choice.hint && <span className="food__hint">{choice.hint}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
