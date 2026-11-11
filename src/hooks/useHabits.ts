import { useEffect, useState } from 'react'
import { loadState, saveState } from '../lib/storage'
import { HABIT_COLORS, type AppState, type Habit } from '../lib/types'

function nextOrder(habits: Habit[]): number {
  if (habits.length === 0) return 0
  return Math.max(...habits.map((h) => h.order)) + 1
}

export function useHabits() {
  const [state, setState] = useState<AppState>(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const habits = [...state.habits].sort((a, b) => a.order - b.order)

  function addHabit(name: string, color: string = HABIT_COLORS[0]) {
    const trimmed = name.trim()
    if (!trimmed) return
    const habit: Habit = {
      id: crypto.randomUUID(),
      name: trimmed,
      color,
      createdAt: new Date().toISOString(),
      order: nextOrder(state.habits),
    }
    setState((prev) => ({
      ...prev,
      habits: [...prev.habits, habit],
    }))
  }

  function updateHabit(id: string, patch: Partial<Pick<Habit, 'name' | 'color'>>) {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              ...(patch.name !== undefined ? { name: patch.name.trim() || h.name } : {}),
              ...(patch.color !== undefined ? { color: patch.color } : {}),
            }
          : h,
      ),
    }))
  }

  function deleteHabit(id: string) {
    setState((prev) => {
      const { [id]: _removed, ...rest } = prev.completions
      return {
        habits: prev.habits.filter((h) => h.id !== id),
        completions: rest,
      }
    })
  }

  function toggleCompletion(habitId: string, dateKey: string) {
    setState((prev) => {
      const habitMap = { ...(prev.completions[habitId] ?? {}) }
      if (habitMap[dateKey]) {
        delete habitMap[dateKey]
      } else {
        habitMap[dateKey] = true
      }
      const completions = { ...prev.completions }
      if (Object.keys(habitMap).length === 0) {
        delete completions[habitId]
      } else {
        completions[habitId] = habitMap
      }
      return { ...prev, completions }
    })
  }

  function isComplete(habitId: string, dateKey: string): boolean {
    return Boolean(state.completions[habitId]?.[dateKey])
  }

  return {
    habits,
    completions: state.completions,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    isComplete,
  }
}
