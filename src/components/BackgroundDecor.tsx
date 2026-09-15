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

/** Widest cell the grid aims for; narrow viewports get proportionally smaller
    ones so a phone still shows a full field rather than a handful of shapes. */
const MAX_CELL = 170
const MIN_CELL = 112
/** Share of the cell a drawing may occupy. */
const FILL = 0.62
/** Widest tilt, in degrees. A square grows by |cos|+|sin| when rotated. */
const TILT = 8
const TILT_GROWTH = Math.cos((TILT * Math.PI) / 180) + Math.sin((TILT * Math.PI) / 180)

interface Cell {
  name: ProduceName
  color: string
  style: CSSProperties
}

/** Deterministic 0-1 noise: the same viewport always lays out the same way. */
function noise(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

/**
 * One drawing per grid cell, jittered only as far as the cell allows once its
 * tilt is accounted for — so no two drawings can ever touch, whatever the
 * viewport. Nothing here animates: the field is laid out once and stays put.
 */
function layout(width: number, height: number): Cell[] {
  const cell = Math.max(MIN_CELL, Math.min(MAX_CELL, width / 3))
  const columns = Math.max(2, Math.round(width / cell))
  const rows = Math.max(3, Math.round(height / cell))
  const cellWidth = width / columns
  const cellHeight = height / rows

  const size = Math.round(Math.min(cellWidth, cellHeight) * FILL)
  // Half the room left over once the tilted drawing is placed in the middle.
  const slackX = Math.max(0, (cellWidth - size * TILT_GROWTH) / 2)
  const slackY = Math.max(0, (cellHeight - size * TILT_GROWTH) / 2)

  return Array.from({ length: columns * rows }, (_, index): Cell => {
    const column = index % columns
    const row = Math.floor(index / columns)
    const spread = (salt: number) => noise(index, salt) * 2 - 1

    // 7 and 26 are coprime, so the drawings cycle through the whole set before
    // repeating and no two neighbouring cells show the same thing.
    const name = NAMES[(index * 7) % NAMES.length] ?? 'tomato'

    return {
      name,
      color: COLORS[name],
      style: {
        width: size,
        height: size,
        left: Math.round((column + 0.5) * cellWidth + spread(1) * slackX - size / 2),
        top: Math.round((row + 0.5) * cellHeight + spread(2) * slackY - size / 2),
        rotate: `${(spread(3) * TILT).toFixed(1)}deg`,
        opacity: Number((0.115 + noise(index, 4) * 0.055).toFixed(3)),
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
