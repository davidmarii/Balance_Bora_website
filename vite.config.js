import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: If deploying to GitHub Pages with a repo name,
// change base to '/YourRepoName/' (with trailing slash)
export default defineConfig({
  plugins: [react()],
  base: './',
})
