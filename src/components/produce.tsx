import type { SVGProps } from 'react'

type ShapeProps = SVGProps<SVGSVGElement>

const box = { viewBox: '0 0 100 100', xmlns: 'http://www.w3.org/2000/svg' } as const

/* Hand-drawn line art. Everything is stroked with round caps so the shapes read
   as sketches rather than stickers, and stays legible at low opacity. */
const ink = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function Tomato(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <ellipse cx="50" cy="58" rx="31" ry="28" />
        <path d="M50 30V19" />
        <path d="M50 30 33 25M50 30l17-5M50 30 38 42M50 30l12 12" />
        <path d="M29 52c2-7 7-12 13-14" />
      </g>
    </svg>
  )
}

function Carrot(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M36 32h28c-3 28-9 45-14 58-5-13-11-30-14-58Z" />
        <path d="M43 46h14M45 58h10M47 70h6" />
        <path d="M50 32c-2-8-8-13-16-14 1 8 6 13 13 15" />
        <path d="M50 32c2-8 8-13 16-14-1 8-6 13-13 15" />
        <path d="M50 31V15" />
      </g>
    </svg>
  )
}

function Broccoli(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M43 88c1-11 1-20 0-28h14c-1 8-1 17 0 28Z" />
        <path d="M30 60c-8-2-11-11-6-17-3-8 4-16 12-14 2-7 12-9 16-3 6-4 14 0 15 7 8 1 12 10 7 16 4 6 0 14-7 14H30Z" />
        <path d="M40 38c2 4 3 9 2 13M58 34c-1 5-1 10 1 14M50 46c3 4 4 8 4 13" />
      </g>
    </svg>
  )
}

function Avocado(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M50 11c9 0 14 9 16 18 2 11 8 19 8 30 0 16-11 29-24 29S26 75 26 59c0-11 6-19 8-30 2-9 7-18 16-18Z" />
        <ellipse cx="50" cy="60" rx="12" ry="13" />
      </g>
    </svg>
  )
}

function Lemon(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <ellipse cx="48" cy="55" rx="31" ry="24" transform="rotate(-16 48 55)" />
        <path d="M69 32c2-8 9-13 18-13-1 9-7 15-15 16Z" />
        <path d="M67 37c-2-5-2-9 0-12" />
      </g>
    </svg>
  )
}

function Pepper(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M28 51c0-13 9-21 20-17 3-4 8-4 11 0 11-4 20 4 20 17 0 23-9 36-22 36S28 74 28 51Z" />
        <path d="M50 34c0-9 2-14 6-18" />
        <path d="M41 43c-3 15-2 30 3 41M59 43c3 15 2 30-3 41" />
      </g>
    </svg>
  )
}

function Aubergine(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M71 27c9 9 4 27-11 40S28 81 20 73 20 46 35 33s27-15 36-6Z" />
        <path d="M71 27c4-5 9-8 14-8-1 6-4 11-9 13" />
        <path d="M65 21c-1-5 0-10 3-14 3 4 3 10 1 14" />
      </g>
    </svg>
  )
}

function PeaPod(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M22 78C12 46 36 16 76 12c-8 34-22 58-54 66Z" />
        <circle cx="38" cy="62" r="7" />
        <circle cx="50" cy="48" r="7" />
        <circle cx="62" cy="34" r="7" />
      </g>
    </svg>
  )
}

function Onion(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M50 20c17 11 28 29 26 45-2 14-13 23-26 23s-24-9-26-23c-2-16 9-34 26-45Z" />
        <path d="M39 33c-5 15-6 33 0 50M61 33c5 15 6 33 0 50" />
        <path d="M50 20c0-7 3-12 8-15 1 7-1 12-5 15" />
      </g>
    </svg>
  )
}

function Mushroom(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M20 53c0-17 13-30 30-30s30 13 30 30Z" />
        <path d="M39 53v20a11 11 0 0 0 22 0V53" />
        <circle cx="37" cy="39" r="3.2" />
        <circle cx="57" cy="35" r="3.2" />
        <circle cx="65" cy="45" r="2.8" />
      </g>
    </svg>
  )
}

function Strawberry(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M22 51c0-13 12-22 28-22s28 9 28 22c0 18-16 37-28 37S22 69 22 51Z" />
        <path d="M50 29V18" />
        <path d="M50 25 35 20m15 5 15-5M50 25 39 34m11-9 11 9" />
        <circle cx="42" cy="56" r="1.7" />
        <circle cx="58" cy="54" r="1.7" />
        <circle cx="50" cy="67" r="1.7" />
        <circle cx="36" cy="68" r="1.7" />
        <circle cx="63" cy="66" r="1.7" />
      </g>
    </svg>
  )
}

function Apple(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M50 35c-6-7-19-8-26 1-8 10-4 30 5 42 5 7 10 9 14 7 4-2 10-2 14 0 4 2 9 0 14-7 9-12 13-32 5-42-7-9-20-8-26-1Z" />
        <path d="M50 35V21" />
        <path d="M50 25c6-8 14-10 20-9-1 7-7 13-14 14Z" />
      </g>
    </svg>
  )
}

function Grapes(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <circle cx="50" cy="38" r="9" />
        <circle cx="37" cy="53" r="9" />
        <circle cx="63" cy="53" r="9" />
        <circle cx="50" cy="57" r="9" />
        <circle cx="43" cy="72" r="9" />
        <circle cx="57" cy="72" r="9" />
        <path d="M50 29V18" />
        <path d="M50 22c7-7 16-8 22-6-2 7-9 12-16 12Z" />
      </g>
    </svg>
  )
}

function Sprig(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M52 88C50 62 56 36 72 16" />
        <path d="M56 64c-9 4-16 1-19-7 9-4 16-1 19 7Z" />
        <path d="M60 46c9 4 16 1 19-7-9-4-16-1-19 7Z" />
        <path d="M64 28c-9 4-16 1-19-7 9-4 16-1 19 7Z" />
      </g>
    </svg>
  )
}

function CitrusSlice(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <circle cx="50" cy="50" r="34" />
        <circle cx="50" cy="50" r="26" />
        <path d="M50 24v52M28 37l44 26M28 63l44-26" />
      </g>
    </svg>
  )
}

export const PRODUCE = {
  tomato: Tomato,
  carrot: Carrot,
  broccoli: Broccoli,
  avocado: Avocado,
  lemon: Lemon,
  pepper: Pepper,
  aubergine: Aubergine,
  peapod: PeaPod,
  onion: Onion,
  mushroom: Mushroom,
  strawberry: Strawberry,
  apple: Apple,
  grapes: Grapes,
  sprig: Sprig,
  citrus: CitrusSlice,
} as const

export type ProduceName = keyof typeof PRODUCE
