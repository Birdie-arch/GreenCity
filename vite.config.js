import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base path so the build works regardless of repository sub-path on GitHub Pages
  base: './',
});
