import { useId, useMemo } from 'react'
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

const CATEGORY_COLORS = [
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

const CHART_HEIGHT = 256

export function DashboardCharts() {
  const gradId = useId().replace(/:/g, '')
  const { transactions, theme } = useFinance()
  const trend = useMemo(() => balanceTrend(transactions), [transactions])
  const byCat = useMemo(() => spendingByCategory(transactions), [transactions])

  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'
  const accentStroke = theme === 'dark' ? '#2dd4bf' : '#0d9488'
  const accentFillOpacity = theme === 'dark' ? 0.25 : 0.35

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
      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 sm:p-6">
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
            <div
              className="w-full min-w-0"
              style={{ height: CHART_HEIGHT }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={0}
                minHeight={CHART_HEIGHT}
              >
                <AreaChart
                  data={trend}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={accentStroke}
                        stopOpacity={accentFillOpacity}
                      />
                      <stop
                        offset="100%"
                        stopColor={accentStroke}
                        stopOpacity={0}
                      />
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
                    stroke={accentStroke}
                    fill={`url(#${gradId})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 sm:p-6">
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
            <div
              className="w-full min-w-0"
              style={{ height: CHART_HEIGHT }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={0}
                minHeight={CHART_HEIGHT}
              >
                <BarChart
                  data={byCat}
                  layout="vertical"
                  margin={{ top: 8, right: 16, left: 4, bottom: 0 }}
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
                    width={104}
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
                        fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]}
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
