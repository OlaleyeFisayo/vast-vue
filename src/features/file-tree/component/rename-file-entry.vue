<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
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
import FileEntryIcon from "./file-entry-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

defineProps<{
  node: FileTreeNode;
}>();

const fileTreeStore = useFileTreeStore();
const renameData = computed(() => fileTreeStore.renameData);

const newName = ref(renameData.value?.name ?? "");
const renameRef = ref();
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
    renameRef.value.$el.focus();
  });
});
</script>

<template>
  <div
    class="w-full cursor-pointer flex p-0.5 items-center gap-1"
  >
    <FolderToggleIcon :node="node" />
    <FileEntryIcon :node="node" />
    <InputText
      ref="renameRef"
      v-model="newName"
      pt:root:class="py-0 px-1"
      type="text"
      @blur="resetAndBlur"
      @keydown.enter="handleRename"
      @keydown.escape="resetAndBlur"
    />
  </div>
</template>
