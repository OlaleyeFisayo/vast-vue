<script lang="ts" setup>
import {
  IconFile,
} from "@tabler/icons-vue";
import {
  createFile,
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

const newFileName = ref("");
const createFileRef = ref<any>(null);

watch(
  () => fileTreeStore.createFileMode,
  (isCreating) => {
    if (isCreating) {
      nextTick(() => {
        createFileRef.value?.$el.focus();
      });
    }
  },
);

function resetAndBlur() {
  newFileName.value = "";
  fileTreeStore.disableCreateFileMode();
}

async function handleFileCreate() {
  if (newFileName.value.trim())
    await createFile(newFileName.value);

  resetAndBlur();
}
</script>

<template>
  <template v-if="fileTreeStore.createFileMode">
    <div
      :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
      class="w-full cursor-pointer flex p-0.5 items-center gap-1"
    >
      <IconFile
        :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
      />
      <InputText
        ref="createFileRef"
        v-model="newFileName"
        pt:root:class="py-0 px-1"
        type="text"
        @blur="resetAndBlur"
        @keydown.enter="handleFileCreate"
        @keydown.escape="resetAndBlur"
      />
    </div>
  </template>
</template>
