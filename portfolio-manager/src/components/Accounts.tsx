/**
 * ACCOUNTS.TSX - Account Management Component
 * 
 * This component displays and manages user financial accounts. It demonstrates
 * CRUD operations, data presentation, and UI interaction patterns.
 * 
 * REACT CONCEPTS:
 * - Functional component pattern
 * - Custom hooks: usePortfolioStore for state management
 * - Event handlers: Button click functions for actions
 * - Conditional rendering: Empty states and dynamic content
 * - Array mapping: Transforming data into UI elements
 * 
 * TYPESCRIPT CONCEPTS:
 * - Destructuring: Extracting values from store
 * - Function parameters: Event handlers with proper typing
 * - String methods: Text manipulation and formatting
 * 
 * SALT UI COMPONENTS:
 * - Card: Account containers and layout cards
 * - FlexLayout: Flexible layouts for account information
 * - GridLayout: Responsive grid system
 * - Text: Typography with semantic meaning
 * - Button: Action buttons with variants
 * 
 * UX PATTERNS:
 * - Empty states: Helpful messaging when no data exists
 * - Action buttons: Edit and delete functionality
 * - Consistent layout: All accounts displayed uniformly
 * - Color coding: Different styling for account types
 */

import { Card, FlexLayout, Text, Button, GridLayout } from '@salt-ds/core' // Salt UI components
import { Plus, Edit2, Trash2 } from 'lucide-react' // Action icons
import usePortfolioStore from '../store/portfolioStore' // Global state management

/**
 * ACCOUNTS COMPONENT
 * Displays list of user accounts with management actions
 */
const Accounts = () => {
  // STORE ACCESS: Get accounts data and actions from global store
  const { accounts, deleteAccount } = usePortfolioStore()

  /**
   * UTILITY FUNCTION: Format currency amounts
   * Reusable function for consistent currency display
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  /**
   * HELPER FUNCTION: Get emoji icon for account type
   * Maps account types to visual representations
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

  /**
   * HELPER FUNCTION: Get CSS class for account type styling
   * Maps account types to color themes for visual distinction
   */
  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'checking':
        return 'primary'
      case 'savings':
        return 'success'
      case 'investment':
        return 'warning'
      case 'credit':
        return 'danger'
      default:
        return 'secondary'
    }
  }

    // JSX RETURN: Component render output
  return (
    <div className="accounts">
      {/* PAGE HEADER: Title and main action button */}
      <FlexLayout direction="row" align="center" justify="space-between" className="page-header">
        <Text styleAs="h2">Accounts</Text>
        {/* PRIMARY ACTION: Add new account (functionality would be implemented) */}
        <Button variant="cta" className="add-account-btn">
          <Plus size={16} />
          Add Account
        </Button>
      </FlexLayout>

      {/* ACCOUNTS GRID: Single column layout for account cards */}
      <GridLayout columns={1} gap={3} className="accounts-grid">
        {/* ARRAY MAPPING: Transform each account into a card component */}
        {accounts.map((account) => (
          <Card key={account.id} className={`account-card ${getAccountTypeColor(account.type)}`}>
            <FlexLayout direction="column" gap={3}>
              {/* ACCOUNT HEADER: Icon, name, and action buttons */}
              <FlexLayout direction="row" align="center" justify="space-between">
                {/* LEFT SIDE: Account identification */}
                <FlexLayout direction="row" align="center" gap={3}>
                  <span className="account-icon-large">{getAccountTypeIcon(account.type)}</span>
                  <FlexLayout direction="column">
                    <Text styleAs="h3">{account.name}</Text>
                    {/* STRING MANIPULATION: Capitalize account type for display */}
                    <Text className="account-type-badge">
                      {account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account
                    </Text>
                  </FlexLayout>
                </FlexLayout>
                {/* RIGHT SIDE: Action buttons */}
                <FlexLayout direction="row" align="center" gap={2}>
                  {/* EDIT BUTTON: Would trigger edit modal/form */}
                  <Button variant="secondary">
                    <Edit2 size={14} />
                  </Button>
                  {/* DELETE BUTTON: Calls store action to remove account */}
                  <Button 
                    variant="secondary" 
                    onClick={() => deleteAccount(account.id)} // Event handler calling store action
                  >
                    <Trash2 size={14} />
                  </Button>
                </FlexLayout>
              </FlexLayout>

                            {/* ACCOUNT DETAILS: Balance and currency information */}
              <FlexLayout direction="row" align="center" justify="space-between">
                {/* LEFT SIDE: Account balance */}
                <FlexLayout direction="column">
                  <Text className="balance-label">Current Balance</Text>
                  {/* CONDITIONAL STYLING: Different colors for positive/negative balances */}
                  <Text styleAs="h2" className={`balance-amount ${account.balance < 0 ? 'negative' : 'positive'}`}>
                    {formatCurrency(account.balance)}
                  </Text>
                </FlexLayout>
                {/* RIGHT SIDE: Currency information */}
                <FlexLayout direction="column" align="end">
                  <Text className="currency-label">Currency</Text>
                  <Text styleAs="h4">{account.currency}</Text>
                </FlexLayout>
              </FlexLayout>

              {/* ACCOUNT ACTIONS: Additional functionality buttons */}
              <div className="account-actions">
                {/* These buttons would trigger navigation or modals in a real app */}
                <Button variant="primary">View Transactions</Button>
                <Button variant="secondary">Transfer Funds</Button>
              </div>
            </FlexLayout>
          </Card>
        ))}
      </GridLayout>

      {/* EMPTY STATE: Shown when no accounts exist */}
      {/* CONDITIONAL RENDERING: Only show if accounts array is empty */}
      {accounts.length === 0 && (
        <Card className="empty-state">
          <FlexLayout direction="column" align="center" gap={3}>
            <Text styleAs="h3">No accounts yet</Text>
            <Text>Get started by adding your first account</Text>
            {/* CALL-TO-ACTION: Encourages user to add first account */}
            <Button variant="cta">
              <Plus size={16} />
              Add Your First Account
            </Button>
          </FlexLayout>
        </Card>
      )}
    </div>
  )
}

// EXPORT: Make Accounts component available for import
export default Accounts 