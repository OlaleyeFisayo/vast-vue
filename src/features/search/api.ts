import type {
  Ref,
} from "vue";
import {
  searchFiles,
} from "@brickly/file-explorer";
import {
  queryOptions,
} from "@tanstack/vue-query";

const SEARCH_QUERY_KEYS = {
  searchQuery: (value: string) => ["search", value],
};

export function useSearchFiles(query: Ref<string>) {
  return queryOptions(() => ({
    queryKey: SEARCH_QUERY_KEYS.searchQuery(query.value),
    queryFn: () => searchFiles(query.value),
    enabled: () => query.value.length > 0,
  }));
}
