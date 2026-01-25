import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  useDelete,
} from "../queries";

export async function deleteFileEntry(
  deleteFn: ReturnType<typeof useDelete>,
  type: FileTreeNode["type"],
  path: string,
) {
  await deleteFn.mutateAsync({
    type,
    path,
  });
}
