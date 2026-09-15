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

function Banana(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M20 30c0 28 20 48 48 50 8 1 12-3 12-7 0-5-5-7-11-7-22-2-37-17-38-37 0-4-2-7-6-7s-5 4-5 8Z" />
        <path d="M22 26c-3 2-5 5-5 8" />
      </g>
    </svg>
  )
}

function Pear(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M53 28c-5 4-7 11-6 17-9 5-15 15-15 26 0 12 9 20 20 20s20-8 20-20c0-11-6-21-15-26 1-6-1-13-4-17Z" />
        <path d="M53 28V15" />
        <path d="M53 19c6-6 13-7 18-6-1 6-6 11-12 11Z" />
      </g>
    </svg>
  )
}

function Cherries(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <circle cx="33" cy="70" r="14" />
        <circle cx="67" cy="66" r="13" />
        <path d="M33 56C39 37 51 23 70 16M67 53C65 38 66 26 70 16" />
        <path d="M70 16c7-6 15-7 21-5-2 7-9 11-16 11Z" />
      </g>
    </svg>
  )
}

function Watermelon(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M13 70c0-20 17-37 37-37s37 17 37 37Z" />
        <path d="M22 70c0-15 13-28 28-28s28 13 28 28" />
        <circle cx="50" cy="55" r="2" />
        <circle cx="38" cy="62" r="2" />
        <circle cx="62" cy="62" r="2" />
      </g>
    </svg>
  )
}

function Corn(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M50 14c11 0 19 14 19 32s-8 34-19 34-19-16-19-34 8-32 19-32Z" />
        <path d="M50 18v58M38 34c8 4 16 4 24 0M36 48c9 5 19 5 28 0M38 62c8 4 16 4 24 0" />
        <path d="M31 50c-8-2-14-8-16-16 9-1 15 4 18 12ZM69 50c8-2 14-8 16-16-9-1-15 4-18 12Z" />
      </g>
    </svg>
  )
}

function Pumpkin(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <ellipse cx="50" cy="59" rx="34" ry="27" />
        <path d="M37 34c-6 14-6 36 0 50M63 34c6 14 6 36 0 50" />
        <path d="M50 32V21" />
        <path d="M50 24c6-5 12-6 17-5-2 6-7 10-13 10Z" />
      </g>
    </svg>
  )
}

function Courgette(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M25 75c-6-6-4-18 6-28l21-21c10-10 22-12 28-6s4 18-6 28L53 69c-10 10-22 12-28 6Z" />
        <path d="M76 22c4-4 9-5 13-4" />
        <circle cx="45" cy="53" r="1.8" />
        <circle cx="56" cy="42" r="1.8" />
        <circle cx="36" cy="62" r="1.8" />
      </g>
    </svg>
  )
}

function Fish(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M10 50c10-15 25-23 40-23s26 8 30 23c-4 15-15 23-30 23S20 65 10 50Z" />
        <path d="M80 50c4-7 9-12 14-15v30c-5-3-10-8-14-15Z" />
        <path d="M45 32c6 7 6 29 0 36" />
        <circle cx="27" cy="44" r="2.6" />
      </g>
    </svg>
  )
}

function Bread(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M17 71c0-22 15-37 33-37s33 15 33 37Z" />
        <path d="M33 54c3-5 7-8 11-9M47 47c3-5 8-7 13-7M60 45c4-3 8-4 12-3" />
      </g>
    </svg>
  )
}

function Cheese(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M16 74V52L84 30v44Z" />
        <path d="M16 52 84 30" />
        <circle cx="42" cy="63" r="4.5" />
        <circle cx="62" cy="55" r="3.6" />
        <circle cx="70" cy="66" r="3" />
      </g>
    </svg>
  )
}

function Cabbage(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <g {...ink}>
        <path d="M50 84c-18 0-32-14-32-31 0-15 13-27 32-27s32 12 32 27c0 17-14 31-32 31Z" />
        <path d="M50 26c-9 9-14 21-14 34M50 26c9 9 14 21 14 34" />
        <path d="M32 40c6 7 10 16 10 26M68 40c-6 7-10 16-10 26" />
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
  banana: Banana,
  pear: Pear,
  cherries: Cherries,
  watermelon: Watermelon,
  corn: Corn,
  pumpkin: Pumpkin,
  courgette: Courgette,
  fish: Fish,
  bread: Bread,
  cheese: Cheese,
  cabbage: Cabbage,
} as const

export type ProduceName = keyof typeof PRODUCE
