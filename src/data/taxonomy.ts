import type { DayId, Localized, SlotId } from './types.ts'

const t = (it: string, en: string): Localized => ({ it, en })

export const SLOT_ORDER = [
  'breakfast',
  'morningSnack',
  'lunch',
  'afternoonSnack',
  'dinner',
] as const satisfies readonly SlotId[]

export const SLOT_META: Record<SlotId, { label: Localized; when: Localized }> = {
  breakfast: { label: t('Colazione', 'Breakfast'), when: t('in tarda mattinata', 'late morning') },
  morningSnack: { label: t('Spuntino', 'Morning snack'), when: t('metà mattina', 'mid-morning') },
  lunch: { label: t('Pranzo', 'Lunch'), when: t('pasto principale', 'main meal') },
  afternoonSnack: {
    label: t('Merenda', 'Afternoon snack'),
    when: t('metà pomeriggio', 'mid-afternoon'),
  },
  dinner: { label: t('Cena', 'Dinner'), when: t('sera', 'evening') },
}

export const DAY_ORDER = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
] as const satisfies readonly DayId[]

export const DAY_META: Record<DayId, { label: Localized; short: Localized }> = {
  mon: { label: t('Lunedì', 'Monday'), short: t('Lun', 'Mon') },
  tue: { label: t('Martedì', 'Tuesday'), short: t('Mar', 'Tue') },
  wed: { label: t('Mercoledì', 'Wednesday'), short: t('Mer', 'Wed') },
  thu: { label: t('Giovedì', 'Thursday'), short: t('Gio', 'Thu') },
  fri: { label: t('Venerdì', 'Friday'), short: t('Ven', 'Fri') },
  sat: { label: t('Sabato', 'Saturday'), short: t('Sab', 'Sat') },
  sun: { label: t('Domenica', 'Sunday'), short: t('Dom', 'Sun') },
}

/** Monday-first index of the current weekday — the only calendar hint the app uses. */
export function currentDayId(now = new Date()): DayId {
  return DAY_ORDER[(now.getDay() + 6) % 7] ?? 'mon'
}
