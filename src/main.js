import './assets/styles/main.global.css'
import './assets/styles/index.css'
import store from './store'
import { createApp } from 'vue'

import vuetify from './plugins/vuetify'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vue3Toastify, {
  autoClose: 2000
})
app.use(vuetify)
app.mount('#app')
