<script lang="ts" setup>
import {
  nextTick,
  ref,
  watch,
} from "vue";
import {
  useCreate,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import {
  dummyFileEntryNodeFile,
  FILE_TREE_STATES,
} from "../variables";
import FileEntryIcon from "./file-entry-icon.vue";

const fileTreeStore = useFileTreeStore();

const newFileName = ref("");
const createFileRef = ref<any>(null);
const create = useCreate();

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
  if (newFileName.value.trim()) {
    await create.mutateAsync({
      type: "file",
      name: newFileName.value,
    });
  }

  resetAndBlur();
}
</script>

<template>
  <template v-if="fileTreeStore.createFileMode">
    <div
      :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
      class="w-full cursor-pointer flex p-0.5 items-center gap-1"
    >
      <FileEntryIcon :node="dummyFileEntryNodeFile" />
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
