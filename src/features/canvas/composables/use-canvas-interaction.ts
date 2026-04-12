import type {
  Ref,
} from "vue";
import {
  useEventListener,
} from "@vueuse/core";
import {
  ref,
} from "vue";
import {
  useCanvasStore,
  ZOOM_MAX,
  ZOOM_MIN,
} from "../store";

const WHEEL_ZOOM_STEP = 0.05;

function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(
    Math.max(
      value,
      min,
    ),
    max,
  );
}

export function useCanvasInteraction(containerRef: Ref<HTMLElement | null>) {
  const store = useCanvasStore();
  const isPanning = ref(false);

  let dragStartX = 0;
  let dragStartY = 0;
  let activePointerId: number | null = null;

  useEventListener(
    containerRef,
    "pointerdown",
    (event: PointerEvent) => {
      if (event.target !== containerRef.value)
        return;

      isPanning.value = true;
      activePointerId = event.pointerId;
      dragStartX = event.clientX - store.translateX;
      dragStartY = event.clientY - store.translateY;

      containerRef.value?.setPointerCapture(event.pointerId);
      event.preventDefault();
    },
  );

  useEventListener(
    window,
    "pointermove",
    (event: PointerEvent) => {
      if (!isPanning.value || event.pointerId !== activePointerId)
        return;

      store.setTransform(
        event.clientX - dragStartX,
        event.clientY - dragStartY,
        store.scale,
      );
    },
  );

  function stopPanning() {
    isPanning.value = false;
    activePointerId = null;
  }

  useEventListener(
    window,
    "pointerup",
    stopPanning,
  );
  useEventListener(
    window,
    "pointercancel",
    stopPanning,
  );

  useEventListener(
    containerRef,
    "wheel",
    (event: WheelEvent) => {
      event.preventDefault();

      const container = containerRef.value;
      if (!container)
        return;

      if (event.ctrlKey || event.metaKey) {
        // Ctrl/Cmd + scroll → zoom toward cursor
        const rect = container.getBoundingClientRect();
        const cursorX = event.clientX - rect.left;
        const cursorY = event.clientY - rect.top;

        const pointX = (cursorX - store.translateX) / store.scale;
        const pointY = (cursorY - store.translateY) / store.scale;

        const delta = event.deltaY < 0 ? WHEEL_ZOOM_STEP : -WHEEL_ZOOM_STEP;
        const newScale = clamp(
          store.scale + delta,
          ZOOM_MIN,
          ZOOM_MAX,
        );

        store.setTransform(
          cursorX - pointX * newScale,
          cursorY - pointY * newScale,
          newScale,
        );
      }
      else {
        // Plain scroll → pan (Shift+scroll pans horizontally)
        const dx = event.shiftKey ? -event.deltaY : -event.deltaX;
        const dy = event.shiftKey ? 0 : -event.deltaY;

        store.setTransform(
          store.translateX + dx,
          store.translateY + dy,
          store.scale,
        );
      }
    },
    {
      passive: false,
    },
  );

  return {
    isPanning,
  };
}
