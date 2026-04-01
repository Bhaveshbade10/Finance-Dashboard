import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { SummaryCards } from '../components/SummaryCards'
import { TransactionsPanel } from '../components/TransactionsPanel'
import { InsightsPanel } from '../components/InsightsPanel'

const DashboardCharts = lazy(async () => {
  const m = await import('../components/DashboardCharts')
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

export function DashboardPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-[var(--color-surface)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <nav
          className="mb-6 text-sm text-[var(--color-ink-muted)]"
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                to="/"
                className="font-medium text-[var(--color-accent)] transition hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="text-[var(--color-border)]">
              /
            </li>
            <li className="text-[var(--color-ink)]">Dashboard</li>
          </ol>
        </nav>

        <div className="mb-8 rounded-2xl border border-[var(--color-border)]/80 bg-[var(--color-surface-elevated)]/60 px-5 py-5 sm:px-6 sm:py-6 dark:bg-[var(--color-surface-elevated)]/40">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Your finances
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
            Track balances, review activity, and scan insights. Use the role
            control to compare read-only vs admin capabilities — everything runs
            in the browser with sample or saved data.
          </p>
        </div>

        <SummaryCards />
        <Suspense fallback={<ChartFallback />}>
          <DashboardCharts />
        </Suspense>
        <TransactionsPanel />
        <InsightsPanel />
      </main>
      <footer className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-ink-muted)]">
        <p className="mb-1">
          <Link
            to="/"
            className="text-[var(--color-accent)] hover:underline"
          >
            Back to home
          </Link>
          <span aria-hidden className="mx-2 text-[var(--color-border)]">
            ·
          </span>
          Sample data only; preferences and edits may be stored in this browser.
        </p>
      </footer>
    </div>
  )
}
