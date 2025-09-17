import { createApp } from "vue";
import { createPinia } from "pinia";
import i18nFactory from "@/plugins/i18n.ts";
import routerFactory from "@/router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import "@/assets/styles/main.scss";

const i18n = i18nFactory();
const pinia = createPinia();
const app = createApp(App);
const router = routerFactory(i18n.global);

pinia.use(piniaPluginPersistedstate);

app.use(i18n);
app.use(pinia);
app.use(router);
app.mount("#app");
