import type {
  FileTreeNode,
} from "@vast/file-explorer";

export type ActiveCopyCutMode = "cut" | "copy";

export type CopyAndCutModeState = {
  mode: ActiveCopyCutMode | null;
  source: FileTreeNode | null;
};

export type useCopyPayload = {
  type: FileTreeNode["type"];
  sourcePath: string;
  newPath?: string;
};
