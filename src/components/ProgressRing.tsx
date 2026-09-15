interface ProgressRingProps {
  done: number
  total: number
  label: string
}

const RADIUS = 19
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ProgressRing({ done, total, label }: ProgressRingProps) {
  const ratio = total === 0 ? 0 : done / total

  return (
    <div className="ring" role="img" aria-label={label} title={label}>
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle className="ring__track" cx="22" cy="22" r={RADIUS} fill="none" strokeWidth="5" />
        <circle
          className="ring__value"
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          strokeWidth="5"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - ratio)}
        />
      </svg>
      <span className="ring__label" aria-hidden="true">
        {done}/{total}
      </span>
    </div>
  )
}
