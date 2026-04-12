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
    // Selected node`
    const selectedNodes = ref<FileTreeNode[]>([]);
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

    // Creating Mode
    const creating = ref<{ type: FileTreeNode["type"]; parentPath: string | null } | null>(null);
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

    // Renaming Mode
    const renaming = ref<string | null>(null);
    function startRenaming(nodePath: string) {
      renaming.value = nodePath;
    }
    function stopRenaming() {
      renaming.value = null;
    }

    // Clipboard
    const clipboard = ref<{ operation: "cut" | "copy"; node: FileTreeNode } | null>(null);
    function setCut(node: FileTreeNode) {
      clipboard.value = {
        operation: "cut",
        node,
      };
    }
    function setCopy(node: FileTreeNode) {
      clipboard.value = {
        operation: "copy",
        node,
      };
    }
    function clearClipboard() {
      clipboard.value = null;
    }

    return {
      selectedNodes,
      creating,
      renaming,
      clipboard,
      setSelectedNode,
      toggleSelectedNode,
      clearSelectedNodes,
      startCreating,
      stopCreating,
      startRenaming,
      stopRenaming,
      setCut,
      setCopy,
      clearClipboard,
    };
  },
  {
    persist: {
      key: "brickly:selectedNodes",
      pick: ["selectedNodes"],
    },
  },
);
