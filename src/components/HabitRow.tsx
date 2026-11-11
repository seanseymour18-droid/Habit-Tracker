import { formatDayNumber, isToday } from '../lib/dates'
import { currentStreak } from '../lib/stats'
import type { Completions, Habit } from '../lib/types'

type Props = {
  habit: Habit
  days: string[]
  completions: Completions
  onToggle: (dateKey: string) => void
  onEdit: () => void
}

export function HabitRow({ habit, days, completions, onToggle, onEdit }: Props) {
  const map = completions[habit.id]
  const streak = currentStreak(map)

  return (
    <div className="habit-row">
      <div className="habit-meta">
        <span className="habit-dot" style={{ background: habit.color }} aria-hidden />
        <button type="button" className="habit-name" onClick={onEdit} title="Edit habit">
          {habit.name}
        </button>
      </div>
      {days.map((day) => {
        const done = Boolean(map?.[day])
        const today = isToday(day)
        return (
          <button
            key={day}
            type="button"
            className={`check-cell${done ? ' is-done' : ''}${today ? ' is-today' : ''}`}
            style={done ? { background: habit.color } : undefined}
            aria-label={`${habit.name} on ${day}${done ? ', completed' : ''}`}
            aria-pressed={done}
            onClick={() => onToggle(day)}
          >
            <span className="visually-hidden">{formatDayNumber(day)}</span>
          </button>
        )
      })}
      <span className="streak-chip" title="Current streak">
        {streak > 0 ? `${streak}d` : '—'}
      </span>
    </div>
  )
}
