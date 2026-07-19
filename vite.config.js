import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Use a function form so we can switch `base` based on the Vite command:
//   - `vite build` -> base = '/emotion-mapper-web/'  (for GitHub Pages at https://sunnyskyess420.github.io/emotion-mapper-web/)
//   - `vite dev`   -> base = '/'                      (for local dev and preview environments)
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      // Disable PWA in dev mode to avoid the dev server caching issues
      disable: false,
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'icons/favicon-32x32.png', 'icons/favicon-16x16.png'],
      manifest: {
        name: 'Emotion Mapper',
        short_name: 'Emotion Mapper',
        description: 'Track emotions, body sensations, triggers, and coping tools. Privacy-first — all data stays on your device.',
        theme_color: '#1f2831',
        background_color: '#1f2831',
        display: 'standalone',
        orientation: 'portrait',
        scope: './',
        start_url: './',
        lang: 'en',
        categories: ['health', 'lifestyle', 'productivity'],
        icons: [
          {
            src: 'icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        // Pre-cache the app shell and offline assets
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        // Bump cache limit so the 2MB site_bg.png gets cached
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            // Cache the background image with a cache-first strategy
            urlPattern: ({ url }) => url.pathname.includes('site_bg.png'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'emotion-mapper-images',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  base: command === 'build' ? '/emotion-mapper-web/' : '/',
  server: {
    host: '0.0.0.0',
    port: 3000
  }
}))

