export type Habit = {
  id: string
  name: string
  color: string
  createdAt: string
  order: number
}

/** completions[habitId][YYYY-MM-DD] = true */
export type Completions = Record<string, Record<string, true>>

export type AppState = {
  habits: Habit[]
  completions: Completions
}

export type ViewMode = 'week' | 'month'

export type HabitStats = {
  currentStreak: number
  bestStreak: number
  rate30: number
  total: number
}

export const HABIT_COLORS = [
  '#1f9d8a',
  '#2f6fed',
  '#d97706',
  '#c026d3',
  '#e11d48',
  '#0d9488',
  '#4d7c0f',
  '#0369a1',
] as const
