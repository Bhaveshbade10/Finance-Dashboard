import type { Transaction } from '../types'

export interface MonthlyTotals {
  label: string
  year: number
  month: number
  income: number
  expenses: number
}

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function monthlyTotals(transactions: Transaction[]): MonthlyTotals[] {
  const map = new Map<string, MonthlyTotals>()
  for (const t of transactions) {
    const d = new Date(t.date + 'T12:00:00')
    const key = monthKey(d)
    const label = d.toLocaleString('en-US', { month: 'short', year: 'numeric' })
    if (!map.has(key)) {
      map.set(key, {
        label,
        year: d.getFullYear(),
        month: d.getMonth(),
        income: 0,
        expenses: 0,
      })
    }
    const row = map.get(key)!
    if (t.type === 'income') row.income += t.amount
    else row.expenses += t.amount
  }
  return [...map.values()].sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month,
  )
}

export function spendingByCategory(transactions: Transaction[]): {
  category: string
  amount: number
}[] {
  const map = new Map<string, number>()
  for (const t of transactions) {
    if (t.type !== 'expense') continue
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
  }
  return [...map.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

export function highestSpendingCategory(
  transactions: Transaction[],
): { category: string; amount: number } | null {
  const rows = spendingByCategory(transactions)
  return rows[0] ?? null
}

export function balanceTrend(transactions: Transaction[]): {
  month: string
  balance: number
}[] {
  const months = monthlyTotals(transactions)
  let running = 0
  return months.map((m) => {
    running += m.income - m.expenses
    return { month: m.label, balance: running }
  })
}
