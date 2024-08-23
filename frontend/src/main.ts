/*
 * Name: Jensen Stamp
 * Description: File that creates the app and other libraries used in the app
 * Date: 2/8/24
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify.ts";
import { router } from "./routes";
import setupApollo from "./plugins/apollo.ts";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
setupApollo(app);
app.use(vuetify);
app.use(Toast);
app.mount("#app");
