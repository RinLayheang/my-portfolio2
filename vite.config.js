import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // three.js lives in its own lazily loaded chunk (hero3d), so its size doesn't affect first load
  build: { chunkSizeWarningLimit: 600 },
})
