import './assets/styles/main.global.css'
import './assets/styles/index.css'
import { createNotivue } from 'notivue'
import store from './store'
import { createApp } from 'vue'

import vuetify from './plugins/vuetify'

import App from './App.vue'
import router from './router'

const notivue = createNotivue({
  position: 'top-right',
  limit: 3,
  enqueue: true,
  notifications: {
    global: {
      duration: 10000
    }
  }
})
const app = createApp(App)

app.use(router)
app.use(store)
app.use(notivue)
app.use(vuetify)
app.mount('#app')
