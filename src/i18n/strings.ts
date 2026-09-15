import type { Localized } from '../data/types.ts'

const t = (it: string, en: string): Localized => ({ it, en })

export const ui = {
  tagline: t('Il tuo piano, giorno per giorno', 'Your plan, day by day'),
  skip: t('Vai al piano del giorno', 'Skip to the day’s plan'),
  language: t('Lingua', 'Language'),
  week: t('La settimana', 'The week'),
  weekProgress: t('Pasti della settimana', 'Meals this week'),
  daysLabel: t('Giorni della settimana', 'Days of the week'),
  prevDay: t('Giorno precedente', 'Previous day'),
  nextDay: t('Giorno successivo', 'Next day'),
  markDone: t('Segna come fatto', 'Mark as done'),
  markUndone: t('Segna come da fare', 'Mark as not done'),
  done: t('Fatto', 'Done'),
  clearDay: t('Azzera', 'Reset'),
  tips: t('Come farlo', 'How to make it'),
  freeMeal: t('Pasto libero', 'Free meal'),
  notPlanned: t('Niente in programma', 'Nothing planned'),
  notPlannedBody: t(
    'Il piano non prevede questo momento della giornata.',
    'The plan skips this point of the day.',
  ),
  pickVersion: t('Oppure scegli una versione', 'Or pick a version'),
  baseVersion: t('Il piano qui sopra', 'The plan above'),
  install: t('Installa', 'Install'),
  footerNote: t('Piano alimentare personale, digitalizzato.', 'A personal meal plan, digitised.'),
} as const

export function pickOne(total: number, locale: 'it' | 'en'): string {
  return locale === 'it' ? `Scegli 1 di ${total}` : `Pick 1 of ${total}`
}

export function mealCount(done: number, total: number, locale: 'it' | 'en'): string {
  if (locale === 'it') return `${done} di ${total} pasti`
  return `${done} of ${total} meals`
}
