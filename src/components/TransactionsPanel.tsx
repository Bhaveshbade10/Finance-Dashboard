import { useMemo, useState } from 'react'
import { useFinance } from '../context/useFinance'
import type { Transaction } from '../types'
import { getUniqueCategories } from '../utils/transactions'
import { formatCurrency, formatShortDate } from '../utils/format'
import { TransactionFormModal } from './TransactionFormModal'

export function TransactionsPanel() {
  const {
    transactions,
    filteredTransactions,
    filters,
    setFilters,
    role,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    exportCsv,
    exportJson,
  } = useFinance()

  const categories = useMemo(
    () => ['all', ...getUniqueCategories(transactions)],
    [transactions],
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [modalResetKey, setModalResetKey] = useState(0)

  const isAdmin = role === 'admin'
  const noData = transactions.length === 0
  const noMatches =
    !noData && filteredTransactions.length === 0

  function openAdd() {
    setEditing(null)
    setModalResetKey((k) => k + 1)
    setModalOpen(true)
  }

  function openEdit(t: Transaction) {
    setEditing(t)
    setModalResetKey((k) => k + 1)
    setModalOpen(true)
  }

  function handleSave(data: Omit<Transaction, 'id'>) {
    if (editing) {
      updateTransaction({ ...data, id: editing.id })
    } else {
      addTransaction(data)
    }
  }

  return (
    <section aria-labelledby="tx-heading" className="mt-10">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="tx-heading"
          className="text-lg font-semibold text-[var(--color-ink)]"
        >
          Transactions
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {isAdmin && (
            <>
              <button
                type="button"
                onClick={openAdd}
                className="rounded-lg bg-[var(--color-accent)] px-3 py-2 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                Add transaction
              </button>
              <button
                type="button"
                onClick={exportCsv}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              >
                Export CSV
              </button>
              <button
                type="button"
                onClick={exportJson}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              >
                Export JSON
              </button>
            </>
          )}
        </div>
      </div>

      {!isAdmin && (
        <p className="mb-4 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-accent-soft)]/30 px-4 py-3 text-sm text-[var(--color-ink-muted)]">
          You are viewing as <strong className="text-[var(--color-ink)]">Viewer</strong>
          . Choose <strong>Admin</strong> in the header to add, change, or remove
          rows and to export files.
        </p>
      )}

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block min-w-[140px] flex-1 text-sm">
          <span className="text-[var(--color-ink-muted)]">Search</span>
          <input
            type="search"
            placeholder="Description or category"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </label>
        <label className="block min-w-[120px] text-sm">
          <span className="text-[var(--color-ink-muted)]">Category</span>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c}
              </option>
            ))}
          </select>
        </label>
        <label className="block min-w-[120px] text-sm">
          <span className="text-[var(--color-ink-muted)]">Type</span>
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({
                type: e.target.value as 'all' | 'income' | 'expense',
              })
            }
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="block min-w-[160px] text-sm">
          <span className="text-[var(--color-ink-muted)]">Sort</span>
          <div className="mt-1 flex gap-2">
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({
                  sortBy: e.target.value as 'date' | 'amount' | 'category',
                })
              }
              className="min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-sm text-[var(--color-ink)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
            <button
              type="button"
              onClick={() =>
                setFilters({
                  sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc',
                })
              }
              className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              title={
                filters.sortDir === 'asc'
                  ? 'Ascending — click for descending'
                  : 'Descending — click for ascending'
              }
            >
              {filters.sortDir === 'asc' ? 'Asc' : 'Desc'}
            </button>
          </div>
        </label>
      </div>

      {noData ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-6 py-16 text-center">
          <p className="text-[var(--color-ink)] font-medium">No transactions yet</p>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            {isAdmin
              ? 'Add your first transaction to populate the dashboard.'
              : 'Nothing to show yet. Someone with the Admin role can add transactions, or you can switch to Admin if you are allowed to edit.'}
          </p>
        </div>
      ) : noMatches ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-6 py-12 text-center">
          <p className="text-[var(--color-ink)] font-medium">No matches</p>
          <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
            Try clearing search or filters to see more transactions.
          </p>
          <button
            type="button"
            onClick={() =>
              setFilters({
                search: '',
                category: 'all',
                type: 'all',
              })
            }
            className="mt-4 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                {isAdmin && (
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="transition hover:bg-[var(--color-surface)]/80"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-[var(--color-ink-muted)]">
                    {formatShortDate(t.date)}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-[var(--color-ink)]">
                    {t.description}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-ink)]">
                    {t.category}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        t.type === 'income'
                          ? 'rounded-full bg-[var(--color-income)]/15 px-2 py-0.5 text-xs font-medium text-[var(--color-income)]'
                          : 'rounded-full bg-[var(--color-expense)]/15 px-2 py-0.5 text-xs font-medium text-[var(--color-expense)]'
                      }
                    >
                      {t.type}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-medium tabular-nums ${
                      t.type === 'income'
                        ? 'text-[var(--color-income)]'
                        : 'text-[var(--color-expense)]'
                    }`}
                  >
                    {t.type === 'income' ? '+' : '−'}
                    {formatCurrency(t.amount)}
                  </td>
                  {isAdmin && (
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => openEdit(t)}
                        className="mr-2 text-[var(--color-accent)] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              'Delete this transaction permanently?',
                            )
                          )
                            deleteTransaction(t.id)
                        }}
                        className="text-[var(--color-expense)] hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TransactionFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editing}
        title={editing ? 'Edit transaction' : 'New transaction'}
        resetKey={modalResetKey}
      />
    </section>
  )
}
