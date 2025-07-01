/**
 * BUDGET.TSX - Budget Management Component
 * 
 * This component displays budget categories with spending progress and status.
 * It demonstrates data visualization, progress tracking, and status indicators.
 * 
 * REACT CONCEPTS:
 * - Functional component with custom hooks
 * - Data transformation and calculations
 * - Conditional styling based on data values
 * - Dynamic class names for visual feedback
 * - Status indicators and progress visualization
 * 
 * TYPESCRIPT CONCEPTS:
 * - Computed values with proper typing
 * - Percentage calculations with number methods
 * - Conditional logic with comparison operators
 * - String interpolation for dynamic content
 * 
 * SALT UI COMPONENTS:
 * - Card: Container components for budget items
 * - FlexLayout: Flexible layouts for content organization
 * - Text: Typography with semantic styling
 * - Button: Action buttons for budget management
 * 
 * DATA VISUALIZATION:
 * - Progress bars: Visual representation of spending vs budget
 * - Status indicators: Color-coded budget health
 * - Percentage calculations: Spending ratios
 * - Conditional formatting: Different styles based on budget status
 * 
 * BUDGET LOGIC:
 * - Spending calculations: Real-time spending against budgets
 * - Status determination: Over/under/on-track budget status
 * - Progress visualization: CSS-based progress bars
 * - Alert indicators: Visual warnings for budget overruns
 */

import { Card, FlexLayout, Text, Button } from '@salt-ds/core' // Salt UI components
import { Plus, Target, TrendingUp, AlertTriangle } from 'lucide-react' // Status and action icons
import usePortfolioStore from '../store/portfolioStore' // Global state for budget data

/**
 * BUDGET COMPONENT
 * Displays budget categories with spending progress and management tools
 */
const Budget = () => {
  // STORE ACCESS: Get budget data and spending calculation function
  const { budgets, getCategorySpending } = usePortfolioStore()

  /**
   * UTILITY FUNCTION: Format currency amounts
   * Consistent currency formatting for budget displays
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  /**
   * BUDGET STATUS CALCULATION
   * Determines budget health based on spending percentage
   * Four-tier system: excellent -> good -> warning -> over
   * 
   * @param spent - Amount spent in category
   * @param limit - Budget limit for category
   * @returns Status string for styling and icon selection
   */
  const getBudgetStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100 // Calculate spending percentage
    
    if (percentage >= 100) return 'over'      // Over budget (100%+)
    if (percentage >= 80) return 'warning'    // Warning zone (80-99%)
    if (percentage >= 60) return 'good'       // Good range (60-79%)
    return 'excellent'                        // Excellent (0-59%)
  }

  /**
   * CATEGORY ICON FUNCTION
   * Maps budget categories to appropriate emoji icons
   * Provides visual identification for different spending categories
   */
  const getBudgetIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food & dining':
        return '🍽️'
      case 'transportation':
        return '🚗'
      case 'shopping':
        return '🛍️'
      case 'entertainment':
        return '🎬'
      case 'utilities':
        return '⚡'
      case 'healthcare':
        return '🏥'
      default:
        return '💰'
    }
  }

  // COMPUTED VALUES: Calculate totals for overview section
  // ARRAY REDUCE: Sum all budget limits to get total budget
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0)
  
  // NESTED CALCULATION: Sum actual spending across all categories
  const totalSpent = budgets.reduce((sum, budget) => {
    const actualSpent = getCategorySpending(budget.category) // Get spending for this category
    return sum + actualSpent
  }, 0)

  // JSX RETURN: Component render output
  return (
    <div className="budget">
      {/* PAGE HEADER: Title and add budget button */}
      <FlexLayout direction="row" align="center" justify="space-between" className="page-header">
        <Text styleAs="h2">Budget & Spending</Text>
        {/* PRIMARY ACTION: Add new budget category */}
        <Button variant="cta" className="add-budget-btn">
          <Plus size={16} />
          Add Budget
        </Button>
      </FlexLayout>

      {/* BUDGET OVERVIEW SECTION: High-level spending summary */}
      <Card className="budget-overview">
        <FlexLayout direction="column" gap={3}>
          <Text styleAs="h3">Monthly Budget Overview</Text>
          
          {/* THREE-COLUMN OVERVIEW: Budget, Spent, Remaining */}
          <FlexLayout direction="row" align="center" justify="space-between">
            {/* TOTAL BUDGET COLUMN */}
            <FlexLayout direction="column">
              <Text className="overview-label">Total Budget</Text>
              <Text styleAs="h3" className="overview-amount">
                {formatCurrency(totalBudget)}
              </Text>
            </FlexLayout>
            
            {/* TOTAL SPENT COLUMN */}
            <FlexLayout direction="column">
              <Text className="overview-label">Total Spent</Text>
              {/* CONDITIONAL STYLING: Different colors for over/under budget */}
              <Text styleAs="h3" className={`overview-amount ${totalSpent > totalBudget ? 'over-budget' : 'under-budget'}`}>
                {formatCurrency(totalSpent)}
              </Text>
            </FlexLayout>
            
            {/* REMAINING BUDGET COLUMN */}
            <FlexLayout direction="column">
              <Text className="overview-label">Remaining</Text>
              {/* CONDITIONAL STYLING: Negative amounts show in red */}
              <Text styleAs="h3" className={`overview-amount ${totalBudget - totalSpent < 0 ? 'negative' : 'positive'}`}>
                {formatCurrency(totalBudget - totalSpent)}
              </Text>
            </FlexLayout>
          </FlexLayout>

          {/* OVERALL PROGRESS BAR: Visual representation of total budget usage */}
          <div className={`progress-bar budget-progress ${getBudgetStatus(totalSpent, totalBudget)}`}>
            {/* DYNAMIC WIDTH: Progress fill based on percentage spent */}
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }} // Cap at 100%
            />
          </div>
        </FlexLayout>
      </Card>

      {/* BUDGET CATEGORIES SECTION: Individual category breakdowns */}
      <div className="budget-categories">
        {/* MAP BUDGETS: Transform each budget into a detailed card */}
        {budgets.map((budget) => {
          // CALCULATIONS: Real-time data for this specific budget category
          const actualSpent = getCategorySpending(budget.category) // Get current spending
          const percentage = (actualSpent / budget.limit) * 100     // Calculate percentage
          const status = getBudgetStatus(actualSpent, budget.limit) // Determine status
          
          return (
            <Card key={budget.id} className={`budget-card ${status}`}> {/* Dynamic status class */}
              <FlexLayout direction="column" gap={3}>
                {/* CATEGORY HEADER: Icon, name, and status indicator */}
                <FlexLayout direction="row" align="center" justify="space-between">
                  {/* LEFT SIDE: Category identification */}
                  <FlexLayout direction="row" align="center" gap={3}>
                    <span className="budget-icon">{getBudgetIcon(budget.category)}</span>
                    <FlexLayout direction="column">
                      <Text styleAs="h4">{budget.category}</Text>
                      <Text className="budget-period">{budget.period}</Text>
                    </FlexLayout>
                  </FlexLayout>
                  
                  {/* RIGHT SIDE: Status icons based on spending level */}
                  {/* CONDITIONAL RENDERING: Different icons for different statuses */}
                  {status === 'over' && <AlertTriangle size={20} className="status-icon warning" />}
                  {status === 'warning' && <TrendingUp size={20} className="status-icon warning" />}
                  {status === 'good' && <Target size={20} className="status-icon good" />}
                  {status === 'excellent' && <Target size={20} className="status-icon excellent" />}
                </FlexLayout>

                {/* SPENDING DETAILS: Spent vs Budget amounts */}
                <FlexLayout direction="row" align="center" justify="space-between">
                  {/* LEFT SIDE: Amount spent */}
                  <FlexLayout direction="column">
                    <Text className="spent-label">Spent</Text>
                    {/* STATUS-BASED STYLING: Color changes based on budget health */}
                    <Text styleAs="h4" className={`spent-amount ${status}`}>
                      {formatCurrency(actualSpent)}
                    </Text>
                  </FlexLayout>
                  
                  {/* RIGHT SIDE: Budget limit */}
                  <FlexLayout direction="column" align="end">
                    <Text className="limit-label">Budget</Text>
                    <Text styleAs="h4">{formatCurrency(budget.limit)}</Text>
                  </FlexLayout>
                </FlexLayout>

                {/* CATEGORY PROGRESS BAR: Visual spending indicator */}
                <div className={`progress-bar category-progress ${status}`}>
                  {/* DYNAMIC PROGRESS FILL: Width based on spending percentage */}
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(percentage, 100)}%` }} // Cap at 100% for display
                  />
                </div>
                
                {/* PROGRESS SUMMARY: Percentage and remaining/overage text */}
                <FlexLayout direction="row" align="center" justify="space-between">
                  {/* LEFT SIDE: Percentage used */}
                  <Text className="percentage-text">
                    {percentage.toFixed(1)}% used {/* Format to 1 decimal place */}
                  </Text>
                  {/* RIGHT SIDE: Remaining or overage amount */}
                  <Text className={`remaining-text ${status}`}>
                    {/* CONDITIONAL DISPLAY: Show remaining or overage */}
                    {budget.limit - actualSpent >= 0 
                      ? `${formatCurrency(budget.limit - actualSpent)} left`        // Under budget
                      : `${formatCurrency(actualSpent - budget.limit)} over budget` // Over budget
                    }
                  </Text>
                </FlexLayout>
              </FlexLayout>
            </Card>
          )
        })}
      </div>

      {/* EMPTY STATE: Shown when no budgets exist */}
      {/* CONDITIONAL RENDERING: Only show if budgets array is empty */}
      {budgets.length === 0 && (
        <Card className="empty-state">
          <FlexLayout direction="column" align="center" gap={3}>
            <Text styleAs="h3">No budgets set up yet</Text>
            <Text>Create budgets to track your spending by category</Text>
            {/* CALL-TO-ACTION: Encourage user to create first budget */}
            <Button variant="cta">
              <Plus size={16} />
              Create Your First Budget
            </Button>
          </FlexLayout>
        </Card>
      )}
    </div>
  )
}

// EXPORT: Make Budget component available for import
export default Budget 