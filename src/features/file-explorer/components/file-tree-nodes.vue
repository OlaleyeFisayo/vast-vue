<script lang="ts" setup>
import type {
  FileTreeNode,
} from "@brickly/file-explorer";
import {
  storeToRefs,
} from "pinia";
import {
  computed,
} from "vue";
import {
  useCollapseDirectory,
  useExpandDirectory,
} from "../api";
import {
  useFileExplorerStore,
} from "../store";
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
import FileTreeNodeName from "./file-tree-node-name.vue";
import FileTreeNodeTemplate from "./file-tree-node-template.vue";

const props = withDefaults(
  defineProps<{
    fileTreeNodes?: FileTreeNode[];
    parentPath?: string | null;
  }>(),
  {
    fileTreeNodes: () => [],
    parentPath: null,
  },
);

const fileExplorerStore = useFileExplorerStore();
const {
  creating,
} = storeToRefs(fileExplorerStore);

const dirNodes = computed(() => props.fileTreeNodes.filter(n => n.type === "directory"));
const fileNodes = computed(() => props.fileTreeNodes.filter(n => n.type === "file"));

const {
  mutateAsync: collapseDirectory,
} = useCollapseDirectory();
const {
  mutateAsync: expandDirectory,
} = useExpandDirectory();

function setSelectedNode(
  node: FileTreeNode,
  event: MouseEvent,
) {
  const nodeSnapshot = {
    ...node,
  };
  const isDirectory = nodeSnapshot.type === "directory";
  if (isDirectory) {
    nodeSnapshot.expanded = !nodeSnapshot.expanded;
  }
  const isMultiSelect = event.ctrlKey || event.metaKey;
  if (isMultiSelect) {
    fileExplorerStore.toggleSelectedNode(nodeSnapshot);
  }
  else {
    fileExplorerStore.setSelectedNode(nodeSnapshot);
  }
}

async function handleNodeClick(
  node: FileTreeNode,
  event: MouseEvent,
) {
  const isDirectory = node.type === "directory";
  if (isDirectory) {
    node.expanded ? await collapseDirectory(node.absolutePath) : await expandDirectory(node.absolutePath);
  }
  setSelectedNode(
    node,
    event,
  );
}
</script>

<template>
  <CreateFolder v-if="creating && creating.parentPath === parentPath && creating.type === 'directory'" />
  <div
    v-for="node in dirNodes"
    :key="node.key"
  >
    <FileTreeNodeTemplate
      :node="node"
      @click.stop="handleNodeClick(node, $event)"
    >
      <FileTreeNodeName :name="node.name" />
    </FileTreeNodeTemplate>
    <div
      v-if="node.expanded"
      class="ml-3"
    >
      <FileTreeNodes
        :file-tree-nodes="node.children"
        :parent-path="node.absolutePath"
      />
    </div>
  </div>
  <CreateFile v-if="creating && creating.parentPath === parentPath && creating.type === 'file'" />
  <div
    v-for="node in fileNodes"
    :key="node.key"
  >
    <FileTreeNodeTemplate
      :node="node"
      @click.stop="handleNodeClick(node, $event)"
    >
      <FileTreeNodeName :name="node.name" />
    </FileTreeNodeTemplate>
  </div>
</template>
