import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from 'react'
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

/** Widest tilt, in degrees. A square grows by |cos| + |sin| when rotated. */
const TILT = 10
const TILT_GROWTH = Math.cos((TILT * Math.PI) / 180) + Math.sin((TILT * Math.PI) / 180)
/** Passes from the largest drawing down to the smallest. */
const PASSES = 8

interface Cell {
  name: ProduceName
  color: string
  style: CSSProperties
}

interface Placed {
  x: number
  y: number
  size: number
  /** Half-width of the drawing's box once tilted. */
  half: number
}

/** Small deterministic PRNG: the same viewport always lays out the same way. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Scattered rather than gridded: candidates are thrown at random and kept only
 * when their tilted box clears every drawing already down by at least `gap`, so
 * two of them can never touch. Six passes run from the largest size to the
 * smallest, which lets the late, small ones settle into the holes the early,
 * big ones left — an uneven field with no bald patches.
 *
 * Nothing here animates: the field is laid out once and stays put.
 */
function layout(width: number, height: number): Cell[] {
  const random = mulberry32(0x9e3779b9)

  const largest = Math.max(72, Math.min(132, Math.min(width, height) / 7))
  const smallest = largest * 0.42
  const gap = Math.max(8, largest * 0.09)
  // Let the field run past the edges so it reads as continuing off-screen.
  const bleed = 0.05

  const placed: Placed[] = []

  for (let pass = 0; pass < PASSES; pass++) {
    const size = largest - ((largest - smallest) * pass) / (PASSES - 1)
    const half = (size * TILT_GROWTH) / 2
    const attempts = 600 + pass * 320

    for (let attempt = 0; attempt < attempts; attempt++) {
      const x = (random() * (1 + 2 * bleed) - bleed) * width
      const y = (random() * (1 + 2 * bleed) - bleed) * height

      let free = true
      for (const other of placed) {
        const reach = half + other.half + gap
        if (Math.abs(x - other.x) < reach && Math.abs(y - other.y) < reach) {
          free = false
          break
        }
      }

      if (free) placed.push({ x, y, size, half })
    }
  }

  return placed.map((spot, index): Cell => {
    // 7 and 26 are coprime, so the drawings cycle through the whole set before
    // any of them comes back around.
    const name = NAMES[(index * 7) % NAMES.length] ?? 'tomato'

    return {
      name,
      color: COLORS[name],
      style: {
        width: Math.round(spot.size),
        height: Math.round(spot.size),
        left: Math.round(spot.x - spot.size / 2),
        top: Math.round(spot.y - spot.size / 2),
        rotate: `${((random() * 2 - 1) * TILT).toFixed(1)}deg`,
        opacity: Number((0.105 + random() * 0.06).toFixed(3)),
      },
    }
  })
}

/**
 * Viewport size, rounded up to a coarse step. Mobile browsers resize the
 * viewport by a few pixels as their toolbars slide; rounding keeps that from
 * shuffling the layout.
 */
function useCoarseViewport(target: RefObject<HTMLDivElement | null>) {
  const [box, setBox] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const node = target.current
    if (!node) return

    const measure = () => {
      const width = Math.ceil(node.clientWidth / 40) * 40
      const height = Math.ceil(node.clientHeight / 80) * 80
      setBox((current) =>
        current.width === width && current.height === height ? current : { width, height },
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [target])

  return box
}

export function BackgroundDecor() {
  const root = useRef<HTMLDivElement>(null)
  const { width, height } = useCoarseViewport(root)
  const cells = useMemo(
    () => (width > 0 && height > 0 ? layout(width, height) : []),
    [width, height],
  )

  return (
    <div className="decor" ref={root} aria-hidden="true">
      {cells.map((cell, index) => {
        const Shape = PRODUCE[cell.name]
        return (
          <span key={index} className="decor__shape" style={{ ...cell.style, color: cell.color }}>
            <Shape width="100%" height="100%" />
          </span>
        )
      })}
    </div>
  )
}
