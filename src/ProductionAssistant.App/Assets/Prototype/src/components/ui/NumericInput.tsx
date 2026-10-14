import type { KeyboardEventHandler } from 'react'

export function NumericInput({
  value,
  onChange,
  unit,
  className = '',
  disabled,
  ariaLabel,
  onKeyDown,
}: {
  value: string
  onChange: (value: string) => void
  unit?: string
  className?: string
  disabled?: boolean
  ariaLabel?: string
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}) {
  return <div className={`numeric-input ${className}`.trim()}>
    <input
      type="text"
      inputMode="decimal"
      value={value}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
    />
    {unit && <span>{unit}</span>}
  </div>
}
