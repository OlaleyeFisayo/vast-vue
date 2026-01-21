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
  nextTick,
  ref,
  watch,
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

const newName = ref(fileTreeStore.renameData?.name ?? "");
const renameRef = ref();

watch(
  () => fileTreeStore.renameMode,
  (isRenaming) => {
    if (isRenaming) {
      nextTick(() => {
        renameRef.value?.$el.focus();
      });
    }
  },
);

function resetAndBlur() {
  newName.value = "";
  fileTreeStore.disableRenameMode();
}

async function handleRename() {
  if (fileTreeStore.renameData && newName.value.trim()) {
    await rename(
      fileTreeStore.renameData.absolutePath,
      newName.value,
    );
  }

  resetAndBlur();
}
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
