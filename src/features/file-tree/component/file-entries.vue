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
  isValidMove,
} from "../composables/is-valid-move";
import {
  useFileTreeStore,
} from "../store";
import {
  FILE_TREE_STATES,
} from "../variables";
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
import FileContextMenu from "./file-context-menu.vue";
import FileEntry from "./file-entry.vue";
import RenameFileEntry from "./rename-file-entry.vue";

defineProps<{
  treeNodes: FileTreeNode[] | undefined;
  style?: StyleValue;
}>();

const fileTreeStore = useFileTreeStore();

function isNodeInDropZone(node: FileTreeNode) {
  if (!fileTreeStore.DragAndDropData.isDragging)
    return false;

  const target = fileTreeStore.DragAndDropData.target;
  const source = fileTreeStore.DragAndDropData.source;

  const validMove = isValidMove({
    target,
    source,
    node,
  });
  return validMove;
}

const fileContextMenuRef = ref<InstanceType<typeof FileContextMenu> | null>(null);
function toggleFileContextMenu(
  event: MouseEvent,
  node: FileTreeNode,
) {
  fileContextMenuRef.value?.show(event);
  fileTreeStore.setSelectedNode(node);
}
</script>

<template>
  <template v-if="treeNodes !== undefined">
    <div
      v-for="node in treeNodes"
      :key="node.key"
      :style="style"
      :class="{
        'bg-gray-800': fileTreeStore.DragAndDropData.isDragging && isNodeInDropZone(node),
      }"
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
      <!-- Create Folder -->
      <CreateFolder
        v-if="node.type === 'directory'
          && node.expanded
          && fileTreeStore.createData.node?.key === node.key && fileTreeStore.createData.type === 'directory'"
        :node="node"
        :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
      />
      <!-- Child -->
      <FileEntries
        v-if="node.type === 'directory' && node.expanded"
        :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
        :tree-nodes="node.children"
        :toggle-file-context-menu="toggleFileContextMenu"
      />
      <!-- Create File -->
      <CreateFile
        v-if="node.type === 'directory'
          && node.expanded
          && fileTreeStore.createData.node?.key === node.key && fileTreeStore.createData.type === 'file'"
        :node="node"
        :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
      />
    </div>
  </template>
  <FileContextMenu
    ref="fileContextMenuRef"
  />
</template>
