<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  MenuItem,
} from "primevue/menuitem";
import {
  deleteFile,
  deleteFolder,
  openInFileManager,
} from "@vast/file-explorer";
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
  useCopy,
  useExpandDirectory,
  useMove,
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
        command: async () => await openInFileManager(absolutePath),
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
        command: async () => {
          if (node.type === "directory")
            await deleteFolder(node.absolutePath);
          else await deleteFile(node.absolutePath);
        },
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
