import type {
  ActivityBarItemsTitle,
} from "./types";
import {
  defineStore,
} from "pinia";
import {
  ref,
} from "vue";

export const useActivitybarStore = defineStore(
  "activityBar",
  () => {
    const activityInView = ref<ActivityBarItemsTitle>("Files");

    const changeActivityInView = (value: ActivityBarItemsTitle) => {
      activityInView.value = value;
    };

    return {
      activityInView,
      changeActivityInView,
    };
  },
);
