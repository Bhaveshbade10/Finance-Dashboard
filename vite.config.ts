import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// For GitHub Pages under a repo subpath, set: base: '/Your-Repo-Name/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})
