<script setup lang="ts">
import {
  storeToRefs,
} from "pinia";
import {
  defineAsyncComponent,
} from "vue";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";
import {
  usePanelMenuStore,
} from "../store";

const FileExplorerView = defineAsyncComponent(() => import("@/features/file-explorer/view/file-explorer-view.vue"));
const SearchPanel = defineAsyncComponent(() => import("@/features/search/view/search-panel.vue"));
const ComponentsPanel = defineAsyncComponent(() => import("@/features/app-components/view/components-panel.vue"));
const CanvasPanel = defineAsyncComponent(() => import("@/features/canvas/view/canvas-panel.vue"));

const {
  activePanel,
} = storeToRefs(usePanelMenuStore());
</script>

<template>
  <ResizablePanelGroup
    direction="horizontal"
    class="flex-1 overflow-hidden"
  >
    <ResizablePanel
      :default-size="35"
      :max-size="35"
      class="bg-background-100 py-3 pl-4 pr-2"
      :min-size="10"
    >
      <FileExplorerView v-if="activePanel === 'file-explorer'" />
      <SearchPanel v-else-if="activePanel === 'search-component'" />
      <ComponentsPanel v-else-if="activePanel === 'components'" />
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel
      :default-size="65"
      class="overflow-hidden"
    >
      <CanvasPanel />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
