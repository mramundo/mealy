import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import { PRODUCE, type ProduceName } from './produce.tsx'

interface FloatingShape {
  name: ProduceName
  color: string
  size: number
  top: string
  left: string
  /** Parallax factor: positive rises with the scroll, negative sinks. */
  depth: number
  opacity: number
  anim: 'drift' | 'sway'
  dx: string
  dy: string
  rot: string
  rot2: string
  dur: string
  delay: string
}

const RED = '#e8412e'
const GREEN = '#17a94b'
const VIOLET = '#6b4ae3'
const PINK = '#de2a7e'
const ORANGE = '#f59300'
const TEAL = 'var(--teal)'
const LEMON = 'var(--lemon)'

/* Hand-placed: a dense ring around the margins, a thin scatter behind the
   content. Shapes near the text run at half the opacity of the ones outside it. */
const SHAPES: FloatingShape[] = [
  // left margin
  {
    name: 'tomato',
    color: RED,
    size: 132,
    top: '4%',
    left: '-3%',
    depth: 0.12,
    opacity: 0.12,
    anim: 'drift',
    dx: '26px',
    dy: '34px',
    rot: '-9deg',
    rot2: '7deg',
    dur: '31s',
    delay: '0s',
  },
  {
    name: 'carrot',
    color: ORANGE,
    size: 124,
    top: '30%',
    left: '2%',
    depth: -0.16,
    opacity: 0.12,
    anim: 'sway',
    dx: '20px',
    dy: '-26px',
    rot: '12deg',
    rot2: '-8deg',
    dur: '38s',
    delay: '-6s',
  },
  {
    name: 'onion',
    color: VIOLET,
    size: 112,
    top: '58%',
    left: '-4%',
    depth: 0.1,
    opacity: 0.11,
    anim: 'drift',
    dx: '24px',
    dy: '-30px',
    rot: '-6deg',
    rot2: '10deg',
    dur: '44s',
    delay: '-13s',
  },
  {
    name: 'sprig',
    color: GREEN,
    size: 128,
    top: '84%',
    left: '4%',
    depth: -0.14,
    opacity: 0.12,
    anim: 'sway',
    dx: '-18px',
    dy: '-24px',
    rot: '10deg',
    rot2: '-12deg',
    dur: '35s',
    delay: '-3s',
  },

  // right margin
  {
    name: 'broccoli',
    color: GREEN,
    size: 142,
    top: '2%',
    left: '88%',
    depth: -0.12,
    opacity: 0.12,
    anim: 'sway',
    dx: '-22px',
    dy: '30px',
    rot: '8deg',
    rot2: '-6deg',
    dur: '41s',
    delay: '-9s',
  },
  {
    name: 'lemon',
    color: LEMON,
    size: 118,
    top: '26%',
    left: '93%',
    depth: 0.16,
    opacity: 0.14,
    anim: 'drift',
    dx: '-26px',
    dy: '-22px',
    rot: '-14deg',
    rot2: '6deg',
    dur: '33s',
    delay: '-2s',
  },
  {
    name: 'aubergine',
    color: VIOLET,
    size: 126,
    top: '52%',
    left: '90%',
    depth: -0.1,
    opacity: 0.11,
    anim: 'drift',
    dx: '-20px',
    dy: '-32px',
    rot: '14deg',
    rot2: '-5deg',
    dur: '46s',
    delay: '-17s',
  },
  {
    name: 'grapes',
    color: PINK,
    size: 108,
    top: '78%',
    left: '94%',
    depth: 0.14,
    opacity: 0.12,
    anim: 'sway',
    dx: '-24px',
    dy: '-20px',
    rot: '-8deg',
    rot2: '12deg',
    dur: '37s',
    delay: '-11s',
  },

  // top band
  {
    name: 'pepper',
    color: RED,
    size: 96,
    top: '-4%',
    left: '32%',
    depth: 0.18,
    opacity: 0.08,
    anim: 'drift',
    dx: '18px',
    dy: '26px',
    rot: '10deg',
    rot2: '-9deg',
    dur: '40s',
    delay: '-5s',
  },
  {
    name: 'citrus',
    color: ORANGE,
    size: 104,
    top: '-6%',
    left: '64%',
    depth: -0.15,
    opacity: 0.08,
    anim: 'sway',
    dx: '-16px',
    dy: '28px',
    rot: '-12deg',
    rot2: '8deg',
    dur: '48s',
    delay: '-21s',
  },

  // bottom band
  {
    name: 'strawberry',
    color: PINK,
    size: 100,
    top: '90%',
    left: '30%',
    depth: -0.18,
    opacity: 0.1,
    anim: 'sway',
    dx: '22px',
    dy: '-26px',
    rot: '-10deg',
    rot2: '8deg',
    dur: '36s',
    delay: '-8s',
  },
  {
    name: 'apple',
    color: RED,
    size: 106,
    top: '92%',
    left: '58%',
    depth: 0.12,
    opacity: 0.1,
    anim: 'drift',
    dx: '-20px',
    dy: '-30px',
    rot: '7deg',
    rot2: '-10deg',
    dur: '43s',
    delay: '-15s',
  },
  {
    name: 'peapod',
    color: GREEN,
    size: 118,
    top: '86%',
    left: '74%',
    depth: -0.13,
    opacity: 0.11,
    anim: 'drift',
    dx: '18px',
    dy: '-24px',
    rot: '-6deg',
    rot2: '11deg',
    dur: '39s',
    delay: '-4s',
  },

  // thin scatter behind the content
  {
    name: 'avocado',
    color: TEAL,
    size: 92,
    top: '42%',
    left: '24%',
    depth: 0.15,
    opacity: 0.05,
    anim: 'sway',
    dx: '16px',
    dy: '-22px',
    rot: '9deg',
    rot2: '-7deg',
    dur: '45s',
    delay: '-19s',
  },
  {
    name: 'mushroom',
    color: ORANGE,
    size: 84,
    top: '16%',
    left: '54%',
    depth: -0.11,
    opacity: 0.05,
    anim: 'drift',
    dx: '-14px',
    dy: '20px',
    rot: '-8deg',
    rot2: '9deg',
    dur: '42s',
    delay: '-7s',
  },
  {
    name: 'citrus',
    color: TEAL,
    size: 88,
    top: '66%',
    left: '44%',
    depth: 0.1,
    opacity: 0.05,
    anim: 'sway',
    dx: '20px',
    dy: '-18px',
    rot: '11deg',
    rot2: '-6deg',
    dur: '50s',
    delay: '-24s',
  },
  {
    name: 'tomato',
    color: PINK,
    size: 78,
    top: '34%',
    left: '72%',
    depth: -0.16,
    opacity: 0.05,
    anim: 'drift',
    dx: '-18px',
    dy: '22px',
    rot: '-11deg',
    rot2: '6deg',
    dur: '34s',
    delay: '-12s',
  },
  {
    name: 'sprig',
    color: GREEN,
    size: 96,
    top: '70%',
    left: '16%',
    depth: 0.13,
    opacity: 0.06,
    anim: 'sway',
    dx: '14px',
    dy: '-20px',
    rot: '6deg',
    rot2: '-10deg',
    dur: '47s',
    delay: '-16s',
  },
]

/** Scroll offset drives a per-shape parallax; skipped when motion is reduced. */
function useParallax(target: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const node = target.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const apply = () => {
      frame = 0
      node.style.setProperty('--sy', `${window.scrollY}px`)
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
  }, [target])
}

export function BackgroundDecor() {
  const root = useRef<HTMLDivElement>(null)
  useParallax(root)

  return (
    <div className="decor" ref={root} aria-hidden="true">
      {SHAPES.map((shape, index) => {
        const Shape = PRODUCE[shape.name]
        return (
          <span
            key={`${shape.name}-${index}`}
            className="decor__layer"
            style={
              {
                width: shape.size,
                height: shape.size,
                top: shape.top,
                left: shape.left,
                color: shape.color,
                '--depth': shape.depth,
              } as CSSProperties
            }
          >
            <span
              className="decor__shape"
              style={
                {
                  '--op': shape.opacity,
                  '--anim': shape.anim,
                  '--dx': shape.dx,
                  '--dy': shape.dy,
                  '--rot': shape.rot,
                  '--rot2': shape.rot2,
                  '--dur': shape.dur,
                  '--delay': shape.delay,
                } as CSSProperties
              }
            >
              <Shape width="100%" height="100%" />
            </span>
          </span>
        )
      })}
    </div>
  )
}
