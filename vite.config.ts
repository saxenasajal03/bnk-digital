Import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/bnk-digital/' : '/',
  plugins: [react()],
  server: {
    port: 5174,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
}));
