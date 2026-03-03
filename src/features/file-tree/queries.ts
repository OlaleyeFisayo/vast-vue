import type {
  UseCopyCutPayload,
  UseCreatePayload,
  UseRenamePayload,
} from "./types";
import {
  queryClient,
} from "@shared/utils/query-client";
import {
  useMutation,
  useQuery,
} from "@tanstack/vue-query";
import {
  collapseDirectory,
  copy,
  createFile,
  createFolder,
  deleteItem,
  expandDirectory,
  getFileTree,
  getRootInfo,
  move,
  openInFileManager,
  rename,
} from "@vast/file-explorer";
import {
  useFileTreeStore,
} from "./store";
import {
  API_KEY,
} from "./variables";

export function useGetRootInfo() {
  const fileTreeStore = useFileTreeStore();
  return useQuery({
    queryKey: API_KEY.fileName,
    queryFn: async () => {
      const data = await getRootInfo();
      fileTreeStore.setRootPath(data.rootPath);
      return data;
    },
    staleTime: Infinity,
  });
}

export function useFileTree() {
  return useQuery({
    queryKey: API_KEY.fileTree,
    queryFn: getFileTree,
    staleTime: Infinity,
  });
}

export function useExpandDirectory() {
  return useMutation({
    mutationFn: expandDirectory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: API_KEY.fileTree,
      });
    },
  });
}

export function useCollapseDirectory() {
  return useMutation({
    mutationFn: collapseDirectory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: API_KEY.fileTree,
      });
    },
  });
}

export function useCopy() {
  return useMutation({
    mutationFn: async ({
      sourcePath,
      newPath,
    }: UseCopyCutPayload) => {
      await copy(
        sourcePath,
        newPath,
      );
    },
  });
}

export function useMove() {
  return useMutation({
    mutationFn: async ({
      sourcePath,
      newPath,
    }: UseCopyCutPayload) => {
      await move(
        sourcePath,
        newPath,
      );
    },
  });
}

export function useDelete() {
  return useMutation({
    mutationFn: deleteItem,
  });
}

export function useCreate() {
  return useMutation({
    mutationFn: async ({
      type,
      name,
      path,
    }: UseCreatePayload) => {
      if (type === "file") {
        await createFile(
          name,
          path,
        );
      }
      else {
        await createFolder(
          name,
          path,
        );
      }
    },
  });
}

export function useRename() {
  return useMutation({
    mutationFn: async ({
      path,
      name,
    }: UseRenamePayload) => {
      await rename(
        path,
        name,
      );
    },
  });
}

export function useOpenInFileManager() {
  return useMutation({
    mutationFn: openInFileManager,
  });
}
