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
  <component
    :is="node.expanded ? IconChevronDown : IconChevronRight"
    v-if="node.type === 'directory'"
    :style="{ width: FILE_TREE_STATES.iconSize, height: FILE_TREE_STATES.iconSize }"
    class="text-text-primary shrink-0"
  />
</template>
