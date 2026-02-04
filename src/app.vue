<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
} from "vue";
import ActivityBarBody from "./features/activity-bar/components/activity-bar-body.vue";
import {
  useActivitybarStore,
} from "./features/activity-bar/store";
import {
  ActivityBarList,
} from "./features/activity-bar/utils/activity-bar-list";
import {
  useFileTreeStore,
} from "./features/file-tree/store";
import HeaderBody from "./features/header/components/header-body.vue";

const activityBarStore = useActivitybarStore();
const fileTreeStore = useFileTreeStore();
const cardView = computed(() => {
  const foundList = ActivityBarList.find(list => list.title === activityBarStore.activityInView);
  return foundList?.view;
});

// drag and Drop for @file-entry.vue
function onDragEnd() {
  fileTreeStore.setDragAndDropData({
    target: null,
    isDragging: false,
  });
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
  <Toast />
  <main class="w-full h-dvh flex flex-row">
    <ActivityBarBody />
    <section class="w-full h-dvh">
      <HeaderBody />
      <section class="h-[calc(100dvh-55px)] overflow-hidden">
        <Card
          pt:root:class="max-w-[270px] rounded-none h-full"
          pt:body:class="p-0 h-full"
          pt:content:class="overflow-y-auto p-2 w-full overflow-x-hidden"
        >
          <template
            v-if="cardView"
            #content
          >
            <component :is="cardView" />
          </template>
        </Card>
      </section>
    </section>
  </main>
</template>
