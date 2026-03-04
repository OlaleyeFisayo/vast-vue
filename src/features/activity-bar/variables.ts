import type {
  ActivityBarItems,
} from "./types";
import FileTreeContainer from "@features/file-tree/component/file-tree-container.vue";
import {
  IconComponents,
  IconFile,
} from "@tabler/icons-vue";

export const ActivityBarList: ActivityBarItems[] = [
  {
    title: "Files",
    Icon: IconFile,
    view: FileTreeContainer,
  },
  {
    title: "Components",
    Icon: IconComponents,
    view: FileTreeContainer,
  },
];
