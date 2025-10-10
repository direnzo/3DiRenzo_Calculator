
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': '/packages/shared/src',
      '@pricing': '/packages/pricing/src',
    }
  },
  server: { port: 5173 }
})
