import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  ActiveCopyCutMode,
  CopyAndCutModeState,
  CreateModeState,
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
    // Create Mode
    const createData = reactive<CreateModeState>({
      type: null,
      node: null,
    });

    const enableCreateMode = (
      type: FileTreeNode["type"],
      node: FileTreeNode | null = null,
    ) => {
      createData.type = type;
      createData.node = node;
    };

    const disableCreateMode = () => {
      createData.type = null;
      createData.node = null;
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
      // Create Mode
      createData,
      enableCreateMode,
      disableCreateMode,
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
