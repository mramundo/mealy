import type { LocaleCode } from '../data/types.ts'

export const LOCALES = ['it', 'en'] as const

/** Time zones that mean "the user is in Italy". */
const ITALY_TIME_ZONES = new Set(['Europe/Rome', 'Europe/Vatican', 'Europe/San_Marino'])

export function isLocaleCode(value: unknown): value is LocaleCode {
  return value === 'it' || value === 'en'
}

/**
 * Italian when the browser looks like it is in Italy, English everywhere else.
 * The time zone is the strongest location signal available offline; an explicit
 * `-IT` region on a preferred language is the fallback.
 */
export function detectLocale(): LocaleCode {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (zone && ITALY_TIME_ZONES.has(zone)) return 'it'
  } catch {
    /* Intl unavailable — fall through to the language check. */
  }

  const tags =
    typeof navigator !== 'undefined'
      ? navigator.languages?.length
        ? navigator.languages
        : [navigator.language]
      : []

  for (const tag of tags) {
    if (!tag) continue
    try {
      if (new Intl.Locale(tag).region === 'IT') return 'it'
    } catch {
      if (tag.toLowerCase().startsWith('it-it')) return 'it'
    }
  }

  return 'en'
}
