<script lang="ts" setup>
import {
  storeToRefs,
} from "pinia";
import {
  useCreateFolder,
} from "../api";
import {
  dummyFolderNode,
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
  mutateAsync: createFolder,
} = useCreateFolder();

async function handleSubmit(name: string) {
  await createFolder({
    name,
    dirPath: creating.value?.parentPath ?? undefined,
  });
  fileExplorerStore.stopCreating();
}
</script>

<template>
  <FileTreeNodeTemplate :node="dummyFolderNode">
    <FileTreeNodeInput @submit="handleSubmit" />
  </FileTreeNodeTemplate>
</template>
