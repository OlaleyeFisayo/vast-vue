<script lang="ts" setup>
import {
  onFileTreeUpdate,
} from "@brickly/file-explorer";
import {
  useQuery,
} from "@tanstack/vue-query";
import {
  onMounted,
} from "vue";
import {
  ScrollArea,
} from "@/shared/components/ui/scroll-area";
import {
  fileTreeNodesQueryOptions,
  rootInfoQueryOptions,
} from "../api";
import {
  useFileExplorerStore,
} from "../store";
import FileTreeActions from "./file-tree-actions.vue";
import FileTreeNodes from "./file-tree-nodes.vue";
import RootContextMenu from "./root-context-menu.vue";

const {
  data: rootInfo,
} = useQuery(rootInfoQueryOptions());

const {
  data: fileTreeNodes,
  refetch: getFileTreeNodes,
} = useQuery(fileTreeNodesQueryOptions());

const fileExplorerStore = useFileExplorerStore();

onMounted(() => {
  onFileTreeUpdate(async () => {
    await getFileTreeNodes();
  });
});
</script>

<template>
  <section
    class="bg-background-100 w-65 py-3 flex flex-col gap-2 h-full"
    @click="fileExplorerStore.clearSelectedNodes()"
  >
    <header class="flex items-center justify-between px-4">
      <h1 class="uppercase text-primary-300 text-xs">
        {{ rootInfo?.basename }}
      </h1>
      <FileTreeActions />
    </header>
    <template v-if="rootInfo">
      <RootContextMenu :root-path="rootInfo.rootPath">
        <ScrollArea class="w-full overflow-x-hidden pl-4 flex-1">
          <FileTreeNodes :file-tree-nodes="fileTreeNodes" />
        </ScrollArea>
      </RootContextMenu>
    </template>
  </section>
</template>
