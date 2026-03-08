<script lang="ts" setup>
import type {
  SplitterPanelEmits,
  SplitterPanelProps,
} from "reka-ui";

defineProps<SplitterPanelProps>();
defineEmits<SplitterPanelEmits>();
</script>

<template>
  <SplitterPanel
    v-bind="$props"
    v-on="$attrs"
  >
    <slot />
  </SplitterPanel>
</template>
