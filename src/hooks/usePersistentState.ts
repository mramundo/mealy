import { useCallback, useEffect, useState } from 'react'

/**
 * `useState` mirrored into localStorage. Storage can be unavailable (private
 * mode, blocked cookies), so every access is guarded and simply degrades to
 * in-memory state.
 */
export function usePersistentState<T>(
  key: string,
  initial: T,
  revive: (raw: unknown) => T | null = (raw) => raw as T,
): [T, (next: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initial
      const revived = revive(JSON.parse(raw) as unknown)
      return revived === null ? initial : revived
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* Nothing we can do — keep going with in-memory state. */
    }
  }, [key, value])

  const update = useCallback((next: T | ((prev: T) => T)) => {
    setValue((prev) => (typeof next === 'function' ? (next as (p: T) => T)(prev) : next))
  }, [])

  return [value, update]
}
