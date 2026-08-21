import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// PWA 設定: manifest と Service Worker を自動生成し、スマホの
// ホーム画面に追加すると全画面(standalone)で起動できるようにする。
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Nagasaki Trip / 長崎観光',
        short_name: 'Nagasaki',
        description: 'A handmade travel companion for exploring Nagasaki.',
        lang: 'en',
        theme_color: '#1f3a5f',
        background_color: '#f4ecd8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
