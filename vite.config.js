import { defineConfig } from 'vite'
import { APIInfo, magicStrings } from './src/magicStrings.js'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    origin: `${magicStrings.LOCAL_URL}`,
    proxy: {
      '/api': {
        target: APIInfo.GAMES_ENDPOINT,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

// cors: {
//   origin: true,
//   methods: "GET,POST",
//   preflightContinue: true,
//   allowedHeaders: "*",
// },
