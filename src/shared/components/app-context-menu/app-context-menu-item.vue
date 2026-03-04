<script lang="ts" setup>
import type {
  ContextMenuItemEmits,
  ContextMenuItemProps,
} from "reka-ui";

defineProps<ContextMenuItemProps>();
defineEmits<ContextMenuItemEmits>();
</script>

<template>
  <ContextMenuItem
    v-bind="$props"
    class="px-2 py-1 cursor-pointer hover:bg-vue-dark rounded-sm text-text-primary outline-none!"
  >
    <slot />
  </ContextMenuItem>
</template>
