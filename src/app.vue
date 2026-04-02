<script setup lang="ts">
// import ActivityBarBody from "@features/activity-bar/components/activity-bar-body.vue";
// import {
//   useActivitybarStore,
// } from "@features/activity-bar/store";
// import {
//   ActivityBarList,
// } from "@features/activity-bar/variables";
// import Canvas from "@features/canvas/components/canvas.vue";
import {
  useFileTreeStore,
} from "@features/file-tree/store";
// import VueContentContainer from "@features/vue-content-tree/components/vue-content-container.vue";
// import AppSplitterGroup from "@shared/components/app-splitter/app-splitter-group.vue";
// import AppSplitterPanel from "@shared/components/app-splitter/app-splitter-panel.vue";
// import AppSplitterResizeHandle from "@shared/components/app-splitter/app-splitter-resize-handle.vue";
import {
  // computed,
  onMounted,
  onUnmounted,
} from "vue";
import {
  Toaster,
} from "vue-sonner";

// const activityBarStore = useActivitybarStore();
const fileTreeStore = useFileTreeStore();
// const cardView = computed(() => {
//   const foundList = ActivityBarList.find(list => list.title === activityBarStore.activityInView);
//   return foundList?.view;
// });

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
  <!-- <main class="w-full h-dvh flex flex-row bg-primary-400">
    <ActivityBarBody />
    <AppSplitterGroup
      id="splitter-main-1"
      auto-save-id="splitter-main-1"
      direction="horizontal"
    >
      <AppSplitterPanel
        id="splitter-main-1-panel-1"
        :min-size="0"
        :max-size="35"
        :default-size="20"
        :collapsible="true"
        as-child
      >
        <template
          v-if="cardView"
        >
          <component :is="cardView" />
        </template>
      </AppSplitterPanel>
      <AppSplitterResizeHandle id="splitter-main-1-resize-handle-1" />
      <AppSplitterPanel
        id="splitter-main-1-panel-2"
        as-child
        :min-size="65"
      >
        <div class="w-full flex">
          <VueContentContainer />
          <Canvas class="flex-1" />
        </div>
      </AppSplitterPanel>
    </AppSplitterGroup>
    <section class="h-dvh w-67.5! shrink-0 overflow-hidden bg-primary-500 border-r border-primary-700">
      <template
        v-if="cardView"
      >
        <component :is="cardView" />
      </template>
    </section>
    <VueContentContainer />
    <Canvas class="flex-1" />
  </main> -->
  <main class="w-full">
    testing
  </main>
</template>
