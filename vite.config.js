import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    proxy: {
      '/api/llama': {
        target: 'https://api.llama.fi',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/llama/, ''),
      },
      '/api/coingecko': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/coingecko/, ''),
      },
    },
  },
})
