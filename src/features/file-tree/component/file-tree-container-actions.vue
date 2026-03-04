<script lang="ts" setup>
import type {
  HandleCreateModePayload,
} from "../composables/handle-create-mode";
import AppTooltip from "@shared/components/app-tooltip.vue";
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
  copyCutFileEntry,
} from "../composables/copy-cut-file-entry";
import {
  handleCreateMode,
} from "../composables/handle-create-mode";
import {
  useCopy,
  useExpandDirectory,
  useFileTree,
  useGetRootInfo,
  useMove,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";

const {
  data: rootInfo,
} = useGetRootInfo();
const fileTree = useFileTree();

const fileTreeStore = useFileTreeStore();
const copyAndCutMode = computed(() => fileTreeStore.copyAndCutData.mode);
const copyAndCuteSource = computed(() => fileTreeStore.copyAndCutData.source);
const copy = useCopy();
const move = useMove();
const expandDirectory = useExpandDirectory();

const fileTreeContainerActions = computed(() => [
  {
    title: "New File",
    icon: IconFilePlus,
    action: async (payload: Omit<HandleCreateModePayload, "type">) => await handleCreateMode({
      type: "file",
      ...payload,
    }),
  },
  {
    title: "New Folder",
    icon: IconFolderPlus,
    action: async (payload: Omit<HandleCreateModePayload, "type">) => await handleCreateMode({
      type: "directory",
      ...payload,
    }),
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
    action: () => fileTree.refetch(),
  },
]);
</script>

<template>
  <section class="flex gap-2 text-text-primary justify-between items-center pl-4 pr-2 py-4 border-b border-border">
    <h1 class="text-xl font-bold">
      {{ rootInfo?.basename }}
    </h1>
    <section class="flex gap-1">
      <template
        v-for="{ title, icon, action, isVisible } in fileTreeContainerActions"
        :key="title"
      >
        <AppTooltip
          :content="title"
          side="bottom"
        >
          <button
            v-show="isVisible ?? true"
            class="cursor-pointer hover:bg-vue-dark p-1.5"
            type="button"
            @click="async () => action({
              expandDirectory,
              fileTreeStore,
            })"
          >
            <component
              :is="icon"
              class="size-5"
            />
          </button>
        </AppTooltip>
      </template>
    </section>
  </section>
</template>
