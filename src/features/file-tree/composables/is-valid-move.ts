import {
  getParentPath,
} from "./get-parent-path";

type IsValidMoveParams = {
  sourcePath: string;
  targetPath: string;
};

export function isValidMove({
  sourcePath,
  targetPath,
}: IsValidMoveParams): boolean {
  if (!sourcePath || !targetPath)
    return false;

  const sourceParentPath = getParentPath({
    absolutePath: sourcePath,
  });

  // Can't move to its own parent folder
  if (sourceParentPath === targetPath) {
    return false;
  }

  // Can't move a folder into its own sub-folder
  if (targetPath.startsWith(sourcePath) && sourcePath !== targetPath) {
    return false;
  }

  return true;
}
