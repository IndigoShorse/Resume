// @ts-check
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import vue from '@astrojs/vue'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  integrations: [vue(), react()],
  vite: {
    plugins: [tailwindcss(), svgLoader()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
