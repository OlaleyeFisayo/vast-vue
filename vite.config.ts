import {
  resolve,
} from "node:path";
import {
  fileExplorer,
} from "@brickly/file-explorer/vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import {
  defineConfig,
} from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(
        __dirname,
        "./src",
      ),
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
    fileExplorer({
      hiddenFiles: [".husky", ".git", ".vscode"],
    }),
  ],
});
