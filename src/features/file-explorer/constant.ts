import type {
  FileTreeNode,
} from "@brickly/file-explorer";

export const dummyFileNode: FileTreeNode = {
  key: "",
  type: "file",
  name: "",
  absolutePath: "",
  parentPath: "",
  path: "",
  extension: "",
};

export const dummyFolderNode: FileTreeNode = {
  key: "",
  type: "directory",
  name: "",
  absolutePath: "",
  parentPath: "",
  path: "",
  childExpanded: false,
  expanded: false,
  children: [],
};
