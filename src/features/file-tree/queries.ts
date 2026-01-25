import type {
  AxiosError,
} from "axios";
import type {
  UseCopyCutPayload,
  UseDeletePayload,
} from "./types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import {
  collapseDirectory,
  copyFile,
  copyFolder,
  deleteFile,
  deleteFolder,
  expandDirectory,
  getFileTree,
  moveFile,
  moveFolder,
} from "@vast/file-explorer";
import {
  useToastHook,
} from "../../shared/hooks/use-toast-hook";

export function useGetFileTree() {
  return useQuery({
    queryKey: ["fileTree"],
    queryFn: getFileTree,
    staleTime: 3600000,
  });
}

export function useExpandDirectory() {
  const queryClient = useQueryClient();
  const {
    errorToast,
  } = useToastHook();
  return useMutation({
    mutationFn: expandDirectory,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["fileTree"],
        data,
      );
    },
    onError: (error: AxiosError<{
      message: string;
    }>) => {
      const errorMessage = error?.response?.data ? error.response.data.message : error.message;
      errorToast({
        detail: errorMessage,
      });
    },
  });
}

export function useCollapseDirectory() {
  const queryClient = useQueryClient();
  const {
    errorToast,
  } = useToastHook();
  return useMutation({
    mutationFn: collapseDirectory,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["fileTree"],
        data,
      );
    },
    onError: (error: AxiosError<{
      message: string;
    }>) => {
      const errorMessage = error?.response?.data ? error.response.data.message : error.message;
      errorToast({
        detail: errorMessage,
      });
    },
  });
}

export function useCopy() {
  const {
    errorToast,
  } = useToastHook();
  return useMutation({
    mutationFn: async ({
      type,
      sourcePath,
      newPath,
    }: UseCopyCutPayload) => {
      if (type === "file") {
        await copyFile(
          sourcePath,
          newPath,
        );
      }
      if (type === "directory") {
        await copyFolder(
          sourcePath,
          newPath,
        );
      }
    },
    onError: (error: AxiosError<{
      message: string;
    }>) => {
      const errorMessage = error?.response?.data ? error.response.data.message : error.message;
      errorToast({
        detail: errorMessage,
      });
    },
  });
}

export function useMove() {
  const {
    errorToast,
  } = useToastHook();
  return useMutation({
    mutationFn: async ({
      type,
      sourcePath,
      newPath,
    }: UseCopyCutPayload) => {
      if (type === "file") {
        await moveFile(
          sourcePath,
          newPath,
        );
      }
      if (type === "directory") {
        await moveFolder(
          sourcePath,
          newPath,
        );
      }
    },
    onError: (error: AxiosError<{
      message: string;
    }>) => {
      const errorMessage = error?.response?.data ? error.response.data.message : error.message;
      errorToast({
        detail: errorMessage,
      });
    },
  });
}

export function useDelete() {
  const {
    errorToast,
  } = useToastHook();
  return useMutation({
    mutationFn: async ({
      type,
      path,
    }: UseDeletePayload) => {
      if (type === "directory")
        await deleteFolder(path);
      else await deleteFile(path);
    },
    onError: (error: AxiosError<{
      message: string;
    }>) => {
      const errorMessage = error?.response?.data ? error.response.data.message : error.message;
      errorToast({
        detail: errorMessage,
      });
    },
  });
}
