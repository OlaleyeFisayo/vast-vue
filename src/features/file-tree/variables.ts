import type {
  FileTreeNode,
} from "@vast/file-explorer";

export const FILE_TREE_STATES = {
  fileGap: "1rem",
  // This is meant to be double of what ever file gap is
  createEntryFileGap: "2rem",
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
