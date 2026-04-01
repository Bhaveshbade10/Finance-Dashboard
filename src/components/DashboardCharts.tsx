import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useFinance } from '../context/useFinance'
import { balanceTrend, spendingByCategory } from '../utils/insights'
import { formatCurrency } from '../utils/format'

const PIE_COLORS = [
  '#0d9488',
  '#6366f1',
  '#f59e0b',
  '#ec4899',
  '#8b5cf6',
  '#14b8a6',
  '#ef4444',
  '#64748b',
]

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number; name?: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  const v = payload[0].value
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm shadow-lg">
      {label != null && (
        <p className="font-medium text-[var(--color-ink)]">{label}</p>
      )}
      <p className="tabular-nums text-[var(--color-ink-muted)]">
        {formatCurrency(v)}
      </p>
    </div>
  )
}

export function DashboardCharts() {
  const { transactions, theme } = useFinance()
  const trend = useMemo(() => balanceTrend(transactions), [transactions])
  const byCat = useMemo(() => spendingByCategory(transactions), [transactions])

  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'
  const lineColor = 'var(--color-accent)'

  const emptyTrend = trend.length === 0
  const emptyCat = byCat.length === 0

  return (
    <section aria-labelledby="charts-heading" className="mt-10">
      <h2
        id="charts-heading"
        className="mb-4 text-lg font-semibold text-[var(--color-ink)]"
      >
        Trends & breakdown
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 sm:p-6">
          <h3 className="mb-1 text-sm font-medium text-[var(--color-ink)]">
            Balance trend
          </h3>
          <p className="mb-4 text-xs text-[var(--color-ink-muted)]">
            Running net balance by month
          </p>
          {emptyTrend ? (
            <p className="flex h-64 items-center justify-center text-sm text-[var(--color-ink-muted)]">
              Add transactions to see your balance over time.
            </p>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trend}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="balFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: axisColor, fontSize: 11 }}
                    axisLine={{ stroke: gridColor }}
                  />
                  <YAxis
                    tick={{ fill: axisColor, fontSize: 11 }}
                    axisLine={{ stroke: gridColor }}
                    tickFormatter={(v) =>
                      v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                    }
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    name="Balance"
                    stroke={lineColor}
                    fill="url(#balFill)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 sm:p-6">
          <h3 className="mb-1 text-sm font-medium text-[var(--color-ink)]">
            Spending by category
          </h3>
          <p className="mb-4 text-xs text-[var(--color-ink-muted)]">
            Expenses grouped by category
          </p>
          {emptyCat ? (
            <p className="flex h-64 items-center justify-center text-sm text-[var(--color-ink-muted)]">
              No expense data yet. Record an expense to see a breakdown.
            </p>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={byCat}
                  layout="vertical"
                  margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis
                    type="number"
                    tick={{ fill: axisColor, fontSize: 11 }}
                    axisLine={{ stroke: gridColor }}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    width={100}
                    tick={{ fill: axisColor, fontSize: 11 }}
                    axisLine={{ stroke: gridColor }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const row = payload[0].payload as {
                        category: string
                        amount: number
                      }
                      return (
                        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm shadow-lg">
                          <p className="font-medium text-[var(--color-ink)]">
                            {row.category}
                          </p>
                          <p className="tabular-nums text-[var(--color-ink-muted)]">
                            {formatCurrency(row.amount)}
                          </p>
                        </div>
                      )
                    }}
                  />
                  <Bar dataKey="amount" name="Spent" radius={[0, 4, 4, 0]}>
                    {byCat.map((_, i) => (
                      <Cell
                        key={i}
                        fill={PIE_COLORS[i % PIE_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
