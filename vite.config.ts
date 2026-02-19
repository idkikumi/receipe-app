import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        option1: resolve(__dirname, 'index-option1.html'),
        option2: resolve(__dirname, 'index-option2.html'),
        ai: resolve(__dirname, 'ai.html'),
        demo: resolve(__dirname, 'demo.html'),
      },
    },
  }
})
