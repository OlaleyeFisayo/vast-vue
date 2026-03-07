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
    class="bg-primary-600 border border-primary-700 rounded-md p-1 space-y-1"
  >
    <slot />
  </ContextMenuContent>
</template>
