import type { ComponentType, SVGProps } from 'react'
import type { SlotId } from '../data/types.ts'

type IconProps = SVGProps<SVGSVGElement>

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Steaming mug — every breakfast in the plan starts with tea. */
function MugIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M4 9.5h11.5V16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9.5Z" />
        <path d="M15.5 11.5h1.8a2.6 2.6 0 0 1 0 5.2h-1.8" />
        <path d="M8 3v2.6M12 3v2.6" />
      </g>
    </svg>
  )
}

/** Sprout — the mid-morning handful of nuts or fruit. */
function SproutIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M12 21v-7.2" />
        <path d="M12 13.8C12 9.2 15 5.2 20.4 4.2c0 5.6-3.7 9.6-8.4 9.6Z" />
        <path d="M12 16.2C9.3 16.2 4.6 14.2 3.6 8.8c4.6 0 7.4 2.8 8.4 7.4Z" />
      </g>
    </svg>
  )
}

/** Fork and knife. */
function CutleryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M6.6 3v4.4a2.4 2.4 0 0 0 4.8 0V3" />
        <path d="M9 9.8V21" />
        <path d="M17.4 3c1.8 2.3 1.8 6.4 0 8.8V21" />
      </g>
    </svg>
  )
}

/** Tall glass — shakes and protein puddings. */
function GlassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M7.2 3h9.6l-1.1 15.7a2.2 2.2 0 0 1-2.2 2.1h-3a2.2 2.2 0 0 1-2.2-2.1L7.2 3Z" />
        <path d="M7.7 9.6h8.6" />
      </g>
    </svg>
  )
}

/** Steaming bowl. */
function BowlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M3 11.2h18a9 9 0 0 1-18 0Z" />
        <path d="M8 7.6c0-1.7.9-2.3.9-3.6M12 7.6c0-1.7.9-2.3.9-3.6M16 7.6c0-1.7.9-2.3.9-3.6" />
      </g>
    </svg>
  )
}

export const SLOT_ICONS: Record<SlotId, ComponentType<IconProps>> = {
  breakfast: MugIcon,
  morningSnack: SproutIcon,
  lunch: CutleryIcon,
  afternoonSnack: GlassIcon,
  dinner: BowlIcon,
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m5 12.5 4.6 4.6L19 6.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronIcon({ dir = 'right', ...props }: IconProps & { dir?: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d={dir === 'left' ? 'M14.5 5.5 8 12l6.5 6.5' : 'M9.5 5.5 16 12l-6.5 6.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Two arrows — marks a group of interchangeable choices. */
export function SwapIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...line} strokeWidth={2.2}>
        <path d="M4 8.5h14M14.5 5 18 8.5 14.5 12" />
        <path d="M20 15.5H6M9.5 12 6 15.5 9.5 19" />
      </g>
    </svg>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 2.5 13.9 8 19.5 10 13.9 12 12 17.5 10.1 12 4.5 10 10.1 8 12 2.5Z" />
      <path d="M18.5 15.5 19.4 18l2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.5Z" />
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 2.6 14.7 9l6.9.5-5.3 4.5 1.7 6.7L12 17l-6 3.7 1.7-6.7L2.4 9.5 9.3 9 12 2.6Z" />
    </svg>
  )
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...line} strokeWidth={2.2}>
        <path d="M12 3.5v10.5M7.8 10 12 14.2 16.2 10M4.8 20h14.4" />
      </g>
    </svg>
  )
}
