<script lang="ts" setup>
import {
  IconChevronRight,
  IconFolder,
} from "@tabler/icons-vue";
import {
  createFolder,
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

const fileTreeStore = useFileTreeStore();

const newFolderName = ref("");
const inputRef = ref<any>(null);

watch(
  () => fileTreeStore.createFolderMode,
  (isCreating) => {
    if (isCreating) {
      nextTick(() => {
        inputRef.value?.$el.focus();
      });
    }
  },
);

function resetAndBlur() {
  newFolderName.value = "";
  fileTreeStore.disableCreateFolderMode();
}

async function handleFolderCreate() {
  if (newFolderName.value.trim())
    await createFolder(newFolderName.value);

  resetAndBlur();
}
</script>

<template>
  <template v-if="fileTreeStore.createFolderMode">
    <div
      class="w-full cursor-pointer flex p-0.5 items-center gap-1"
    >
      <IconChevronRight
        :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
      />
      <IconFolder
        :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
      />
      <InputText
        ref="inputRef"
        v-model="newFolderName"
        pt:root:class="p-1 text-sm"
        type="text"
        @blur="resetAndBlur"
        @keydown.enter="handleFolderCreate"
        @keydown.escape="resetAndBlur"
      />
    </div>
  </template>
</template>
