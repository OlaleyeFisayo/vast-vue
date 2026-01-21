<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  StyleValue,
} from "vue";
import {
  ref,
} from "vue";
import {
  useFileTreeStore,
} from "../store";
import {
  FILE_TREE_STATES,
} from "../variables";
import FileContextMenu from "./file-context-menu.vue";
import FileEntry from "./file-entry.vue";
import RenameFileEntry from "./rename-file-entry.vue";

defineProps<{
  treeNodes: FileTreeNode[] | undefined;
  style?: StyleValue;
}>();

const fileTreeStore = useFileTreeStore();

const fileContextMenuRef = ref<InstanceType<typeof FileContextMenu> | null>(null);
const selectedNode = ref<FileTreeNode | null>(null);
function toggleFileContextMenu(
  event: MouseEvent,
  node: FileTreeNode,
) {
  fileContextMenuRef.value?.show(event);
  selectedNode.value = node;
}
</script>

<template>
  <template v-if="treeNodes !== undefined">
    <div
      v-for="node in treeNodes"
      :key="node.key"
      :style="style"
    >
      <!-- Rename File Entry Mode -->
      <RenameFileEntry
        v-if="node.key === fileTreeStore.renameData?.key"
        :node="node"
      />
      <!-- File Entry Mode -->
      <FileEntry
        v-else
        :node="node"
        :toggle-file-context-menu="toggleFileContextMenu"
      />
      <!-- Child -->
      <FileEntries
        v-if="node.type === 'directory' && node.expanded"
        :tree-nodes="node.children"
        :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
        :toggle-file-context-menu="toggleFileContextMenu"
      />
    </div>
  </template>
  <FileContextMenu
    ref="fileContextMenuRef"
    :selected-node="selectedNode"
  />
</template>
