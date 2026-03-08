<script lang="ts" setup>
import type {
  SplitterResizeHandleEmits,
  SplitterResizeHandleProps,
} from "reka-ui";

defineProps<SplitterResizeHandleProps>();
defineEmits<SplitterResizeHandleEmits>();
</script>

<template>
  <SplitterResizeHandle
    v-bind="$props"
    class="w-1 bg-primary-700 hover:bg-primary-100"
    v-on="$attrs"
  >
    <slot />
  </SplitterResizeHandle>
</template>
