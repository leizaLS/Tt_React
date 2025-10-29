import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

//Proxy steam
export default defineConfig({
  plugins: [react()],
  base: '/', // Raiz proyecto
  server: {
    proxy: {
      '/steam-api': {
        target: 'https://store.steampowered.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/steam-api/, ''),
      },
    },
  },
})