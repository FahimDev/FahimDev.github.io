import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import devSeoPlugin from "./scripts/dev-seo-plugin"

export default defineConfig({
  plugins: [react(), devSeoPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
