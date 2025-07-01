/**
 * DASHBOARD.TSX - Main Dashboard Component
 * 
 * This component displays the main portfolio overview with account balances,
 * recent transactions, and spending statistics. It demonstrates many React
 * and TypeScript patterns commonly used in modern applications.
 * 
 * REACT CONCEPTS DEMONSTRATED:
 * - Functional components with hooks
 * - useState: Local state management for UI interactions
 * - Custom hooks: usePortfolioStore (Zustand store hook)
 * - Conditional rendering: Show/hide balance functionality
 * - Array methods: map, filter, reduce for data transformation
 * - Event handlers: Button click functions
 * 
 * TYPESCRIPT CONCEPTS:
 * - Type inference: TypeScript infers types from function returns
 * - Array methods with proper typing
 * - Interface usage: Working with defined data structures
 * - Optional chaining: Safe property access
 * 
 * SALT UI COMPONENTS:
 * - Card: Container with consistent styling
 * - FlexLayout: Flexible box layout system
 * - GridLayout: Grid system for responsive layouts
 * - Text: Typography with semantic styling
 * - Button: Interactive elements with variants
 * 
 * EXTERNAL LIBRARIES:
 * - date-fns: Date formatting utilities
 * - lucide-react: Icon components
 */

import { Card, FlexLayout, Text, Button, GridLayout } from '@salt-ds/core' // Salt UI layout and UI components
import { TrendingUp, TrendingDown, DollarSign, Eye, EyeOff } from 'lucide-react' // Icon components
import { useState } from 'react' // React hook for local state
import usePortfolioStore from '../store/portfolioStore' // Custom Zustand store hook
import { format } from 'date-fns' // Date formatting library

/**
 * DASHBOARD COMPONENT
 * Main dashboard view component displaying portfolio overview
 */
const Dashboard = () => {
  // LOCAL STATE: Controls visibility of balance amounts (privacy feature)
  const [balanceVisible, setBalanceVisible] = useState(true)
  
  // ZUSTAND STORE: Extract needed data and functions from global state
  // This is a custom hook that subscribes to store changes
  const { accounts, transactions, getTotalBalance } = usePortfolioStore()

  // COMPUTED VALUES: Derive data from store state
  const totalBalance = getTotalBalance() // Call store function to calculate total
  
  // ARRAY CHAINING: Sort by date (newest first) and take first 5 items
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
    .slice(0, 5) // Take only first 5 transactions

  /**
   * UTILITY FUNCTION: Format numbers as currency
   * Uses JavaScript's built-in Intl.NumberFormat for localized formatting
   * 
   * @param amount - Number to format as currency
   * @returns Formatted currency string (e.g., "$1,234.56")
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  /**
   * HELPER FUNCTION: Get emoji icon for account type
   * Demonstrates switch statement for mapping values
   * 
   * @param type - Account type string
   * @returns Emoji string representing account type
   */
  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return '🏦'
      case 'savings':
        return '💰'
      case 'investment':
        return '📈'
      case 'credit':
        return '💳'
      default:
        return '💼'
    }
  }

  // MONTHLY INCOME CALCULATION: Filter and reduce pattern
  const monthlyIncome = transactions
    .filter(t => 
      t.type === 'income' && // Only income transactions
      new Date(t.date).getMonth() === new Date().getMonth() // Current month only
    )
    .reduce((sum, t) => sum + t.amount, 0) // Sum all amounts

  // MONTHLY EXPENSES CALCULATION: Similar pattern but for expenses
  const monthlyExpenses = transactions
    .filter(t => 
      t.type === 'expense' && 
      new Date(t.date).getMonth() === new Date().getMonth()
    )
    .reduce((sum, t) => sum + Math.abs(t.amount), 0) // Math.abs ensures positive values

  // JSX RETURN: Component's render output
  return (
    <div className="dashboard">
      {/* MAIN BALANCE CARD: Hero section showing total portfolio value */}
      <Card className="balance-card">
        <FlexLayout direction="column" gap={2}>
          {/* HEADER ROW: Title and visibility toggle */}
          <FlexLayout direction="row" align="center" justify="space-between">
            <Text styleAs="h2">Total Portfolio Value</Text>
            {/* PRIVACY TOGGLE: Button to show/hide balance amounts */}
            <Button
              variant="secondary"
              onClick={() => setBalanceVisible(!balanceVisible)} // Toggle state
              className="visibility-toggle"
            >
              {/* CONDITIONAL RENDERING: Different icons based on state */}
              {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </Button>
          </FlexLayout>
          {/* MAIN BALANCE DISPLAY */}
          <Text styleAs="h1" className="balance-amount">
            {/* TERNARY OPERATOR: Show balance or dots based on visibility state */}
            {balanceVisible ? formatCurrency(totalBalance) : '••••••'}
          </Text>
          {/* TREND INDICATOR */}
          <FlexLayout direction="row" align="center" gap={1}>
            <TrendingUp size={16} className="trend-icon positive" />
            <Text className="trend-text positive">+2.4% from last month</Text>
          </FlexLayout>
        </FlexLayout>
      </Card>

      {/* QUICK STATS SECTION: Two-column grid showing income vs expenses */}
      <GridLayout columns={2} gap={3} className="quick-stats">
        {/* INCOME STAT CARD */}
        <Card className="stat-card">
          <FlexLayout direction="column" gap={2}>
            <FlexLayout direction="row" align="center" gap={2}>
              <DollarSign size={20} className="stat-icon income" />
              <Text styleAs="h4">Monthly Income</Text>
            </FlexLayout>
            <Text styleAs="h3" className="stat-value income">
              {formatCurrency(monthlyIncome)}
            </Text>
          </FlexLayout>
        </Card>
        
        {/* EXPENSE STAT CARD */}
        <Card className="stat-card">
          <FlexLayout direction="column" gap={2}>
            <FlexLayout direction="row" align="center" gap={2}>
              <TrendingDown size={20} className="stat-icon expense" />
              <Text styleAs="h4">Monthly Expenses</Text>
            </FlexLayout>
            <Text styleAs="h3" className="stat-value expense">
              {formatCurrency(monthlyExpenses)}
            </Text>
          </FlexLayout>
        </Card>
      </GridLayout>

      {/* ACCOUNTS OVERVIEW SECTION: List of all user accounts */}
      <Card className="accounts-overview">
        <FlexLayout direction="column" gap={3}>
          <Text styleAs="h3">Accounts</Text>
          <div className="accounts-list">
            {/* ARRAY MAPPING: Transform accounts array into JSX elements */}
            {accounts.map((account) => (
              <div key={account.id} className="account-item">
                <FlexLayout direction="row" align="center" justify="space-between">
                  {/* LEFT SIDE: Account icon and details */}
                  <FlexLayout direction="row" align="center" gap={3}>
                    <span className="account-icon">{getAccountTypeIcon(account.type)}</span>
                    <FlexLayout direction="column">
                      <Text styleAs="h4">{account.name}</Text>
                      {/* STRING MANIPULATION: Capitalize first letter */}
                      <Text className="account-type">
                        {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                      </Text>
                    </FlexLayout>
                  </FlexLayout>
                  {/* RIGHT SIDE: Account balance */}
                  <Text styleAs="h4" className="account-balance">
                    {/* CONDITIONAL RENDERING: Respect privacy setting */}
                    {balanceVisible ? formatCurrency(account.balance) : '••••••'}
                  </Text>
                </FlexLayout>
              </div>
            ))}
          </div>
        </FlexLayout>
      </Card>

      {/* RECENT TRANSACTIONS SECTION: Latest financial activity */}
      <Card className="recent-transactions">
        <FlexLayout direction="column" gap={3}>
          <Text styleAs="h3">Recent Transactions</Text>
          <div className="transactions-list">
            {/* MAP OVER RECENT TRANSACTIONS: Display each transaction */}
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <FlexLayout direction="row" align="center" justify="space-between">
                  {/* LEFT SIDE: Transaction details */}
                  <FlexLayout direction="column">
                    <Text styleAs="h4">{transaction.description}</Text>
                    <Text className="transaction-category">{transaction.category}</Text>
                    <Text className="transaction-date">
                      {/* DATE FORMATTING: Using date-fns library for readable dates */}
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </Text>
                  </FlexLayout>
                  {/* RIGHT SIDE: Transaction amount */}
                  <Text 
                    styleAs="h4" 
                    className={`transaction-amount ${transaction.type}`} // Dynamic CSS class
                  >
                    {/* CONDITIONAL PREFIX: Show + or - based on transaction type */}
                    {transaction.type === 'expense' ? '-' : '+'}
                    {formatCurrency(Math.abs(transaction.amount))}
                  </Text>
                </FlexLayout>
              </div>
            ))}
          </div>
        </FlexLayout>
      </Card>
    </div>
  )
}

// EXPORT: Make Dashboard component available for import
export default Dashboard 