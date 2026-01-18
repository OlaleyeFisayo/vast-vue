import type {
  ActivityBarItems,
} from "../types";
import {
  IconFile,
} from "@tabler/icons-vue";
import FileTree from "../../file-tree/component/file-tree.vue";

export const ActivityBarList: ActivityBarItems[] = [
  {
    title: "Files",
    Icon: IconFile,
    view: FileTree,
  },
];
