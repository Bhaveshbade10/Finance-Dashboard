import { createContext } from 'react'
import type { Role, Transaction, TransactionFilters } from '../types'

export interface FinanceContextValue {
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  filters: TransactionFilters
  setFilters: (patch: Partial<TransactionFilters>) => void
  role: Role
  setRole: (r: Role) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  addTransaction: (t: Omit<Transaction, 'id'>) => void
  updateTransaction: (t: Transaction) => void
  deleteTransaction: (id: string) => void
  exportJson: () => void
  exportCsv: () => void
}

export const FinanceContext = createContext<FinanceContextValue | null>(null)
