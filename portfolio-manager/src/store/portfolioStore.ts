/**
 * PORTFOLIO STORE - State Management with Zustand
 * 
 * This file demonstrates advanced TypeScript and React state management concepts
 * using Zustand, a lightweight alternative to Redux.
 * 
 * TYPESCRIPT CONCEPTS:
 * - Interfaces: Define the shape of our data objects
 * - Union types: 'checking' | 'savings' limits values to specific strings
 * - Generic types: Used in Zustand's create<Type>() function
 * - Type inference: TypeScript automatically infers return types
 * 
 * ZUSTAND CONCEPTS:
 * - create(): Creates a store with state and actions
 * - devtools(): Enables Redux DevTools for debugging
 * - persist(): Automatically saves state to localStorage
 * - Immer-style updates: Directly mutate state in actions (Zustand handles immutability)
 * 
 * STATE MANAGEMENT PATTERNS:
 * - Single store pattern: All related data in one place
 * - Action creators: Functions that modify state
 * - Computed values: Functions that derive data from state
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/**
 * TYPESCRIPT INTERFACE: Account
 * Defines the structure of an account object
 * - Union types restrict 'type' to specific values
 * - All properties are required (no optional ? properties)
 */
export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'investment' | 'credit' // Union type - only these values allowed
  balance: number
  currency: string
}

/**
 * TYPESCRIPT INTERFACE: Transaction
 * Represents a financial transaction
 * - Date type for proper date handling
 * - Negative amounts for expenses, positive for income
 */
export interface Transaction {
  id: string
  accountId: string // Foreign key reference to Account.id
  amount: number
  description: string
  category: string
  date: Date
  type: 'income' | 'expense' | 'transfer' // Union type for transaction types
}

/**
 * TYPESCRIPT INTERFACE: Budget
 * Represents spending limits by category
 * - spent vs limit comparison for budget tracking
 */
export interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  period: 'monthly' | 'weekly' | 'yearly' // Union type for time periods
}

/**
 * TYPESCRIPT INTERFACE: PortfolioState
 * Defines the complete shape of our application state and actions
 * 
 * ADVANCED TYPESCRIPT CONCEPTS:
 * - Omit<Type, Keys>: Creates new type excluding specified properties
 * - Partial<Type>: Makes all properties optional for updates
 * - Optional parameters: period?: means parameter is optional
 * - Function types: Define exact signatures for actions
 */
interface PortfolioState {
  // STATE PROPERTIES - The data our app manages
  accounts: Account[]      // Array of user's financial accounts
  transactions: Transaction[] // Array of all financial transactions
  budgets: Budget[]        // Array of spending budgets by category
  
  // ACTION FUNCTIONS - Methods to modify state
  // CRUD operations for accounts
  addAccount: (account: Omit<Account, 'id'>) => void      // Omit 'id' since we generate it
  updateAccount: (id: string, updates: Partial<Account>) => void // Partial allows updating some fields
  deleteAccount: (id: string) => void
  
  // CRUD operations for transactions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  
  // CRUD operations for budgets
  addBudget: (budget: Omit<Budget, 'id'>) => void
  updateBudget: (id: string, updates: Partial<Budget>) => void
  deleteBudget: (id: string) => void
  
  // COMPUTED VALUE FUNCTIONS - Derive data from state
  getTotalBalance: () => number
  getAccountBalance: (accountId: string) => number
  getTransactionsByAccount: (accountId: string) => Transaction[]
  getCategorySpending: (category: string, period?: 'week' | 'month' | 'year') => number // Optional parameter
}

/**
 * ZUSTAND STORE CREATION
 * Creates our global state store with middleware
 * 
 * ZUSTAND PATTERNS:
 * - create<Type>(): Generic function that creates typed store
 * - Middleware composition: devtools(persist(...)) - middleware wraps our store
 * - set function: Used to update state
 * - get function: Used to read current state in actions
 */
const usePortfolioStore = create<PortfolioState>()(
  devtools( // Enables Redux DevTools for debugging in browser
    persist( // Automatically saves state to localStorage and restores on app load
      (set, get) => ({ // set = update state, get = read current state
        // INITIAL STATE DATA - Sample data for demonstration
        // In a real app, this would be empty or loaded from an API
        accounts: [
          {
            id: '1',
            name: 'Main Checking',
            type: 'checking', // TypeScript ensures this matches our union type
            balance: 5420.50,
            currency: 'USD'
          },
          {
            id: '2',
            name: 'Emergency Savings',
            type: 'savings',
            balance: 15000.00,
            currency: 'USD'
          },
          {
            id: '3',
            name: 'Investment Portfolio',
            type: 'investment',
            balance: 32450.75,
            currency: 'USD'
          }
        ],
        transactions: [
          {
            id: '1',
            accountId: '1',
            amount: -89.50,
            description: 'Grocery Store',
            category: 'Food & Dining',
            date: new Date(2024, 0, 15),
            type: 'expense'
          },
          {
            id: '2',
            accountId: '1',
            amount: -45.00,
            description: 'Gas Station',
            category: 'Transportation',
            date: new Date(2024, 0, 14),
            type: 'expense'
          },
          {
            id: '3',
            accountId: '1',
            amount: 3200.00,
            description: 'Salary Deposit',
            category: 'Income',
            date: new Date(2024, 0, 10),
            type: 'income'
          }
        ],
        budgets: [
          {
            id: '1',
            category: 'Food & Dining',
            limit: 500,
            spent: 289.50,
            period: 'monthly'
          },
          {
            id: '2',
            category: 'Transportation',
            limit: 200,
            spent: 145.00,
            period: 'monthly'
          }
        ],

        // ACCOUNT ACTIONS - Functions that modify account state
        
        // ADD ACCOUNT: Adds new account with generated ID
        addAccount: (account) =>
          set((state) => ({
            // SPREAD OPERATOR: ...state.accounts creates new array with existing accounts
            // OBJECT SPREAD: ...account copies all properties, id: generates new UUID
            accounts: [...state.accounts, { ...account, id: crypto.randomUUID() }]
          })),

        // UPDATE ACCOUNT: Modifies existing account by ID
        updateAccount: (id, updates) =>
          set((state) => ({
            accounts: state.accounts.map((account) =>
              // CONDITIONAL OPERATOR: If ID matches, merge updates, otherwise return unchanged
              // OBJECT SPREAD: ...account (existing), ...updates (new values override)
              account.id === id ? { ...account, ...updates } : account
            )
          })),

        // DELETE ACCOUNT: Removes account by ID
        deleteAccount: (id) =>
          set((state) => ({
            // ARRAY FILTER: Keep all accounts except the one with matching ID
            accounts: state.accounts.filter((account) => account.id !== id)
          })),

        addTransaction: (transaction) =>
          set((state) => {
            const newTransaction = { ...transaction, id: crypto.randomUUID() }
            const updatedAccounts = state.accounts.map((account) => {
              if (account.id === transaction.accountId) {
                return {
                  ...account,
                  balance: account.balance + transaction.amount
                }
              }
              return account
            })
            return {
              transactions: [...state.transactions, newTransaction],
              accounts: updatedAccounts
            }
          }),

        updateTransaction: (id, updates) =>
          set((state) => ({
            transactions: state.transactions.map((transaction) =>
              transaction.id === id ? { ...transaction, ...updates } : transaction
            )
          })),

        deleteTransaction: (id) =>
          set((state) => ({
            transactions: state.transactions.filter((transaction) => transaction.id !== id)
          })),

        addBudget: (budget) =>
          set((state) => ({
            budgets: [...state.budgets, { ...budget, id: crypto.randomUUID() }]
          })),

        updateBudget: (id, updates) =>
          set((state) => ({
            budgets: state.budgets.map((budget) =>
              budget.id === id ? { ...budget, ...updates } : budget
            )
          })),

        deleteBudget: (id) =>
          set((state) => ({
            budgets: state.budgets.filter((budget) => budget.id !== id)
          })),

        // COMPUTED VALUE FUNCTIONS - Calculate derived data from state
        
        // TOTAL BALANCE: Sum all account balances
        getTotalBalance: () => {
          const { accounts } = get() // GET CURRENT STATE
          // ARRAY REDUCE: Accumulate values into single result
          return accounts.reduce((total, account) => total + account.balance, 0)
        },

        // ACCOUNT BALANCE: Get balance for specific account
        getAccountBalance: (accountId) => {
          const { accounts } = get()
          // ARRAY FIND: Get first matching element
          const account = accounts.find((acc) => acc.id === accountId)
          // OPTIONAL CHAINING: account?.balance returns undefined if account is null
          // NULLISH COALESCING: || 0 provides fallback value
          return account?.balance || 0
        },

        // TRANSACTIONS BY ACCOUNT: Filter transactions for specific account
        getTransactionsByAccount: (accountId) => {
          const { transactions } = get()
          // ARRAY FILTER: Return elements that match condition
          return transactions.filter((transaction) => transaction.accountId === accountId)
        },

        // CATEGORY SPENDING: Calculate spending for category within time period
        getCategorySpending: (category, period = 'month') => { // DEFAULT PARAMETER
          const { transactions } = get()
          const now = new Date()
          const startDate = new Date()
          
          // SWITCH STATEMENT: Handle different time periods
          switch (period) {
            case 'week':
              startDate.setDate(now.getDate() - 7)
              break
            case 'year':
              startDate.setFullYear(now.getFullYear() - 1)
              break
            default: // month
              startDate.setMonth(now.getMonth() - 1)
              break
          }

          return transactions
            // CHAIN ARRAY METHODS: filter then reduce
            .filter((transaction) => 
              transaction.category === category &&
              transaction.type === 'expense' &&
              transaction.date >= startDate
            )
            // Math.abs() ensures we get positive values for expense amounts
            .reduce((total, transaction) => total + Math.abs(transaction.amount), 0)
        }
      }),
      {
        // PERSIST CONFIGURATION
        name: 'portfolio-storage', // localStorage key name
        // PARTIALIZE: Choose which state to persist (exclude functions)
        partialize: (state) => ({
          accounts: state.accounts,
          transactions: state.transactions,
          budgets: state.budgets
          // Note: We don't persist functions, only data
        })
      }
    )
  )
)

// EXPORT: Make store available to other components
// This is a React hook that components can use to access/modify state
export default usePortfolioStore 