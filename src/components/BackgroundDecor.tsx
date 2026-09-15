import type { CSSProperties } from 'react'
import { PRODUCE, type ProduceName } from './produce.tsx'

const RED = '#e8412e'
const GREEN = '#17a94b'
const VIOLET = '#6b4ae3'
const PINK = '#de2a7e'
const ORANGE = '#f59300'
const TEAL = 'var(--teal)'
const LEMON = 'var(--lemon)'
const CARROT = 'var(--carrot)'

/** Each drawing keeps the colour it has on a market stall. */
const COLORS: Record<ProduceName, string> = {
  tomato: RED,
  carrot: CARROT,
  broccoli: GREEN,
  avocado: TEAL,
  lemon: LEMON,
  pepper: RED,
  aubergine: VIOLET,
  peapod: GREEN,
  onion: VIOLET,
  mushroom: ORANGE,
  strawberry: PINK,
  apple: RED,
  grapes: PINK,
  sprig: GREEN,
  citrus: ORANGE,
  banana: LEMON,
  pear: GREEN,
  cherries: RED,
  watermelon: PINK,
  corn: LEMON,
  pumpkin: CARROT,
  courgette: GREEN,
  fish: TEAL,
  bread: ORANGE,
  cheese: LEMON,
  cabbage: GREEN,
}

const NAMES = Object.keys(COLORS) as ProduceName[]

/* A jittered grid: every cell gets a shape, so no corner of the viewport is
   left bare, and the offset keeps it from reading as a grid. */
const COLUMNS = 8
const ROWS = 7

/** Deterministic 0-1 noise, so every reload lays the stall out the same way. */
function noise(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

interface Spot {
  name: ProduceName
  color: string
  style: CSSProperties
}

const SPOTS: Spot[] = Array.from({ length: COLUMNS * ROWS }, (_, index): Spot => {
  const column = index % COLUMNS
  const row = Math.floor(index / COLUMNS)
  const spread = (salt: number) => noise(index, salt) * 2 - 1

  // 7 and 26 are coprime, so the names cycle through the whole set before
  // repeating and no two neighbouring cells draw the same thing.
  const name = NAMES[(index * 7) % NAMES.length] ?? 'tomato'
  const amplitude = 14 + noise(index, 1) * 24

  return {
    name,
    color: COLORS[name],
    style: {
      left: `${((column + 0.5) / COLUMNS) * 100 + spread(2) * 4.4}%`,
      top: `${((row + 0.5) / ROWS) * 100 + spread(3) * 5}%`,
      '--size': `${Math.round(84 + noise(index, 4) * 44)}px`,
      '--op': (0.075 + noise(index, 5) * 0.035).toFixed(3),
      '--dx': `${(spread(6) * amplitude).toFixed(1)}px`,
      '--dy': `${(spread(7) * amplitude).toFixed(1)}px`,
      '--rot': `${(spread(8) * 16).toFixed(1)}deg`,
      '--rot2': `${(spread(9) * 16).toFixed(1)}deg`,
      '--dur': `${(30 + noise(index, 10) * 24).toFixed(1)}s`,
      '--delay': `-${(noise(index, 11) * 28).toFixed(1)}s`,
      '--anim': noise(index, 12) > 0.5 ? 'sway' : 'drift',
    } as CSSProperties,
  }
})

/**
 * Fixed to the viewport: the shapes drift gently on their own but never react
 * to the scroll, so the page moves and the stall behind it stays put.
 */
export function BackgroundDecor() {
  return (
    <div className="decor" aria-hidden="true">
      {SPOTS.map((spot, index) => {
        const Shape = PRODUCE[spot.name]
        return (
          <span
            key={`${spot.name}-${index}`}
            className="decor__shape"
            style={{ ...spot.style, color: spot.color }}
          >
            <Shape width="100%" height="100%" />
          </span>
        )
      })}
    </div>
  )
}
