<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@brickly/file-explorer";
import {
  computed,
} from "vue";
import {
  useCanvasNodesStore,
} from "@/features/canvas/nodes-store";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu";
import {
  useCopyItems,
  useDeleteItem,
  useDeleteItems,
  useExpandDirectory,
  useMoveItems,
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
const isVueFile = !isDirectory && props.node.absolutePath.endsWith(".vue");

const fileExplorerStore = useFileExplorerStore();
const canvasNodesStore = useCanvasNodesStore();
const {
  mutateAsync: expandDirectory,
} = useExpandDirectory();
const {
  mutateAsync: deleteItem,
} = useDeleteItem();
const {
  mutateAsync: deleteItems,
} = useDeleteItems();
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

const isMultiSelectMode = computed(() => {
  const selected = fileExplorerStore.selectedNodes;
  return selected.length > 1 && selected.some(n => n.key === props.node.key);
});

function getPasteDestination(): string | undefined {
  if (props.node.type === "directory")
    return props.node.absolutePath;
  return props.node.parentPath || undefined;
}

function cutNode() {
  fileExplorerStore.setCut(isMultiSelectMode.value ? fileExplorerStore.selectedNodes : [props.node]);
}

function copyNode() {
  fileExplorerStore.setCopy(isMultiSelectMode.value ? fileExplorerStore.selectedNodes : [props.node]);
}

async function pasteNode() {
  const cb = fileExplorerStore.clipboard;
  if (!cb)
    return;
  const dest = getPasteDestination();
  const items = cb.nodes.map(n => ({
    sourcePath: n.absolutePath,
    destinationDir: dest,
  }));

  if (cb.operation === "copy") {
    await copyItems(items);
  }
  else {
    await moveItems(items);
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
  if (isMultiSelectMode.value) {
    await deleteItems(fileExplorerStore.selectedNodes.map(n => n.absolutePath));
  }
  else {
    await deleteItem(props.node.absolutePath);
  }
}
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent @close-auto-focus.prevent>
      <template v-if="!isMultiSelectMode">
        <template v-if="isVueFile">
          <ContextMenuItem @click="canvasNodesStore.addNode(node.absolutePath, node.key)">
            Open Preview
          </ContextMenuItem>
          <ContextMenuSeparator />
        </template>
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
        <ContextMenuItem @click="revealInIde">
          Reveal in IDE
        </ContextMenuItem>
        <ContextMenuSeparator />
      </template>
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
      <ContextMenuItem
        v-if="!isMultiSelectMode"
        @click="fileExplorerStore.startRenaming(props.node.absolutePath)"
      >
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
