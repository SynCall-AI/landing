import { defineConfig, loadEnv } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import { localLeadsPlugin } from './scripts/vite-leads.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  for (const key of ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID', 'LEADS_API_URL', 'LEADS_API_TOKEN']) {
    if (process.env[key] === undefined && env[key]) process.env[key] = env[key];
  }
  return {
    plugins: [react(), localLeadsPlugin()],
    server: {
      allowedHosts: ["dc7a4a12e146.ngrok-free.app"],
      proxy: {
        // Catalog, session lifecycle, and PCM16 WebSocket use one API target.
        '/api/v2/public/landing-demo': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8000',
          changeOrigin: true,
          ws: true,
          // API session and WebSocket endpoints also check Origin (not Host).
          // Explicit local-only setting; production still sends its real origin.
          ...(env.LANDING_DEMO_DEV_ORIGIN ? { headers: { Origin: env.LANDING_DEMO_DEV_ORIGIN } } : {}),
        },
      },
    }
  };
})
