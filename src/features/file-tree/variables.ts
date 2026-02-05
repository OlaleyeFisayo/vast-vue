import type {
  FileTreeNode,
} from "@vast/file-explorer";

export const FILE_TREE_STATES = {
  fileGap: "1rem !important",
  iconSize: "1rem !important",
};

export const dummyFileEntryNodeFile: FileTreeNode = {
  key: "",
  type: "file",
  name: "",
  absolutePath: "",
  parentPath: "",
  path: "",
};

export const dummyFileEntryNodeFolder: FileTreeNode = {
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
