import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Use a function form so we can switch `base` based on the Vite command:
//   - `vite build` -> base = '/emotion-mapper-web/'  (for GitHub Pages at https://sunnyskyess420.github.io/emotion-mapper-web/)
//   - `vite dev`   -> base = '/'                      (for local dev and preview environments)
export default defineConfig(({ command }) => ({
  plugins: [vue(), tailwindcss()],
  base: command === 'build' ? '/emotion-mapper-web/' : '/',
  server: {
    host: '0.0.0.0',
    port: 3000
  }
}))
