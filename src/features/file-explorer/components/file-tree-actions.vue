<script lang="ts" setup>
import {
  FilePlus2,
  FolderPlus,
  RefreshCcw,
} from "lucide-vue-next";
import {
  storeToRefs,
} from "pinia";
import {
  computed,
} from "vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import {
  queryClient,
} from "@/shared/lib/query-client";
import {
  FILE_EXPLORER_QUERY_KEYS,
  useExpandDirectory,
} from "../api";
import {
  useFileExplorerStore,
} from "../store";

const fileExplorerStore = useFileExplorerStore();
const {
  selectedNodes,
} = storeToRefs(fileExplorerStore);
const {
  mutateAsync: expandDirectory,
} = useExpandDirectory();

const isMultiSelect = computed(() => selectedNodes.value.length > 1);

async function resolveParentPath(): Promise<string | null> {
  const selected = selectedNodes.value[0];
  if (selected?.type === "directory") {
    if (!selected.expanded) {
      await expandDirectory(selected.absolutePath);
    }
    return selected.absolutePath;
  }
  return null;
}

const ACTIONS = [
  {
    title: "Create new file",
    Icon: FilePlus2,
    onClick: async () => fileExplorerStore.startCreating(
      "file",
      await resolveParentPath(),
    ),
    disabledWhenMultiSelect: true,
  },
  {
    title: "Create new folder",
    Icon: FolderPlus,
    onClick: async () => fileExplorerStore.startCreating(
      "directory",
      await resolveParentPath(),
    ),
    disabledWhenMultiSelect: true,
  },
  {
    title: "Refresh File Explorer",
    Icon: RefreshCcw,
    onClick: () => queryClient.invalidateQueries({
      queryKey: FILE_EXPLORER_QUERY_KEYS.fileTreeNodes,
    }),
    disabledWhenMultiSelect: false,
  },
];
</script>

<template>
  <section
    class="w-fit flex gap-3"
    @click.stop
  >
    <TooltipProvider>
      <Tooltip
        v-for="action in ACTIONS"
        :key="action.title"
      >
        <TooltipTrigger as-child>
          <button
            class="cursor-pointer hover:bg-primary-400 hover:text-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="action.disabledWhenMultiSelect && isMultiSelect"
            @click="action.onClick()"
          >
            <component
              :is="action.Icon"
              class="w-4 h-4"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {{ action.disabledWhenMultiSelect && isMultiSelect ? "Cannot perform this action on multiple selections" : action.title }}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </section>
</template>
