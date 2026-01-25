import type {
  FileTreeNode,
} from "@vast/file-explorer";

export type ActiveCopyCutMode = "cut" | "copy";

export type CopyAndCutModeState = {
  mode: ActiveCopyCutMode | null;
  source: FileTreeNode | null;
};

export type UseCopyCutPayload = {
  type: FileTreeNode["type"];
  sourcePath: string;
  newPath?: string;
};

export type UseDeletePayload = {
  type: FileTreeNode["type"];
  path: string;
};
