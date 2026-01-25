<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  MenuItem,
} from "primevue/menuitem";
import {
  ref,
} from "vue";
import {
  useClipboard,
} from "../../../shared/hooks/use-clipboard";
import {
  copyCutFileEntry,
} from "../composables/copy-cut-file-entry";
import {
  deleteFileEntry,
} from "../composables/delete.file-entry";
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
  selectedNode: FileTreeNode | null;
}>();

const contextMenuRef = ref();

const {
  copyToClipboard,
} = useClipboard();

const fileTreeStore = useFileTreeStore();
const expandDirectory = useExpandDirectory();
const copy = useCopy();
const move = useMove();
const deleteFn = useDelete();
const openInFileManager = useOpenInFileManager();

function items(): MenuItem[] {
  if (props.selectedNode) {
    const node = props.selectedNode;
    const isDirectory = props.selectedNode.type === "directory";
    const absolutePath = props.selectedNode.absolutePath;
    const relativePath = props.selectedNode.key;
    const copyAndCutMode = fileTreeStore.copyAndCutData.mode;
    const copyAndCuteSource = fileTreeStore.copyAndCutData.source;

    return [
      {
        label: "New File...",
        visible: isDirectory,
      },
      {
        label: "New Folder...",
        visible: isDirectory,
      },
      {
        separator: true,
        visible: isDirectory,
      },
      {
        label: "Reveal in File Explorer",
        command: async () => await openInFileManager.mutateAsync(absolutePath),
      },
      {
        separator: true,
      },
      {
        label: "Cut",
        command: () => fileTreeStore.enableCopyAndCutMode(
          "cut",
          node,
        ),
      },
      {
        label: "Copy",
        command: () => fileTreeStore.enableCopyAndCutMode(
          "copy",
          node,
        ),
      },
      {
        label: "Paste",
        visible: isDirectory && !!copyAndCutMode && !!copyAndCuteSource,
        command: async () => copyCutFileEntry(
          copy,
          move,
          copyAndCutMode!,
          copyAndCuteSource!,
          node,
          expandDirectory,
        ),
      },
      {
        separator: true,
      },
      {
        label: "Copy Path",
        command: async () => await copyToClipboard(absolutePath),
      },
      {
        label: "Copy Relative Path",
        command: async () => await copyToClipboard(relativePath),
      },
      {
        separator: true,
      },
      {
        label: "Rename",
        command: () => fileTreeStore.enableRenameMode(node),
      },
      {
        label: "Delete",
        command: async () => deleteFileEntry(
          deleteFn,
          absolutePath,
        ),
      },
    ];
  }
  return [];
}

function show(event: MouseEvent) {
  contextMenuRef.value.show(event);
}

defineExpose({
  show,
});
</script>

<template>
  <ContextMenu
    ref="contextMenuRef"
    :model="items()"
  />
</template>
