import type { SVGProps } from 'react'

type ShapeProps = SVGProps<SVGSVGElement>

const box = { viewBox: '0 0 100 100', xmlns: 'http://www.w3.org/2000/svg' } as const

/* Bold produce silhouettes. They sit behind the content at low opacity, so they
   are drawn chunky and simple — readable even as a faint wash of colour. */

function Tomato(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <circle cx="50" cy="60" r="33" />
      <path d="M50 20 38 14l3 11-13 2 11 8h22l11-8-13-2 3-11-12 6Z" />
      <rect x="46.5" y="8" width="7" height="14" rx="3.5" />
    </svg>
  )
}

function Carrot(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <path d="M35 30h30c-2 32-8 51-15 64-7-13-13-32-15-64Z" />
      <path d="M50 26c-4-9-11-13-19-13 1 8 5 13 11 16Z" />
      <path d="M50 26c4-9 11-13 19-13-1 8-5 13-11 16Z" />
      <path d="M50 24c0-9-3-16-8-21 6-1 11 6 13 14Z" />
    </svg>
  )
}

function Leaf(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <path d="M16 84C16 42 46 14 86 14c0 42-30 70-70 70Z" />
    </svg>
  )
}

function Avocado(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <path d="M50 10c18 0 31 20 31 41 0 22-14 39-31 39S19 73 19 51C19 30 32 10 50 10Zm0 30a15 15 0 1 0 0 30 15 15 0 0 0 0-30Z" />
    </svg>
  )
}

function Broccoli(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <path d="M43 92 45 56h10l2 36Z" />
      <circle cx="34" cy="46" r="17" />
      <circle cx="50" cy="34" r="19" />
      <circle cx="67" cy="46" r="17" />
      <circle cx="43" cy="58" r="14" />
      <circle cx="58" cy="58" r="14" />
    </svg>
  )
}

function Pepper(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <path d="M27 46c0-15 13-20 23-15 10-5 23 0 23 15 0 27-10 45-23 45S27 73 27 46Z" />
      <path d="M46 28c0-8 3-14 9-16 1 6-1 12-4 16Z" />
    </svg>
  )
}

function Lemon(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <ellipse cx="50" cy="50" rx="36" ry="25" transform="rotate(-27 50 50)" />
      <path d="M17 68c-5 4-8 7-9 11 5-1 9-3 13-7Z" />
      <path d="M83 32c5-4 8-7 9-11-5 1-9 3-13 7Z" />
    </svg>
  )
}

function PeaPod(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <path d="M20 80C10 48 34 16 76 12c-8 34-20 58-56 68Z" opacity=".55" />
      <circle cx="37" cy="63" r="9" />
      <circle cx="50" cy="48" r="9" />
      <circle cx="63" cy="33" r="9" />
    </svg>
  )
}

function Onion(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <path d="M50 22c22 14 32 34 24 52-8 17-40 17-48 0-8-18 2-38 24-52Z" />
      <path d="M50 20c-3-7-8-11-15-13 2 7 6 11 12 14Zm0 0c3-7 8-11 15-13-2 7-6 11-12 14Z" />
    </svg>
  )
}

function Grapes(props: ShapeProps) {
  return (
    <svg {...box} {...props}>
      <circle cx="50" cy="34" r="11" />
      <circle cx="36" cy="52" r="11" />
      <circle cx="64" cy="52" r="11" />
      <circle cx="50" cy="56" r="11" />
      <circle cx="43" cy="74" r="11" />
      <circle cx="58" cy="74" r="11" />
      <path d="M48 24c0-8 4-13 12-15-1 8-5 12-12 15Z" />
    </svg>
  )
}

export const PRODUCE = {
  tomato: Tomato,
  carrot: Carrot,
  leaf: Leaf,
  avocado: Avocado,
  broccoli: Broccoli,
  pepper: Pepper,
  lemon: Lemon,
  peapod: PeaPod,
  onion: Onion,
  grapes: Grapes,
} as const

export type ProduceName = keyof typeof PRODUCE
