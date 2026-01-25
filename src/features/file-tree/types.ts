import type {
  FileTreeNode,
} from "@vast/file-explorer";

export type ActiveCopyCutMode = "cut" | "copy";

export type CopyAndCutModeState = {
  mode: ActiveCopyCutMode | null;
  source: FileTreeNode | null;
};

export type CreateModeState = {
  type: FileTreeNode["type"] | null;
  node: FileTreeNode | null;
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
