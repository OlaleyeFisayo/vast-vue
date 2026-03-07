<script setup lang="ts">
import ActivityBarBody from "@features/activity-bar/components/activity-bar-body.vue";
import {
  useActivitybarStore,
} from "@features/activity-bar/store";
import {
  ActivityBarList,
} from "@features/activity-bar/variables";
import Canvas from "@features/canvas/components/canvas.vue";
import {
  useFileTreeStore,
} from "@features/file-tree/store";
import {
  computed,
  onMounted,
  onUnmounted,
} from "vue";
import {
  Toaster,
} from "vue-sonner";

const activityBarStore = useActivitybarStore();
const fileTreeStore = useFileTreeStore();
const cardView = computed(() => {
  const foundList = ActivityBarList.find(list => list.title === activityBarStore.activityInView);
  return foundList?.view;
});

// drag and Drop for @file-entry.vue
function onDragEnd() {
  fileTreeStore.resetDragAndDropData();
}

onMounted(() => {
  window.addEventListener(
    "dragend",
    onDragEnd,
  );
});

onUnmounted(() => {
  window.removeEventListener(
    "dragend",
    onDragEnd,
  );
});
</script>

<template>
  <Toaster
    rich-colors
    theme="dark"
  />
  <main class="w-full h-dvh flex flex-row bg-primary-400">
    <ActivityBarBody />
    <section class="h-dvh w-67.5! shrink-0 overflow-hidden bg-primary-500 border-r border-primary-700">
      <template
        v-if="cardView"
      >
        <component :is="cardView" />
      </template>
    </section>
    <Canvas class="flex-1" />
  </main>
</template>
