import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Use VITE_BASE_PATH if provided (e.g., set to '/' in Netlify environment variables), else default based on command
  base: process.env.VITE_BASE_PATH || (command === 'build' ? '/bnk-digital/' : '/'),
  plugins: [react()],
  server: {
    port: 5174,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
