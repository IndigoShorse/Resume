// @ts-check
import react from '@astrojs/react'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'
import vuetify from 'vite-plugin-vuetify'

const base = process.env.PAGES_BASE ?? '/'
const basePrefix = base.replace(/\/+$/, '')
const legacyUiSlugs = [
  'button', 'input', 'input-image', 'form', 'stepper-form',
  'carousel', 'modal', 'card', 'container', 'layout-container',
  'divider', 'alert', 'breadcrumbs', 'back', 'icon',
]

const vuetifyIntegration = {
  name: 'vuetify',
  hooks: {
    'astro:config:setup': ({ updateConfig }) => {
      updateConfig({ vite: { plugins: vuetify({ autoImport: true }) } })
    },
  },
}

export default defineConfig({
  // GitHub Pages: project site -> https://indigoshorse.github.io/Resume/
  site: 'https://indigoshorse.github.io',
  base,
  integrations: [vue({ appEntrypoint: './src/plugins/vuetify.ts' }), react(), vuetifyIntegration],
  redirects: {
    '/ui': `${basePrefix}/library`,
    '/ui/med': `${basePrefix}/library/dtdp`,
    ...Object.fromEntries(legacyUiSlugs.map((slug) => [
      `/ui/med/${slug}`,
      `${basePrefix}/library/dtdp/${slug}`,
    ])),
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
