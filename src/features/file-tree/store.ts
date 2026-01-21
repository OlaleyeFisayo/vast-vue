import type {
  FileTreeNode,
} from "@vast/file-explorer";
import {
  defineStore,
} from "pinia";
import {
  ref,
} from "vue";

export const useFileTreeStore = defineStore(
  "fileTree",
  () => {
    // Create File Mode
    const createFileMode = ref(false);
    const enableCreateFileMode = () => {
      createFileMode.value = true;
    };
    const disableCreateFileMode = () => {
      createFileMode.value = false;
    };

    // Create Folder Mode
    const createFolderMode = ref(false);
    const enableCreateFolderMode = () => {
      createFolderMode.value = true;
    };
    const disableCreateFolderMode = () => {
      createFolderMode.value = false;
    };

    // Rename Mode
    const renameData = ref<FileTreeNode | null>(null);
    const disableRenameMode = () => {
      renameData.value = null;
    };
    const enableRenameMode = (node: FileTreeNode) => {
      renameData.value = node;
    };

    return {
      // Create File Mode
      createFileMode,
      enableCreateFileMode,
      disableCreateFileMode,
      // Create Folder Mode
      createFolderMode,
      enableCreateFolderMode,
      disableCreateFolderMode,
      // Rename Mode
      renameData,
      disableRenameMode,
      enableRenameMode,
    };
  },
);
