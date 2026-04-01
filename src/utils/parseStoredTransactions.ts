import type { Transaction } from '../types'

function isTransaction(x: unknown): x is Transaction {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  const type = o.type
  const amount = o.amount
  return (
    typeof o.id === 'string' &&
    o.id.length > 0 &&
    typeof o.date === 'string' &&
    o.date.length > 0 &&
    typeof amount === 'number' &&
    Number.isFinite(amount) &&
    typeof o.category === 'string' &&
    o.category.trim().length > 0 &&
    (type === 'income' || type === 'expense') &&
    typeof o.description === 'string'
  )
}

/**
 * Returns validated transactions, or null if JSON shape is not an array.
 */
export function parseStoredTransactions(raw: unknown): Transaction[] | null {
  if (!Array.isArray(raw)) return null
  const out: Transaction[] = []
  for (const item of raw) {
    if (isTransaction(item)) out.push({ ...item })
  }
  return out
}
