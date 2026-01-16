import type {
  Icon,
} from "@tabler/icons-vue";

export type ActivityBarItemsTitle = "Files"
  | "Components";

export type ActivityBarItems = {
  title: ActivityBarItemsTitle;
  Icon: Icon;
};
