<script setup lang="ts">
import {
  Minus,
  Plus,
  RotateCcw,
} from "lucide-vue-next";
import {
  Button,
} from "@/shared/components/ui/button";
import {
  useCanvasStore,
  ZOOM_MAX,
  ZOOM_MIN,
} from "../store";

const store = useCanvasStore();
</script>

<template>
  <div class="flex items-center gap-0.5 rounded-lg border border-border bg-interactive px-1 py-1 text-xs text-primary-300 shadow-md">
    <Button
      variant="ghost"
      size="icon-sm"
      :disabled="store.scale <= ZOOM_MIN"
      @click="store.zoomOut()"
    >
      <Minus />
    </Button>

    <span class="w-12 cursor-default select-none text-center tabular-nums">
      {{ store.zoomPercent }}%
    </span>

    <Button
      variant="ghost"
      size="icon-sm"
      :disabled="store.scale >= ZOOM_MAX"
      @click="store.zoomIn()"
    >
      <Plus />
    </Button>

    <div class="mx-1 h-4 w-px bg-border" />

    <Button
      variant="ghost"
      size="icon-sm"
      @click="store.resetView()"
    >
      <RotateCcw />
    </Button>
  </div>
</template>
