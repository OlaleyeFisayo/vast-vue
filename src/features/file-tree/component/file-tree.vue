<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  StyleValue,
} from "vue";
import {
  ref,
} from "vue";
import {
  FILE_TREE_STATES,
} from "../variables";
import FileContextMenu from "./file-context-menu.vue";
import FileIcon from "./file-icon.vue";
import FolderToggleIcon from "./folder-toggle-icon.vue";

const props = defineProps<{
  treeNodes: FileTreeNode[];
  toggleIcon: (node: FileTreeNode) => void;
  class?: string;
  style?: StyleValue;
}>();

// Files context Menu
const fileContextMenuRef = ref<InstanceType<typeof FileContextMenu> | null>(null);
const selectedNode = ref<FileTreeNode | null>(null);
function toggleFileContextMenu(
  event: MouseEvent,
  node: FileTreeNode,
) {
  fileContextMenuRef.value?.show(event);
  selectedNode.value = node;
}
</script>

<template>
  <div
    v-for="node in treeNodes"
    :key="node.key"
    :class="`${props.class}`"
    :style="style"
  >
    <button
      class="w-full cursor-pointer flex p-0.5 items-center gap-1 hover:bg-gray-800 focus:bg-gray-800"
      @click="toggleIcon(node)"
      @contextmenu.prevent="toggleFileContextMenu($event, node)"
    >
      <FolderToggleIcon :node="node" />
      <p
        :style="{ marginLeft: node.type === 'file' ? FILE_TREE_STATES.fileGap : '0' }"
        class="flex items-center gap-1.5 text-nowrap text-ellipsis"
      >
        <FileIcon :node="node" />
        {{ node.name }}
      </p>
    </button>
    <!-- Child -->
    <FileTree
      v-if="node.type === 'directory' && node.expanded"
      :tree-nodes="node.children"
      :toggle-icon="toggleIcon"
      :style="{ marginLeft: FILE_TREE_STATES.fileGap }"
    />
  </div>
  <FileContextMenu
    ref="fileContextMenuRef"
    :selected-node="selectedNode"
  />
</template>
