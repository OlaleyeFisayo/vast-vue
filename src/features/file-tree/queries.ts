import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import {
  collapseDirectory,
  expandDirectory,
  getFileTree,
} from "@vast/file-explorer";

export function useGetFileTree() {
  return useQuery({
    queryKey: ["fileTree"],
    queryFn: getFileTree,
    staleTime: 3600000,
  });
}

export function useExportDirectory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expandDirectory,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["fileTree"],
        data,
      );
    },
  });
}

export function useCollapseDirectory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: collapseDirectory,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["fileTree"],
        data,
      );
    },
  });
}
