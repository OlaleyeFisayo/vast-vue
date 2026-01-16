import PrimeVue from "primevue/config";
import {
  createApp,
} from "vue";
import app from "./app.vue";
import {
  PrimeVueConfig,
} from "./shared/utils/prime-vue-config";
import "./style.css";

const App = createApp(app);

// Prime Vue Configs
App.use(
  PrimeVue,
  PrimeVueConfig,
);

App.mount("#app");
