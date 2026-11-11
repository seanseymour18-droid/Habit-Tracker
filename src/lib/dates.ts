const pad = (n: number) => String(n).padStart(2, '0')

/** Local calendar date as YYYY-MM-DD */
export function toDateKey(date: Date = new Date()): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function startOfWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day // Monday start
  d.setDate(d.getDate() + diff)
  return d
}

/** Seven days Mon–Sun containing `anchor` (default today). */
export function weekDays(anchor: Date = new Date()): string[] {
  const start = startOfWeek(anchor)
  return Array.from({ length: 7 }, (_, i) => toDateKey(addDays(start, i)))
}

export function monthMeta(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  // Monday=0 … Sunday=6
  const startWeekday = (first.getDay() + 6) % 7
  const days: (string | null)[] = Array.from({ length: startWeekday }, () => null)
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(toDateKey(new Date(year, monthIndex, d)))
  }
  while (days.length % 7 !== 0) days.push(null)
  return { year, monthIndex, daysInMonth, days, label: first.toLocaleString(undefined, { month: 'long', year: 'numeric' }) }
}

export function weekdayLabels(short = true): string[] {
  const monday = startOfWeek(new Date())
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(monday, i)
    return d.toLocaleDateString(undefined, { weekday: short ? 'short' : 'long' })
  })
}

export function isToday(key: string): boolean {
  return key === toDateKey()
}

export function lastNDays(n: number, end: Date = new Date()): string[] {
  return Array.from({ length: n }, (_, i) => toDateKey(addDays(end, -(n - 1 - i))))
}

export function formatDayLabel(key: string): string {
  return parseDateKey(key).toLocaleDateString(undefined, { weekday: 'short' })
}

export function formatDayNumber(key: string): string {
  return String(parseDateKey(key).getDate())
}
