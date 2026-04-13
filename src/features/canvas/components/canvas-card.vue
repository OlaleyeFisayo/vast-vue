<script setup lang="ts">
import type {
  CanvasNode,
} from "../nodes-store";
import {
  Monitor,
  Smartphone,
  Tablet,
  X,
} from "lucide-vue-next";
import {
  computed,
  ref,
} from "vue";
import {
  useFileExplorerStore,
} from "@/features/file-explorer/store";
import {
  useComponentPreviewUrl,
} from "../composables/use-component-preview-url";
import {
  useCanvasNodesStore,
} from "../nodes-store";
import {
  useCanvasStore,
} from "../store";

const props = defineProps<{ node: CanvasNode }>();

const PATH_SEP_RE = /[\\/]/g;

const canvasStore = useCanvasStore();
const canvasNodesStore = useCanvasNodesStore();
const fileExplorerStore = useFileExplorerStore();

function selectNode() {
  const fp = props.node.filePath;
  const parts = fp.replace(
    PATH_SEP_RE,
    "/",
  ).split("/");
  const name = parts.at(-1) ?? fp;
  const parentPath = parts.slice(
    0,
    -1,
  ).join("/");
  const dotIdx = name.lastIndexOf(".");
  const extension = dotIdx !== -1 ? name.slice(dotIdx) : "";
  fileExplorerStore.setSelectedNode({
    key: props.node.nodeKey,
    type: "file",
    name,
    absolutePath: fp,
    parentPath,
    path: fp,
    extension,
  });
}

const filePath = computed(() => props.node.filePath);
const {
  previewUrl,
} = useComponentPreviewUrl(filePath);

const titlebarRef = ref<HTMLElement | null>(null);

const presets = [
  {
    key: "desktop",
    icon: Monitor,
    label: "Desktop",
    w: 1440,
    h: 1024,
  },
  {
    key: "tablet",
    icon: Tablet,
    label: "Tablet",
    w: 768,
    h: 1024,
  },
  {
    key: "phone",
    icon: Smartphone,
    label: "Phone",
    w: 390,
    h: 844,
  },
] as const;

type PresetKey = typeof presets[number]["key"] | "custom";

const activePreset = ref<PresetKey>("desktop");
const cardWidth = ref(1440);
const cardHeight = ref(1024);

function applyPreset(preset: typeof presets[number]) {
  activePreset.value = preset.key;
  cardWidth.value = preset.w;
  cardHeight.value = preset.h;
}

function onWidthInput(e: Event) {
  const val = Number((e.target as HTMLInputElement).value);
  if (val > 0) {
    cardWidth.value = val;
    activePreset.value = "custom";
  }
}

function onHeightInput(e: Event) {
  const val = Number((e.target as HTMLInputElement).value);
  if (val > 0) {
    cardHeight.value = val;
    activePreset.value = "custom";
  }
}

let isDragging = false;
let startX = 0;
let startY = 0;
let origX = 0;
let origY = 0;

function onDragStart(e: PointerEvent) {
  if ((e.target as HTMLElement).closest("[data-no-drag]"))
    return;
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  origX = props.node.x;
  origY = props.node.y;
  titlebarRef.value?.setPointerCapture(e.pointerId);
  e.preventDefault();
}

function onDragMove(e: PointerEvent) {
  if (!isDragging)
    return;
  const dx = (e.clientX - startX) / canvasStore.scale;
  const dy = (e.clientY - startY) / canvasStore.scale;
  canvasNodesStore.updatePosition(
    props.node.id,
    origX + dx,
    origY + dy,
  );
}

function onDragEnd() {
  isDragging = false;
}
</script>

<template>
  <div
    class="absolute flex flex-col border border-zinc-700 shadow-[0_4px_24px_rgba(0,0,0,0.5)] overflow-hidden select-none"
    :style="{ left: `${node.x}px`, top: `${node.y}px` }"
    @pointerdown="selectNode"
  >
    <!-- Titlebar -->
    <div
      ref="titlebarRef"
      class="flex items-center gap-3 px-3 py-1.5 bg-zinc-800 border-b border-zinc-700 cursor-grab active:cursor-grabbing shrink-0"
      @pointerdown="onDragStart"
      @pointermove="onDragMove"
      @pointerup="onDragEnd"
      @pointercancel="onDragEnd"
    >
      <!-- Close -->
      <button
        data-no-drag
        class="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 hover:bg-red-500 text-white cursor-pointer shrink-0 p-0 border-0"
        title="Close"
        @click.stop="canvasNodesStore.removeNode(node.id)"
      >
        <X :size="10" />
      </button>

      <!-- Label -->
      <span class="text-xs font-medium text-zinc-300 whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0">
        {{ node.label }}
      </span>

      <!-- Preset toggles -->
      <div
        data-no-drag
        class="flex items-center gap-0.5 bg-zinc-900 rounded p-0.5 shrink-0"
      >
        <button
          v-for="preset in presets"
          :key="preset.key"
          :title="preset.label"
          class="flex items-center justify-center w-7 h-6 rounded cursor-pointer border-0 transition-colors"
          :class="activePreset === preset.key
            ? 'bg-zinc-600 text-zinc-100'
            : 'bg-transparent text-zinc-500 hover:text-zinc-300'"
          @click.stop="applyPreset(preset)"
        >
          <component
            :is="preset.icon"
            :size="14"
          />
        </button>
      </div>

      <!-- Dimensions -->
      <div
        data-no-drag
        class="flex items-center gap-1 shrink-0"
      >
        <input
          type="number"
          :value="cardWidth"
          min="1"
          class="w-14 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-300 text-center px-1 py-0.5 focus:outline-none focus:border-zinc-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          title="Width"
          @change="onWidthInput"
        >
        <span class="text-zinc-600 text-xs">×</span>
        <input
          type="number"
          :value="cardHeight"
          min="1"
          class="w-14 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-300 text-center px-1 py-0.5 focus:outline-none focus:border-zinc-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          title="Height"
          @change="onHeightInput"
        >
      </div>
    </div>

    <!-- Card body -->
    <div
      class="overflow-hidden relative bg-white"
      :style="{ width: `${cardWidth}px`, height: `${cardHeight}px` }"
    >
      <iframe
        v-if="previewUrl"
        :src="previewUrl"
        class="w-full h-full border-0 block pointer-events-none"
      />
    </div>
  </div>
</template>
