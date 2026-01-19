<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  useFileTree,
} from "../hook/use-file-tree";
import FileTree from "./file-tree.vue";

const {
  TreeNodes,
  collapse,
  expand,
} = useFileTree();

async function toggleIcon(node: FileTreeNode) {
  if (node.type === "directory") {
    if (node.expanded)
      await collapse(node.absolutePath);
    else await expand(node.absolutePath);
  }
}
</script>

<template>
  <section class="w-full">
    <FileTree
      :tree-nodes="TreeNodes"
      :toggle-icon="toggleIcon"
    />
  </section>
</template>
