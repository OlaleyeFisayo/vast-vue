export function getParentPath(item: { absolutePath: string }) {
  const path = item.absolutePath;
  const separator = path.includes("/") ? "/" : "\\";
  const lastSeparatorIndex = path.lastIndexOf(separator);

  if (lastSeparatorIndex <= 0) {
    return separator;
  }
  return path.substring(
    0,
    lastSeparatorIndex,
  );
}
