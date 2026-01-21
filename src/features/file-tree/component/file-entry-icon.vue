<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  IconFile,
  IconFolder,
  IconFolderOpen,
} from "@tabler/icons-vue";
import {
  FILE_TREE_STATES,
} from "../variables";

defineProps<{
  node: FileTreeNode;
}>();
</script>

<template>
  <IconFolder
    v-if="node.type === 'directory' && !node.expanded"
    :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
  />
  <IconFolderOpen
    v-if="node.type === 'directory' && node.expanded"
    :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
  />
  <IconFile
    v-if="node.type === 'file'"
    :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
  />
</template>
