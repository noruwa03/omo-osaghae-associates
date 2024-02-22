import { createApp } from "vue";
import { router } from "./routes/router";
import { createHead } from "@unhead/vue";
import { createPinia } from "pinia";
import "./global.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
const head = createHead();
app.use(router);
app.use(pinia);
app.use(head);
app.mount("#app");
