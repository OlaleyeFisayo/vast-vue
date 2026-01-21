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
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
import FileEntries from "./file-entries.vue";

const {
  data: TreeNodes,
  refetch: getFileTree,
} = useGetFileTree();

onMounted(() => {
  onFileTreeUpdate(() => {
    getFileTree();
  });
});
</script>

<template>
  <CreateFolder />
  <FileEntries
    :tree-nodes="TreeNodes"
  />
  <CreateFile />
</template>
