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
  useRenameItem,
} from "../api";
import {
  useFileExplorerStore,
} from "../store";
import CreateFile from "./create-file.vue";
import CreateFolder from "./create-folder.vue";
import FileTreeNodeInput from "./file-tree-node-input.vue";
import FileTreeNodeName from "./file-tree-node-name.vue";
import FileTreeNodeTemplate from "./file-tree-node-template.vue";
import NodeContextMenu from "./node-context-menu.vue";

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
  renaming,
} = storeToRefs(fileExplorerStore);

const dirNodes = computed(() => props.fileTreeNodes.filter(n => n.type === "directory"));
const fileNodes = computed(() => props.fileTreeNodes.filter(n => n.type === "file"));

const {
  mutateAsync: collapseDirectory,
} = useCollapseDirectory();
const {
  mutateAsync: expandDirectory,
} = useExpandDirectory();
const {
  mutateAsync: renameItem,
} = useRenameItem();

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

async function handleRename(
  node: FileTreeNode,
  newName: string,
) {
  await renameItem({
    path: node.absolutePath,
    newName,
  });
  fileExplorerStore.stopRenaming();
}
</script>

<template>
  <CreateFolder v-if="creating && creating.parentPath === parentPath && creating.type === 'directory'" />
  <div
    v-for="node in dirNodes"
    :key="node.key"
  >
    <NodeContextMenu :node="node">
      <FileTreeNodeTemplate
        :node="node"
        @click.stop="handleNodeClick(node, $event)"
      >
        <FileTreeNodeName
          v-if="renaming !== node.absolutePath"
          :name="node.name"
        />
        <FileTreeNodeInput
          v-else
          :initial-value="node.name"
          :on-blur="fileExplorerStore.stopRenaming"
          @submit="handleRename(node, $event)"
        />
      </FileTreeNodeTemplate>
    </NodeContextMenu>
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
    <NodeContextMenu :node="node">
      <FileTreeNodeTemplate
        :node="node"
        @click.stop="handleNodeClick(node, $event)"
      >
        <FileTreeNodeName
          v-if="renaming !== node.absolutePath"
          :name="node.name"
        />
        <FileTreeNodeInput
          v-else
          :initial-value="node.name"
          :on-blur="fileExplorerStore.stopRenaming"
          @submit="handleRename(node, $event)"
        />
      </FileTreeNodeTemplate>
    </NodeContextMenu>
  </div>
</template>
