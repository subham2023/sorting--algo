import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: [
      '3000-i712rv6svz398trs3to0m-94ac246e.manusvm.computer'
    ]
  }
}) 