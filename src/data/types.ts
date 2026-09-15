export type LocaleCode = 'it' | 'en'

/** A string that exists in every supported language. */
export type Localized = Record<LocaleCode, string>

export type SlotId = 'breakfast' | 'morningSnack' | 'lunch' | 'afternoonSnack' | 'dinner'

export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface FoodEntry {
  /** Net weight or measure, e.g. "50 g". Language independent. */
  qty: string
  name: Localized
  /** What the weight means in practice, e.g. "2 slices". */
  hint?: Localized
}

export interface FoodItem extends FoodEntry {
  /** Interchangeable choices: pick one of `[item, ...alternatives]`. */
  alternatives?: FoodEntry[]
}

export interface Meal {
  items: FoodItem[]
  /** Whole-meal alternatives to the item list above. */
  swaps?: Localized[]
  /** Short, self-contained pieces of advice from the plan. */
  tips?: Localized[]
  /** No fixed meal: the weekly free meal. */
  free?: true
}

export interface Day {
  id: DayId
  meals: Partial<Record<SlotId, Meal>>
}
