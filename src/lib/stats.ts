import { addDays, lastNDays, toDateKey } from './dates'
import type { Completions, HabitStats } from './types'

function sortedKeys(completions: Record<string, true> | undefined): string[] {
  if (!completions) return []
  return Object.keys(completions).sort()
}

export function currentStreak(completions: Record<string, true> | undefined, today = toDateKey()): number {
  if (!completions) return 0
  let cursor = today
  // If today isn't done yet, allow streak to continue from yesterday
  if (!completions[cursor]) {
    cursor = toDateKey(addDays(new Date(), -1))
    if (!completions[cursor]) return 0
  }
  let streak = 0
  while (completions[cursor]) {
    streak += 1
    cursor = toDateKey(addDays(new Date(cursor + 'T12:00:00'), -1))
  }
  return streak
}

export function bestStreak(completions: Record<string, true> | undefined): number {
  const keys = sortedKeys(completions)
  if (keys.length === 0) return 0
  let best = 1
  let run = 1
  for (let i = 1; i < keys.length; i++) {
    const prev = new Date(keys[i - 1] + 'T12:00:00')
    const cur = new Date(keys[i] + 'T12:00:00')
    const diff = Math.round((cur.getTime() - prev.getTime()) / 86_400_000)
    if (diff === 1) {
      run += 1
      best = Math.max(best, run)
    } else {
      run = 1
    }
  }
  return best
}

export function completionRate(completions: Record<string, true> | undefined, days: string[]): number {
  if (days.length === 0) return 0
  const done = days.filter((d) => completions?.[d]).length
  return Math.round((done / days.length) * 100)
}

export function totalCompletions(completions: Record<string, true> | undefined): number {
  return completions ? Object.keys(completions).length : 0
}

export function habitStats(
  completions: Completions,
  habitId: string,
): HabitStats {
  const map = completions[habitId]
  return {
    currentStreak: currentStreak(map),
    bestStreak: bestStreak(map),
    rate30: completionRate(map, lastNDays(30)),
    total: totalCompletions(map),
  }
}
