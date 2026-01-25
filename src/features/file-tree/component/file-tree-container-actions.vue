<script lang="ts" setup>
import {
  IconClipboard,
  IconFilePlus,
  IconFolderPlus,
  IconRefresh,
} from "@tabler/icons-vue";
import {
  computed,
} from "vue";
import {
  VAST_APP_STATES,
} from "../../../shared/variables";
import {
  copyCutFileEntry,
} from "../composables/copy-cut-file-entry";
import {
  useCopy,
  useGetFileTree,
  useMove,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";

const fileTreeStore = useFileTreeStore();
const getFileTree = useGetFileTree();
const copyAndCutMode = computed(() => fileTreeStore.copyAndCutData.mode);
const copyAndCuteSource = computed(() => fileTreeStore.copyAndCutData.source);
const copy = useCopy();
const move = useMove();

const fileTreeContainerActions = computed(() => [
  {
    title: "New File",
    icon: IconFilePlus,
    action: () => fileTreeStore.enableCreateMode("file"),
  },
  {
    title: "New Folder",
    icon: IconFolderPlus,
    action: () => fileTreeStore.enableCreateMode("directory"),
  },
  {
    title: "Paste",
    icon: IconClipboard,
    isVisible: !!copyAndCutMode.value && !!copyAndCuteSource.value,
    action: async () => copyCutFileEntry(
      copy,
      move,
      copyAndCutMode.value!,
      copyAndCuteSource.value!,
    ),
  },
  {
    title: "Refresh Files",
    icon: IconRefresh,
    action: () => getFileTree.refetch(),
  },
]);
</script>

<template>
  <section class="flex gap-1">
    <button
      v-for="{ title, icon, action, isVisible } in fileTreeContainerActions"
      v-show="isVisible ?? true"
      :key="title"
      v-tooltip="{
        value: title,
        showDelay: VAST_APP_STATES.tooltipShowDelay,
      }"
      class="cursor-pointer hover:bg-gray-800 p-1.5"
      type="button"
      @click="action"
    >
      <component
        :is="icon"
        class="size-5"
      />
    </button>
  </section>
</template>
