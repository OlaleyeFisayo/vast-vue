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
  fileGap,
} from "../variables";

defineProps<{
  node: FileTreeNode;
}>();
</script>

<template>
  <IconFolder
    v-if="node.type === 'directory' && !node.expanded"
    :style="{ width: fileGap, height: fileGap }"
  />
  <IconFolderOpen
    v-if="node.type === 'directory' && node.expanded"
    :style="{ width: fileGap, height: fileGap }"
  />
  <IconFile
    v-if="node.type === 'file'"
    :style="{ width: fileGap, height: fileGap }"
  />
</template>
