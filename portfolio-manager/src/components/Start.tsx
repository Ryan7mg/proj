/**
 * START.TSX - Landing Page Component
 * 
 * This is the initial landing page for the JPMorgan Portfolio Manager internal tool.
 * It provides an overview and quick access to main features.
 * 
 * REACT CONCEPTS:
 * - Functional component with navigation integration
 * - Event handlers for navigation actions
 * - Responsive card layouts with quick actions
 * - Icon usage for visual hierarchy
 * 
 * JPMORGAN INTERNAL TOOL PATTERNS:
 * - Professional landing page design
 * - Quick access navigation cards
 * - Corporate branding and messaging
 * - Clear call-to-action buttons
 */

import { Card, FlexLayout, Text, Button, GridLayout } from '@salt-ds/core' // Salt UI components
import { TrendingUp, CreditCard, Receipt, Target, ArrowRight, BarChart3 } from 'lucide-react' // Icons
import { useNavigate } from 'react-router-dom' // Navigation hook
import usePortfolioStore from '../store/portfolioStore' // Store for quick stats

/**
 * START COMPONENT
 * Landing page for JPMorgan Portfolio Manager internal tool
 */
const Start = () => {
  // NAVIGATION HOOK: For programmatic routing
  const navigate = useNavigate()
  
  // STORE ACCESS: Get quick stats for overview
  const { accounts, transactions, budgets, getTotalBalance } = usePortfolioStore()
  
  // QUICK STATS: Calculate overview numbers
  const totalBalance = getTotalBalance()
  const accountCount = accounts.length
  const transactionCount = transactions.length
  const budgetCount = budgets.length

  /**
   * NAVIGATION HELPERS: Functions to navigate to different sections
   */
  const navigateTo = (path: string) => {
    navigate(path)
  }

  // JSX RETURN: Landing page content
  return (
    <div className="start-page">
      {/* HERO SECTION: Welcome message and overview */}
      <Card className="hero-card">
        <FlexLayout direction="column" gap={4} align="center">
          <div className="hero-content">
            <Text styleAs="h1" className="hero-title">
              Portfolio Manager
            </Text>
            <Text styleAs="h3" className="hero-subtitle">
              JPMorgan Internal Financial Tool
            </Text>
            <Text className="hero-description">
              Manage accounts, track transactions, and monitor budgets with our comprehensive financial dashboard.
            </Text>
          </div>
          
          {/* QUICK STATS OVERVIEW */}
          <FlexLayout direction="row" align="center" gap={6} wrap className="quick-stats-overview">
            <div className="stat-item">
              <Text styleAs="h2" className="stat-number">${(totalBalance / 1000).toFixed(1)}K</Text>
              <Text className="stat-label">Total Portfolio</Text>
            </div>
            <div className="stat-item">
              <Text styleAs="h2" className="stat-number">{accountCount}</Text>
              <Text className="stat-label">Accounts</Text>
            </div>
            <div className="stat-item">
              <Text styleAs="h2" className="stat-number">{transactionCount}</Text>
              <Text className="stat-label">Transactions</Text>
            </div>
            <div className="stat-item">
              <Text styleAs="h2" className="stat-number">{budgetCount}</Text>
              <Text className="stat-label">Budgets</Text>
            </div>
          </FlexLayout>
        </FlexLayout>
      </Card>

      {/* QUICK ACCESS SECTION: Navigation cards to main features */}
      <div className="quick-access-section">
        <Text styleAs="h2" className="section-title">Quick Access</Text>
        
        <GridLayout columns={2} gap={3} className="access-grid">
          {/* DASHBOARD ACCESS CARD */}
          <Card className="access-card dashboard-card">
            <FlexLayout direction="column" gap={3}>
              <FlexLayout direction="row" align="center" gap={3}>
                <BarChart3 size={32} className="access-icon" />
                <FlexLayout direction="column">
                  <Text styleAs="h3">Dashboard</Text>
                  <Text className="access-description">
                    View portfolio overview, balances, and recent activity
                  </Text>
                </FlexLayout>
              </FlexLayout>
              <Button 
                variant="cta" 
                onClick={() => navigateTo('/dashboard')}
                className="access-button"
              >
                View Dashboard <ArrowRight size={16} />
              </Button>
            </FlexLayout>
          </Card>

          {/* ACCOUNTS ACCESS CARD */}
          <Card className="access-card accounts-card">
            <FlexLayout direction="column" gap={3}>
              <FlexLayout direction="row" align="center" gap={3}>
                <CreditCard size={32} className="access-icon" />
                <FlexLayout direction="column">
                  <Text styleAs="h3">Accounts</Text>
                  <Text className="access-description">
                    Manage checking, savings, investment, and credit accounts
                  </Text>
                </FlexLayout>
              </FlexLayout>
              <Button 
                variant="primary" 
                onClick={() => navigateTo('/accounts')}
                className="access-button"
              >
                Manage Accounts <ArrowRight size={16} />
              </Button>
            </FlexLayout>
          </Card>

          {/* TRANSACTIONS ACCESS CARD */}
          <Card className="access-card transactions-card">
            <FlexLayout direction="column" gap={3}>
              <FlexLayout direction="row" align="center" gap={3}>
                <Receipt size={32} className="access-icon" />
                <FlexLayout direction="column">
                  <Text styleAs="h3">Transactions</Text>
                  <Text className="access-description">
                    Search, filter, and analyze all financial transactions
                  </Text>
                </FlexLayout>
              </FlexLayout>
              <Button 
                variant="primary" 
                onClick={() => navigateTo('/transactions')}
                className="access-button"
              >
                View Transactions <ArrowRight size={16} />
              </Button>
            </FlexLayout>
          </Card>

          {/* BUDGET ACCESS CARD */}
          <Card className="access-card budget-card">
            <FlexLayout direction="column" gap={3}>
              <FlexLayout direction="row" align="center" gap={3}>
                <Target size={32} className="access-icon" />
                <FlexLayout direction="column">
                  <Text styleAs="h3">Budget Tracking</Text>
                  <Text className="access-description">
                    Monitor spending limits and track budget progress
                  </Text>
                </FlexLayout>
              </FlexLayout>
              <Button 
                variant="primary" 
                onClick={() => navigateTo('/budget')}
                className="access-button"
              >
                Track Budget <ArrowRight size={16} />
              </Button>
            </FlexLayout>
          </Card>
        </GridLayout>
      </div>

      {/* RECENT ACTIVITY PREVIEW */}
      <Card className="activity-preview">
        <FlexLayout direction="column" gap={3}>
          <FlexLayout direction="row" align="center" justify="space-between">
            <Text styleAs="h3">Recent Activity</Text>
            <Button variant="secondary" onClick={() => navigateTo('/dashboard')}>
              View All <ArrowRight size={14} />
            </Button>
          </FlexLayout>
          
          <FlexLayout direction="row" align="center" justify="space-between">
            <Text>
              {transactionCount > 0 
                ? `${transactionCount} transactions this month`
                : 'No recent transactions'
              }
            </Text>
            <TrendingUp size={16} className="trend-icon positive" />
          </FlexLayout>
        </FlexLayout>
      </Card>
    </div>
  )
}

// EXPORT: Make Start component available for routing
export default Start 