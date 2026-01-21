<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {

  onFileTreeUpdate,
} from "@vast/file-explorer";
import {
  onMounted,
  ref,
} from "vue";
import {
  useGetFileTree,
} from "../queries";
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
import FileContextMenu from "./file-context-menu.vue";
import FileEntry from "./file-entry.vue";

const getFileTree = useGetFileTree();

// Files context Menu
const fileContextMenuRef = ref<InstanceType<typeof FileContextMenu> | null>(null);
const selectedNode = ref<FileTreeNode | null>(null);
function toggleFileContextMenu(
  event: MouseEvent,
  node: FileTreeNode,
) {
  fileContextMenuRef.value?.show(event);
  selectedNode.value = node;
}

onMounted(() => {
  onFileTreeUpdate(() => {
    getFileTree.refetch();
  });
});
</script>

<template>
  <CreateFolder />
  <FileEntry
    :tree-nodes="getFileTree.data.value"
    :toggle-file-context-menu="toggleFileContextMenu"
  />
  <CreateFile />
  <FileContextMenu
    ref="fileContextMenuRef"
    :selected-node="selectedNode"
  />
</template>
