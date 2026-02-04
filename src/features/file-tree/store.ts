import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  ActiveCopyCutMode,
  CopyAndCutModeState,
  CreateModeState,
  DragAndDropState,
  FileContextMenuRefType,
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
    // Tracking Selected node
    const selectedNode = ref<FileTreeNode | null>(null);
    const setSelectedNode = (node: FileTreeNode | null) => selectedNode.value = node;

    // File Entry ContextMenu
    const fileContextMenuRef = ref<FileContextMenuRefType | null>(null);
    const setFileContentMenuRef = (el: any) => {
      fileContextMenuRef.value = el;
    };
    function toggleFileContextMenu(
      event: MouseEvent,
      node: FileTreeNode,
    ) {
      setSelectedNode(node);
      fileContextMenuRef.value?.show(event);
    }

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

    // Drag and Drop
    const DragAndDropData = reactive<DragAndDropState>({
      isDragging: false,
      source: null,
      target: null,
    });
    const setDragAndDropData = ({
      isDragging,
      source,
      target,
    }: Partial<NonNullable<DragAndDropState>>) => {
      if (isDragging) {
        DragAndDropData.isDragging = isDragging;
      }
      if (source) {
        DragAndDropData.source = source;
      }
      if (target) {
        DragAndDropData.target = target;
      }
    };
    const resetDragAndDropData = () => {
      DragAndDropData.target = null;
      DragAndDropData.source = null;
      DragAndDropData.isDragging = false;
      setSelectedNode(null);
    };

    return {
      // Tracking Selected node
      selectedNode,
      setSelectedNode,
      // File Entry ContextMenu
      fileContextMenuRef,
      setFileContentMenuRef,
      toggleFileContextMenu,
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
      // Drag and Drop
      DragAndDropData,
      setDragAndDropData,
      resetDragAndDropData,
    };
  },
);
