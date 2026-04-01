import { useMemo } from 'react'
import { useFinance } from '../context/useFinance'
import { formatCurrency } from '../utils/format'
import {
  balanceTrend,
  highestSpendingCategory,
  monthlyTotals,
} from '../utils/insights'

export function InsightsPanel() {
  const { transactions } = useFinance()

  const insight = useMemo(() => {
    const high = highestSpendingCategory(transactions)
    const months = monthlyTotals(transactions)
    const last = months[months.length - 1]
    const prev = months[months.length - 2]
    let monthCompare: string | null = null
    if (last && prev) {
      const delta = last.expenses - prev.expenses
      const pct =
        prev.expenses > 0
          ? Math.round((delta / prev.expenses) * 100)
          : null
      monthCompare =
        pct === null
          ? `This month (${last.label}) spending is ${formatCurrency(last.expenses)}; no prior month to compare.`
          : `Spending in ${last.label} was ${formatCurrency(last.expenses)} — ${delta >= 0 ? 'up' : 'down'} ${Math.abs(pct)}% vs ${prev.label}.`
    } else if (last) {
      monthCompare = `Latest month on record: ${last.label} with ${formatCurrency(last.expenses)} in expenses.`
    }

    const trend = balanceTrend(transactions)
    const latestBal = trend[trend.length - 1]?.balance
    let observation: string | null = null
    if (latestBal != null) {
      observation =
        latestBal >= 0
          ? `Your running balance ends positive at ${formatCurrency(latestBal)} across recorded months — income has covered expenses so far.`
          : `Running balance is ${formatCurrency(latestBal)}; expenses exceed income in the cumulative view — worth reviewing large categories.`
    }

    return { high, monthCompare, observation }
  }, [transactions])

  const items = [
    insight.high && {
      title: 'Top spending category',
      body: `${insight.high.category} leads with ${formatCurrency(insight.high.amount)} total expenses.`,
    },
    insight.monthCompare && {
      title: 'Month over month',
      body: insight.monthCompare,
    },
    insight.observation && {
      title: 'Balance trajectory',
      body: insight.observation,
    },
  ].filter(Boolean) as { title: string; body: string }[]

  return (
    <section aria-labelledby="insights-heading" className="mt-10 pb-16">
      <h2
        id="insights-heading"
        className="mb-4 text-lg font-semibold text-[var(--color-ink)]"
      >
        Insights
      </h2>
      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-6 py-12 text-center text-sm text-[var(--color-ink-muted)]">
          Add more transactions to unlock spending insights and comparisons.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-[var(--color-accent)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
