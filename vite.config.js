import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  base: "/runam/",
  define: {
    'process.env': {}, // Useful if some libraries depend on `process.env`
  },
  server: {
    https: true, // or you can pass an options object for custom certificates
    proxy: {
      '/api': {
        target: 'https://runit-78od.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
// npm run dev -- --https