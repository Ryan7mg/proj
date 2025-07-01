# Portfolio Manager - React TypeScript Learning Project

A comprehensive personal finance portfolio manager built with React, TypeScript, and Salt UI. This project serves as an educational resource demonstrating modern React development patterns, TypeScript best practices, and professional UI component usage.

## 🎯 Learning Objectives

This project demonstrates:

- **React 18+ Features**: Functional components, hooks, and modern patterns
- **TypeScript Integration**: Type safety, interfaces, and generic programming
- **Salt UI Components**: JPMorgan's design system implementation
- **State Management**: Zustand for global state with persistence
- **Routing**: React Router for single-page application navigation
- **Data Visualization**: Progress bars, status indicators, and conditional styling
- **Responsive Design**: Mobile-first approach with flexible layouts

## 🏗️ Architecture Overview

### Component Structure
```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main overview with balance and stats
│   ├── Accounts.tsx    # Account management with CRUD operations
│   ├── Transactions.tsx # Transaction filtering and display
│   └── Budget.tsx      # Budget tracking with progress visualization
├── store/              # State management
│   └── portfolioStore.ts # Zustand store with TypeScript interfaces
├── App.tsx             # Main app with routing and navigation
├── main.tsx            # Application entry point
└── App.css             # Global styles with JPMorgan branding
```

### Key Design Patterns

1. **Component Composition**: Building complex UIs from simple, reusable components
2. **Custom Hooks**: Zustand store hook for state access across components
3. **Conditional Rendering**: Dynamic content based on state and data
4. **Event Handling**: User interactions with proper TypeScript typing
5. **Data Transformation**: Array methods for filtering, sorting, and calculations

## 📚 React Concepts Demonstrated

### Functional Components
```typescript
// Modern React component pattern
const Dashboard = () => {
  // Component logic here
  return <div>JSX content</div>
}
```

### useState Hook
```typescript
// Local state management
const [balanceVisible, setBalanceVisible] = useState(true)
const [filterType, setFilterType] = useState('all')
```

### Custom Hooks
```typescript
// Zustand store hook usage
const { accounts, transactions, getTotalBalance } = usePortfolioStore()
```

### Conditional Rendering
```typescript
// Show/hide content based on state
{balanceVisible ? formatCurrency(totalBalance) : '••••••'}
{accounts.length === 0 && <EmptyState />}
```

### Array Methods
```typescript
// Filter, sort, and transform data
const recentTransactions = transactions
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5)
```

## 🔷 TypeScript Features Explained

### Interface Definitions
```typescript
// Define data structure shapes
export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'investment' | 'credit' // Union types
  balance: number
  currency: string
}
```

### Advanced Types
```typescript
// Utility types for flexible data handling
addAccount: (account: Omit<Account, 'id'>) => void      // Exclude ID
updateAccount: (id: string, updates: Partial<Account>) => void // Optional fields
```

### Generic Functions
```typescript
// Type-safe store creation
const usePortfolioStore = create<PortfolioState>()(
  devtools(persist(storeConfig))
)
```

### Type Inference
```typescript
// TypeScript automatically infers types
const totalBalance = getTotalBalance() // number
const accounts = usePortfolioStore(state => state.accounts) // Account[]
```

## 🎨 Salt UI Integration

### Component Usage
```typescript
// Salt UI components with proper props
<Card className="custom-class">
  <FlexLayout direction="row" align="center" gap={3}>
    <Text styleAs="h2">Title</Text>
    <Button variant="cta" onClick={handleClick}>
      Action
    </Button>
  </FlexLayout>
</Card>
```

### Layout System
- **FlexLayout**: Flexible box layouts with props for direction, alignment, and spacing
- **GridLayout**: CSS Grid system for responsive layouts
- **Card**: Container component with consistent styling and elevation

### Typography
- **Text**: Semantic text component with `styleAs` prop for hierarchy
- **Variants**: h1, h2, h3, h4, body, caption for consistent typography

## 🏪 State Management with Zustand

### Store Structure
```typescript
interface PortfolioState {
  // Data
  accounts: Account[]
  transactions: Transaction[]
  budgets: Budget[]
  
  // Actions
  addAccount: (account: Omit<Account, 'id'>) => void
  updateAccount: (id: string, updates: Partial<Account>) => void
  
  // Computed values
  getTotalBalance: () => number
  getCategorySpending: (category: string) => number
}
```

### Key Features
- **Persistence**: Automatic localStorage synchronization
- **DevTools**: Redux DevTools integration for debugging
- **TypeScript**: Full type safety with interfaces
- **Computed Values**: Functions that derive data from state

## 🎨 Styling Approach

### CSS Architecture
1. **CSS Variables**: Brand colors and semantic naming
2. **Component-based**: Styles organized by component
3. **BEM-like naming**: Consistent class naming convention
4. **Responsive design**: Mobile-first approach

### JPMorgan Chase Branding
```css
:root {
  --jp-primary-blue: #117DCA;    /* Main brand color */
  --jp-dark-blue: #003366;       /* Dark accent */
  --jp-success: #0A7340;         /* Success states */
  --jp-warning: #E87722;         /* Warning states */
  --jp-error: #C5282F;           /* Error states */
}
```

## 📱 Features Implemented

### Dashboard
- Total portfolio balance with privacy toggle
- Monthly income/expense statistics  
- Account overview with balances
- Recent transactions list
- Responsive layout with cards

### Accounts Management
- Account listing with type indicators
- Balance display with status colors
- Add/Edit/Delete functionality (UI ready)
- Empty states for new users

### Transaction Filtering
- Multi-criteria filtering (type, account, search)
- Real-time search functionality
- Date formatting and sorting
- Status-based styling

### Budget Tracking
- Category-based budget limits
- Progress visualization with bars
- Status indicators (excellent/good/warning/over)
- Spending calculations and remainders

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd portfolio-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📖 Learning Resources

### Recommended Reading
1. **React Documentation**: https://react.dev/
2. **TypeScript Handbook**: https://www.typescriptlang.org/docs/
3. **Salt UI Documentation**: https://salt-ds.github.io/salt-ds/
4. **Zustand Guide**: https://github.com/pmndrs/zustand

### Key Concepts to Study
- React Hooks (useState, useEffect, custom hooks)
- TypeScript interfaces and type safety
- Component composition patterns
- State management strategies
- CSS-in-JS vs traditional CSS
- Responsive design principles

## 🔧 Customization Ideas

### Extend the Project
1. **Add Authentication**: User login and data protection
2. **API Integration**: Connect to real banking APIs
3. **Data Visualization**: Charts and graphs with libraries like Chart.js
4. **Mobile App**: React Native version
5. **Testing**: Unit tests with Jest and React Testing Library
6. **Accessibility**: ARIA labels and keyboard navigation

### Technical Improvements
1. **Form Validation**: Add account and transaction forms
2. **Error Handling**: Error boundaries and user feedback
3. **Performance**: Virtual scrolling for large lists
4. **Offline Support**: Service workers and caching
5. **Internationalization**: Multi-language support

## 📝 License

This project is for educational purposes and demonstrates modern React development practices.

---

*Built with ❤️ for learning React, TypeScript, and Salt UI*
