<script lang="ts" setup>
import type {
  FileContextMenuRefType,
} from "../types";
import {
  onFileTreeUpdate,
} from "@vast/file-explorer";
import {
  onMounted,
  ref,
  watch,
} from "vue";
import {
  useGetFileTree,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
import FileContextMenu from "./file-context-menu.vue";
import FileEntries from "./file-entries.vue";

const {
  data: TreeNodes,
  refetch: getFileTree,
} = useGetFileTree();

const fileTreeStore = useFileTreeStore();

onMounted(() => {
  onFileTreeUpdate(() => {
    getFileTree();
  });
});

const fileContextMenu = ref<FileContextMenuRefType | null>(null);

watch(
  fileContextMenu,
  (value) => {
    fileTreeStore.setFileContentMenuRef(value);
  },
);
</script>

<template>
  <CreateFolder
    v-if="fileTreeStore.createData.node === null && fileTreeStore.createData.type === 'directory'"
    :node="null"
  />
  <FileEntries :tree-nodes="TreeNodes" />
  <CreateFile
    v-if="fileTreeStore.createData.node === null && fileTreeStore.createData.type === 'file'"
    :node="null"
  />
  <FileContextMenu
    ref="fileContextMenu"
  />
</template>
