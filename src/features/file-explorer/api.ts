import {
  collapseDirectory,
  copy,
  copyItems,
  createFile,
  createFolder,
  deleteItem,
  deleteItems,
  expandDirectory,
  getFileTree,
  getRootInfo,
  move,
  moveItems,
  openInFileManager,
  openInIde,
  rename,
} from "@brickly/file-explorer";
import {
  queryOptions,
  useMutation,
} from "@tanstack/vue-query";
import {
  queryClient,
} from "@/shared/lib/query-client";

export const FILE_EXPLORER_QUERY_KEYS = {
  rootInfo: ["rootInfo"],
  fileTreeNodes: ["fileTreeNodes"],
};

export function rootInfoQueryOptions() {
  return queryOptions({
    queryKey: FILE_EXPLORER_QUERY_KEYS.rootInfo,
    queryFn: getRootInfo,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function fileTreeNodesQueryOptions() {
  return queryOptions({
    queryKey: FILE_EXPLORER_QUERY_KEYS.fileTreeNodes,
    queryFn: getFileTree,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useCollapseDirectory() {
  return useMutation({
    mutationFn: collapseDirectory,
    onSuccess: (data) => {
      queryClient.setQueryData(
        FILE_EXPLORER_QUERY_KEYS.fileTreeNodes,
        data,
      );
    },
  });
}

export function useExpandDirectory() {
  return useMutation({
    mutationFn: expandDirectory,
    onSuccess: (data) => {
      queryClient.setQueryData(
        FILE_EXPLORER_QUERY_KEYS.fileTreeNodes,
        data,
      );
    },
  });
}

export function useCreateFile() {
  return useMutation({
    mutationFn: (payload: { name: string; dirPath?: string }) =>
      createFile(
        payload.name,
        payload.dirPath,
      ),
  });
}

export function useCreateFolder() {
  return useMutation({
    mutationFn: (payload: { name: string; dirPath?: string }) =>
      createFolder(
        payload.name,
        payload.dirPath,
      ),
  });
}

export function useDeleteItem() {
  return useMutation({
    mutationFn: (path: string) => deleteItem(path),
  });
}

export function useDeleteItems() {
  return useMutation({
    mutationFn: (paths: string[]) => deleteItems(paths),
  });
}

export function useCopyItems() {
  return useMutation({
    mutationFn: (items: { sourcePath: string; destinationDir?: string }[]) => copyItems(items),
  });
}

export function useMoveItems() {
  return useMutation({
    mutationFn: (items: { sourcePath: string; destinationDir?: string }[]) => moveItems(items),
  });
}

export function useOpenInFileManager() {
  return useMutation({
    mutationFn: (path: string) => openInFileManager(path),
  });
}

export function useOpenInIde() {
  return useMutation({
    mutationFn: (path: string) => openInIde(path),
  });
}

export function useRenameItem() {
  return useMutation({
    mutationFn: (payload: { path: string; newName: string }) =>
      rename(
        payload.path,
        payload.newName,
      ),
  });
}

export function useCopyItem() {
  return useMutation({
    mutationFn: (payload: { sourcePath: string; destinationDir?: string }) =>
      copy(
        payload.sourcePath,
        payload.destinationDir,
      ),
  });
}

export function useMoveItem() {
  return useMutation({
    mutationFn: (payload: { sourcePath: string; destinationDir?: string }) =>
      move(
        payload.sourcePath,
        payload.destinationDir,
      ),
  });
}
