import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/verapdf-js-viewer',
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker?url': 'pdfjs-dist/build/pdf.worker.mjs'
    }
  },
  plugins: [react()],
})