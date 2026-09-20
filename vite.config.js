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
      allowedHosts: ["dc7a4a12e146.ngrok-free.app"]
    }
  };
})
