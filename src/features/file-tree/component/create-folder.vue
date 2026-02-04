<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  FileTreeInputType,
} from "../types";
import {
  nextTick,
  onMounted,
  ref,
} from "vue";
import {
  useCreate,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import {
  dummyFileEntryNodeFolder,
} from "../variables";
import FileEntryTemplate from "./file-entry-template.vue";
import FileTreeInput from "./file-tree-input.vue";

const props = defineProps<{
  node: FileTreeNode | null;
}>();

const fileTreeStore = useFileTreeStore();

const newFolderName = ref("");
const createFolderRef = ref<FileTreeInputType | null>(null);
const create = useCreate();

onMounted(() => {
  nextTick(() => {
    createFolderRef.value?.focus();
  });
});

function resetAndBlur() {
  newFolderName.value = "";
  fileTreeStore.disableCreateMode();
}

async function handleFolderCreate() {
  if (newFolderName.value.trim()) {
    await create.mutateAsync(
      {
        type: "directory",
        name: newFolderName.value,
        path: props.node?.absolutePath,
      },
      {
        onSuccess: () => resetAndBlur(),
      },
    );
  }
}
</script>

<template>
  <FileEntryTemplate :node="dummyFileEntryNodeFolder">
    <FileTreeInput
      ref="createFolderRef"
      v-model="newFolderName"
      @blur="resetAndBlur"
      @keydown.enter="handleFolderCreate"
      @keydown.escape="resetAndBlur"
    />
  </FileEntryTemplate>
</template>
