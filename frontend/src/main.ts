import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Charts plugin
// @ts-ignore - no declaration yet
import VueApexCharts from 'vue3-apexcharts'

// Import locale messages
import en from './locales/en.json'
import th from './locales/th.json'

// Determine initial locale: saved in localStorage or default to Thai ('th')
const savedLocale = localStorage.getItem('language') as 'en' | 'th' | null

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: savedLocale ?? 'th',
  fallbackLocale: 'en',
  messages: {
    en,
    th
  }
})

// Create pinia store
const pinia = createPinia()

// Create and mount the app
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueApexCharts)

app.mount('#app')