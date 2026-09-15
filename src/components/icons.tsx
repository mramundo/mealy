import type { ComponentType, SVGProps } from 'react'
import type { SlotId } from '../data/types.ts'

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Steaming mug — the plan opens every breakfast with tea. */
function MugIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M4 9h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
        <path d="M16 11h1.8a2.6 2.6 0 0 1 0 5.2H16" />
        <path d="M8 2.5v2.8M12 2.5v2.8" />
      </g>
    </svg>
  )
}

/** Sprout — the mid-morning handful of nuts and fruit. */
function SproutIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M12 21v-7.5" />
        <path d="M12 13.5C12 8.8 15 4.8 20.6 3.8c0 5.8-3.8 9.7-8.6 9.7Z" />
        <path d="M12 16C9.2 16 4.4 14 3.4 8.4c4.7 0 7.6 2.9 8.6 7.6Z" />
      </g>
    </svg>
  )
}

/** Fork and knife. */
function CutleryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M6.5 3v4.5a2.5 2.5 0 0 0 5 0V3" />
        <path d="M9 10v11" />
        <path d="M17.5 3c1.9 2.4 1.9 6.6 0 9V21" />
      </g>
    </svg>
  )
}

/** Tall glass — shakes and protein puddings. */
function GlassIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M7 3h10l-1.1 15.8A2.2 2.2 0 0 1 13.7 21h-3.4a2.2 2.2 0 0 1-2.2-2.2L7 3Z" />
        <path d="M7.5 9.5h9" />
      </g>
    </svg>
  )
}

/** Steaming bowl. */
function BowlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M2.8 11h18.4a9.2 9.2 0 0 1-18.4 0Z" />
        <path d="M8 7.5c0-1.7.9-2.3.9-3.7M12 7.5c0-1.7.9-2.3.9-3.7M16 7.5c0-1.7.9-2.3.9-3.7" />
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
        d="m4.5 12.5 4.8 5.2L19.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronIcon({ dir = 'right', ...props }: IconProps & { dir?: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        d={dir === 'left' ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AsteriskIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke} strokeWidth={2.6}>
        <path d="M12 4v16M4.8 7.8l14.4 8.4M19.2 7.8 4.8 16.2" />
      </g>
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
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
      <g {...stroke} strokeWidth={2.4}>
        <path d="M12 3v11M7.5 10 12 14.5 16.5 10M4.5 20h15" />
      </g>
    </svg>
  )
}
