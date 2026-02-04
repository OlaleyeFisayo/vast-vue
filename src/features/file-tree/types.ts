import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type FileContextMenu from "./component/file-context-menu.vue";
import type FileTreeInput from "./component/file-tree-input.vue";

export type ActiveCopyCutMode = "cut" | "copy";

export type CopyAndCutModeState = {
  mode: ActiveCopyCutMode | null;
  source: FileTreeNode | null;
};

export type CreateModeState = {
  type: FileTreeNode["type"] | null;
  node: FileTreeNode | null;
};

export type DragAndDropState = {
  isDragging: boolean;
  source: FileTreeNode | null;
  target: FileTreeNode | null;
};

export type UseCopyCutPayload = {
  sourcePath: string;
  newPath?: string;
};

export type UseCreatePayload = {
  type: FileTreeNode["type"];
  name: string;
  path?: string;
};

export type UseRenamePayload = {
  path: string;
  name: string;
};

export type FileContextMenuRefType = InstanceType<typeof FileContextMenu>;
export type FileTreeInputType = InstanceType<typeof FileTreeInput>;
