/**
 * TRANSACTIONS.TSX - Transaction Management Component
 * 
 * This component displays and filters financial transactions. It demonstrates
 * advanced React patterns including state management, filtering, and search.
 * 
 * REACT CONCEPTS:
 * - Multiple useState hooks: Managing different pieces of local state
 * - Controlled components: Form inputs controlled by React state
 * - Event handlers: Input change and select change handlers
 * - Array filtering: Complex filtering logic with multiple criteria
 * - Conditional rendering: Dynamic content based on filter results
 * 
 * TYPESCRIPT CONCEPTS:
 * - Type assertions: (e.target as HTMLInputElement) for event handling
 * - Union types: Filter values restricted to specific strings
 * - Array methods: filter, map, find with proper typing
 * - Optional chaining: Safe property access with ?.
 * 
 * SALT UI COMPONENTS:
 * - Card: Container components for layout sections
 * - FlexLayout: Flexible layouts for form and content
 * - Input: Controlled input for search functionality
 * - Button: Action buttons and interactive elements
 * - Text: Typography with semantic styling
 * 
 * FILTERING PATTERNS:
 * - Multi-criteria filtering: Type, account, and text search
 * - Real-time filtering: Updates as user types/selects
 * - Default values: "all" options for inclusive filtering
 * - Case-insensitive search: toLowerCase() for user-friendly search
 */

import { Card, FlexLayout, Text, Button, Input } from '@salt-ds/core' // Salt UI components
import { Plus, Filter, Search } from 'lucide-react' // Icons for actions and visual cues
import { useState } from 'react' // React hook for local state management
import usePortfolioStore from '../store/portfolioStore' // Global state access
import { format } from 'date-fns' // Date formatting utility

/**
 * TRANSACTIONS COMPONENT
 * Displays filterable list of all financial transactions
 */
const Transactions = () => {
  // STORE ACCESS: Get transactions and accounts from global state
  const { transactions, accounts } = usePortfolioStore()
  
  // LOCAL STATE: Filter and search controls
  const [filterType, setFilterType] = useState('all') // Transaction type filter
  const [filterAccount, setFilterAccount] = useState('all') // Account filter
  const [searchTerm, setSearchTerm] = useState('') // Text search term

  /**
   * UTILITY FUNCTION: Format currency amounts
   * Consistent currency formatting across the component
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  /**
   * HELPER FUNCTION: Get emoji icon for transaction type
   * Visual representation of different transaction types
   */
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return '💰'
      case 'expense':
        return '💸'
      case 'transfer':
        return '🔄'
      default:
        return '💼'
    }
  }

  /**
   * FILTERED TRANSACTIONS: Complex filtering logic
   * Demonstrates chaining array methods and multiple filter criteria
   */
  const filteredTransactions = transactions
    .filter(transaction => {
      // TYPE FILTER: Skip if type filter is set and doesn't match
      if (filterType !== 'all' && transaction.type !== filterType) return false
      
      // ACCOUNT FILTER: Skip if account filter is set and doesn't match
      if (filterAccount !== 'all' && transaction.accountId !== filterAccount) return false
      
      // SEARCH FILTER: Check if search term matches description or category
      if (searchTerm && 
          !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !transaction.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      
      // Include transaction if it passes all filters
      return true
    })
    // SORTING: Most recent transactions first
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // JSX RETURN: Component render output
  return (
    <div className="transactions">
      {/* PAGE HEADER: Title and add transaction button */}
      <FlexLayout direction="row" align="center" justify="space-between" className="page-header">
        <Text styleAs="h2">Transactions</Text>
        {/* PRIMARY ACTION: Add new transaction */}
        <Button variant="cta" className="add-transaction-btn">
          <Plus size={16} />
          Add Transaction
        </Button>
      </FlexLayout>

      {/* FILTERS SECTION: Search and filter controls */}
      <Card className="filters-card">
        <FlexLayout direction="row" align="center" gap={3} wrap>
          {/* SEARCH INPUT: Text-based filtering */}
          <FlexLayout direction="row" align="center" gap={2}>
            <Search size={16} />
            {/* CONTROLLED INPUT: Value controlled by React state */}
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)} // Type assertion for TypeScript
              className="search-input"
            />
          </FlexLayout>
          
          {/* TRANSACTION TYPE FILTER */}
          <FlexLayout direction="row" align="center" gap={2}>
            <Filter size={16} />
            {/* CONTROLLED SELECT: HTML select controlled by React state */}
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)} // Event handler updates state
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
              <option value="transfer">Transfers</option>
            </select>
          </FlexLayout>

          {/* ACCOUNT FILTER: Dynamic options from accounts data */}
          <select 
            value={filterAccount}
            onChange={(e) => setFilterAccount(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Accounts</option>
            {/* DYNAMIC OPTIONS: Map accounts to option elements */}
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </FlexLayout>
      </Card>

      {/* TRANSACTIONS LIST: Display filtered results */}
      <div className="transactions-list">
        {/* MAP FILTERED TRANSACTIONS: Transform data into UI elements */}
        {filteredTransactions.map((transaction) => {
          // FIND RELATED ACCOUNT: Get account details for display
          const account = accounts.find(acc => acc.id === transaction.accountId)
          
          return (
            <Card key={transaction.id} className="transaction-card">
              <FlexLayout direction="row" align="center" justify="space-between">
                {/* LEFT SIDE: Transaction details */}
                <FlexLayout direction="row" align="center" gap={3}>
                  {/* TRANSACTION ICON: Visual indicator of type */}
                  <span className="transaction-icon">
                    {getTransactionIcon(transaction.type)}
                  </span>
                  <FlexLayout direction="column">
                    <Text styleAs="h4">{transaction.description}</Text>
                    {/* METADATA: Category and account info */}
                    <Text className="transaction-meta">
                      {transaction.category} • {account?.name} {/* Optional chaining for safety */}
                    </Text>
                    {/* DATE FORMATTING: Human-readable date */}
                    <Text className="transaction-date">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </Text>
                  </FlexLayout>
                </FlexLayout>
                
                {/* RIGHT SIDE: Amount and type */}
                <FlexLayout direction="column" align="end">
                  {/* TRANSACTION AMOUNT: Styled based on type */}
                  <Text 
                    styleAs="h4" 
                    className={`transaction-amount ${transaction.type}`} // Dynamic CSS class
                  >
                    {/* CONDITIONAL PREFIX: Show appropriate sign */}
                    {transaction.type === 'expense' ? '-' : '+'}
                    {formatCurrency(Math.abs(transaction.amount))} {/* Absolute value for display */}
                  </Text>
                  {/* TRANSACTION TYPE: Capitalized type label */}
                  <Text className={`transaction-type ${transaction.type}`}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </Text>
                </FlexLayout>
              </FlexLayout>
            </Card>
          )
        })}
      </div>

      {/* EMPTY STATE: Shown when no transactions match filters */}
      {/* CONDITIONAL RENDERING: Only show when filtered list is empty */}
      {filteredTransactions.length === 0 && (
        <Card className="empty-state">
          <FlexLayout direction="column" align="center" gap={3}>
            <Text styleAs="h3">No transactions found</Text>
            <Text>Try adjusting your filters or add a new transaction</Text>
            {/* CALL-TO-ACTION: Encourage user to add transactions */}
            <Button variant="cta">
              <Plus size={16} />
              Add Transaction
            </Button>
          </FlexLayout>
        </Card>
      )}
    </div>
  )
}

// EXPORT: Make Transactions component available for import
export default Transactions 