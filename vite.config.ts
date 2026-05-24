import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const nonBlockingCssPlugin = () => ({
  name: 'non-blocking-css',
  transformIndexHtml(html: string, ctx?: { server?: unknown }) {
    if (ctx?.server) {
      return html
    }

    return html.replace(
      /<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g,
      (match, href) => {
        if (!href.includes('/assets/')) {
          return match
        }

        const preloadTag = `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">`
        const noscriptTag = `<noscript><link rel="stylesheet" href="${href}"></noscript>`
        return `${preloadTag}\n    ${noscriptTag}`
      },
    )
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nonBlockingCssPlugin()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
