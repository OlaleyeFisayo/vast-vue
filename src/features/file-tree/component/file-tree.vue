<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  StyleValue,
} from "vue";
import {
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-vue";

const props = defineProps<{
  treeNodes: FileTreeNode[];
  toggleIcon: (node: FileTreeNode) => void;
  class?: string;
  style?: StyleValue;
}>();

const fileGap = "1rem";
</script>

<template>
  <div
    v-for="node in treeNodes"
    :key="node.key"
    :class="`${props.class}`"
    :style="style"
  >
    <button
      class="w-full cursor-pointer flex p-0.5 items-center gap-2"
      @click="toggleIcon(node)"
    >
      <!-- Icon Toggle for Folder Expansion -->
      <template
        v-if="node.type === 'directory'"
      >
        <IconChevronDown
          v-if="node.expanded"
          :style="{ width: fileGap, height: fileGap }"
        />
        <IconChevronRight
          v-else
          :style="{ width: fileGap, height: fileGap }"
        />
      </template>
      <p :style="{ marginLeft: node.type === 'file' ? fileGap : '0' }">
        {{ node.name }}
      </p>
    </button>
    <FileTree
      v-if="node.type === 'directory' && node.expanded"
      :tree-nodes="node.children"
      :toggle-icon="toggleIcon"
      :style="{ marginLeft: fileGap }"
    />
  </div>
</template>
