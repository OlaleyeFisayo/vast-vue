import {
  useQuery,
} from "@tanstack/vue-query";
import {
  getRootPathBasename,
} from "@vast/file-explorer";

export function useGetRootPathBasename() {
  return useQuery({
    queryKey: ["fileName"],
    queryFn: getRootPathBasename,
    staleTime: 3600000,
  });
}
