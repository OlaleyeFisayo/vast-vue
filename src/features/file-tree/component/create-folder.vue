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
  dummyFileEntryNodeFolder,
} from "../variables";
import FileEntryIcon from "./file-entry-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

const fileTreeStore = useFileTreeStore();

const newFolderName = ref("");
const createFolderRef = ref<any>(null);
const create = useCreate();

watch(
  () => fileTreeStore.createFolderMode,
  (isCreating) => {
    if (isCreating) {
      nextTick(() => {
        createFolderRef.value?.$el.focus();
      });
    }
  },
);

function resetAndBlur() {
  newFolderName.value = "";
  fileTreeStore.disableCreateFolderMode();
}

async function handleFolderCreate() {
  if (newFolderName.value.trim()) {
    await create.mutateAsync({
      type: "directory",
      name: newFolderName.value,
    });
  }

  resetAndBlur();
}
</script>

<template>
  <template v-if="fileTreeStore.createFolderMode">
    <div
      class="w-full cursor-pointer flex p-0.5 items-center gap-1"
    >
      <FolderToggleIcon :node="dummyFileEntryNodeFolder" />
      <FileEntryIcon :node="dummyFileEntryNodeFolder" />
      <InputText
        ref="createFolderRef"
        v-model="newFolderName"
        pt:root:class="py-0 px-1"
        type="text"
        @blur="resetAndBlur"
        @keydown.enter="handleFolderCreate"
        @keydown.escape="resetAndBlur"
      />
    </div>
  </template>
</template>
