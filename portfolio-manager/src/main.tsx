/**
 * MAIN.TSX - Application Entry Point
 * 
 * This is the main entry file for our React application. It sets up the root
 * of our component tree and provides necessary context providers.
 * 
 * REACT CONCEPTS:
 * - ReactDOM.createRoot(): Modern way to render React apps (React 18+)
 * - React.StrictMode: Development tool that helps catch bugs and deprecated features
 * - Component tree hierarchy: Providers wrap the entire app to share data/theme
 * 
 * TYPESCRIPT CONCEPTS:
 * - .tsx extension: TypeScript + JSX files
 * - Non-null assertion (!): Tells TypeScript that element won't be null
 * - Import statements with explicit file extensions
 * 
 * SALT UI CONCEPTS:
 * - SaltProvider: Context provider that gives all child components access to Salt UI theme
 * - Theme CSS import: Provides base styling for all Salt UI components
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { SaltProvider } from '@salt-ds/core' // Salt UI theme provider
import { BrowserRouter } from 'react-router-dom' // React Router for navigation
import App from './App.tsx'
import './index.css'

// Import Salt UI base theme styles - this provides default styling for all Salt components
import '@salt-ds/theme/index.css'

// Create the root element and render our application
// The ! tells TypeScript we're certain the element exists (non-null assertion)
ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode helps identify unsafe lifecycles, legacy API usage, and other issues
  <React.StrictMode>
    {/* SaltProvider gives all child components access to Salt UI theme and design tokens */}
    <SaltProvider>
      {/* BrowserRouter with basename for JPMorgan internal app deployment */}
      {/* basename prop handles deployment in nested paths like /clearing/src/apps/views/portfolio-manager/ */}
      <BrowserRouter basename="/clearing/src/apps/views/portfolio-manager">
        {/* Our main App component - the root of our component tree */}
        <App />
      </BrowserRouter>
    </SaltProvider>
  </React.StrictMode>,
)
