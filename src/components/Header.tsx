import type { ViewMode } from '../lib/types'

type Props = {
  view: ViewMode
  onViewChange: (view: ViewMode) => void
  onAdd: () => void
}

export function Header({ view, onViewChange, onAdd }: Props) {
  return (
    <header className="header">
      <div className="header-top">
        <div>
          <p className="brand brand-hero">Daymark</p>
          <p className="lede">Mark the day. Keep the streak. Your habits stay on this device.</p>
        </div>
        <div className="toolbar">
          <div className="segmented" role="group" aria-label="Calendar view">
            <button
              type="button"
              aria-pressed={view === 'week'}
              onClick={() => onViewChange('week')}
            >
              Week
            </button>
            <button
              type="button"
              aria-pressed={view === 'month'}
              onClick={() => onViewChange('month')}
            >
              Month
            </button>
          </div>
          <button type="button" className="btn btn-primary" onClick={onAdd}>
            Add habit
          </button>
        </div>
      </div>
    </header>
  )
}
