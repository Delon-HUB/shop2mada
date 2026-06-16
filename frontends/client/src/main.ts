import './assets/Main.css'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Notify, Quasar } from 'quasar'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Quasar, {
  plugins: { Notify: Notify },
})

app.use(createPinia())
app.use(router)

app.mount('#app')
