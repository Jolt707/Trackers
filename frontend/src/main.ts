/*
 * Name: Jensen Stamp
 * Description:
 * Date: 2/8/23
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
