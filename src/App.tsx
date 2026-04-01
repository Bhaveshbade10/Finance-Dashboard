import { lazy, Suspense } from 'react'
import { FinanceProvider } from './context/FinanceProvider'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { TransactionsPanel } from './components/TransactionsPanel'
import { InsightsPanel } from './components/InsightsPanel'

const DashboardCharts = lazy(async () => {
  const m = await import('./components/DashboardCharts')
  return { default: m.DashboardCharts }
})

function ChartFallback() {
  return (
    <section
      className="mt-10"
      aria-busy="true"
      aria-label="Loading charts"
    >
      <h2 className="mb-4 text-lg font-semibold text-[var(--color-ink)]">
        Trends & breakdown
      </h2>
      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="min-w-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 sm:p-6"
          >
            <div className="mb-4 h-4 w-40 animate-pulse rounded bg-[var(--color-border)]" />
            <div className="mb-2 h-3 w-full max-w-xs animate-pulse rounded bg-[var(--color-border)]/70" />
            <div
              className="mt-6 w-full animate-pulse rounded-lg bg-[var(--color-border)]/40"
              style={{ height: 256 }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function AppShell() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-[var(--color-surface)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SummaryCards />
        <Suspense fallback={<ChartFallback />}>
          <DashboardCharts />
        </Suspense>
        <TransactionsPanel />
        <InsightsPanel />
      </main>
      <footer className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-ink-muted)]">
        Demo finance dashboard — mock data &amp; local persistence for evaluation.
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <FinanceProvider>
      <AppShell />
    </FinanceProvider>
  )
}
