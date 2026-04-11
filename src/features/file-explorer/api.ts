import {
  collapseDirectory,
  createFile,
  createFolder,
  expandDirectory,
  getFileTree,
  getRootInfo,
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
