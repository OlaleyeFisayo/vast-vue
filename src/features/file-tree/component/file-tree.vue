<script lang="ts" setup>
import {
  onFileTreeUpdate,
} from "@vast/file-explorer";
import {
  onMounted,
} from "vue";
import {
  useGetFileTree,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
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
</template>
