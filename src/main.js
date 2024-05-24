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
// import './index.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Panel from "primevue/panel"
// import 'primevue/resources/themes/aura-light-lime/theme.css'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
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
// app.component('InputText', InputText);
// app.component('Button', Button);
app.use(ToastService);
app.use(ConfirmationService);
// Mount vue app
app.mount('#app')
