import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensure the server binds to 0.0.0.0
    allowedHosts: ['pharmacar.onrender.com'], // Add your host here
  },
});
