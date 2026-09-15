/* The five meal accents, in the order they happen during the day. */
export const ACCENTS = ['#f59300', '#17a94b', '#e8412e', '#de2a7e', '#6b4ae3'] as const

/* A square ring cut into five segments — one per meal — by dashing the
   rectangle's own perimeter. */
const SIDE = 44
const INSET = 10
const STROKE = 11
const PERIMETER = SIDE * 4
const SEGMENT = PERIMETER / ACCENTS.length
const GAP = 3

export function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" strokeWidth={STROKE}>
        {ACCENTS.map((colour, index) => (
          <rect
            key={colour}
            x={INSET}
            y={INSET}
            width={SIDE}
            height={SIDE}
            stroke={colour}
            strokeDasharray={`${SEGMENT - GAP} ${PERIMETER - SEGMENT + GAP}`}
            strokeDashoffset={-SEGMENT * index}
          />
        ))}
      </g>
    </svg>
  )
}
