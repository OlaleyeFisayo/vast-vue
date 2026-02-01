import {
  ref,
} from "vue";

const dropZoneTargetPath = ref<string | null>(null);
const draggedSourcePath = ref<string | null>(null);
const isDragging = ref(false);

export function useDropZoneTargetPath() {
  const setDropZoneTargetPath = (path: string | null) => {
    dropZoneTargetPath.value = path;
  };

  const setDraggedSourcePath = (path: string | null) => {
    draggedSourcePath.value = path;
  };

  const setIsDragging = (status: boolean) => {
    isDragging.value = status;
    if (!status) {
      draggedSourcePath.value = null;
    }
  };

  return {
    dropZoneTargetPath,
    setDropZoneTargetPath,
    draggedSourcePath,
    setDraggedSourcePath,
    isDragging,
    setIsDragging,
  };
}
