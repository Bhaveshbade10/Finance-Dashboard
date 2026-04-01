import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { MOCK_TRANSACTIONS } from '../data/mockTransactions'
import type { Role, Transaction, TransactionFilters } from '../types'
import { filterAndSortTransactions } from '../utils/transactions'
import {
  FinanceContext,
  type FinanceContextValue,
} from './financeContext'

const STORAGE_TX = 'zorvyn-finance-transactions'
const STORAGE_THEME = 'zorvyn-finance-theme'
const STORAGE_ROLE = 'zorvyn-finance-role'

function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_TX)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown
      if (Array.isArray(parsed)) return parsed as Transaction[]
    }
  } catch {
    /* ignore */
  }
  return [...MOCK_TRANSACTIONS]
}

const defaultFilters: TransactionFilters = {
  search: '',
  category: 'all',
  type: 'all',
  sortBy: 'date',
  sortDir: 'desc',
}

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions)
  const [filters, setFiltersState] =
    useState<TransactionFilters>(defaultFilters)
  const [role, setRoleState] = useState<Role>(() => {
    try {
      const r = localStorage.getItem(STORAGE_ROLE) as Role | null
      if (r === 'viewer' || r === 'admin') return r
    } catch {
      /* ignore */
    }
    return 'viewer'
  })
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const t = localStorage.getItem(STORAGE_THEME) as 'light' | 'dark' | null
      if (t === 'light' || t === 'dark') return t
    } catch {
      /* ignore */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(STORAGE_THEME, theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(STORAGE_ROLE, role)
  }, [role])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TX, JSON.stringify(transactions))
    } catch {
      /* ignore */
    }
  }, [transactions])

  const setFilters = useCallback((patch: Partial<TransactionFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }))
  }, [])

  const setRole = useCallback((r: Role) => setRoleState(r), [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `tx-${Date.now()}`
    setTransactions((prev) => [{ ...t, id }, ...prev])
  }, [])

  const updateTransaction = useCallback((t: Transaction) => {
    setTransactions((prev) => prev.map((x) => (x.id === t.id ? t : x)))
  }, [])

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const filteredTransactions = useMemo(
    () => filterAndSortTransactions(transactions, filters),
    [transactions, filters],
  )

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: 'application/json',
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'transactions.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }, [transactions])

  const exportCsv = useCallback(() => {
    const esc = (v: string) =>
      /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v
    const headers = ['id', 'date', 'amount', 'category', 'type', 'description']
    const rows = transactions.map((t) =>
      [
        esc(t.id),
        esc(t.date),
        esc(String(t.amount)),
        esc(t.category),
        esc(t.type),
        esc(t.description),
      ].join(','),
    )
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'transactions.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }, [transactions])

  const value = useMemo<FinanceContextValue>(
    () => ({
      transactions,
      filteredTransactions,
      filters,
      setFilters,
      role,
      setRole,
      theme,
      toggleTheme,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      exportJson,
      exportCsv,
    }),
    [
      transactions,
      filteredTransactions,
      filters,
      setFilters,
      role,
      setRole,
      theme,
      toggleTheme,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      exportJson,
      exportCsv,
    ],
  )

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  )
}
