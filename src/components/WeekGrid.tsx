import { formatDayLabel, formatDayNumber, isToday, weekDays, weekdayLabels } from '../lib/dates'
import type { Completions, Habit } from '../lib/types'
import { HabitRow } from './HabitRow'

type Props = {
  habits: Habit[]
  completions: Completions
  onToggle: (habitId: string, dateKey: string) => void
  onEdit: (habit: Habit) => void
}

export function WeekGrid({ habits, completions, onToggle, onEdit }: Props) {
  const days = weekDays()
  const labels = weekdayLabels(true)

  if (habits.length === 0) {
    return (
      <div className="panel empty-state">
        <p>No habits yet. Add one to start marking your days.</p>
      </div>
    )
  }

  return (
    <section className="panel week-grid" aria-label="Week check-offs">
      <div className="week-head">
        <span>Habit</span>
        {days.map((day, i) => (
          <span key={day} className={`day-label${isToday(day) ? ' is-today' : ''}`}>
            <span aria-hidden>{labels[i]}</span>
            <br />
            <span aria-hidden>{formatDayNumber(day)}</span>
            <span className="visually-hidden">
              {formatDayLabel(day)} {formatDayNumber(day)}
            </span>
          </span>
        ))}
        <span>Streak</span>
      </div>
      {habits.map((habit) => (
        <HabitRow
          key={habit.id}
          habit={habit}
          days={days}
          completions={completions}
          onToggle={(dateKey) => onToggle(habit.id, dateKey)}
          onEdit={() => onEdit(habit)}
        />
      ))}
    </section>
  )
}
