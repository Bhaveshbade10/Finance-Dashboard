import type { Transaction, TransactionFilters } from '../types'

export function getUniqueCategories(transactions: Transaction[]): string[] {
  const set = new Set<string>()
  for (const t of transactions) set.add(t.category)
  return [...set].sort((a, b) => a.localeCompare(b))
}

export function filterAndSortTransactions(
  transactions: Transaction[],
  f: TransactionFilters,
): Transaction[] {
  let list = [...transactions]

  const q = f.search.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    )
  }

  if (f.category !== 'all') {
    list = list.filter((t) => t.category === f.category)
  }

  if (f.type !== 'all') {
    list = list.filter((t) => t.type === f.type)
  }

  const dir = f.sortDir === 'asc' ? 1 : -1
  list.sort((a, b) => {
    if (f.sortBy === 'amount') return (a.amount - b.amount) * dir
    if (f.sortBy === 'category')
      return a.category.localeCompare(b.category) * dir
    return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir
  })

  return list
}

export function summarize(transactions: Transaction[]) {
  let income = 0
  let expenses = 0
  for (const t of transactions) {
    if (t.type === 'income') income += t.amount
    else expenses += t.amount
  }
  return {
    income,
    expenses,
    balance: income - expenses,
  }
}
