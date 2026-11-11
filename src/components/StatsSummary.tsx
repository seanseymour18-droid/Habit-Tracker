import type { HabitStats } from '../lib/types'

type Props = {
  stats: HabitStats
}

export function StatsSummary({ stats }: Props) {
  return (
    <div className="stats-block" aria-label="Habit stats">
      <div className="stat">
        <span>Current streak</span>
        <strong>{stats.currentStreak}</strong>
      </div>
      <div className="stat">
        <span>Best streak</span>
        <strong>{stats.bestStreak}</strong>
      </div>
      <div className="stat">
        <span>30-day rate</span>
        <strong>{stats.rate30}%</strong>
      </div>
      <div className="stat">
        <span>Total check-offs</span>
        <strong>{stats.total}</strong>
      </div>
    </div>
  )
}
