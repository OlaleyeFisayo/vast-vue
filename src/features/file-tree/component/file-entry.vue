<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  StyleValue,
} from "vue";
import {
  useCollapseDirectory,
  useExportDirectory,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import {
  FILE_TREE_STATES,
} from "../variables";
import FileIcon from "./file-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";
import RenameFileEntry from "./rename-file-entry.vue";

defineProps<{
  treeNodes: FileTreeNode[] | undefined;
  toggleFileContextMenu: (event: MouseEvent, node: FileTreeNode) => void;
  style?: StyleValue;
}>();

const expandDirectory = useExportDirectory();
const collapseDirectory = useCollapseDirectory();

const fileTreeStore = useFileTreeStore();

function toggleIcon(node: FileTreeNode) {
  if (node.type === "directory") {
    if (node.expanded)
      collapseDirectory.mutate(node.absolutePath);
    else expandDirectory.mutate(node.absolutePath);
  }
};
</script>

<template>
  <template v-if="treeNodes !== undefined">
    <div
      v-for="node in treeNodes"
      :key="node.key"
      :style="style"
    >
      <button
        v-if="!fileTreeStore.renameMode || node.key !== fileTreeStore.renameData?.key"
        class="w-full cursor-pointer flex p-0.5 items-center gap-1 hover:bg-gray-800 focus:bg-gray-800"
        @click="toggleIcon(node)"
        @contextmenu.prevent="toggleFileContextMenu($event, node)"
      >
        <FolderToggleIcon :node="node" />
        <p
          :style="{ marginLeft: node.type === 'file' ? FILE_TREE_STATES.fileGap : '0' }"
          class="flex items-center gap-1.5 text-nowrap text-ellipsis"
        >
          <FileIcon :node="node" />
          {{ node.name }}
        </p>
      </button>
      <RenameFileEntry
        v-else
        :node="node"
      />
      <!-- Child -->
      <FileEntry
        v-if="node.type === 'directory' && node.expanded"
        :tree-nodes="node.children"
        :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
        :toggle-file-context-menu="toggleFileContextMenu"
      />
    </div>
  </template>
</template>
