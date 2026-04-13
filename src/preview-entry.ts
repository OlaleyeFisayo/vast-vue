import {
  VueQueryPlugin,
} from "@tanstack/vue-query";
import {
  createPinia,
} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import {
  createApp,
} from "vue";
import {
  useSearchParams,
} from "./shared/hooks/use-search-params";
import {
  queryClient,
} from "./shared/lib/query-client";
import "./shared/main.css";

const {
  vueFile,
} = useSearchParams();

if (vueFile) {
  import(/* @vite-ignore */ `/${vueFile}`).then((module) => {
    const pinia = createPinia().use(piniaPluginPersistedstate);
    const app = createApp(module.default);

    app.use(pinia);
    app.use(
      VueQueryPlugin,
      {
        queryClient,
      },
    );
    app.mount("#app");
  });
}
