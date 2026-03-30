import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Khi dev local, /api/* sẽ được handle bởi vercel dev (cổng 3000)
      // Nếu không dùng vercel dev, bạn cần chạy: npx vercel dev
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
