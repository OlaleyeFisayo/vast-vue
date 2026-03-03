import type {
  useExpandDirectory,
} from "../queries";
import type {
  useFileTreeStore,
} from "../store";

type FileTreeStoreReturnType = ReturnType<typeof useFileTreeStore>;

export type HandleCreateModePayload = {
  fileTreeStore: FileTreeStoreReturnType;
  type: Parameters<FileTreeStoreReturnType["enableCreateMode"]>[0];
  expandDirectory: ReturnType<typeof useExpandDirectory>;
};

export async function handleCreateMode({
  fileTreeStore,
  type,
  expandDirectory,
}: HandleCreateModePayload) {
  const node = fileTreeStore.selectedNode;
  if (!node) {
    fileTreeStore.enableCreateMode(type);
    return;
  }

  if (node.type === "directory" && !node.expanded) {
    await expandDirectory.mutateAsync(node.absolutePath);
  }
  fileTreeStore.enableCreateMode(
    type,
    node,
  );
}
