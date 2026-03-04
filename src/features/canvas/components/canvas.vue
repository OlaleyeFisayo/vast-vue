<script lang="ts" setup>
import {
  IconMinus,
  IconPlus,
} from "@tabler/icons-vue";
import {
  computed,
  ref,
} from "vue";
import {
  useCanvas,
} from "../composables/use-canvas";

const canvasEl = ref<HTMLDivElement | null>(null);

const {
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
} = useCanvas(canvasEl);

const cursorClass = computed(() => {
  if (isPanning.value)
    return "cursor-grabbing";
  if (isSpaceHeld.value)
    return "cursor-grab";
  return "cursor-default";
});

// Dot grid: dots repeat every 100px, scaled and offset with canvas
const gridStyle = computed(() => {
  const size = 100 * scale.value;
  const dotSize = Math.max(
    1,
    1.5 * scale.value,
  );
  const ox = offset.x % size;
  const oy = offset.y % size;
  return {
    backgroundImage: `radial-gradient(circle, var(--primary-700) ${dotSize}px, transparent ${dotSize}px)`,
    backgroundSize: `${size}px ${size}px`,
    backgroundPosition: `${ox}px ${oy}px`,
  };
});
</script>

<template>
  <div
    ref="canvasEl"
    class="relative overflow-hidden bg-primary-400 select-none"
    :class="cursorClass"
    :style="gridStyle"
    @mousedown="onMousedown"
    @mousemove="onMousemove"
    @mouseup="onMouseup"
    @mouseleave="onMouseup"
  >
    <!-- Canvas surface -->
    <div
      class="absolute top-0 left-0 origin-top-left"
      :style="{ transform: transform() }"
    />

    <!-- Zoom indicator -->
    <div class="absolute bottom-4 right-4 flex items-center gap-1 bg-primary-500 border border-primary-700 rounded text-xs text-primary-900">
      <button
        class="px-2 py-1 hover:text-primary-800 disabled:opacity-30 cursor-pointer"
        :disabled="scale <= 0.1"
        type="button"
        @click="zoomOut"
      >
        <IconMinus class="size-4" />
      </button>
      <span class="min-w-10 text-center">{{ zoomPercent() }}</span>
      <button
        class="px-2 py-1 hover:text-primary-800 disabled:opacity-30 cursor-pointer"
        :disabled="scale >= 10"
        type="button"
        @click="zoomIn"
      >
        <IconPlus class="size-4" />
      </button>
    </div>
  </div>
</template>
