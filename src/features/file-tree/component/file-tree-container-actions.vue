<script lang="ts" setup>
import {
  IconFilePlus,
  IconFolderPlus,
  IconRefresh,
} from "@tabler/icons-vue";
import {
  VAST_APP_STATES,
} from "../../../shared/variables";
import {
  useGetFileTree,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";

const fileTreeStore = useFileTreeStore();
const getFileTree = useGetFileTree();

const fileTreeContainerActions = [
  {
    title: "New File",
    icon: IconFilePlus,
    action: fileTreeStore.enableCreateFileMode,
  },
  {
    title: "New Folder",
    icon: IconFolderPlus,
    action: fileTreeStore.enableCreateFolderMode,
  },
  {
    title: "Refresh Files",
    icon: IconRefresh,
    action: () => getFileTree.refetch(),
  },
];
</script>

<template>
  <section class="flex gap-1">
    <button
      v-for="{ title, icon, action } in fileTreeContainerActions"
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
