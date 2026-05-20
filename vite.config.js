import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deploying to https://sai-keerthan.github.io/ (user site).
// User sites serve from the domain root, so base must be '/'.
// If you later move to a custom domain, leave this as '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
