import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages: base: '/仓库名/'（如 '/imageprogram/'）
  // Vercel/Netlify: base: '/'
  base: '/imageprogram/',
})
