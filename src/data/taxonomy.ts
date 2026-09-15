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
  breakfast: { label: t('Colazione', 'Breakfast'), when: t('Tarda mattinata', 'Late morning') },
  morningSnack: { label: t('Spuntino', 'Morning snack'), when: t('Metà mattina', 'Mid-morning') },
  lunch: { label: t('Pranzo', 'Lunch'), when: t('Pasto principale', 'Main meal') },
  afternoonSnack: {
    label: t('Merenda', 'Afternoon snack'),
    when: t('Metà pomeriggio', 'Mid-afternoon'),
  },
  dinner: { label: t('Cena', 'Dinner'), when: t('Sera', 'Evening') },
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

export const DAY_META: Record<DayId, { label: Localized; short: Localized; mini: Localized }> = {
  mon: { label: t('Lunedì', 'Monday'), short: t('Lun', 'Mon'), mini: t('Lu', 'Mo') },
  tue: { label: t('Martedì', 'Tuesday'), short: t('Mar', 'Tue'), mini: t('Ma', 'Tu') },
  wed: { label: t('Mercoledì', 'Wednesday'), short: t('Mer', 'Wed'), mini: t('Me', 'We') },
  thu: { label: t('Giovedì', 'Thursday'), short: t('Gio', 'Thu'), mini: t('Gi', 'Th') },
  fri: { label: t('Venerdì', 'Friday'), short: t('Ven', 'Fri'), mini: t('Ve', 'Fr') },
  sat: { label: t('Sabato', 'Saturday'), short: t('Sab', 'Sat'), mini: t('Sa', 'Sa') },
  sun: { label: t('Domenica', 'Sunday'), short: t('Dom', 'Sun'), mini: t('Do', 'Su') },
}

/** Monday-first index of the current weekday — the only calendar hint the app uses. */
export function currentDayId(now = new Date()): DayId {
  return DAY_ORDER[(now.getDay() + 6) % 7] ?? 'mon'
}
