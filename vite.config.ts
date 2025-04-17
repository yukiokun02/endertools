
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'crypto': 'crypto-browserify',
      'stream': 'stream-browserify',
      'buffer': 'buffer',
    }
  },
  define: {
    // Fix for "global is not defined" error
    global: 'globalThis',
  },
  server: {
    port: 8080
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    // Optimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true
      }
    },
    // Improve build performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
          jszip: ['jszip'],
          crypto: ['crypto-browserify']
        }
      }
    }
  }
})
