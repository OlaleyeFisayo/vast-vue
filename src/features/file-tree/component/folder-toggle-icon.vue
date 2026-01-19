<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-vue";
import {
  fileGap,
} from "../variables";

defineProps<{
  node: FileTreeNode;
}>();
</script>

<template>
  <template v-if="node.type === 'directory'">
    <IconChevronDown
      v-if="node.expanded"
      :style="{ width: fileGap, height: fileGap }"
    />
    <IconChevronRight
      v-else
      :style="{ width: fileGap, height: fileGap }"
    />
  </template>
</template>
