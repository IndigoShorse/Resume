// @ts-check
import react from '@astrojs/react'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'

const base = process.env.PAGES_BASE ?? '/'

export default defineConfig({
  // GitHub Pages: project site -> https://indigoshorse.github.io/Resume/
  site: 'https://indigoshorse.github.io',
  base,
  integrations: [vue(), react()],
  redirects: {
    '/ui': `${base.replace(/\/+$/, '')}/ui/med`,
  },
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
