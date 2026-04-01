export type TransactionType = 'income' | 'expense'

export type Role = 'viewer' | 'admin'

export type SortKey = 'date' | 'amount' | 'category'

export interface Transaction {
  id: string
  date: string
  amount: number
  category: string
  type: TransactionType
  description: string
}

export interface TransactionFilters {
  search: string
  category: string
  type: 'all' | TransactionType
  sortBy: SortKey
  sortDir: 'asc' | 'desc'
}
