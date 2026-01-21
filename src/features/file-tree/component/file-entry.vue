<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  useCollapseDirectory,
  useExportDirectory,
} from "../queries";
import {
  FILE_TREE_STATES,
} from "../variables";
import FileEntryIcon from "./file-entry-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

defineProps<{
  node: FileTreeNode;
  toggleFileContextMenu: (event: MouseEvent, node: FileTreeNode) => void;
}>();

const expandDirectory = useExportDirectory();
const collapseDirectory = useCollapseDirectory();

function toggleIcon(node: FileTreeNode) {
  if (node.type === "directory") {
    if (node.expanded)
      collapseDirectory.mutate(node.absolutePath);
    else expandDirectory.mutate(node.absolutePath);
  }
};
</script>

<template>
  <button
    class="w-full cursor-pointer flex p-0.5 items-center gap-1 hover:bg-gray-800 focus:bg-gray-800"
    @click="toggleIcon(node)"
    @contextmenu.prevent="toggleFileContextMenu($event, node)"
  >
    <FolderToggleIcon :node="node" />
    <p
      :style="{ marginLeft: node.type === 'file' ? FILE_TREE_STATES.fileGap : '0' }"
      class="flex items-center gap-1.5 text-nowrap text-ellipsis"
    >
      <FileEntryIcon :node="node" />
      {{ node.name }}
    </p>
  </button>
</template>
