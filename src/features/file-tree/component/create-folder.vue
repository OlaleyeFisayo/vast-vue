<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
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
import FileEntryIcon from "./file-entry-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

const props = defineProps<{
  node: FileTreeNode | null;
}>();

const fileTreeStore = useFileTreeStore();

const newFolderName = ref("");
const createFolderRef = ref<any>(null);
const create = useCreate();

onMounted(() => {
  nextTick(() => {
    createFolderRef.value?.$el.focus();
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
  <div class="w-full cursor-pointer flex p-0.5 items-center gap-1">
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
