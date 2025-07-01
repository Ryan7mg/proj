import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for JPMorgan internal apps
  // Update this path to match your specific deployment location
  base: '/clearing/src/apps/views/portfolio-manager/',
  
  // Development server configuration
  server: {
    port: 5173,
    host: true, // Allow external connections for internal network access
  },
  
  // Build configuration for production deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate relative paths for easier deployment
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          saltui: ['@salt-ds/core', '@salt-ds/theme'],
          router: ['react-router-dom'],
          store: ['zustand']
        }
      }
    }
  }
})
