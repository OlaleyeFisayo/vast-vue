import type {
  AxiosError,
} from "axios";
import type {
  UseCopyCutPayload,
  UseCreatePayload,
  UseDeletePayload,
  UseRenamePayload,
} from "./types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import {
  collapseDirectory,
  copy,
  createFile,
  createFolder,
  deleteItem,
  expandDirectory,
  getFileTree,
  move,
  openInFileManager,
  rename,
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
      sourcePath,
      newPath,
    }: UseCopyCutPayload) => {
      await copy(
        sourcePath,
        newPath,
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

export function useMove() {
  const {
    errorToast,
  } = useToastHook();
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
      path,
    }: UseDeletePayload) => {
      await deleteItem(path);
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

export function useCreate() {
  const {
    errorToast,
  } = useToastHook();
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

export function useRename() {
  const {
    errorToast,
  } = useToastHook();
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

export function useOpenInFileManager() {
  const {
    errorToast,
  } = useToastHook();
  return useMutation({
    mutationFn: openInFileManager,
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
