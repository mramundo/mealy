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

/* Hand-placed so the wash reads as a scattered market stall rather than a grid.
   Nothing here carries meaning — it is decoration and stays aria-hidden. */
const SHAPES: FloatingShape[] = [
  {
    name: 'tomato',
    color: 'var(--tomato)',
    size: 150,
    top: '6%',
    left: '4%',
    dx: '40px',
    dy: '60px',
    rot: '-8deg',
    rot2: '12deg',
    dur: '34s',
    delay: '0s',
  },
  {
    name: 'leaf',
    color: 'var(--basil)',
    size: 190,
    top: '2%',
    left: '78%',
    dx: '-50px',
    dy: '50px',
    rot: '18deg',
    rot2: '-10deg',
    dur: '42s',
    delay: '-6s',
  },
  {
    name: 'lemon',
    color: 'var(--lemon)',
    size: 120,
    top: '24%',
    left: '90%',
    dx: '-30px',
    dy: '-45px',
    rot: '10deg',
    rot2: '-16deg',
    dur: '29s',
    delay: '-3s',
  },
  {
    name: 'carrot',
    color: 'var(--carrot)',
    size: 130,
    top: '44%',
    left: '2%',
    dx: '45px',
    dy: '-40px',
    rot: '14deg',
    rot2: '-6deg',
    dur: '37s',
    delay: '-11s',
  },
  {
    name: 'broccoli',
    color: 'var(--basil)',
    size: 145,
    top: '66%',
    left: '86%',
    dx: '-40px',
    dy: '-55px',
    rot: '-12deg',
    rot2: '8deg',
    dur: '45s',
    delay: '-2s',
  },
  {
    name: 'avocado',
    color: 'var(--teal)',
    size: 115,
    top: '78%',
    left: '10%',
    dx: '55px',
    dy: '-35px',
    rot: '20deg',
    rot2: '-4deg',
    dur: '31s',
    delay: '-8s',
  },
  {
    name: 'pepper',
    color: 'var(--radish)',
    size: 110,
    top: '88%',
    left: '62%',
    dx: '-45px',
    dy: '-60px',
    rot: '-16deg',
    rot2: '10deg',
    dur: '39s',
    delay: '-14s',
  },
  {
    name: 'peapod',
    color: 'var(--basil)',
    size: 135,
    top: '36%',
    left: '46%',
    dx: '35px',
    dy: '55px',
    rot: '6deg',
    rot2: '-14deg',
    dur: '48s',
    delay: '-5s',
  },
  {
    name: 'onion',
    color: 'var(--aubergine)',
    size: 100,
    top: '14%',
    left: '38%',
    dx: '-35px',
    dy: '45px',
    rot: '-10deg',
    rot2: '14deg',
    dur: '36s',
    delay: '-9s',
  },
  {
    name: 'grapes',
    color: 'var(--berry)',
    size: 105,
    top: '58%',
    left: '30%',
    dx: '40px',
    dy: '-50px',
    rot: '8deg',
    rot2: '-12deg',
    dur: '43s',
    delay: '-16s',
  },
]

interface Wash {
  color: string
  size: number
  top: string
  left: string
  dx: string
  dy: string
  dur: string
  delay: string
}

const WASHES: Wash[] = [
  {
    color: 'var(--amber)',
    size: 460,
    top: '-12%',
    left: '-8%',
    dx: '70px',
    dy: '60px',
    dur: '52s',
    delay: '0s',
  },
  {
    color: 'var(--berry)',
    size: 380,
    top: '40%',
    left: '84%',
    dx: '-60px',
    dy: '-70px',
    dur: '61s',
    delay: '-12s',
  },
  {
    color: 'var(--basil)',
    size: 420,
    top: '82%',
    left: '18%',
    dx: '55px',
    dy: '-60px',
    dur: '57s',
    delay: '-24s',
  },
]

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E\")"

export function BackgroundDecor() {
  return (
    <div className="decor" aria-hidden="true">
      {WASHES.map((wash, index) => (
        <span
          key={index}
          className="decor__wash"
          style={
            {
              width: wash.size,
              height: wash.size,
              top: wash.top,
              left: wash.left,
              background: wash.color,
              '--dx': wash.dx,
              '--dy': wash.dy,
              '--dur': wash.dur,
              '--delay': wash.delay,
            } as CSSProperties
          }
        />
      ))}

      {SHAPES.map((shape) => {
        const Shape = PRODUCE[shape.name]
        return (
          <span
            key={`${shape.name}-${shape.top}-${shape.left}`}
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

      <span className="decor__grain" style={{ backgroundImage: GRAIN }} />
    </div>
  )
}
