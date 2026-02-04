<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  FileTreeInputType,
} from "../types";
import {
  computed,
  nextTick,
  onMounted,
  ref,
} from "vue";
import {
  useRename,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import FileEntryTemplate from "./file-entry-template.vue";
import FileTreeInput from "./file-tree-input.vue";

defineProps<{
  node: FileTreeNode;
}>();

const fileTreeStore = useFileTreeStore();
const renameData = computed(() => fileTreeStore.renameData);

const newName = ref(renameData.value?.name ?? "");
const renameRef = ref<FileTreeInputType | null>();
const rename = useRename();

function resetAndBlur() {
  newName.value = "";
  fileTreeStore.disableRenameMode();
}

async function handleRename() {
  if (newName.value.trim() && renameData.value) {
    await rename.mutateAsync({
      path: renameData.value.absolutePath,
      name: newName.value,
    });
  }

  resetAndBlur();
}

onMounted(() => {
  nextTick(() => {
    renameRef.value?.focus();
  });
});
</script>

<template>
  <FileEntryTemplate :node="node">
    <FileTreeInput
      ref="renameRef"
      v-model="newName"
      @blur="resetAndBlur"
      @keydown.enter="handleRename"
      @keydown.escape="resetAndBlur"
    />
  </FileEntryTemplate>
</template>
