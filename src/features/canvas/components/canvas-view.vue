<script setup lang="ts">
import {
  ref,
} from "vue";
import {
  useCanvasInteraction,
} from "../composables/use-canvas-interaction";
import {
  useCanvasStore,
} from "../store";
import CanvasControls from "./canvas-controls.vue";

const store = useCanvasStore();
const containerRef = ref<HTMLElement | null>(null);
const {
  isPanning,
} = useCanvasInteraction(containerRef);
</script>

<template>
  <div
    ref="containerRef"
    class="canvas-bg relative h-full w-full overflow-hidden"
    :class="[isPanning ? 'cursor-grabbing' : 'cursor-grab']"
    :style="{
      backgroundSize: `${24 * store.scale}px ${24 * store.scale}px`,
      backgroundPosition: `${store.translateX}px ${store.translateY}px`,
    }"
  >
    <div
      :style="{
        transform: store.cssTransform,
        transformOrigin: '0 0',
        willChange: 'transform',
      }"
      class="absolute left-0 top-0"
    >
      <slot />
    </div>

    <CanvasControls class="absolute bottom-4 right-4" />
  </div>
</template>

<style scoped>
.canvas-bg {
  background-color: var(--background);
  background-image: radial-gradient(circle, #2a2d35 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
