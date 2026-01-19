import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  collapseDirectory,
  expandDirectory,
  getFileTree,
  onFileTreeUpdate,
} from "@vast/file-explorer";
import {
  onBeforeMount,
  ref,
} from "vue";

export function useFileTree() {
  const TreeNodes = ref<FileTreeNode[]>([]);

  const fetchTree = async () => {
    const data = await getFileTree();
    TreeNodes.value = data;
  };

  const expand = async (path: string) => {
    const data = await expandDirectory(path);
    TreeNodes.value = data;
  };

  const collapse = async (path: string) => {
    const data = await collapseDirectory(path);
    TreeNodes.value = data;
  };

  onBeforeMount(async () => {
    await fetchTree();
    onFileTreeUpdate(async () => {
      await fetchTree();
    });
  });

  return {
    TreeNodes,
    collapse,
    expand,
  };
}
