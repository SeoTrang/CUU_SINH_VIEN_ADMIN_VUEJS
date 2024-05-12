/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import Lara from '@/presets/lara'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/base.css'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-lime/theme.css'

import Panel from "primevue/panel"
import { createApp } from 'vue'
// import './index.css'
import "./style.css"

loadFonts()


// Create vue app
const app = createApp(App)


// Use plugins
app.use(vuetify)


app.use(createPinia())
app.use(router)
app.component("Panel", Panel);
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara                            //apply preset        
});
// Mount vue app
app.mount('#app')
