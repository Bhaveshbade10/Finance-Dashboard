import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import type { Transaction, TransactionType } from '../types'

function formFromInitial(initial: Transaction | null) {
  if (initial) {
    return {
      date: initial.date,
      amount: String(initial.amount),
      category: initial.category,
      type: initial.type,
      description: initial.description,
    }
  }
  return {
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    category: '',
    type: 'expense' as TransactionType,
    description: '',
  }
}

type FieldsProps = {
  initial: Transaction | null
  title: string
  onClose: () => void
  onSave: (t: Omit<Transaction, 'id'>) => void
}

function TransactionFormFields({
  initial,
  title,
  onClose,
  onSave,
}: FieldsProps) {
  const [form, setForm] = useState(() => formFromInitial(initial))
  const dateInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = window.setTimeout(() => dateInputRef.current?.focus(), 0)
    return () => window.clearTimeout(t)
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (
      !form.category.trim() ||
      !form.description.trim() ||
      Number.isNaN(amount) ||
      amount <= 0
    ) {
      return
    }
    onSave({
      date: form.date,
      amount,
      category: form.category.trim(),
      type: form.type,
      description: form.description.trim(),
    })
    onClose()
  }

  return (
    <div
      className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <h2
        id="tx-modal-title"
        className="text-lg font-semibold text-[var(--color-ink)]"
      >
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <label className="block text-sm">
          <span className="text-[var(--color-ink-muted)]">Date</span>
          <input
            ref={dateInputRef}
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--color-ink-muted)]">Amount (USD)</span>
          <input
            type="number"
            step="0.01"
            min="0.01"
            required
            value={form.amount}
            onChange={(e) =>
              setForm((f) => ({ ...f, amount: e.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--color-ink-muted)]">Type</span>
          <select
            value={form.type}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                type: e.target.value as TransactionType,
              }))
            }
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-[var(--color-ink-muted)]">Category</span>
          <input
            type="text"
            required
            placeholder="e.g. Groceries"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--color-ink-muted)]">Description</span>
          <input
            type="text"
            required
            placeholder="Short note"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="submit"
            className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface-elevated)]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

type Props = {
  open: boolean
  onClose: () => void
  onSave: (t: Omit<Transaction, 'id'>) => void
  initial: Transaction | null
  title: string
  /** Bumps when opening the modal so "add" form resets between opens */
  resetKey: number
}

export function TransactionFormModal({
  open,
  onClose,
  onSave,
  initial,
  title,
  resetKey,
}: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tx-modal-title"
      onClick={onClose}
    >
      <TransactionFormFields
        key={`${initial?.id ?? 'new'}-${resetKey}`}
        initial={initial}
        title={title}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  )
}
