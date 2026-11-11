import { HABIT_COLORS } from '../lib/types'

type Props = {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="color-grid" role="group" aria-label="Habit color">
      {HABIT_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className="color-swatch"
          style={{ background: color }}
          aria-label={`Color ${color}`}
          aria-pressed={value === color}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  )
}
