import {
  useToast,
} from "primevue/usetoast";

type toastFunctionPayload = {
  summary?: string;
  detail: string;
};

const TOAST_DEFAULT = {
  life: 1500,
};
export function useToastHook() {
  const toast = useToast();

  function successToast(payload: toastFunctionPayload) {
    toast.add({
      severity: "success",
      summary: payload.summary ?? "Success",
      detail: payload.detail,
      life: TOAST_DEFAULT.life,
    });
  }

  function errorToast(payload: toastFunctionPayload) {
    toast.add({
      severity: "error",
      summary: payload.summary ?? "Error",
      detail: payload.detail,
      life: TOAST_DEFAULT.life,
    });
  }

  return {
    successToast,
    errorToast,
  };
}
