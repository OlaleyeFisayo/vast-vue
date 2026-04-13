import type {
  Ref,
} from "vue";
import {
  getRootInfo,
} from "@brickly/file-explorer";
import {
  ref,
  watchEffect,
} from "vue";

const PATH_LEADING_SEP_RE = /^[\\/]/;
const BACKSLASH_RE = /\\/g;

let rootInfoPromise: ReturnType<typeof getRootInfo> | null = null;

function getCachedRootInfo(): ReturnType<typeof getRootInfo> {
  if (!rootInfoPromise) {
    rootInfoPromise = getRootInfo();
  }
  return rootInfoPromise;
}

export function useComponentPreviewUrl(filePath: Ref<string>) {
  const previewUrl = ref<string | null>(null);

  watchEffect(async () => {
    const path = filePath.value;
    if (!path)
      return;

    const {
      rootPath,
    } = await getCachedRootInfo();
    const relative = path.startsWith(rootPath)
      ? path.slice(rootPath.length).replace(
          PATH_LEADING_SEP_RE,
          "",
        ).replace(
          BACKSLASH_RE,
          "/",
        )
      : path.replace(
          BACKSLASH_RE,
          "/",
        );

    previewUrl.value = `/preview.html?vueFile=${encodeURIComponent(relative)}`;
  });

  return {
    previewUrl,
  };
}
