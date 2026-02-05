import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  DragAndDropState,
} from "../types";
import {
  getFolderPath,
} from "./get-folder-path";

type IsValidMoveParams = Omit<DragAndDropState, "isDragging"> & {
  node: FileTreeNode;
};

export function isValidMove({
  source,
  target,
  node,
}: IsValidMoveParams): boolean {
  const targetPath = getFolderPath(target);
  const sourcePath = getFolderPath(source);
  const nodePath = getFolderPath(node);
  const targetToNodePath = target?.type === "directory" ? node.absolutePath : node?.parentPath;

  if (!targetPath || !sourcePath || !nodePath)
    return false;

  // Can't move to its own parent folder
  if (sourcePath === targetPath)
    return false;

  // // Can't move a folder into its own sub-folder and parent folder
  if (source?.type === "directory" && (targetPath.startsWith(source.absolutePath) || targetPath === source.parentPath))
    return false;

  if (targetPath === nodePath || targetPath === targetToNodePath)
    return true;

  return false;
}
