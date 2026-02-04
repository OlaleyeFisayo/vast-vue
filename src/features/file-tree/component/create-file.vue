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
  dummyFileEntryNodeFile,
} from "../variables";
import FileEntryTemplate from "./file-entry-template.vue";
import FileTreeInput from "./file-tree-input.vue";

const props = defineProps<{
  node: FileTreeNode | null;
}>();

const fileTreeStore = useFileTreeStore();

const newFileName = ref("");
const createFileRef = ref<FileTreeInputType | null>(null);
const create = useCreate();

onMounted(() => {
  nextTick(() => {
    createFileRef.value?.focus();
  });
});

function resetAndBlur() {
  newFileName.value = "";
  fileTreeStore.disableCreateMode();
}

async function handleFileCreate() {
  if (newFileName.value.trim()) {
    await create.mutateAsync(
      {
        type: "file",
        name: newFileName.value,
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
  <FileEntryTemplate :node="dummyFileEntryNodeFile">
    <FileTreeInput
      ref="createFileRef"
      v-model="newFileName"
      @blur="resetAndBlur"
      @keydown.enter="handleFileCreate"
      @keydown.escape="resetAndBlur"
    />
  </FileEntryTemplate>
</template>
