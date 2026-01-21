import type {
  FileTreeNode,
} from "@vast/file-explorer";

export const FILE_TREE_STATES = {
  fileGap: "1rem",
  iconSize: "1rem",
};

export const dummyFileEntryNodeFile: FileTreeNode = {
  key: "",
  type: "file",
  name: "",
  absolutePath: "",
  path: "",
};

export const dummyFileEntryNodeFolder: FileTreeNode = {
  key: "",
  type: "directory",
  name: "",
  absolutePath: "",
  path: "",
  childExpanded: false,
  expanded: false,
  children: [],
};
