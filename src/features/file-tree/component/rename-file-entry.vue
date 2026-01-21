<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  IconChevronRight,
  IconFile,
  IconFolder,
} from "@tabler/icons-vue";
import {
  rename,
} from "@vast/file-explorer";
import {
  computed,
  nextTick,
  onMounted,
  ref,
} from "vue";
import {
  useFileTreeStore,
} from "../store";
import {
  FILE_TREE_STATES,
} from "../variables";

defineProps<{
  node: FileTreeNode;
}>();

const fileTreeStore = useFileTreeStore();
const renameData = computed(() => fileTreeStore.renameData);

const newName = ref(renameData.value?.name ?? "");
const renameRef = ref();

function resetAndBlur() {
  newName.value = "";
  fileTreeStore.disableRenameMode();
}

async function handleRename() {
  if (newName.value.trim() && renameData.value) {
    await rename(
      renameData.value.absolutePath,
      newName.value,
    );
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
    :style="{ marginLeft: node.type === 'file' ? FILE_TREE_STATES.fileGap : '0' }"
    class="w-full cursor-pointer flex p-0.5 items-center gap-1"
  >
    <IconFile
      v-if="node.type === 'file'"
      :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
    />
    <template v-else>
      <IconChevronRight
        :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
      />
      <IconFolder
        :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
      />
    </template>
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
