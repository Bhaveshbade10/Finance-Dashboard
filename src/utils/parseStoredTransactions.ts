import type { Transaction } from '../types'

function normalizeAmount(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const n = parseFloat(value)
    if (Number.isFinite(n)) return n
  }
  return null
}

function parseOne(item: unknown): Transaction | null {
  if (!item || typeof item !== 'object') return null
  const o = item as Record<string, unknown>
  const amount = normalizeAmount(o.amount)
  if (amount == null || amount <= 0) return null
  const type = o.type
  if (type !== 'income' && type !== 'expense') return null
  if (typeof o.id !== 'string' || !o.id) return null
  if (typeof o.date !== 'string' || !o.date) return null
  if (typeof o.category !== 'string' || !o.category.trim()) return null
  if (typeof o.description !== 'string') return null
  return {
    id: o.id,
    date: o.date,
    amount,
    category: o.category.trim(),
    type,
    description: o.description,
  }
}

/**
 * Returns validated transactions, or null if JSON shape is not an array.
 */
export function parseStoredTransactions(raw: unknown): Transaction[] | null {
  if (!Array.isArray(raw)) return null
  const out: Transaction[] = []
  for (const item of raw) {
    const row = parseOne(item)
    if (row) out.push(row)
  }
  return out
}
