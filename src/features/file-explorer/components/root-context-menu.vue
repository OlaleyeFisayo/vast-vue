<script lang="ts" setup>
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu";
import {
  useCopyItem,
  useMoveItem,
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
  mutateAsync: copyItem,
} = useCopyItem();
const {
  mutateAsync: moveItem,
} = useMoveItem();

async function pasteNode() {
  const cb = fileExplorerStore.clipboard;
  if (!cb)
    return;

  if (cb.operation === "copy") {
    await copyItem({
      sourcePath: cb.node.absolutePath,
      destinationDir: props.rootPath,
    });
  }
  else {
    await moveItem({
      sourcePath: cb.node.absolutePath,
      destinationDir: props.rootPath,
    });
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
