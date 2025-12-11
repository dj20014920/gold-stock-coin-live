import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: '/gold-stock-coin-live/',
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/naver-api': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/naver-api/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
