import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from "./plugins/vuetify.ts";
import {router} from "./routes";
import setupApollo from "./plugins/apollo.ts"
import {createPinia} from "pinia";

const app = createApp(App)
app.use(createPinia())
app.use(router)
setupApollo(app)
app.use(vuetify)
app.mount('#app')

