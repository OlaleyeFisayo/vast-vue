<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  useDropZone,
} from "@vueuse/core";
import {
  ref,
} from "vue";
import {
  getDropPath,
} from "../composables/get-drop-path";
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
  if (node.type === "directory") {
    if (node.expanded)
      collapseDirectory.mutate(node.absolutePath);
    else expandDirectory.mutate(node.absolutePath);
  }
};

function handleClick(node: FileTreeNode) {
  toggleIcon(node);
  fileTreeStore.setSelectedNode(node);
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

      const targetPath = getDropPath(target);
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
  <FileEntryTemplate
    ref="dropZoneRef"
    :node="node"
    :class="[
      // Show focus state when the file or folder is selected
      node.key === fileTreeStore.selectedNode?.key && !fileTreeStore.DragAndDropData.isDragging && 'bg-gray-800 hover:bg-gray-800',
    ]"
    :draggable="true"
    @dragstart="handleDragStart(node)"
    @click="handleClick(node)"
    @contextmenu.prevent="fileTreeStore.toggleFileContextMenu($event, node)"
  >
    <p
      class="flex-1 text-left text-nowrap text-ellipsis overflow-hidden"
    >
      {{ node.name }}
    </p>
  </FileEntryTemplate>
</template>
