<script lang="ts" setup>
import type {
  ContextMenuContentEmits,
  ContextMenuContentProps,
} from "reka-ui";

defineProps<ContextMenuContentProps>();
defineEmits<ContextMenuContentEmits>();
</script>

<template>
  <ContextMenuContent
    v-bind="$props"
    class="bg-surface-overlay border border-border rounded-md p-1.5 space-y-1"
  >
    <slot />
  </ContextMenuContent>
</template>
