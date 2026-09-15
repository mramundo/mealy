/* The five meal accents, in the order they happen during the day. */
export const ACCENTS = ['#f59300', '#17a94b', '#e8412e', '#de2a7e', '#6b4ae3'] as const

const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const SEGMENT = CIRCUMFERENCE / ACCENTS.length

/** Five arcs on a ring: one per meal, and the app's mark. */
export function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" strokeWidth="11" transform="rotate(-90 32 32)">
        {ACCENTS.map((colour, index) => (
          <circle
            key={colour}
            cx="32"
            cy="32"
            r={RADIUS}
            stroke={colour}
            strokeDasharray={`${SEGMENT - 2.6} ${CIRCUMFERENCE - SEGMENT + 2.6}`}
            strokeDashoffset={-SEGMENT * index}
          />
        ))}
      </g>
    </svg>
  )
}
