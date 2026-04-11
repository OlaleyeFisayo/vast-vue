<script lang="ts" setup>
import {
  storeToRefs,
} from "pinia";
import {
  useCreateFile,
} from "../api";
import {
  dummyFileNode,
} from "../constant";
import {
  useFileExplorerStore,
} from "../store";
import FileTreeNodeInput from "./file-tree-node-input.vue";
import FileTreeNodeTemplate from "./file-tree-node-template.vue";

const fileExplorerStore = useFileExplorerStore();
const {
  creating,
} = storeToRefs(fileExplorerStore);
const {
  mutateAsync: createFile,
} = useCreateFile();

async function handleSubmit(name: string) {
  await createFile({
    name,
    dirPath: creating.value?.parentPath ?? undefined,
  });
  fileExplorerStore.stopCreating();
}
</script>

<template>
  <FileTreeNodeTemplate :node="dummyFileNode">
    <FileTreeNodeInput @submit="handleSubmit" />
  </FileTreeNodeTemplate>
</template>
