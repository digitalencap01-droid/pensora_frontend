import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendTarget = env.BACKEND_PROXY_TARGET || 'http://127.0.0.1:8004';

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      // Required for the HTTPS ngrok development hostname.
      allowedHosts: ['.ngrok-free.dev'],
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
  };
});