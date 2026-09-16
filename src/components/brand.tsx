/* The five meal accents, in the order they happen during the day. */
export const ACCENTS = ['#f59300', '#17a94b', '#e8412e', '#de2a7e', '#6b4ae3'] as const

/*
 * A square ring in five pieces, one per meal, running clockwise from the top.
 *
 * Five equal pieces cannot share four sides without a cut landing a few units
 * from a corner — closer than half the ring's width, which leaves a step. So
 * every cut here is horizontal or vertical and sits well clear of the corners:
 * the top between the two uprights, the uprights down to the same height, and
 * the bottom split in the middle into two L-shapes. The pieces meet edge to
 * edge with no gaps, and the mark is symmetric left to right.
 *
 * All coordinates are multiples of 4, so at 16, 32 and 64px every edge lands
 * on a whole pixel.
 */
export const MARK_PIECES = [
  '16,4 48,4 48,16 16,16', // top — breakfast
  '48,4 60,4 60,40 48,40', // right — morning snack
  '48,40 60,40 60,60 32,60 32,48 48,48', // bottom right — lunch
  '32,48 32,60 4,60 4,40 16,40 16,48', // bottom left — afternoon snack
  '4,4 16,4 16,40 4,40', // left — dinner
] as const

export function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 64 64" shapeRendering="crispEdges" aria-hidden="true">
      {MARK_PIECES.map((points, index) => (
        <polygon key={points} points={points} fill={ACCENTS[index]} />
      ))}
    </svg>
  )
}
