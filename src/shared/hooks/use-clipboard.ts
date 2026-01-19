import {
  useToastHook,
} from "./use-toast-hook";

export function useClipboard() {
  const {
    successToast,
    errorToast,
  } = useToastHook();

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      successToast({
        detail: "Copied",
      });
    }
    catch {
      errorToast({
        detail: "Failed to copy",
      });
    }
  };

  return {
    copyToClipboard,
  };
}
