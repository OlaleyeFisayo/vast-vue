import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  ActiveCopyCutMode,
  CopyAndCutModeState,
} from "./types";
import {
  defineStore,
} from "pinia";
import {
  reactive,
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

    // Copy and Cut Mode
    const copyAndCutData = reactive<CopyAndCutModeState>({
      mode: null,
      source: null,
    });
    const enableCopyAndCutMode = (
      mode: ActiveCopyCutMode,
      source: FileTreeNode,
    ) => {
      copyAndCutData.mode = mode;
      copyAndCutData.source = source;
    };
    const disableCopyAndCutMode = () => {
      copyAndCutData.mode = null;
      copyAndCutData.source = null;
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
      // Copy and Cut Mode
      copyAndCutData,
      enableCopyAndCutMode,
      disableCopyAndCutMode,
    };
  },
);
