import {
  resolve,
} from "node:path";
import tailwindcss from "@tailwindcss/vite";
import {
  vastFileExplorer,
} from "@vast/file-explorer/vite";
import vue from "@vitejs/plugin-vue";
import RekaResolver from "reka-ui/resolver";
import Components from "unplugin-vue-components/vite";
import {
  defineConfig,
} from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@shared": resolve(
        __dirname,
        "src/shared",
      ),
      "@features": resolve(
        __dirname,
        "src/features",
      ),
    },
  },
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      dts: true,
      resolvers: [
        RekaResolver(),
      ],
    }),
    vastFileExplorer(),
  ],
});
