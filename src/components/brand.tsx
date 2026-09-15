/* The five meal accents, in the order they happen during the day. */
export const ACCENTS = ['#f59300', '#17a94b', '#e8412e', '#de2a7e', '#6b4ae3'] as const

/*
 * A square plate: four mitred sides, one per meal of the day, around a fifth
 * in the middle. Every edge is a right angle and the four sides are identical,
 * so the mark sits square at any size.
 */
const OUT = 6
const FAR = 58
const THICK = 13
const IN = OUT + THICK
const NEAR = FAR - THICK

const SIDES = [
  `${OUT},${OUT} ${FAR},${OUT} ${NEAR},${IN} ${IN},${IN}`, // top
  `${FAR},${OUT} ${FAR},${FAR} ${NEAR},${NEAR} ${NEAR},${IN}`, // right
  `${FAR},${FAR} ${OUT},${FAR} ${IN},${NEAR} ${NEAR},${NEAR}`, // bottom
  `${OUT},${FAR} ${OUT},${OUT} ${IN},${IN} ${IN},${NEAR}`, // left
]

const CORE = 16
const CORE_POS = (64 - CORE) / 2

export function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
      {SIDES.map((points, index) => (
        <polygon key={points} points={points} fill={ACCENTS[index]} />
      ))}
      <rect x={CORE_POS} y={CORE_POS} width={CORE} height={CORE} fill={ACCENTS[4]} />
    </svg>
  )
}
