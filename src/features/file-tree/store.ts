import {
  defineStore,
} from "pinia";
import {
  ref,
} from "vue";

export const useFileTreeStore = defineStore(
  "fileTree",
  () => {
    const createFileMode = ref(false);
    const enableCreateFileMode = () => {
      createFileMode.value = true;
    };
    const disableCreateFileMode = () => {
      createFileMode.value = false;
    };

    const createFolderMode = ref(false);
    const enableCreateFolderMode = () => {
      createFolderMode.value = true;
    };
    const disableCreateFolderMode = () => {
      createFolderMode.value = false;
    };

    return {
      createFileMode,
      enableCreateFileMode,
      disableCreateFileMode,
      createFolderMode,
      enableCreateFolderMode,
      disableCreateFolderMode,
    };
  },
);
