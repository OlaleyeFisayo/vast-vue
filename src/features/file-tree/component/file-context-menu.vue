<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  MenuItem,
} from "primevue/menuitem";
import {
  computed,
  ref,
} from "vue";
import {
  useClipboard,
} from "../../../shared/hooks/use-clipboard";

const props = defineProps<{
  selectedNode: FileTreeNode | null;
}>();

const contextMenuRef = ref();

const {
  copyToClipboard,
} = useClipboard();

const items = computed<MenuItem[]>(() => {
  if (props.selectedNode) {
    const isDirectory = props.selectedNode.type === "directory";
    const absolutePath = props.selectedNode.absolutePath;
    const relativePath = props.selectedNode.key;

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
      },
      {
        label: "Open in Code Editor",
        visible: !isDirectory,
      },
      {
        separator: true,
      },
      {
        label: "Cut",
      },
      {
        label: "Copy",
      },
      {
        label: "Paste",
        visible: isDirectory,
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
      },
      {
        label: "Delete",
      },
    ];
  }
  return [];
});

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
    :model="items"
  />
</template>
