import { useMemo, useState } from 'react'
import { isToday, monthMeta, weekdayLabels } from '../lib/dates'
import { habitStats } from '../lib/stats'
import type { Completions, Habit } from '../lib/types'

type Props = {
  habits: Habit[]
  completions: Completions
  onToggle: (habitId: string, dateKey: string) => void
}

export function MonthCalendar({ habits, completions, onToggle }: Props) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [selectedId, setSelectedId] = useState(habits[0]?.id ?? '')

  const selected = habits.find((h) => h.id === selectedId) ?? habits[0]
  const meta = useMemo(
    () => monthMeta(cursor.year, cursor.month),
    [cursor.year, cursor.month],
  )
  const labels = weekdayLabels(true)
  const stats = selected ? habitStats(completions, selected.id) : null

  function shiftMonth(delta: number) {
    setCursor((prev) => {
      const d = new Date(prev.year, prev.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  if (habits.length === 0 || !selected) {
    return (
      <div className="panel empty-state">
        <p>Add a habit to see your monthly streak calendar.</p>
      </div>
    )
  }

  return (
    <section className="panel month-shell" aria-label="Month streak calendar">
      <div className="month-nav">
        <button type="button" className="btn" onClick={() => shiftMonth(-1)} aria-label="Previous month">
          ‹
        </button>
        <h2>{meta.label}</h2>
        <button type="button" className="btn" onClick={() => shiftMonth(1)} aria-label="Next month">
          ›
        </button>
      </div>

      <div className="habit-chips" role="group" aria-label="Habit filter">
        {habits.map((habit) => (
          <button
            key={habit.id}
            type="button"
            className="habit-chip"
            aria-pressed={habit.id === selected.id}
            onClick={() => setSelectedId(habit.id)}
          >
            <span className="habit-dot" style={{ background: habit.color }} aria-hidden />
            {habit.name}
          </button>
        ))}
      </div>

      {stats && (
        <div className="month-stats">
          <div>
            <strong>{stats.currentStreak}</strong> day streak
          </div>
          <div>
            <strong>{stats.bestStreak}</strong> best
          </div>
          <div>
            <strong>{stats.rate30}%</strong> last 30 days
          </div>
        </div>
      )}

      <div className="month-grid">
        {labels.map((label) => (
          <div key={label} className="month-weekday">
            {label}
          </div>
        ))}
        {meta.days.map((day, index) => {
          if (!day) {
            return <button key={`empty-${index}`} type="button" className="month-cell" disabled />
          }
          const done = Boolean(completions[selected.id]?.[day])
          const dayNum = Number(day.slice(-2))
          return (
            <button
              key={day}
              type="button"
              className={`month-cell${done ? ' is-done' : ''}${isToday(day) ? ' is-today' : ''}`}
              style={done ? { background: selected.color } : undefined}
              aria-label={`${selected.name} on ${day}${done ? ', completed' : ''}`}
              aria-pressed={done}
              onClick={() => onToggle(selected.id, day)}
            >
              {dayNum}
            </button>
          )
        })}
      </div>
    </section>
  )
}
