import type {
  FileTreeNode,
} from "@vast/file-explorer";

export function getDropPath(node: FileTreeNode | null) {
  const nodePath = node?.type === "directory" ? node.absolutePath : node?.parentPath;
  return nodePath;
}
