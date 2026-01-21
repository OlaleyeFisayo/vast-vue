import {
  VueQueryPlugin,
} from "@tanstack/vue-query";
import {
  createPinia,
} from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ToolTip from "primevue/tooltip";
import {
  createApp,
} from "vue";
import app from "./app.vue";
import {
  PrimeVueConfig,
} from "./shared/utils/prime-vue-config";
import "./style.css";

const pinia = createPinia();
const vueApp = createApp(app);

vueApp.use(pinia);

// Tanstack stack query
vueApp.use(VueQueryPlugin);

// Prime Vue Configs
vueApp.use(
  PrimeVue,
  PrimeVueConfig,
);
vueApp.directive(
  "tooltip",
  ToolTip,
);
vueApp.use(ToastService);

vueApp.mount("#app");
