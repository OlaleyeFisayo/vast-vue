<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  StyleValue,
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
      <!-- File/Folder Entry Mode -->
      <FileEntry
        v-else
        :node="node"
      />
      <!-- Create Folder -->
      <CreateFolder
        v-if="((fileTreeStore.createData.node?.type === 'file' && fileTreeStore.createData.node.parentPath === node.absolutePath) || (fileTreeStore.createData.node?.type === 'directory' && fileTreeStore.createData.node?.absolutePath === node.absolutePath)) && fileTreeStore.createData.type === 'directory'"
        :node="node"
        :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
      />
      <!-- Child -->
      <FileEntries
        v-if="node.type === 'directory' && node.expanded"
        :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
        :tree-nodes="node.children"
      />
      <!-- Create File -->
      <CreateFile
        v-if="((fileTreeStore.createData.node?.type === 'file' && fileTreeStore.createData.node.parentPath === node.absolutePath) || (fileTreeStore.createData.node?.type === 'directory' && fileTreeStore.createData.node?.absolutePath === node.absolutePath)) && fileTreeStore.createData.type === 'file'"
        :node="node"
        :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
      />
    </div>
  </template>
</template>
