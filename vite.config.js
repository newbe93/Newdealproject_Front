import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@api", replacement: "/src/api" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@layouts", replacement: "/src/layouts" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@router", replacement: "/src/router" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@zustand", replacement: "/src/zustand" },
    ],
  },
  server: {
    port : 3000,
    proxy: {
      '/api/': {
        target: 'http://localhost:8080/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})