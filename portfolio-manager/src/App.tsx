/**
 * APP.TSX - Main Application Component
 * 
 * This is the root component that sets up routing, navigation, and layout.
 * Demonstrates React Router, Salt UI components, and React hooks.
 * 
 * REACT CONCEPTS:
 * - Functional components: Modern React component pattern
 * - useState hook: Manages component-level state
 * - Event handlers: Functions that respond to user interactions
 * - Conditional rendering: Show/hide elements based on state
 * - Component composition: Building UIs by combining components
 * 
 * REACT ROUTER CONCEPTS:
 * - Routes: Container for all route definitions
 * - Route: Maps URL paths to components
 * - Client-side routing: Navigation without page reloads
 * 
 * SALT UI COMPONENTS:
 * - Card: Container component with consistent styling
 * - FlexLayout: Flexible box layout component
 * - Text: Typography component with semantic styling
 * - Button: Interactive button with variants
 * - Drawer: Sliding sidebar navigation
 * - NavigationItem: Styled navigation link
 * 
 * TYPESCRIPT CONCEPTS:
 * - Array of objects: navigationItems with specific structure
 * - Function types: Event handlers with proper typing
 * - Component props: Type-safe property passing
 */

import { Routes, Route } from 'react-router-dom' // React Router for navigation
import { Card, NavigationItem, Drawer, FlexLayout, Text, Button } from '@salt-ds/core' // Salt UI components
import { useState } from 'react' // React hook for state management
import { Home, CreditCard, TrendingUp, Settings, PlusCircle, Menu } from 'lucide-react' // Icon components
import Start from './components/Start'
import Dashboard from './components/Dashboard'
import Accounts from './components/Accounts'
import Transactions from './components/Transactions'
import Budget from './components/Budget'
import './App.css' // Custom styles that extend Salt UI

/**
 * NAVIGATION CONFIGURATION
 * Array of objects defining our application's navigation structure
 * Each item represents a page in our app with routing and display information
 * Updated for JPMorgan internal app with Start page as landing
 */
const navigationItems = [
  { id: 'start', label: 'Home', icon: Home, path: '/' },
  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, path: '/dashboard' },
  { id: 'accounts', label: 'Accounts', icon: CreditCard, path: '/accounts' },
  { id: 'transactions', label: 'Transactions', icon: CreditCard, path: '/transactions' },
  { id: 'budget', label: 'Budget', icon: PlusCircle, path: '/budget' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
]

/**
 * APP COMPONENT - Main application function
 * 
 * REACT HOOKS USED:
 * - useState: Manages local component state for drawer and navigation
 * 
 * STATE MANAGEMENT:
 * - drawerOpen: Boolean controlling sidebar visibility
 * - activeNav: String tracking which navigation item is selected
 */
function App() {
  // USESTATE HOOK: Manages component state
  // useState returns [currentValue, setterFunction]
  // TypeScript infers the type from the initial value
  const [drawerOpen, setDrawerOpen] = useState(false) // Controls drawer open/closed state
  const [activeNav, setActiveNav] = useState('start') // Tracks active navigation item - default to start page

  /**
   * EVENT HANDLER FUNCTION
   * Handles navigation item clicks
   * 
   * TYPESCRIPT: Parameter type annotation ensures type safety
   * SIDE EFFECTS: Updates state and closes drawer
   */
  const handleNavigation = (itemId: string) => {
    setActiveNav(itemId) // Update active navigation state
    setDrawerOpen(false) // Close drawer after navigation
  }

  // JSX RETURN - The component's UI structure
  return (
    <div className="app">
      {/* HEADER SECTION */}
      {/* Salt UI Card: Provides consistent container styling */}
      <Card className="app-header">
        {/* Salt UI FlexLayout: Flexible box layout with props for alignment */}
        <FlexLayout direction="row" align="center" justify="space-between">
          {/* LEFT SIDE: Menu button and title */}
          <FlexLayout direction="row" align="center" gap={3}>
            {/* Salt UI Button: Interactive element with variants */}
            <Button
              variant="secondary" // Salt UI button variant for styling
              onClick={() => setDrawerOpen(true)} // Event handler using arrow function
              className="menu-button" // Custom CSS class for additional styling
            >
              {/* Lucide React Icon: Menu hamburger icon */}
              <Menu size={20} />
            </Button>
            {/* Salt UI Text: Typography component with semantic styling */}
            <Text styleAs="h1" className="app-title">
              Portfolio Manager
            </Text>
          </FlexLayout>
          {/* RIGHT SIDE: User greeting */}
          <FlexLayout direction="row" align="center" gap={2}>
            <Text className="user-greeting">Welcome back, Ryan</Text>
          </FlexLayout>
        </FlexLayout>
      </Card>

      {/* NAVIGATION DRAWER SECTION */}
      {/* Salt UI Drawer: Sliding sidebar component */}
      <Drawer
        open={drawerOpen} // Controlled component: state determines visibility
        onOpenChange={setDrawerOpen} // Callback for external close events (overlay click, escape)
        className="navigation-drawer"
      >
        <div className="drawer-content">
          <Text styleAs="h3" className="drawer-title">Navigation</Text>
          <div className="nav-items">
            {/* ARRAY MAPPING: Transform navigationItems array into JSX elements */}
            {navigationItems.map((item) => {
              // COMPONENT ALIASING: Store icon component in variable for JSX use
              const IconComponent = item.icon
              return (
                // Salt UI NavigationItem: Styled navigation link component
                <NavigationItem
                  key={item.id} // React key: Required for list items, helps with re-rendering
                  href={item.path} // URL path for routing
                  active={activeNav === item.id} // Conditional prop: Highlights active item
                  onClick={() => handleNavigation(item.id)} // Event handler: Inline arrow function
                  className="nav-item"
                >
                  {/* Layout for icon and text */}
                  <FlexLayout direction="row" align="center" gap={2}>
                    {/* DYNAMIC COMPONENT: IconComponent is determined at runtime */}
                    <IconComponent size={20} />
                    <Text>{item.label}</Text>
                  </FlexLayout>
                </NavigationItem>
              )
            })}
          </div>
        </div>
      </Drawer>

      {/* MAIN CONTENT SECTION */}
      <main className="app-content">
        {/* REACT ROUTER: Routes define which component renders for each URL */}
        <Routes>
          {/* Route components map URL paths to React components */}
          <Route path="/" element={<Start />} /> {/* Landing page route for JPMorgan internal app */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Main dashboard */}
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/settings" element={<div>Settings coming soon...</div>} />
          {/* element prop: React element to render when path matches */}
        </Routes>
      </main>
    </div>
  )
}

// EXPORT: Make App component available for import in other files
// Default export: Can be imported with any name (import MyApp from './App')
export default App
