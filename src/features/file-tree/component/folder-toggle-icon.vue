<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-vue";
import {
  FILE_TREE_STATES,
} from "../variables";

defineProps<{
  node: FileTreeNode;
}>();
</script>

<template>
  <template v-if="node.type === 'directory'">
    <IconChevronDown
      v-if="node.expanded"
      :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
    />
    <IconChevronRight
      v-else
      :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
    />
  </template>
</template>
