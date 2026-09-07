import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

app.use(router)
app.use(store)

// If a token was saved from a previous visit, refresh the user's info from
// the backend before mounting — keeps "logged in" state accurate rather
// than trusting a stale local copy.
store.dispatch('auth/fetchProfile').finally(() => {
  app.mount('#app')
})