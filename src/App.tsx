import { FinanceProvider } from './context/FinanceProvider'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { DashboardCharts } from './components/DashboardCharts'
import { TransactionsPanel } from './components/TransactionsPanel'
import { InsightsPanel } from './components/InsightsPanel'

function AppShell() {
  return (
    <div className="min-h-dvh bg-[var(--color-surface)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SummaryCards />
        <DashboardCharts />
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
