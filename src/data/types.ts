export type LocaleCode = 'it' | 'en'

/** A string that exists in every supported language. */
export type Localized = Record<LocaleCode, string>

export type SlotId = 'breakfast' | 'morningSnack' | 'lunch' | 'afternoonSnack' | 'dinner'

export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface FoodEntry {
  /** Net weight or measure, e.g. "50 g". Language independent. */
  qty: string
  name: Localized
  /** Practical translation of the weight, e.g. "2 slices". */
  hint?: Localized
}

export interface FoodItem extends FoodEntry {
  /** Swaps for the main choice — the "oppure" lines of the plan. */
  alternatives?: FoodEntry[]
}

export interface Meal {
  items: FoodItem[]
  note?: Localized
  /** No fixed meal: the weekly free meal. */
  free?: true
}

export interface Day {
  id: DayId
  meals: Partial<Record<SlotId, Meal>>
}
