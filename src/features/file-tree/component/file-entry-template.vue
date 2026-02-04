<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  ref,
} from "vue";
import FileEntryIcon from "./file-entry-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

defineProps<{
  node: FileTreeNode;
}>();

const rootEl = ref<HTMLDivElement | null>(null);

defineExpose({
  $el: rootEl,
});
</script>

<template>
  <div
    ref="rootEl"
    v-bind="$attrs"
    class="w-full cursor-pointer flex p-0.5 items-center gap-1"
  >
    <FolderToggleIcon :node="node" />
    <FileEntryIcon :node="node" />
    <slot />
  </div>
</template>
