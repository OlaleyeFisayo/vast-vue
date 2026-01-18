<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer/types";
import {
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-vue";
import {
  useFileTree,
} from "../hook/use-file-tree";

type PrimeTreeSlotProps = {
  node: FileTreeNode;
  selected: boolean;
  expanded: boolean;
};

const {
  FileTree,
} = useFileTree();
</script>

<template>
  <Tree
    :value="FileTree"
    pt:root:class="p-0 m-0"
    pt:wrapper:class="p-0 m-0"
    pt:root-children:class="p-0 m-0 border"
    pt:node:class="border p-0 m-0"
  >
    <template #default="{ node }: PrimeTreeSlotProps">
      <div class="w-full flex gap-2 border">
        <template v-if="node.type === 'directory'">
          <IconChevronUp v-if="node.expanded" />
          <IconChevronDown v-else />
        </template>
        <p>{{ node.name }}</p>
      </div>
    </template>
  </Tree>
</template>
