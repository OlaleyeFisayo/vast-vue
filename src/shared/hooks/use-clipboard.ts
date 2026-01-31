import {
  useClipboard as useVueUseClipboard,
} from "@vueuse/core";
import {
  useToastHook,
} from "./use-toast-hook";

export function useClipboard() {
  const {
    successToast,
    errorToast,
  } = useToastHook();
  const {
    copy,
    copied,
    isSupported,
  } = useVueUseClipboard();

  const copyToClipboard = async (value: string) => {
    await copy(value);
    if (!isSupported) {
      errorToast({
        detail: "Your browser does not support Clipboard API",
      });
    }
    if (!copied) {
      errorToast({
        detail: "Failed to Copy",
      });
    }
    if (copied) {
      successToast({
        detail: `Copied`,
      });
    }
  };

  return {
    copyToClipboard,
  };
}
