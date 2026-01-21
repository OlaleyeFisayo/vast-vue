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
    const renameMode = ref(false);
    const renameData = ref<FileTreeNode | null>(null);
    const disableRenameMode = () => {
      renameMode.value = false;
      renameData.value = null;
    };
    const setRenameData = (node: FileTreeNode) => {
      renameData.value = node;
      renameMode.value = true;
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
      renameMode,
      renameData,
      disableRenameMode,
      setRenameData,
    };
  },
);
