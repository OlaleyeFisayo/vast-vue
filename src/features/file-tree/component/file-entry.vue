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
  useCollapseDirectory,
  useExpandDirectory,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import FileEntryIcon from "./file-entry-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

const props = defineProps<{
  node: FileTreeNode;
  toggleFileContextMenu: (event: MouseEvent, node: FileTreeNode) => void;
}>();

const fileTreeStore = useFileTreeStore();
const expandDirectory = useExpandDirectory();
const collapseDirectory = useCollapseDirectory();

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
const hoverDirectoryTimer = ref<number | undefined>(undefined);
useDropZone(
  dropZoneRef,
  {
    onEnter: () => {
      // Get the targetPath whether the parent or directory path
      const target = props.node;
      fileTreeStore.setDragAndDropData({
        target,
      });

      // Expand closed Directories
      if (props.node.type === "directory" && !props.node.expanded) {
        hoverDirectoryTimer.value = setTimeout(
          () => {
            expandDirectory.mutate(props.node.absolutePath);
            hoverDirectoryTimer.value = undefined;
          },
          1000,
        );
      }
    },
    onLeave: () => {
      // Stop timer when you leave the drag
      clearInterval(hoverDirectoryTimer.value);
      hoverDirectoryTimer.value = undefined;
    },
    // onDrop: async (
    //   _,
    //   event,
    // ) => {
    //   setDropZoneTargetPath(null);

    //   const sourcePath = event?.dataTransfer?.getData("text/plain");
    //   if (!sourcePath)
    //     return;

    //   const targetPath: string = props.node.type === "directory"
    //     ? props.node.absolutePath
    //     : getParentPath(props.node);

    //   if (!isValidMove({
    //     sourcePath,
    //     targetPath,
    //   })) {
    //     return;
    //   }

    //   await move.mutateAsync({
    //     sourcePath,
    //     newPath: targetPath,
    //   });
    // },
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
  <button
    ref="dropZoneRef"
    class="w-full cursor-pointer flex p-0.5 items-center gap-1"
    :class="[
      // Show focus state when the file or folder is selected
      node === fileTreeStore.selectedNode && !fileTreeStore.DragAndDropData.isDragging ? 'bg-gray-800' : '',
      // Apply hover only when not dragging
      !fileTreeStore.DragAndDropData.isDragging && 'hover:bg-gray-800',
    ]"
    :draggable="true"
    @dragstart="handleDragStart(node)"
    @click="handleClick(node)"
    @contextmenu.prevent="toggleFileContextMenu($event, node)"
  >
    <FolderToggleIcon :node="node" />
    <p
      class="flex items-center gap-1.5 text-nowrap text-ellipsis"
    >
      <FileEntryIcon
        :node="node"
      />
      {{ node.name }}
    </p>
  </button>
</template>
