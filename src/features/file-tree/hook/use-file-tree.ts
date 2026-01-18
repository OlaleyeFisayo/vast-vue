import type {
  FileTreeNode,
} from "@vast/file-explorer/types";
import {
  getFileTree,
  onFileTreeUpdate,
} from "@vast/file-explorer";
import {
  onBeforeMount,
  ref,
} from "vue";

export function useFileTree() {
  const FileTree = ref<FileTreeNode[]>([]);

  const fetchTree = async () => {
    const data = await getFileTree();
    FileTree.value = data;
  };

  onBeforeMount(async () => {
    fetchTree();
    onFileTreeUpdate(() => {
      fetchTree();
    });
  });

  return {
    FileTree,
  };
}
