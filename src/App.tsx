import { useState } from 'react'
import { Header } from './components/Header'
import { HabitForm } from './components/HabitForm'
import { MonthCalendar } from './components/MonthCalendar'
import { WeekGrid } from './components/WeekGrid'
import { useHabits } from './hooks/useHabits'
import type { Habit, ViewMode } from './lib/types'

type FormMode =
  | { type: 'closed' }
  | { type: 'create' }
  | { type: 'edit'; habit: Habit }

export default function App() {
  const { habits, completions, addHabit, updateHabit, deleteHabit, toggleCompletion } = useHabits()
  const [view, setView] = useState<ViewMode>('week')
  const [form, setForm] = useState<FormMode>({ type: 'closed' })

  return (
    <div className="app">
      <Header
        view={view}
        onViewChange={setView}
        onAdd={() => setForm({ type: 'create' })}
      />

      {view === 'week' ? (
        <WeekGrid
          habits={habits}
          completions={completions}
          onToggle={toggleCompletion}
          onEdit={(habit) => setForm({ type: 'edit', habit })}
        />
      ) : (
        <MonthCalendar
          habits={habits}
          completions={completions}
          onToggle={toggleCompletion}
        />
      )}

      {form.type !== 'closed' && (
        <HabitForm
          habit={form.type === 'edit' ? form.habit : null}
          completions={completions}
          onClose={() => setForm({ type: 'closed' })}
          onSave={(name, color) => {
            if (form.type === 'edit') {
              updateHabit(form.habit.id, { name, color })
            } else {
              addHabit(name, color)
            }
            setForm({ type: 'closed' })
          }}
          onDelete={
            form.type === 'edit'
              ? () => {
                  deleteHabit(form.habit.id)
                  setForm({ type: 'closed' })
                }
              : undefined
          }
        />
      )}
    </div>
  )
}
