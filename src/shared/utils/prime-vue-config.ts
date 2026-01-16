import type {
  PrimeVueConfiguration,
} from "primevue";
import Aura from "@primeuix/themes/aura";

export const PrimeVueConfig: PrimeVueConfiguration = {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: "primevue",
        order: "base,theme,primevue",
      },
    },
  },
};
