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
  dummyFileEntryNodeFile,
} from "../variables";
import FileEntryIcon from "./file-entry-icon.vue";

const props = defineProps<{
  node: FileTreeNode | null;
}>();

const fileTreeStore = useFileTreeStore();

const newFileName = ref("");
const createFileRef = ref<any>(null);
const create = useCreate();

onMounted(() => {
  nextTick(() => {
    createFileRef.value?.$el.focus();
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
  <div
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
