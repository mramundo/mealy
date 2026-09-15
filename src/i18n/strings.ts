import type { Localized } from '../data/types.ts'

const t = (it: string, en: string): Localized => ({ it, en })

export const ui = {
  tagline: t(
    'Il piano della settimana, un pasto alla volta. Spunta quello che hai già mangiato.',
    'Your week of meals, one plate at a time. Tick off what you have eaten.',
  ),
  skip: t('Vai al contenuto', 'Skip to content'),
  language: t('Lingua', 'Language'),
  daysLabel: t('Giorni della settimana', 'Days of the week'),
  prevDay: t('Giorno precedente', 'Previous day'),
  nextDay: t('Giorno successivo', 'Next day'),
  markDone: t('Segna come fatto', 'Mark as done'),
  markUndone: t('Segna come da fare', 'Mark as not done'),
  clearDay: t('Azzera il giorno', 'Clear day'),
  or: t('oppure', 'or'),
  note: t('Nota', 'Note'),
  freeMeal: t('Pasto libero', 'Free meal'),
  notPlanned: t('Non previsto', 'Not planned'),
  notPlannedBody: t(
    'Il piano non prevede nulla in questo momento della giornata.',
    'The plan has nothing scheduled at this point of the day.',
  ),
  install: t('Installa', 'Install'),
  progressTitle: t('Pasti completati', 'Meals completed'),
  footerNote: t('Piano alimentare personale, digitalizzato.', 'A personal meal plan, digitised.'),
  github: t('Il mio GitHub', 'My GitHub'),
} as const

export function progressText(done: number, total: number, locale: 'it' | 'en'): string {
  return locale === 'it' ? `${done} di ${total} pasti fatti` : `${done} of ${total} meals done`
}
