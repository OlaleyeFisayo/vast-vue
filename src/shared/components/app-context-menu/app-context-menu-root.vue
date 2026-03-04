<script lang="ts" setup>
import type {
  ContextMenuRootEmits,
  ContextMenuRootProps,
} from "reka-ui";

defineProps<ContextMenuRootProps>();
defineEmits<ContextMenuRootEmits>();
</script>

<template>
  <ContextMenuRoot
    v-bind="$props"
    v-on="$attrs"
  >
    <slot />
  </ContextMenuRoot>
</template>
