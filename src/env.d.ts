/// <reference types="astro/client" />

declare module '*.vue?raw' {
  const src: string
  export default src
}

declare module '*.svg?component' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
