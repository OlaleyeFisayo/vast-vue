import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from "vue";

export function useCanvas(canvasEl: Readonly<ReturnType<typeof ref<HTMLDivElement | null>>>) {
  const offset = reactive({
    x: 0,
    y: 0,
  });
  const scale = ref(1);
  const isPanning = ref(false);
  const isSpaceHeld = ref(false);
  const lastMouse = reactive({
    x: 0,
    y: 0,
  });

  // Space key tracking
  function onKeydown(e: KeyboardEvent) {
    if (e.code === "Space" && !e.repeat) {
      e.preventDefault();
      isSpaceHeld.value = true;
    }
  }

  function onKeyup(e: KeyboardEvent) {
    if (e.code === "Space") {
      isSpaceHeld.value = false;
      isPanning.value = false;
    }
  }

  // Mouse pan (space + drag, or middle mouse)
  function onMousedown(e: MouseEvent) {
    if (e.button === 1 || (e.button === 0 && isSpaceHeld.value)) {
      e.preventDefault();
      isPanning.value = true;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    }
  }

  function onMousemove(e: MouseEvent) {
    if (!isPanning.value)
      return;
    offset.x += e.clientX - lastMouse.x;
    offset.y += e.clientY - lastMouse.y;
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  }

  function onMouseup(e: MouseEvent) {
    if (e.button === 1 || e.button === 0)
      isPanning.value = false;
  }

  // Wheel: Ctrl = zoom, otherwise = pan (trackpad two-finger scroll)
  function onWheel(e: WheelEvent) {
    e.preventDefault();

    if (e.ctrlKey) {
      // Zoom
      const zoomFactor = e.deltaY < 0 ? 1.05 : 0.95;
      const newScale = Math.min(
        Math.max(
          scale.value * zoomFactor,
          0.1,
        ),
        10,
      );
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      offset.x = mouseX - (mouseX - offset.x) * (newScale / scale.value);
      offset.y = mouseY - (mouseY - offset.y) * (newScale / scale.value);
      scale.value = newScale;
    }
    else {
      // Pan
      offset.x -= e.deltaX;
      offset.y -= e.deltaY;
    }
  }

  function zoomBy(factor: number) {
    const newScale = Math.min(
      Math.max(
        scale.value * factor,
        0.1,
      ),
      10,
    );
    // Zoom centered on canvas center
    const el = canvasEl.value;
    if (!el)
      return;
    const cx = el.clientWidth / 2;
    const cy = el.clientHeight / 2;
    offset.x = cx - (cx - offset.x) * (newScale / scale.value);
    offset.y = cy - (cy - offset.y) * (newScale / scale.value);
    scale.value = newScale;
  }

  const zoomIn = () => zoomBy(1.1);
  const zoomOut = () => zoomBy(0.9);

  const transform = () =>
    `translate(${offset.x}px, ${offset.y}px) scale(${scale.value})`;

  const zoomPercent = () => `${Math.round(scale.value * 100)}%`;

  onMounted(() => {
    canvasEl.value?.addEventListener(
      "wheel",
      onWheel,
      {
        passive: false,
      },
    );
    window.addEventListener(
      "keydown",
      onKeydown,
    );
    window.addEventListener(
      "keyup",
      onKeyup,
    );
  });

  onUnmounted(() => {
    canvasEl.value?.removeEventListener(
      "wheel",
      onWheel,
    );
    window.removeEventListener(
      "keydown",
      onKeydown,
    );
    window.removeEventListener(
      "keyup",
      onKeyup,
    );
  });

  return {
    offset,
    scale,
    isPanning,
    isSpaceHeld,
    transform,
    zoomPercent,
    zoomIn,
    zoomOut,
    onMousedown,
    onMousemove,
    onMouseup,
  };
}
