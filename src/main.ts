import {
  VueQueryPlugin,
} from "@tanstack/vue-query";
import {
  createPinia,
} from "pinia";
import {
  createApp,
} from "vue";
import app from "./app.vue";
import {
  queryClient,
} from "./shared/utils/query-client";
import "./style.css";

const pinia = createPinia();
const vueApp = createApp(app);

vueApp.use(pinia);

// Tanstack Query — global error handler toasts all mutation errors
vueApp.use(
  VueQueryPlugin,
  {
    queryClient,
  },
);

vueApp.mount("#app");
