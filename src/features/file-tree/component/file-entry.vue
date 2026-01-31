<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  useCollapseDirectory,
  useExpandDirectory,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import FileEntryIcon from "./file-entry-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

defineProps<{
  node: FileTreeNode;
  toggleFileContextMenu: (event: MouseEvent, node: FileTreeNode) => void;
}>();

const fileTreeStore = useFileTreeStore();
const expandDirectory = useExpandDirectory();
const collapseDirectory = useCollapseDirectory();

function toggleIcon(node: FileTreeNode) {
  if (node.type === "directory") {
    if (node.expanded)
      collapseDirectory.mutate(node.absolutePath);
    else expandDirectory.mutate(node.absolutePath);
  }
};

function handleClick(node: FileTreeNode) {
  toggleIcon(node);
  fileTreeStore.setSelectedNode(node);
}
</script>

<template>
  <button
    class="w-full cursor-pointer flex p-0.5 items-center gap-1 hover:bg-gray-800 focus:bg-gray-800"
    :class="[
      // Show focus state when the file or folder is selected
      node === fileTreeStore.selectedNode && 'bg-gray-800 focus:bg-gray-800',
    ]"
    @click="handleClick(node)"
    @contextmenu.prevent="toggleFileContextMenu($event, node)"
  >
    <FolderToggleIcon :node="node" />
    <p
      class="flex items-center gap-1.5 text-nowrap text-ellipsis"
    >
      <FileEntryIcon
        :node="node"
      />
      {{ node.name }}
    </p>
  </button>
</template>
