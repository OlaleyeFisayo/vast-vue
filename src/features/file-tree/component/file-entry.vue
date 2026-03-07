<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@brickly/file-explorer";
import {
  useDropZone,
} from "@vueuse/core";
import {
  ref,
} from "vue";
import {
  getFolderPath,
} from "../composables/get-folder-path";
import {
  isValidMove,
} from "../composables/is-valid-move";
import {
  useCollapseDirectory,
  useExpandDirectory,
  useMove,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import FileContextMenu from "./file-context-menu.vue";
import FileEntryTemplate from "./file-entry-template.vue";

const props = defineProps<{
  node: FileTreeNode;
}>();

const fileTreeStore = useFileTreeStore();
const expandDirectory = useExpandDirectory();
const collapseDirectory = useCollapseDirectory();
const {
  mutateAsync: move,
} = useMove();

function toggleIcon(node: FileTreeNode) {
  const newNode: FileTreeNode = {
    ...node,
    ...(node.type === "directory"
      ? {
          expanded: !node.expanded,
        }
      : {}),
  };
  if (node.type === "directory") {
    if (node.expanded)
      collapseDirectory.mutate(node.absolutePath);
    else expandDirectory.mutate(node.absolutePath);
  }
  return newNode;
};

function handleClick(node: FileTreeNode) {
  const newNode = toggleIcon(node);
  fileTreeStore.setSelectedNode(newNode);
}
// drag and drop of file-entry
const dropZoneRef = ref<HTMLButtonElement | null>(null);
const hoverDirectoryTimer = ref<number | null>(null);
useDropZone(
  dropZoneRef,
  {
    onEnter: () => {
      // Get the targetPath whether the parent or directory path
      fileTreeStore.setDragAndDropData({
        target: props.node,
      });

      // Expand closed Directories
      if (props.node.type === "directory" && !props.node.expanded) {
        hoverDirectoryTimer.value = setTimeout(
          () => {
            expandDirectory.mutate(props.node.absolutePath);
            hoverDirectoryTimer.value = null;
          },
          650,
        );
      }
    },
    onLeave: () => {
      // Stop timer when you leave the drag
      clearInterval(hoverDirectoryTimer.value!);
      hoverDirectoryTimer.value = null;
    },
    onDrop: async () => {
      const target = fileTreeStore.DragAndDropData.target;
      const source = fileTreeStore.DragAndDropData.source;

      if (!source)
        return;

      const targetPath = getFolderPath(target);
      const validMove = isValidMove({
        target,
        source,
        node: props.node,
      });

      if (!validMove)
        return;

      await move({
        sourcePath: source?.absolutePath,
        newPath: targetPath,
      });
    },
  },
);
function handleDragStart(node: FileTreeNode) {
  fileTreeStore.setDragAndDropData({
    isDragging: true,
    source: node,
  });
}
</script>

<template>
  <FileContextMenu :node="node">
    <FileEntryTemplate
      ref="dropZoneRef"
      :node="node"
      :draggable="true"
      @dragstart="handleDragStart(node)"
      @click.stop="handleClick(node)"
    >
      <p
        class="text-left text-nowrap text-ellipsis overflow-hidden"
      >
        {{ node.name }}
      </p>
    </FileEntryTemplate>
  </FileContextMenu>
</template>
