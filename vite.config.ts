import {
  PrimeVueResolver,
} from "@primevue/auto-import-resolver";
import tailwindcss from "@tailwindcss/vite";
import {
  vastFileExplorer,
} from "@vast/file-explorer/vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import {
  defineConfig,
} from "vite";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    vastFileExplorer(),
  ],
});
