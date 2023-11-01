import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
const app = createApp(App)

app.use(createPinia())
app.use(Notifications)
app.mount('#app')
