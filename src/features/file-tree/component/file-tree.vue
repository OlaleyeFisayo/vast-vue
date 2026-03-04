<script lang="ts" setup>
import {
  queryClient,
} from "@shared/utils/query-client";
import {
  onFileTreeUpdate,
} from "@vast/file-explorer";
import {
  onMounted,
} from "vue";
import {
  useFileTree,
} from "../queries";
import {
  useFileTreeStore,
} from "../store";
import {
  API_KEY,
} from "../variables";
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
import FileEntries from "./file-entries.vue";

const {
  data: TreeNodes,
} = useFileTree();

const fileTreeStore = useFileTreeStore();

onMounted(() => {
  onFileTreeUpdate(() => {
    queryClient.invalidateQueries({
      queryKey: API_KEY.fileTree,
    });
  });
});

function handleClick() {
  fileTreeStore.setSelectedNode(null);
}

function shouldShowCreate() {
  const {
    createData,
    rootPath,
  } = fileTreeStore;

  return createData.node === null || (createData.node.parentPath === rootPath && createData.node.type !== "directory");
}
</script>

<template>
  <section
    class="w-full px-2 pb-2 flex-1 overflow-y-auto overflow-x-hidden"
    @click="handleClick"
  >
    <CreateFolder
      v-if="shouldShowCreate() && fileTreeStore.createData.type === 'directory'"
    />
    <FileEntries :tree-nodes="TreeNodes" />
    <CreateFile
      v-if="shouldShowCreate() && fileTreeStore.createData.type === 'file'"
    />
  </section>
</template>
