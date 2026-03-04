<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  AppContextMenuContent,
  AppContextMenuItem,
  AppContextMenuPortal,
  AppContextMenuRoot,
  AppContextMenuSeparator,
  AppContextMenuTrigger,
} from "@shared/components/app-context-menu";
import {
  useClipboard,
} from "../../../shared/hooks/use-clipboard";
import {
  copyCutFileEntry,
} from "../composables/copy-cut-file-entry";
import {
  handleCreateMode,
} from "../composables/handle-create-mode";
import {
  useCopy,
  useDelete,
  useExpandDirectory,
  useMove,
  useOpenInFileManager,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";

const props = defineProps<{
  node: FileTreeNode;
}>();

const {
  copyToClipboard,
} = useClipboard();

const fileTreeStore = useFileTreeStore();
const expandDirectory = useExpandDirectory();
const copy = useCopy();
const move = useMove();
const deleteFn = useDelete();
const openInFileManager = useOpenInFileManager();

const isDirectory = props.node.type === "directory";
const absolutePath = props.node.absolutePath;
const relativePath = props.node.key;
</script>

<template>
  <AppContextMenuRoot>
    <AppContextMenuTrigger
      as-child
      @contextmenu="fileTreeStore.setSelectedNode(node)"
    >
      <slot />
    </AppContextMenuTrigger>
    <AppContextMenuPortal>
      <AppContextMenuContent>
        <template v-if="isDirectory">
          <AppContextMenuItem
            @click="handleCreateMode({ fileTreeStore, type: 'file', expandDirectory })"
          >
            New File...
          </AppContextMenuItem>
          <AppContextMenuItem
            @click="handleCreateMode({ fileTreeStore, type: 'directory', expandDirectory })"
          >
            New Folder...
          </AppContextMenuItem>
          <AppContextMenuSeparator />
        </template>

        <AppContextMenuItem @click="openInFileManager.mutateAsync(absolutePath)">
          Reveal in File Explorer
        </AppContextMenuItem>

        <AppContextMenuSeparator />

        <AppContextMenuItem @click="fileTreeStore.enableCopyAndCutMode('cut', node)">
          Cut
        </AppContextMenuItem>
        <AppContextMenuItem @click="fileTreeStore.enableCopyAndCutMode('copy', node)">
          Copy
        </AppContextMenuItem>
        <AppContextMenuItem
          v-if="isDirectory && !!fileTreeStore.copyAndCutData.mode && !!fileTreeStore.copyAndCutData.source"
          @click="copyCutFileEntry(copy, move, fileTreeStore.copyAndCutData.mode!, fileTreeStore.copyAndCutData.source!, node, expandDirectory)"
        >
          Paste
        </AppContextMenuItem>

        <AppContextMenuSeparator />

        <AppContextMenuItem @click="copyToClipboard(absolutePath)">
          Copy Path
        </AppContextMenuItem>
        <AppContextMenuItem @click="copyToClipboard(relativePath)">
          Copy Relative Path
        </AppContextMenuItem>

        <AppContextMenuSeparator />

        <AppContextMenuItem @click="fileTreeStore.enableRenameMode(node)">
          Rename
        </AppContextMenuItem>
        <AppContextMenuItem
          @click="() => { deleteFn.mutateAsync(absolutePath); fileTreeStore.setSelectedNode(null); }"
        >
          Delete
        </AppContextMenuItem>
      </AppContextMenuContent>
    </AppContextMenuPortal>
  </AppContextMenuRoot>
</template>
