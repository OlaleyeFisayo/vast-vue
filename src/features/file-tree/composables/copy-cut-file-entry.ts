import type {
  FileTreeNode,
} from "@vast/file-explorer";
import type {
  useCopy,
  useExpandDirectory,
  useMove,
} from "../queries";
import type {
  ActiveCopyCutMode,
} from "../types";

export async function copyCutFileEntry(
  copy: ReturnType<typeof useCopy>,
  move: ReturnType<typeof useMove>,
  mode: ActiveCopyCutMode,
  source: FileTreeNode,
  newPath?: FileTreeNode,
  expandDirectory?: ReturnType<typeof useExpandDirectory>,
) {
  if (newPath && newPath.type === "directory" && newPath.expanded === false && expandDirectory) {
    await expandDirectory.mutateAsync(newPath.absolutePath);
  }
  if (mode === "copy") {
    await copy.mutateAsync({
      type: source.type,
      sourcePath: source.absolutePath,
      newPath: newPath?.absolutePath,
    });
  }
  else if (mode === "cut") {
    await move.mutateAsync({
      type: source.type,
      sourcePath: source.absolutePath,
      newPath: newPath?.absolutePath,
    });
  }
}
