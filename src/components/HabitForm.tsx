import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { habitStats } from '../lib/stats'
import { HABIT_COLORS, type Completions, type Habit } from '../lib/types'
import { ColorPicker } from './ColorPicker'
import { StatsSummary } from './StatsSummary'

type Props = {
  habit?: Habit | null
  completions: Completions
  onClose: () => void
  onSave: (name: string, color: string) => void
  onDelete?: () => void
}

export function HabitForm({ habit, completions, onClose, onSave, onDelete }: Props) {
  const titleId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(habit?.name ?? '')
  const [color, setColor] = useState(habit?.color ?? HABIT_COLORS[0])
  const isEdit = Boolean(habit)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onSave(name.trim(), color)
  }

  const stats = habit ? habitStats(completions, habit.id) : null

  return (
    <div className="overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId}>{isEdit ? 'Edit habit' : 'New habit'}</h2>
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="habit-name">Name</label>
            <input
              id="habit-name"
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Morning stretch"
              maxLength={48}
              required
            />
          </div>
          <div className="field">
            <label>Color</label>
            <ColorPicker value={color} onChange={setColor} />
          </div>
          {stats && <StatsSummary stats={stats} />}
          <div className="modal-actions">
            {isEdit && onDelete && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm(`Delete “${habit?.name}”? This clears its check-offs.`)) {
                    onDelete()
                  }
                }}
              >
                Delete
              </button>
            )}
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save' : 'Add habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
