import { useEffect, type CSSProperties } from 'react'
import { PRODUCE, type ProduceName } from './produce.tsx'

interface Spot {
  name: ProduceName
  color: string
  size: number
  /** Viewport percentages. */
  top: number
  left: number
  opacity: number
}

const RED = '#e8412e'
const GREEN = '#17a94b'
const VIOLET = '#6b4ae3'
const PINK = '#de2a7e'
const ORANGE = '#f59300'
const TEAL = 'var(--teal)'
const LEMON = 'var(--lemon)'
const CARROT = 'var(--carrot)'

/*
 * A full market stall. The ring around the margins runs at full strength; the
 * shapes that fall behind the reading column are held at a third of it, so the
 * background stays busy without ever competing with the text.
 */
const SPOTS: Spot[] = [
  // left margin
  { name: 'tomato', color: RED, size: 132, top: 3, left: -3, opacity: 0.13 },
  { name: 'courgette', color: GREEN, size: 118, top: 15, left: 6, opacity: 0.12 },
  { name: 'carrot', color: CARROT, size: 124, top: 27, left: -2, opacity: 0.13 },
  { name: 'cherries', color: RED, size: 104, top: 38, left: 7, opacity: 0.11 },
  { name: 'onion', color: VIOLET, size: 112, top: 50, left: -4, opacity: 0.12 },
  { name: 'bread', color: ORANGE, size: 122, top: 62, left: 5, opacity: 0.11 },
  { name: 'sprig', color: GREEN, size: 120, top: 75, left: -3, opacity: 0.12 },
  { name: 'watermelon', color: PINK, size: 112, top: 88, left: 6, opacity: 0.12 },

  // right margin
  { name: 'broccoli', color: GREEN, size: 138, top: 1, left: 88, opacity: 0.13 },
  { name: 'lemon', color: LEMON, size: 116, top: 13, left: 79, opacity: 0.14 },
  { name: 'pear', color: GREEN, size: 108, top: 25, left: 92, opacity: 0.11 },
  { name: 'aubergine', color: VIOLET, size: 124, top: 37, left: 82, opacity: 0.12 },
  { name: 'corn', color: LEMON, size: 118, top: 50, left: 93, opacity: 0.12 },
  { name: 'grapes', color: PINK, size: 106, top: 62, left: 81, opacity: 0.12 },
  { name: 'pumpkin', color: CARROT, size: 126, top: 74, left: 91, opacity: 0.12 },
  { name: 'cabbage', color: GREEN, size: 108, top: 87, left: 80, opacity: 0.11 },

  // top band
  { name: 'pepper', color: RED, size: 100, top: -4, left: 26, opacity: 0.1 },
  { name: 'citrus', color: ORANGE, size: 106, top: -6, left: 47, opacity: 0.1 },
  { name: 'peapod', color: GREEN, size: 112, top: -3, left: 66, opacity: 0.1 },
  { name: 'banana', color: LEMON, size: 108, top: 6, left: 16, opacity: 0.09 },

  // bottom band
  { name: 'strawberry', color: PINK, size: 100, top: 91, left: 24, opacity: 0.11 },
  { name: 'apple', color: RED, size: 106, top: 93, left: 44, opacity: 0.11 },
  { name: 'cheese', color: LEMON, size: 110, top: 90, left: 64, opacity: 0.11 },
  { name: 'mushroom', color: ORANGE, size: 96, top: 82, left: 34, opacity: 0.08 },

  // thin scatter behind the reading column
  { name: 'avocado', color: TEAL, size: 92, top: 20, left: 36, opacity: 0.05 },
  { name: 'fish', color: TEAL, size: 104, top: 31, left: 58, opacity: 0.05 },
  { name: 'citrus', color: TEAL, size: 88, top: 44, left: 30, opacity: 0.05 },
  { name: 'tomato', color: PINK, size: 80, top: 45, left: 66, opacity: 0.05 },
  { name: 'sprig', color: GREEN, size: 96, top: 57, left: 24, opacity: 0.05 },
  { name: 'pear', color: ORANGE, size: 84, top: 58, left: 62, opacity: 0.05 },
  { name: 'peapod', color: GREEN, size: 92, top: 69, left: 44, opacity: 0.05 },
  { name: 'grapes', color: VIOLET, size: 82, top: 72, left: 66, opacity: 0.05 },
  { name: 'carrot', color: CARROT, size: 86, top: 70, left: 16, opacity: 0.05 },
  { name: 'banana', color: LEMON, size: 90, top: 34, left: 18, opacity: 0.05 },
  { name: 'cherries', color: RED, size: 78, top: 84, left: 54, opacity: 0.05 },
  { name: 'courgette', color: GREEN, size: 88, top: 10, left: 58, opacity: 0.05 },
]

/** Deterministic 0-1 noise, so every reload lays the stall out the same way. */
function noise(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

/** Per-shape motion derived from its index: amplitude, tilt, tempo, depth. */
function motionVars(index: number): CSSProperties {
  const spread = (salt: number) => noise(index, salt) * 2 - 1
  const amplitude = 16 + noise(index, 1) * 26

  return {
    '--dx': `${(spread(2) * amplitude).toFixed(1)}px`,
    '--dy': `${(spread(3) * amplitude).toFixed(1)}px`,
    '--rot': `${(spread(4) * 13).toFixed(1)}deg`,
    '--rot2': `${(spread(5) * 13).toFixed(1)}deg`,
    '--dur': `${(29 + noise(index, 6) * 23).toFixed(1)}s`,
    '--delay': `-${(noise(index, 7) * 26).toFixed(1)}s`,
    '--depth': (spread(8) * 0.16).toFixed(3),
    '--anim': noise(index, 9) > 0.5 ? 'sway' : 'drift',
  } as CSSProperties
}

/**
 * Scroll offset drives a per-shape parallax: shapes with a positive depth rise
 * with the scroll, negative ones sink, so the field stays evenly filled.
 */
function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let frame = 0
    const apply = () => {
      frame = 0
      root.style.setProperty('--sy', `${window.scrollY}px`)
    }
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [])
}

export function BackgroundDecor() {
  useParallax()

  return (
    <div className="decor" aria-hidden="true">
      {SPOTS.map((spot, index) => {
        const Shape = PRODUCE[spot.name]
        return (
          <span
            key={`${spot.name}-${index}`}
            className="decor__layer"
            style={
              {
                width: spot.size,
                height: spot.size,
                top: `${spot.top}%`,
                left: `${spot.left}%`,
                color: spot.color,
                ...motionVars(index),
              } as CSSProperties
            }
          >
            <span className="decor__shape" style={{ opacity: spot.opacity }}>
              <Shape width="100%" height="100%" />
            </span>
          </span>
        )
      })}
    </div>
  )
}
