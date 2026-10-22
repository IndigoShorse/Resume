import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import type { App } from 'vue'

const vuetify = createVuetify({ ssr: true })

export default (app: App) => {
  app.use(vuetify)
}
