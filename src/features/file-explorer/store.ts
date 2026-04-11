import type {
  FileTreeNode,
} from "@brickly/file-explorer";
import {
  defineStore,
} from "pinia";
import {
  ref,
} from "vue";

export const useFileExplorerStore = defineStore(
  "file-explorer",
  () => {
    const selectedNodes = ref<FileTreeNode[]>([]);
    const creating = ref<{ type: FileTreeNode["type"]; parentPath: string | null } | null>(null);
    function setSelectedNode(node: FileTreeNode) {
      selectedNodes.value = [node];
    }
    function toggleSelectedNode(node: FileTreeNode) {
      const idx = selectedNodes.value.findIndex(n => n.key === node.key);
      if (idx === -1) {
        selectedNodes.value = [...selectedNodes.value, node];
      }
      else {
        selectedNodes.value = selectedNodes.value.filter(n => n.key !== node.key);
      }
    }
    function startCreating(
      type: FileTreeNode["type"],
      parentPath: string | null = null,
    ) {
      creating.value = {
        type,
        parentPath,
      };
    }
    function clearSelectedNodes() {
      selectedNodes.value = [];
    }

    function stopCreating() {
      creating.value = null;
    }

    return {
      selectedNodes,
      creating,
      setSelectedNode,
      toggleSelectedNode,
      clearSelectedNodes,
      startCreating,
      stopCreating,
    };
  },
  {
    persist: {
      key: "brickly:selectedNodes",
      pick: ["selectedNodes"],
    },
  },
);
