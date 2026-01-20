<script lang="ts" setup>
import {
  useFileTree,
} from "../hook/use-file-tree";
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
import FileTreeContainerActions from "./file-tree-container-actions.vue";
import FileTree from "./file-tree.vue";

const {
  TreeNodes,
  fetchTree,
  toggleChildDisplayIcon,
} = useFileTree();
</script>

<template>
  <main class="w-full overflow-hidden space-y-2">
    <FileTreeContainerActions :fetch-tree="fetchTree" />
    <section>
      <CreateFolder />
      <FileTree
        :tree-nodes="TreeNodes"
        :toggle-icon="toggleChildDisplayIcon"
      />
      <CreateFile />
    </section>
  </main>
</template>
