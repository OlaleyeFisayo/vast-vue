import {
  defineStore,
} from "pinia";
import {
  computed,
  ref,
} from "vue";

export const ZOOM_MIN = 0.1;
export const ZOOM_MAX = 2.0;
export const ZOOM_STEP = 0.1;

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

export const useCanvasStore = defineStore(
  "canvas",
  () => {
    const translateX = ref(0);
    const translateY = ref(0);
    const scale = ref(1);

    const zoomPercent = computed(() => Math.round(scale.value * 100));

    const cssTransform = computed(() => `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`);

    function setTransform(
      tx: number,
      ty: number,
      s: number,
    ) {
      translateX.value = tx;
      translateY.value = ty;
      scale.value = clamp(
        s,
        ZOOM_MIN,
        ZOOM_MAX,
      );
    }

    function zoomIn() {
      setTransform(
        translateX.value,
        translateY.value,
        scale.value + ZOOM_STEP,
      );
    }

    function zoomOut() {
      setTransform(
        translateX.value,
        translateY.value,
        scale.value - ZOOM_STEP,
      );
    }

    function resetView() {
      setTransform(
        0,
        0,
        1,
      );
    }

    return {
      translateX,
      translateY,
      scale,
      zoomPercent,
      cssTransform,
      setTransform,
      zoomIn,
      zoomOut,
      resetView,
    };
  },
);
