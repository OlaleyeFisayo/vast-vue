<script lang="ts" setup>
import FileTreeContainerActions from "./file-tree-container-actions.vue";
import FileTree from "./file-tree.vue";
</script>

<template>
  <main class="w-full overflow-hidden space-y-2">
    <FileTreeContainerActions />
    <section>
      <FileTree />
    </section>
  </main>
</template>
