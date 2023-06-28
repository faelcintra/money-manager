import { createContext, useState, useEffect, ReactNode } from 'react'
import { api } from '../lib/axios'

interface TransactionProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}
interface CreateTransactionProps {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface TransactionContextType {
  transactions: TransactionProps[]
  getTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionProps) => Promise<void>
}

interface ProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: ProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  async function getTransactions(query?: string) {
    const data = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(data.data)
    console.log('request')
  }

  async function createTransaction(data: CreateTransactionProps) {
    const { category, description, price, type } = data

    const response = await api.post('/transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
    console.log('POST IN CONTEXT')
  }
  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, getTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
