<script lang="ts" setup>
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu";
import {
  useCopyItems,
  useMoveItems,
  useOpenInFileManager,
  useOpenInIde,
} from "../api";
import {
  useFileExplorerStore,
} from "../store";

const props = defineProps<{
  rootPath: string;
}>();

const fileExplorerStore = useFileExplorerStore();
const {
  mutateAsync: openInFileManager,
} = useOpenInFileManager();
const {
  mutateAsync: openInIde,
} = useOpenInIde();
const {
  mutateAsync: copyItems,
} = useCopyItems();
const {
  mutateAsync: moveItems,
} = useMoveItems();

async function pasteNode() {
  const cb = fileExplorerStore.clipboard;
  if (!cb)
    return;

  const items = cb.nodes.map(n => ({
    sourcePath: n.absolutePath,
    destinationDir: props.rootPath,
  }));

  if (cb.operation === "copy") {
    await copyItems(items);
  }
  else {
    await moveItems(items);
    fileExplorerStore.clearClipboard();
  }
}
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent @close-auto-focus.prevent>
      <ContextMenuItem @click="fileExplorerStore.startCreating('file', null)">
        New File...
      </ContextMenuItem>
      <ContextMenuItem @click="fileExplorerStore.startCreating('directory', null)">
        New Folder...
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem @click="openInFileManager(rootPath)">
        Reveal in File Explorer
      </ContextMenuItem>
      <ContextMenuItem @click="openInIde(rootPath)">
        Reveal in IDE
      </ContextMenuItem>
      <template v-if="fileExplorerStore.clipboard">
        <ContextMenuSeparator />
        <ContextMenuItem @click="pasteNode">
          Paste
        </ContextMenuItem>
      </template>
    </ContextMenuContent>
  </ContextMenu>
</template>
