<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@brickly/file-explorer";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu";
import {
  useCopyItem,
  useDeleteItem,
  useExpandDirectory,
  useMoveItem,
  useOpenInFileManager,
  useOpenInIde,
} from "../api";
import {
  useFileExplorerStore,
} from "../store";

const props = defineProps<{
  node: FileTreeNode;
}>();

const isDirectory = props.node.type === "directory";

const fileExplorerStore = useFileExplorerStore();
const {
  mutateAsync: expandDirectory,
} = useExpandDirectory();
const {
  mutateAsync: deleteItem,
} = useDeleteItem();
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

function getPasteDestination(): string | undefined {
  if (props.node.type === "directory")
    return props.node.absolutePath;
  return props.node.parentPath || undefined;
}

function cutNode() {
  fileExplorerStore.setCut(props.node);
}

function copyNode() {
  fileExplorerStore.setCopy(props.node);
}

async function pasteNode() {
  const cb = fileExplorerStore.clipboard;
  if (!cb)
    return;
  const dest = getPasteDestination();

  if (cb.operation === "copy") {
    await copyItem({
      sourcePath: cb.node.absolutePath,
      destinationDir: dest,
    });
  }
  else {
    await moveItem({
      sourcePath: cb.node.absolutePath,
      destinationDir: dest,
    });
    fileExplorerStore.clearClipboard();
  }

  const shouldExpand = props.node.type === "directory"
    ? !props.node.expanded
    : !!dest;
  if (shouldExpand && dest) {
    await expandDirectory(dest);
  }
}

async function resolveParentPath(): Promise<string | null> {
  if (props.node.type === "directory") {
    if (!props.node.expanded) {
      await expandDirectory(props.node.absolutePath);
    }
    return props.node.absolutePath;
  }
  return null;
}

async function startCreatingFile() {
  fileExplorerStore.startCreating(
    "file",
    await resolveParentPath(),
  );
}

async function startCreatingFolder() {
  fileExplorerStore.startCreating(
    "directory",
    await resolveParentPath(),
  );
}

async function revealInFileExplorer() {
  await openInFileManager(props.node.absolutePath);
}

async function revealInIde() {
  await openInIde(props.node.absolutePath);
}

async function deleteNode() {
  await deleteItem(props.node.absolutePath);
}
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent @close-auto-focus.prevent>
      <template v-if="isDirectory">
        <ContextMenuItem @click="startCreatingFile">
          New File...
        </ContextMenuItem>
        <ContextMenuItem @click="startCreatingFolder">
          New Folder...
        </ContextMenuItem>
        <ContextMenuSeparator />
      </template>
      <ContextMenuItem @click="revealInFileExplorer">
        Reveal in File Explorer
      </ContextMenuItem>
      <ContextMenuItem
        v-if="isDirectory"
        @click="revealInIde"
      >
        Reveal in IDE
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem @click="cutNode">
        Cut
      </ContextMenuItem>
      <ContextMenuItem @click="copyNode">
        Copy
      </ContextMenuItem>
      <ContextMenuItem
        v-if="fileExplorerStore.clipboard"
        @click="pasteNode"
      >
        Paste
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem @click="fileExplorerStore.startRenaming(props.node.absolutePath)">
        Rename
      </ContextMenuItem>
      <ContextMenuItem
        class="hover:bg-red-700! hover:text-white!"
        @click="deleteNode"
      >
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
