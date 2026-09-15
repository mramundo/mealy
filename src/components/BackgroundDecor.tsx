import type { CSSProperties } from 'react'
import { PRODUCE, type ProduceName } from './produce.tsx'

interface FloatingShape {
  name: ProduceName
  color: string
  size: number
  top: string
  left: string
  dx: string
  dy: string
  rot: string
  rot2: string
  dur: string
  delay: string
}

/* Kept to the margins and to 7% opacity: movement without touching legibility. */
const SHAPES: FloatingShape[] = [
  {
    name: 'tomato',
    color: '#e8412e',
    size: 150,
    top: '8%',
    left: '-3%',
    dx: '34px',
    dy: '46px',
    rot: '-8deg',
    rot2: '10deg',
    dur: '36s',
    delay: '0s',
  },
  {
    name: 'leaf',
    color: '#17a94b',
    size: 190,
    top: '1%',
    left: '86%',
    dx: '-40px',
    dy: '44px',
    rot: '16deg',
    rot2: '-8deg',
    dur: '44s',
    delay: '-7s',
  },
  {
    name: 'lemon',
    color: 'var(--lemon)',
    size: 120,
    top: '34%',
    left: '93%',
    dx: '-26px',
    dy: '-38px',
    rot: '10deg',
    rot2: '-14deg',
    dur: '31s',
    delay: '-3s',
  },
  {
    name: 'carrot',
    color: 'var(--carrot)',
    size: 130,
    top: '52%',
    left: '-4%',
    dx: '38px',
    dy: '-34px',
    rot: '12deg',
    rot2: '-6deg',
    dur: '39s',
    delay: '-12s',
  },
  {
    name: 'broccoli',
    color: '#17a94b',
    size: 140,
    top: '74%',
    left: '88%',
    dx: '-32px',
    dy: '-46px',
    rot: '-10deg',
    rot2: '8deg',
    dur: '47s',
    delay: '-2s',
  },
  {
    name: 'avocado',
    color: 'var(--teal)',
    size: 110,
    top: '86%',
    left: '4%',
    dx: '44px',
    dy: '-30px',
    rot: '18deg',
    rot2: '-4deg',
    dur: '33s',
    delay: '-9s',
  },
  {
    name: 'grapes',
    color: '#6b4ae3',
    size: 105,
    top: '20%',
    left: '46%',
    dx: '30px',
    dy: '-40px',
    rot: '6deg',
    rot2: '-12deg',
    dur: '42s',
    delay: '-16s',
  },
]

export function BackgroundDecor() {
  return (
    <div className="decor" aria-hidden="true">
      {SHAPES.map((shape) => {
        const Shape = PRODUCE[shape.name]
        return (
          <span
            key={`${shape.name}-${shape.top}`}
            className="decor__shape"
            style={
              {
                width: shape.size,
                height: shape.size,
                top: shape.top,
                left: shape.left,
                color: shape.color,
                '--dx': shape.dx,
                '--dy': shape.dy,
                '--rot': shape.rot,
                '--rot2': shape.rot2,
                '--dur': shape.dur,
                '--delay': shape.delay,
              } as CSSProperties
            }
          >
            <Shape width="100%" height="100%" fill="currentColor" />
          </span>
        )
      })}
    </div>
  )
}
