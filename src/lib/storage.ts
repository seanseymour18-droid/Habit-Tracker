import { HABIT_COLORS, type AppState, type Habit } from './types'

export const STORAGE_KEY = 'daymark:v1'

function uid(): string {
  return crypto.randomUUID()
}

export function seedState(): AppState {
  const now = new Date().toISOString()
  const habits: Habit[] = [
    { id: uid(), name: 'Move your body', color: HABIT_COLORS[0], createdAt: now, order: 0 },
    { id: uid(), name: 'Read 10 minutes', color: HABIT_COLORS[1], createdAt: now, order: 1 },
    { id: uid(), name: 'Drink water', color: HABIT_COLORS[2], createdAt: now, order: 2 },
  ]
  return { habits, completions: {} }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedState()
      saveState(seeded)
      return seeded
    }
    const parsed = JSON.parse(raw) as AppState
    if (!parsed || !Array.isArray(parsed.habits) || typeof parsed.completions !== 'object') {
      const seeded = seedState()
      saveState(seeded)
      return seeded
    }
    return {
      habits: parsed.habits,
      completions: parsed.completions ?? {},
    }
  } catch {
    const seeded = seedState()
    saveState(seeded)
    return seeded
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
