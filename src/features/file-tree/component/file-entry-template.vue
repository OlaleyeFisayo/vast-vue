<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  computed,
  ref,
} from "vue";
import {
  useFileTreeStore,
} from "../store";
import FileEntryIcon from "./file-entry-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

defineProps<{
  node: FileTreeNode;
}>();

const rootEl = ref<HTMLDivElement | null>(null);

const fileTreeStore = useFileTreeStore();

const highlightConditions = computed(() => {
  return !fileTreeStore.DragAndDropData.isDragging && !fileTreeStore.renameData;
});

defineExpose({
  $el: rootEl,
});
</script>

<template>
  <div
    ref="rootEl"
    v-bind="$attrs"
    class="cursor-pointer flex py-0.5 px-1 items-center gap-1 text-text-primary"
    :class="[
      // Show focus state when the file or folder is selected
      node.key === fileTreeStore.selectedNode?.key && highlightConditions && 'bg-vue-base ring-vue-accent ring-1',
      highlightConditions && 'hover:bg-vue-dark',
    ]"
  >
    <FolderToggleIcon :node="node" />
    <FileEntryIcon :node="node" />
    <slot />
  </div>
</template>
