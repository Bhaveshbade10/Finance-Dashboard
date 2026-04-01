import { useMemo } from 'react'
import { useFinance } from '../context/useFinance'
import { formatCurrency } from '../utils/format'
import { summarize } from '../utils/transactions'

export function SummaryCards() {
  const { transactions } = useFinance()
  const { balance, income, expenses } = useMemo(
    () => summarize(transactions),
    [transactions],
  )

  const cards = [
    {
      label: 'Total balance',
      value: balance,
      hint: 'Income minus expenses (all time)',
      accent: 'text-[var(--color-accent)]',
    },
    {
      label: 'Income',
      value: income,
      hint: 'Sum of all credits',
      accent: 'text-[var(--color-income)]',
    },
    {
      label: 'Expenses',
      value: expenses,
      hint: 'Sum of all debits',
      accent: 'text-[var(--color-expense)]',
    },
  ]

  return (
    <section aria-labelledby="summary-heading">
      <h2
        id="summary-heading"
        className="mb-4 text-lg font-semibold text-[var(--color-ink)]"
      >
        Overview
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.label}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm text-[var(--color-ink-muted)]">{c.label}</p>
            <p
              className={`mt-1 text-2xl font-semibold tabular-nums ${c.accent}`}
            >
              {formatCurrency(c.value)}
            </p>
            <p className="mt-2 text-xs text-[var(--color-ink-muted)]">{c.hint}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
